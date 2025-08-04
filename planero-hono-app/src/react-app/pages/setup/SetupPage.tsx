import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {useState, useRef} from "react";
import styled from "styled-components";
import {apiClient} from "../../globals";
import {useFormatter} from "../../hooks/useFormatter";
import type {InferResponseType} from 'hono/client'
import {Button} from "../../components/Button";

type FamilyMember = NonNullable<InferResponseType<typeof apiClient.api.users.current.$get>["family"]>["members"][number]

export const SetupPage = () => {
    const {formatDate, formatGender, formatRole} = useFormatter();
    const queryClient = useQueryClient();
    const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
    const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [memberToRemove, setMemberToRemove] = useState<FamilyMember | null>(null);
    const [newMemberRole, setNewMemberRole] = useState<"adult" | "child">("adult");

    // Form refs for basic modal
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const genderRef = useRef<HTMLSelectElement>(null);
    const bornAtRef = useRef<HTMLInputElement>(null);
    const roleRef = useRef<HTMLInputElement>(null);

    // Form refs for detail modal
    const interestsRef = useRef<HTMLTextAreaElement>(null);
    const foodRef = useRef<HTMLTextAreaElement>(null);
    const personalityRef = useRef<HTMLTextAreaElement>(null);
    const cultureRef = useRef<HTMLTextAreaElement>(null);
    const bodyRef = useRef<HTMLTextAreaElement>(null);
    const noteRef = useRef<HTMLTextAreaElement>(null);

    // Form refs for family creation
    const familyNameRef = useRef<HTMLInputElement>(null);

    // Form refs for adding new member
    const newMemberNameRef = useRef<HTMLInputElement>(null);
    const newMemberEmailRef = useRef<HTMLInputElement>(null);

    const {data, isLoading, error} = useQuery({
        queryKey: ["api.users.current"],
        queryFn: async () => {
            const res = await apiClient.api.users.current.$get()
            return await res.json()
        },
    });

    // Mutations for updating user info
    const updateBasicMutation = useMutation({
        mutationFn: async (updates: { name?: string; email?: string; gender?: "m" | "f" | "x"; bornAt?: string }) => {
            if (!selectedMember?.id || !data?.family?.id) throw new Error('Missing required data');
            const res = await apiClient.api.users[':familyId'][':userId'].basic.$put({
                param: {familyId: data.family.id, userId: selectedMember.id},
                json: updates
            });
            return await res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["api.users.current"]});
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
            if (!selectedMember?.id || !data?.family?.id) throw new Error('Missing required data');
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

    // Mutation for creating family
    const createFamilyMutation = useMutation({
        mutationFn: async (familyName: string) => {
            const res = await apiClient.api.families.$post({
                json: {name: familyName}
            });
            return await res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["api.users.current"]});
        },
        onError: (error) => {
            console.error('Error creating family:', error);
            alert('Chyba při vytváření rodiny');
        }
    });

    // Mutation for adding family member
    const addMemberMutation = useMutation({
        mutationFn: async (memberData: {
            name: string;
            email: string;
            gender: "m" | "f" | "x";
            bornAt?: string;
            role: "adult" | "child";
        }) => {
            if (!data?.family?.id) throw new Error('No family ID');
            const res = await apiClient.api.families[':familyId'].members.$post({
                param: {familyId: data.family.id},
                json: memberData
            });
            return await res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["api.users.current"]});
            handleCloseModals();
        },
        onError: (error) => {
            console.error('Error adding member:', error);
            alert('Chyba při přidávání člena rodiny');
        }
    });

    // Mutation for removing family member
    const removeMemberMutation = useMutation({
        mutationFn: async (userId: string) => {
            if (!data?.family?.id) throw new Error('No family ID');
            const res = await apiClient.api.families[':familyId'].members[':userId'].$delete({
                param: {familyId: data.family.id, userId}
            });
            return await res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["api.users.current"]});
            handleCloseModals();
        },
        onError: (error) => {
            console.error('Error removing member:', error);
            alert('Chyba při odebírání člena rodiny');
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

    const handleRemoveMember = (member: FamilyMember) => {
        setMemberToRemove(member);
        setIsRemoveModalOpen(true);
    };

    const handleConfirmRemove = () => {
        if (memberToRemove?.id) {
            removeMemberMutation.mutate(memberToRemove.id);
        }
    };

    const handleCloseModals = () => {
        setIsBasicModalOpen(false);
        setIsDetailModalOpen(false);
        setIsAddMemberModalOpen(false);
        setIsRemoveModalOpen(false);
        setSelectedMember(null);
        setMemberToRemove(null);
    };

    const handleSaveBasic = () => {
        const updates = {
            name: nameRef.current?.value,
            email: emailRef.current?.value,
            gender: (genderRef.current?.value ?? 'x') as 'm' | 'f' | 'x',
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

    const handleCreateFamily = () => {
        const familyName = familyNameRef.current?.value;
        if (!familyName) {
            alert('Zadejte název rodiny');
            return;
        }
        createFamilyMutation.mutate(familyName);
    };

    const handleAddMember = () => {
        const name = newMemberNameRef.current?.value;
        const email = newMemberEmailRef.current?.value;

        if (!name) {
            alert('Vyplňte jméno');
            return;
        }

        addMemberMutation.mutate({
            name,
            email: email || "", // Send empty string if no email provided
            gender: "x", // Default gender, can be updated later
            role: newMemberRole
        });
    };

    const handleAddChild = () => {
        setNewMemberRole("child");
        setIsAddMemberModalOpen(true);
    };

    const handleAddAdult = () => {
        setNewMemberRole("adult");
        setIsAddMemberModalOpen(true);
    };

    if (isLoading) return <p>Načítání dat rodiny...</p>;
    if (error) return <p>Chyba při načítání dat rodiny: {error.toString()}</p>;

    // No family scenario
    if (!data?.family) {
        return (
            <Container>
                <WelcomeSection>
                    <h1>🏠 Vítejte v Planero!</h1>
                    <ExplanationText>
                        Do své rodiny můžeš přidat libovolné členy, kteří nemusí mít účet.
                        Pokud se však přihlásí se zadaným e-mailem, budou automaticky do rodiny přidáni.
                    </ExplanationText>
                </WelcomeSection>

                <CreateFamilySection>
                    <h2>Vytvořte svou rodinu</h2>
                    <FormGroup>
                        <Label>Název rodiny:</Label>
                        <Input
                            ref={familyNameRef}
                            type="text"
                            placeholder="např. Rodina Nováková"
                            required
                        />
                    </FormGroup>
                    <ButtonsContainer>
                        <Button
                            onClick={handleCreateFamily}
                            disabled={createFamilyMutation.isPending}
                        >
                            {createFamilyMutation.isPending ? 'Vytváření...' : 'Vytvořit rodinu'}
                        </Button>
                    </ButtonsContainer>
                </CreateFamilySection>
            </Container>
        );
    }

    return (
        <Container>
            <FamilyHeader>
                <h1>{data.family.name}</h1>
                <ButtonsContainer>
                    <Button onClick={handleAddChild}>
                        👶 Přidej dítě
                    </Button>
                    <Button onClick={handleAddAdult}>
                        👨‍👩‍👧‍👦 Přidej dospělého
                    </Button>
                </ButtonsContainer>
            </FamilyHeader>

            <MembersList>
                {data.family.members?.map((member) => (
                    <MemberPanel key={member.id}>
                        <MemberContent>
                            <MemberMainInfo>
                                <MemberName>{member.name}</MemberName>
                                <MemberDetails>
                                    <DetailItem>
                                        <DetailLabel>E-mail:</DetailLabel>
                                        <DetailValue>
                                            {!member.email ? 'Nezadán' : member.email}
                                        </DetailValue>
                                    </DetailItem>
                                    <DetailItem>
                                        <DetailLabel>Role:</DetailLabel>
                                        <DetailValue>{formatRole(member.role)}</DetailValue>
                                    </DetailItem>
                                    <DetailItem>
                                        <DetailLabel>Pohlaví:</DetailLabel>
                                        <DetailValue>{formatGender(member.gender)}</DetailValue>
                                    </DetailItem>
                                    <DetailItem>
                                        <DetailLabel>Datum narození:</DetailLabel>
                                        <DetailValue>
                                            {member.bornAt ? formatDate(member.bornAt) : "-"}
                                        </DetailValue>
                                    </DetailItem>
                                </MemberDetails>
                            </MemberMainInfo>

                            <MemberActions>
                                <ActionButton
                                    variant="secondary"
                                    size="small"
                                    onClick={() => handleEditBasic(member)}
                                >
                                    Upravit údaje
                                </ActionButton>
                                <ActionButton
                                    variant="secondary"
                                    size="small"
                                    onClick={() => handleEditDetails(member)}
                                >
                                    Podrobnosti
                                </ActionButton>
                                {/* Don't show remove button for the current user */}
                                {member.id !== data?.user?.id && (
                                    <ActionButton
                                        variant="danger"
                                        size="small"
                                        onClick={() => handleRemoveMember(member)}
                                    >
                                        Odebrat
                                    </ActionButton>
                                )}
                            </MemberActions>
                        </MemberContent>
                    </MemberPanel>
                ))}
            </MembersList>

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
                            <Input
                                ref={emailRef}
                                type="email"
                                defaultValue={selectedMember?.email?.includes('@placeholder.local') ? '' : selectedMember?.email || ''}
                                placeholder="Volitelné - pro automatické přiřazení účtu"
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Pohlaví:</Label>
                            <Select ref={genderRef} defaultValue={selectedMember?.gender}>
                                <option value="m">Muž</option>
                                <option value="f">Žena</option>
                                <option value="x">Jiné</option>
                            </Select>
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
                        <Button variant="secondary" onClick={handleCloseModals}>Zrušit</Button>
                        <Button
                            variant="primary"
                            onClick={handleSaveBasic}
                            disabled={updateBasicMutation.isPending}
                        >
                            {updateBasicMutation.isPending ? 'Ukládání...' : 'Uložit'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Detailed Info Modal */}
            <Modal isOpen={isDetailModalOpen}>
                <ModalContent isScrollable isWide>
                    <ModalHeader>
                        <h2>Upravit podrobnosti - {selectedMember?.name}</h2>
                        <CloseButton onClick={handleCloseModals}>×</CloseButton>
                    </ModalHeader>

                    <OverallExplanation>
                        Tyto informace jsou nepovinné, ale mohou vylepšit výstupy z AI přidáním dodatečného kontextu
                    </OverallExplanation>

                    <form>
                        <FieldContainer>
                            <FieldLeft>
                                <Label>Zájmy a koníčky:</Label>
                                <TextArea
                                    ref={interestsRef}
                                    defaultValue={selectedMember?.interests || ''}
                                />
                            </FieldLeft>
                            <FieldRight>
                                <FieldDescription>
                                    Popište aktivity, které tato osoba ráda dělá ve volném čase.
                                </FieldDescription>
                                <FieldExample>
                                    Například: čtení knih, vaření, fotbal, malování, zahradničení, hudba
                                </FieldExample>
                            </FieldRight>
                        </FieldContainer>

                        <FieldContainer>
                            <FieldLeft>
                                <Label>Jídlo a preference:</Label>
                                <TextArea
                                    ref={foodRef}
                                    defaultValue={selectedMember?.food || ''}
                                />
                            </FieldLeft>
                            <FieldRight>
                                <FieldDescription>
                                    Uveďte oblíbená jídla, alergie nebo speciální dietní požadavky.
                                </FieldDescription>
                                <FieldExample>
                                    Například: vegetarián, alergie na ořechy, miluje italskou kuchyni, nesnáší ryby
                                </FieldExample>
                            </FieldRight>
                        </FieldContainer>

                        <FieldContainer>
                            <FieldLeft>
                                <Label>Osobnost:</Label>
                                <TextArea
                                    ref={personalityRef}
                                    defaultValue={selectedMember?.personality || ''}
                                />
                            </FieldLeft>
                            <FieldRight>
                                <FieldDescription>
                                    Popište povahové rysy a charakteristiky této osoby.
                                </FieldDescription>
                                <FieldExample>
                                    Například: extrovert, kreativní, organizovaný, klidný, energický, citlivý
                                </FieldExample>
                            </FieldRight>
                        </FieldContainer>

                        <FieldContainer>
                            <FieldLeft>
                                <Label>Kultura a pozadí:</Label>
                                <TextArea
                                    ref={cultureRef}
                                    defaultValue={selectedMember?.culture || ''}
                                />
                            </FieldLeft>
                            <FieldRight>
                                <FieldDescription>
                                    Uveďte kulturní pozadí, tradice nebo hodnoty, které jsou pro tuto osobu důležité.
                                </FieldDescription>
                                <FieldExample>
                                    Například: české tradice, křesťanské hodnoty, láska k přírodě, rodinné tradice
                                </FieldExample>
                            </FieldRight>
                        </FieldContainer>

                        <FieldContainer>
                            <FieldLeft>
                                <Label>Fyzický popis:</Label>
                                <TextArea
                                    ref={bodyRef}
                                    defaultValue={selectedMember?.body || ''}
                                />
                            </FieldLeft>
                            <FieldRight>
                                <FieldDescription>
                                    Popište fyzické charakteristiky nebo zdravotní informace relevantní pro plánování.
                                </FieldDescription>
                                <FieldExample>
                                    Například: vysoký, nosí brýle, problémy se zády, aktivní sportovec, omezená mobilita
                                </FieldExample>
                            </FieldRight>
                        </FieldContainer>

                        <FieldContainer>
                            <FieldLeft>
                                <Label>Poznámky:</Label>
                                <TextArea
                                    ref={noteRef}
                                    defaultValue={selectedMember?.note || ''}
                                />
                            </FieldLeft>
                            <FieldRight>
                                <FieldDescription>
                                    Jakékoliv další informace, které by mohly být užitečné pro plánování aktivit.
                                </FieldDescription>
                                <FieldExample>
                                    Například: pracuje na směny, má strach z výšek, miluje překvapení, preferuje klidné
                                    prostředí
                                </FieldExample>
                            </FieldRight>
                        </FieldContainer>
                    </form>

                    <ModalFooter>
                        <Button variant="secondary" onClick={handleCloseModals}>Zrušit</Button>
                        <Button
                            variant="primary"
                            onClick={handleSaveExtended}
                            disabled={updateExtendedMutation.isPending}
                        >
                            {updateExtendedMutation.isPending ? 'Ukládání...' : 'Uložit'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Add Member Modal */}
            <Modal isOpen={isAddMemberModalOpen}>
                <ModalContent>
                    <ModalHeader>
                        <h2>Přidat {newMemberRole === "child" ? "dítě" : "dospělého"}</h2>
                        <CloseButton onClick={handleCloseModals}>×</CloseButton>
                    </ModalHeader>

                    <form>
                        <FormGroup>
                            <Label>Jméno: *</Label>
                            <Input ref={newMemberNameRef} type="text" required placeholder="Zadejte jméno"/>
                        </FormGroup>

                        <FormGroup>
                            <Label>E-mail:</Label>
                            <Input
                                ref={newMemberEmailRef}
                                type="email"
                                placeholder="Volitelné - pro automatické přiřazení účtu"
                            />
                        </FormGroup>

                        <InfoText>
                            Další údaje (pohlaví, datum narození, podrobnosti) můžete doplnit později pomocí tlačítka
                            "Upravit údaje".
                        </InfoText>
                    </form>

                    <ModalFooter>
                        <Button variant="secondary" onClick={handleCloseModals}>Zrušit</Button>
                        <Button
                            variant="primary"
                            onClick={handleAddMember}
                            disabled={addMemberMutation.isPending}
                        >
                            {addMemberMutation.isPending ? 'Přidávání...' : `Přidat ${newMemberRole === "child" ? "dítě" : "dospělého"}`}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Remove Member Confirmation Modal */}
            <Modal isOpen={isRemoveModalOpen}>
                <ModalContent>
                    <ModalHeader>
                        <h2>Odebrat člena rodiny</h2>
                        <CloseButton onClick={handleCloseModals}>×</CloseButton>
                    </ModalHeader>

                    <ConfirmationText>
                        Opravdu chcete odebrat <strong>{memberToRemove?.name}</strong> z rodiny?
                        <br/>
                        <br/>
                        Tato akce je nevratná. Člen bude odebrán z rodiny, ale jeho uživatelský účet zůstane zachován.
                    </ConfirmationText>

                    <ModalFooter>
                        <Button variant="secondary" onClick={handleCloseModals}>Zrušit</Button>
                        <Button
                            variant="danger"
                            onClick={handleConfirmRemove}
                            disabled={removeMemberMutation.isPending}
                        >
                            {removeMemberMutation.isPending ? 'Odebírání...' : 'Odebrat člena'}
                        </Button>
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

const MembersList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const MemberPanel = styled.div`
    border: 1px solid ${props => props.theme.palette.border.default};
    border-radius: 0.75rem;
    background: ${props => props.theme.palette.background.default};
    transition: all 0.2s ease;

    &:hover {
        border-color: ${props => props.theme.palette.primary.bg};
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
`;

const MemberContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    gap: 2rem;
`;

const MemberMainInfo = styled.div`
    flex: 1;
    min-width: 0; /* Allow content to shrink */
`;

const MemberName = styled.h3`
    margin: 0 0 1rem 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: ${props => props.theme.palette.common.fg};
`;

const MemberDetails = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.75rem;
`;

const DetailItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;

const DetailLabel = styled.span`
    font-size: 0.875rem;
    font-weight: 500;
    color: ${props => props.theme.palette.common.fg};
    opacity: 0.7;
`;

const DetailValue = styled.span`
    font-size: 0.95rem;
    color: ${props => props.theme.palette.common.fg};
`;

const MemberActions = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex-shrink: 0;
`;

const ActionButton = styled(Button)`
    min-width: 120px;
    white-space: nowrap;
`;

const ButtonsContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
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

const ModalContent = styled.div<{ isScrollable?: boolean; isWide?: boolean }>`
    background: white;
    padding: 24px;
    max-width: ${props => props.isWide ? '900px' : '600px'};
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



const ConfirmationText = styled.div`
    margin: 20px 0;
    line-height: 1.6;
    color: #333;
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

const WelcomeSection = styled.div`
    text-align: center;
    margin-bottom: 2rem;
    padding: 2rem;
    background: ${props => props.theme.palette.background.alt};
    border-radius: 1rem;
`;

const ExplanationText = styled.p`
    font-size: 1.1rem;
    line-height: 1.6;
    color: ${props => props.theme.palette.common.fg};
    margin: 1rem 0;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
`;

const CreateFamilySection = styled.div`
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    border: 1px solid ${props => props.theme.palette.border.default};
    border-radius: 1rem;
    background: white;
`;

const FamilyHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`;

const Select = styled.select`
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    background: white;
`;

const InfoText = styled.div`
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 4px;
    padding: 12px;
    margin: 16px 0;
    font-size: 14px;
    color: #6c757d;
    line-height: 1.4;
`;

const OverallExplanation = styled.div`
    background: ${props => props.theme.palette.background.alt};
    border: 1px solid ${props => props.theme.palette.border.default};
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 24px;
    font-size: 14px;
    color: ${props => props.theme.palette.common.fg};
    line-height: 1.5;
    text-align: center;
`;

const FieldContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 20px;
    align-items: start;
`;

const FieldLeft = styled.div`
    display: flex;
    flex-direction: column;
`;

const FieldRight = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 24px; /* Align with input field */
`;

const FieldDescription = styled.div`
    font-size: 14px;
    color: ${props => props.theme.palette.common.fg};
    line-height: 1.4;
    margin-bottom: 8px;
`;

const FieldExample = styled.div`
    font-size: 13px;
    color: ${props => props.theme.palette.common.fg};
    opacity: 0.6;
    font-style: italic;
    line-height: 1.3;
`;