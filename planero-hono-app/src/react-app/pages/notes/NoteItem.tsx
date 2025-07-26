import styled from "styled-components";
import {useFormatter} from "../../hooks/useFormatter";
import {useRef, useEffect, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "../../globals";

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

type NoteItemProps = {
    note: Note;
    onEdit: (note: Note) => void;
}

export const NoteItem = ({note, onEdit}: NoteItemProps) => {
    const {formatDateTime} = useFormatter()
    const contentRef = useRef<HTMLDivElement>(null)
    const [isTruncated, setIsTruncated] = useState(false)
    const [showActions, setShowActions] = useState(false)
    const queryClient = useQueryClient()

    const deleteNoteMutation = useMutation({
        mutationFn: async () => {
            const res = await apiClient.api.notes[":id"].$delete({
                param: {id: note.id}
            })
            if (!res.ok) {
                throw new Error('Failed to delete note')
            }
            return await res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["notes"]})
        }
    })

    useEffect(() => {
        if (contentRef.current) {
            const element = contentRef.current
            setIsTruncated(element.scrollHeight > element.clientHeight)
        }
    }, [note.content])

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            deleteNoteMutation.mutate()
        }
    }

    return (
        <Container
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
        >
            <Header>
                <AuthorInfo>
                    <AuthorAvatar>
                        {note.authorName.charAt(0).toUpperCase()}
                    </AuthorAvatar>
                    <AuthorDetails>
                        <AuthorName>{note.authorName}</AuthorName>
                        <Timestamp>{formatDateTime(note.createdAt)}</Timestamp>
                    </AuthorDetails>
                </AuthorInfo>

                <ActionButtons $visible={showActions}>
                    <ActionButton
                        onClick={() => onEdit(note)}
                        title="Edit note"
                    >
                        ✏️
                    </ActionButton>
                    <ActionButton
                        onClick={handleDelete}
                        disabled={deleteNoteMutation.isPending}
                        title="Delete note"
                        $danger
                    >
                        {deleteNoteMutation.isPending ? '⏳' : '🗑️'}
                    </ActionButton>
                </ActionButtons>
            </Header>

            <Content
                ref={contentRef}
                className={isTruncated ? 'truncated' : ''}
            >
                {note.content}
            </Content>
        </Container>
    )
}

const Container = styled.div`
    border-radius: 12px;
    padding: 16px;
    transition: all 0.2s ease;
    height: fit-content;
    display: flex;
    flex-direction: column;

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
    }
`

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    position: relative;
`

const AuthorInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`

const AuthorAvatar = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 14px;
`

const AuthorDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`

const AuthorName = styled.span`
    font-weight: 600;
    color: ${props => props.theme.palette.text.primary};
    font-size: 14px;
`

const Timestamp = styled.span`
    font-size: 12px;
`

const Content = styled.div`
    color: ${props => props.theme.palette.text.primary};
    line-height: 1.5;
    font-size: 14px;
    white-space: pre-wrap;
    word-wrap: break-word;
    flex: 1;
    overflow: hidden;

    /* Limit content height and add fade effect for very long notes */
    max-height: 200px;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 20px;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s ease;
    }

    &.truncated::after {
        opacity: 1;
    }
`

const ActionButtons = styled.div<{ $visible: boolean }>`
    display: flex;
    gap: 4px;
    opacity: ${props => props.$visible ? 1 : 0};
    transition: opacity 0.2s ease;
    position: absolute;
    top: 0;
    right: 0;
`

const ActionButton = styled.button<{ $danger?: boolean }>`
    background: none;
    border: none;
    padding: 6px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background: ${props => props.$danger
                ? props.theme.palette.danger?.bg || '#fee'
                : props.theme.palette.background?.alt || '#f5f5f5'};
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`
