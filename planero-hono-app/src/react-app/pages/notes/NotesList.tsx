import styled from "styled-components";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {apiClient} from "../../globals";
import {NoteItem} from "./NoteItem";
import {EditNoteModal} from "./EditNoteModal";

type Note = {
    id: string;
    parentId: string | null;
    content: string;
    familyId: string;
    authorId: string;
    authorName: string;
    createdAt: string;
    updatedAt: string;
}

export const NotesList = () => {
    const [editingNote, setEditingNote] = useState<Note | null>(null)

    const {data: notes, isLoading, error} = useQuery({
        queryKey: ["notes"],
        queryFn: async () => {
            const res = await apiClient.api.notes.$get()
            if (!res.ok) {
                throw new Error('Failed to fetch notes')
            }
            return await res.json() as Note[]
        },
    })

    if (isLoading) {
        return (
            <LoadingContainer>
                <LoadingSpinner/>
                <p>Loading notes...</p>
            </LoadingContainer>
        )
    }

    if (error) {
        return (
            <ErrorContainer>
                <p>Failed to load notes. Please try again.</p>
            </ErrorContainer>
        )
    }

    if (!notes || notes.length === 0) {
        return (
            <EmptyContainer>
                <EmptyIcon>📝</EmptyIcon>
                <h3>No notes yet</h3>
                <p>Be the first to add a note for your family!</p>
            </EmptyContainer>
        )
    }

    return (
        <Container>
            <Header>
                <h2>Family Notes ({notes.length})</h2>
            </Header>
            <NotesContainer>
                {notes.map((note) => (
                    <NoteItem
                        key={note.id}
                        note={note}
                        onEdit={setEditingNote}
                    />
                ))}
            </NotesContainer>

            <EditNoteModal
                note={editingNote}
                isOpen={!!editingNote}
                onClose={() => setEditingNote(null)}
            />
        </Container>
    )
}

const Container = styled.div`
    margin-top: 20px;
`

const Header = styled.div`
    margin-bottom: 16px;
    
    h2 {
        color: ${props => props.theme.palette.text.primary};
        font-size: 20px;
        font-weight: 600;
    }
`

const NotesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    
    @media (min-width: 1200px) {
        grid-template-columns: repeat(4, 1fr);
    }
    
    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 16px;
    }
    
    @media (max-width: 480px) {
        grid-template-columns: 1fr;
        gap: 12px;
    }
`

const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    color: ${props => props.theme.palette.text.secondary};
    
    p {
        margin-top: 16px;
        font-size: 16px;
    }
`

const LoadingSpinner = styled.div`
    width: 32px;
    height: 32px;
    border: 3px solid ${props => props.theme.palette.divider};
    border-top: 3px solid ${props => props.theme.palette.primary.main};
    border-radius: 50%;
    animation: spin 1s linear infinite;
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`

const ErrorContainer = styled.div`
    text-align: center;
    padding: 40px 20px;
    color: ${props => props.theme.palette.error.main};
    background: ${props => props.theme.palette.error.light}10;
    border-radius: 8px;
    border: 1px solid ${props => props.theme.palette.error.light};
`

const EmptyContainer = styled.div`
    text-align: center;
    padding: 60px 20px;
    color: ${props => props.theme.palette.text.secondary};
    
    h3 {
        margin: 16px 0 8px 0;
        color: ${props => props.theme.palette.text.primary};
    }
    
    p {
        font-size: 16px;
    }
`

const EmptyIcon = styled.div`
    font-size: 48px;
    margin-bottom: 8px;
`
