import styled from "styled-components";
import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "../../globals";

export const AddNoteForm = () => {
    const [content, setContent] = useState("")
    const [isExpanded, setIsExpanded] = useState(false)
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
            setIsExpanded(false)
            queryClient.invalidateQueries({queryKey: ["notes"]})
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (content.trim()) {
            addNoteMutation.mutate(content.trim())
        }
    }

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <TextAreaContainer $isExpanded={isExpanded}>
                    <StyledTextArea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onFocus={() => setIsExpanded(true)}
                        placeholder="Add a note for your family..."
                        rows={isExpanded ? 4 : 1}
                        maxLength={10000}
                    />
                </TextAreaContainer>

                {isExpanded && (
                    <ButtonContainer>
                        <CancelButton
                            type="button"
                            onClick={() => {
                                setIsExpanded(false)
                                setContent("")
                            }}
                        >
                            Cancel
                        </CancelButton>
                        <SubmitButton
                            type="submit"
                            disabled={!content.trim() || addNoteMutation.isPending}
                        >
                            {addNoteMutation.isPending ? "Adding..." : "Add Note"}
                        </SubmitButton>
                    </ButtonContainer>
                )}
            </form>

            {addNoteMutation.isError && (
                <ErrorMessage>
                    Failed to add note. Please try again.
                </ErrorMessage>
            )}
        </FormContainer>
    )
}

const FormContainer = styled.div`
    background: ${props => props.theme.palette.background.paper};
    border: 1px solid ${props => props.theme.palette.divider};
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const TextAreaContainer = styled.div<{ $isExpanded: boolean }>`
    margin-bottom: ${props => props.$isExpanded ? '12px' : '0'};
`

const StyledTextArea = styled.textarea`
    width: 100%;
    border: none;
    outline: none;
    resize: vertical;
    font-family: inherit;
    font-size: 14px;
    line-height: 1.5;
    background: transparent;
    color: ${props => props.theme.palette.text.primary};
    
    &::placeholder {
        color: ${props => props.theme.palette.text.secondary};
    }
`

const ButtonContainer = styled.div`
    display: flex;
    gap: 8px;
    justify-content: flex-end;
`

const Button = styled.button`
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border: 1px solid;
    transition: all 0.2s ease;
    
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`

const CancelButton = styled(Button)`
    background: transparent;
    color: ${props => props.theme.palette.text.secondary};
    border-color: ${props => props.theme.palette.divider};
`

const SubmitButton = styled(Button)`
    background: ${props => props.theme.palette.primary.main};
    color: ${props => props.theme.palette.primary.contrastText};
    border-color: ${props => props.theme.palette.primary.main};
    
    &:hover:not(:disabled) {
        background: ${props => props.theme.palette.primary.dark};
        border-color: ${props => props.theme.palette.primary.dark};
    }
`

const ErrorMessage = styled.div`
    color: ${props => props.theme.palette.error.main};
    font-size: 14px;
    margin-top: 8px;
    padding: 8px;
    background: ${props => props.theme.palette.error.light}20;
    border-radius: 4px;
`
