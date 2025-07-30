import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {useState, useRef} from "react";
import styled from "styled-components";
import {apiClient} from "../../globals";
import {useFormatter} from "../../hooks/useFormatter";
import type {InferResponseType} from 'hono/client'
import {Button} from "../../components/Button";

type FamilyMember = InferResponseType<typeof apiClient.api.users.current.$get>["family"]["members"][number]

export const SetupPage = () => {
    const {formatDate, formatGender, formatRole} = useFormatter();
    const queryClient = useQueryClient();
    const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
    const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    // Form refs for basic modal
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const genderRef = useRef<HTMLInputElement>(null);
    const bornAtRef = useRef<HTMLInputElement>(null);
    const roleRef = useRef<HTMLInputElement>(null);

    // Form refs for detail modal
    const interestsRef = useRef<HTMLTextAreaElement>(null);
    const foodRef = useRef<HTMLTextAreaElement>(null);
    const personalityRef = useRef<HTMLTextAreaElement>(null);
    const cultureRef = useRef<HTMLTextAreaElement>(null);
    const bodyRef = useRef<HTMLTextAreaElement>(null);
    const noteRef = useRef<HTMLTextAreaElement>(null);

    const {data, isLoading, error} = useQuery({
        queryKey: ["api.users.current"],
        queryFn: async () => {
            const res = await apiClient.api.users.current.$get()
            return await res.json()
        },
    });

    // Mutations for updating user info
    const updateBasicMutation = useMutation({
        mutationFn: async (updates: { name?: string; email?: string; gender?: string; bornAt?: string }) => {
            if (!selectedMember?.id || !data?.family.id) throw new Error('Missing required data');
            const res = await apiClient.api.users[':familyId'][':userId'].basic.$put({
                param: {familyId: data.family.id, userId: selectedMember.id},
                json: updates
            });
            return await res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["api.families.current"]});
            handleCloseModals();
        },
        onError: (error) => {
            console.error('Error updating basic info:', error);
            alert('Chyba při ukládání základních údajů');
        }
    });

    const updateExtendedMutation = useMutation({
        mutationFn: async (updates: {
            body?: string;
            culture?: string;
            food?: string;
            interests?: string;
            note?: string;
            personality?: string
        }) => {
            if (!selectedMember?.id || !data?.family.id) throw new Error('Missing required data');
            const res = await apiClient.api.users[':familyId'][':userId'].extended.$put({
                param: {familyId: data.family.id, userId: selectedMember.id},
                json: updates
            });
            return await res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["api.families.current"]});
            handleCloseModals();
        },
        onError: (error) => {
            console.error('Error updating extended info:', error);
            alert('Chyba při ukládání podrobných údajů');
        }
    });

    const handleEditBasic = (member: FamilyMember) => {
        setSelectedMember(member);
        setIsBasicModalOpen(true);
    };

    const handleEditDetails = (member: FamilyMember) => {
        setSelectedMember(member);
        setIsDetailModalOpen(true);
    };

    const handleCloseModals = () => {
        setIsBasicModalOpen(false);
        setIsDetailModalOpen(false);
        setSelectedMember(null);
    };

    const handleSaveBasic = () => {
        const updates = {
            name: nameRef.current?.value,
            email: emailRef.current?.value,
            gender: genderRef.current?.value,
            bornAt: bornAtRef.current?.value,
        };
        updateBasicMutation.mutate(updates);
    };

    const handleSaveExtended = () => {
        const updates = {
            interests: interestsRef.current?.value,
            food: foodRef.current?.value,
            personality: personalityRef.current?.value,
            culture: cultureRef.current?.value,
            body: bodyRef.current?.value,
            note: noteRef.current?.value,
        };
        updateExtendedMutation.mutate(updates);
    };

    if (isLoading) return <p>Načítání dat rodiny...</p>;
    if (error) return <p>Chyba při načítání dat rodiny: {error.toString()}</p>;

    return (
        <Container>
            <h1>{data?.family.name}</h1>

            <MembersGrid>
                {data?.family.members?.map((member) => (
                    <MemberPanel key={member.id}>
                        <h3>{member.name}</h3>

                        <MemberInfo>
                            <InfoRow>
                                <span>E-mail:</span>
                                <span>{member.email}</span>
                            </InfoRow>

                            <InfoRow>
                                <span>Role:</span>
                                <span>{formatRole(member.role)}</span>
                            </InfoRow>

                            <InfoRow>
                                <span>Pohlaví:</span>
                                <span>{formatGender(member.gender)}</span>
                            </InfoRow>

                            <InfoRow>
                                <span>Datum narození:</span>
                                <span>
                                    {member.bornAt ? formatDate(member.bornAt) : "-"}
                                </span>
                            </InfoRow>
                        </MemberInfo>

                        <ButtonsContainer>
                            <EditButton onClick={() => handleEditBasic(member)}>
                                Upravit základní údaje
                            </EditButton>
                            <SecondaryButton onClick={() => handleEditDetails(member)}>
                                Upravit podrobnosti
                            </SecondaryButton>
                        </ButtonsContainer>
                    </MemberPanel>
                ))}
            </MembersGrid>

            {/* Basic Info Modal */}
            <Modal isOpen={isBasicModalOpen}>
                <ModalContent>
                    <ModalHeader>
                        <h2>Upravit základní údaje - {selectedMember?.name}</h2>
                        <CloseButton onClick={handleCloseModals}>×</CloseButton>
                    </ModalHeader>

                    <form>
                        <FormGroup>
                            <Label>Jméno:</Label>
                            <Input ref={nameRef} type="text" defaultValue={selectedMember?.name}/>
                        </FormGroup>

                        <FormGroup>
                            <Label>E-mail:</Label>
                            <Input ref={emailRef} type="email" defaultValue={selectedMember?.email}/>
                        </FormGroup>

                        <FormGroup>
                            <Label>Pohlaví:</Label>
                            <Input ref={genderRef} type="text" defaultValue={selectedMember?.gender}/>
                        </FormGroup>

                        <FormGroup>
                            <Label>Datum narození:</Label>
                            <Input ref={bornAtRef} type="date" defaultValue={selectedMember?.bornAt}/>
                        </FormGroup>

                        <FormGroup>
                            <Label>Role:</Label>
                            <Input ref={roleRef} type="text" defaultValue={selectedMember?.role} readOnly/>
                        </FormGroup>
                    </form>

                    <ModalFooter>
                        <CancelButton onClick={handleCloseModals}>Zrušit</CancelButton>
                        <SaveButton
                            onClick={handleSaveBasic}
                            disabled={updateBasicMutation.isPending}
                        >
                            {updateBasicMutation.isPending ? 'Ukládání...' : 'Uložit'}
                        </SaveButton>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Detailed Info Modal */}
            <Modal isOpen={isDetailModalOpen}>
                <ModalContent isScrollable>
                    <ModalHeader>
                        <h2>Upravit podrobnosti - {selectedMember?.name}</h2>
                        <CloseButton onClick={handleCloseModals}>×</CloseButton>
                    </ModalHeader>

                    <form>
                        <FormGroup>
                            <Label>Zájmy a koníčky:</Label>
                            <TextArea
                                ref={interestsRef}
                                placeholder="Popište zájmy, koníčky a aktivity..."
                                defaultValue={selectedMember?.interests || ''}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Jídlo a preference:</Label>
                            <TextArea
                                ref={foodRef}
                                placeholder="Oblíbené jídlo, alergie, dietní omezení..."
                                defaultValue={selectedMember?.food || ''}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Osobnost:</Label>
                            <TextArea
                                ref={personalityRef}
                                placeholder="Povahové rysy, charakteristiky..."
                                defaultValue={selectedMember?.personality || ''}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Kultura a pozadí:</Label>
                            <TextArea
                                ref={cultureRef}
                                placeholder="Kulturní pozadí, tradice, hodnoty..."
                                defaultValue={selectedMember?.culture || ''}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Fyzický popis:</Label>
                            <TextArea
                                ref={bodyRef}
                                placeholder="Fyzické charakteristiky, zdravotní informace..."
                                defaultValue={selectedMember?.body || ''}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Poznámky:</Label>
                            <TextArea
                                ref={noteRef}
                                placeholder="Další důležité informace..."
                                defaultValue={selectedMember?.note || ''}
                            />
                        </FormGroup>
                    </form>

                    <ModalFooter>
                        <CancelButton onClick={handleCloseModals}>Zrušit</CancelButton>
                        <SaveButton
                            onClick={handleSaveExtended}
                            disabled={updateExtendedMutation.isPending}
                        >
                            {updateExtendedMutation.isPending ? 'Ukládání...' : 'Uložit'}
                        </SaveButton>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    );
};


