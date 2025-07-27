import styled from "styled-components";
import {useState} from "react";
import {SignedIn, SignedOut} from "@clerk/clerk-react";
import {FlexCol} from "../../layout/FlexCol";
import {NotesList} from "./NotesList";
import {AddNoteModal} from "./AddNoteModal";
import {Button} from "../../components/Button";

export const NotesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <main>
            <SignedIn>
                <Container>
                    <Header>
                        <HeaderContent>
                            <SearchContainer>
                                <SearchInput
                                    type="text"
                                    placeholder="Hledat poznámky..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <ClearButton onClick={() => setSearchQuery('')}>
                                        ✕
                                    </ClearButton>
                                )}
                            </SearchContainer>
                            <Button 
                                onClick={() => setIsModalOpen(true)}
                                size="large"
                            >
                                + Nová sdílená poznámka
                            </Button>
                        </HeaderContent>
                    </Header>

                    <NotesList searchQuery={searchQuery}/>
                </Container>

                <AddNoteModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </SignedIn>
            <SignedOut>
                <FlexCol>
                    <h2>Pro zobrazení rodiných poznámek se prosím přihlaste</h2>
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

const SearchContainer = styled.div`
    position: relative;
    flex: 1;
    max-width: 400px;
    
    @media (max-width: 640px) {
        max-width: 100%;
        width: 100%;
    }
`

const SearchInput = styled.input`
    width: 100%;
    padding: 12px 16px;
    padding-right: 40px;
    border: 2px solid ${props => props.theme.palette.divider};
    border-radius: 8px;
    font-size: 16px;
    background: ${props => props.theme.palette.background.paper};
    color: ${props => props.theme.palette.text.primary};
    transition: border-color 0.2s ease;
    
    &:focus {
        outline: none;
        border-color: ${props => props.theme.palette.primary.main};
    }
    
    &::placeholder {
        color: ${props => props.theme.palette.text.secondary};
    }
`

const ClearButton = styled.button`
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: ${props => props.theme.palette.text.secondary};
    cursor: pointer;
    font-size: 16px;
    padding: 4px;
    border-radius: 4px;
    transition: color 0.2s ease, background-color 0.2s ease;
    
    &:hover {
        color: ${props => props.theme.palette.text.primary};
    }
`


