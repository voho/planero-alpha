import styled from "styled-components";
import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "../../globals";
import {Button} from "../../components/Button";

type AddNoteModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

export const AddNoteModal = ({isOpen, onClose}: AddNoteModalProps) => {
    const [content, setContent] = useState("")
    const queryClient = useQueryClient()

    const addNoteMutation = useMutation({
        mutationFn: async (noteContent: string) => {
            const res = await apiClient.api.notes.$post({
                json: {content: noteContent}
            })
            if (!res.ok) {
                throw new Error('Failed to add note')
            }
            return await res.json()
        },
        onSuccess: () => {
            setContent("")
            onClose()
            queryClient.invalidateQueries({queryKey: ["notes"]})
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (content.trim()) {
            addNoteMutation.mutate(content.trim())
        }
    }

    const handleClose = () => {
        setContent("")
        onClose()
    }

    if (!isOpen) return null

    return (
        <Overlay onClick={handleClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <h2>Add New Note</h2>
                    <CloseButton onClick={handleClose}>×</CloseButton>
                </ModalHeader>

                <form onSubmit={handleSubmit}>
                    <TextAreaContainer>
                        <StyledTextArea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your note here..."
                            rows={6}
                            maxLength={10000}
                            autoFocus
                        />
                        <CharacterCount>
                            {content.length}/10000
                        </CharacterCount>
                    </TextAreaContainer>

                    <ButtonContainer>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={!content.trim() || addNoteMutation.isPending}
                        >
                            {addNoteMutation.isPending ? "Adding..." : "Add Note"}
                        </Button>
                    </ButtonContainer>
                </form>

                {addNoteMutation.isError && (
                    <ErrorMessage>
                        Failed to add note. Please try again.
                    </ErrorMessage>
                )}
            </ModalContainer>
        </Overlay>
    )
}

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
`

const ModalContainer = styled.div`
    background: ${props => props.theme.palette.paper.bg};
    border-radius: 12px;
    width: 100%;
    max-width: 600px;
    max-height: 80vh;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`

const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    border-bottom: 1px solid ${props => props.theme.palette.divider};
    
    h2 {
        margin: 0;
        color: ${props => props.theme.palette.text.primary};
        font-size: 20px;
        font-weight: 600;
    }
`

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: ${props => props.theme.palette.text.secondary};
    padding: 4px;
    border-radius: 4px;
    
`

const TextAreaContainer = styled.div`
    padding: 24px;
    position: relative;
`

const StyledTextArea = styled.textarea`
    width: 100%;
    border: 1px solid ${props => props.theme.palette.divider};
    border-radius: 8px;
    padding: 12px;
    font-family: inherit;
    font-size: 14px;
    line-height: 1.5;
    background: ${props => props.theme.palette.background.default};
    color: ${props => props.theme.palette.text.primary};
    resize: vertical;
    min-height: 120px;
    
    &:focus {
        outline: none;
        border-color: ${props => props.theme.palette.primary.main};
        box-shadow: 0 0 0 2px ${props => props.theme.palette.primary.main}20;
    }
    
    &::placeholder {
        color: ${props => props.theme.palette.text.secondary};
    }
`

const CharacterCount = styled.div`
    position: absolute;
    bottom: 30px;
    right: 30px;
    font-size: 12px;
    color: ${props => props.theme.palette.text.secondary};
`

const ButtonContainer = styled.div`
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    padding: 0 24px 24px 24px;
`



const ErrorMessage = styled.div`
    color: ${props => props.theme.palette.error.main};
    font-size: 14px;
    margin: 0 24px 24px 24px;
    padding: 12px;
    background: ${props => props.theme.palette.error.light}20;
    border-radius: 6px;
    border: 1px solid ${props => props.theme.palette.error.light};
`