const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

const MembersGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1rem;
`;

const MemberPanel = styled.div`
    padding: 1ex;
    border: 1px solid ${theme => theme.theme.palette.border.default};
    border-radius: 0.5rem;
`;

const MemberInfo = styled.div`

`;

const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 0.25rem;
`;

const ButtonsContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    place-items: flex-start;
`;

const EditButton = styled(Button)`

`;

const SecondaryButton = styled(Button)`
    background-color: ${theme => theme.theme.palette.secondary.bg};
`;

const Modal = styled.div<{ isOpen: boolean }>`
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div<{ isScrollable?: boolean }>`
    background: white;
    padding: 24px;
    max-width: 600px;
    width: 90%;
    border-radius: 8px;
    max-height: ${props => props.isScrollable ? '80vh' : 'auto'};
    overflow-y: ${props => props.isScrollable ? 'auto' : 'visible'};
`;

const FormGroup = styled.div`
    margin-bottom: 16px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 4px;
    font-weight: 500;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    resize: vertical;
    min-height: 100px;
`;

const ModalFooter = styled.div`
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #eee;
`;

const SaveButton = styled.button`
    background: #28a745;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;

    &:disabled {
        background: #6c757d;
        cursor: not-allowed;
    }
`;

const CancelButton = styled.button`
    background: #6c757d;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
`;