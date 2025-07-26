import styled from "styled-components";
import {useState} from "react";
import {SignedIn, SignedOut} from "@clerk/clerk-react";
import {FlexCol} from "../../layout/FlexCol";
import {NotesList} from "./NotesList";
import {AddNoteModal} from "./AddNoteModal";
import {Button} from "../../components/Button";

export const NotesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <main>
            <SignedIn>
                <Container>
                    <Header>
                        <HeaderContent>
                            <Button 
                                onClick={() => setIsModalOpen(true)}
                                size="large"
                            >
                                + Nová sdílená poznámka
                            </Button>
                        </HeaderContent>
                    </Header>

                    <NotesList/>
                </Container>

                <AddNoteModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </SignedIn>
            <SignedOut>
                <FlexCol>
                    <h2>Please sign in to view family notes</h2>
                </FlexCol>
            </SignedOut>
        </main>
    )
}

const Container = styled.div`
    width: 100%;
    padding: 20px;
`

const Header = styled.div`
    margin-bottom: 30px;
`

const HeaderContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    
    @media (max-width: 640px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
    }
    
    h1 {
        color: ${props => props.theme.palette.primary.main};
        margin: 0 0 8px 0;
        font-size: 28px;
        font-weight: 700;
    }
    
    p {
        color: ${props => props.theme.palette.text.secondary};
        font-size: 16px;
        margin: 0;
    }
`


