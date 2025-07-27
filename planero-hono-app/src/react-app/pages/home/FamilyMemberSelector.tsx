import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useQuery} from '@tanstack/react-query';
import {apiClient} from '../../globals';

type FamilyMember = {
    id: string;
    name: string;
    gender: string;
    bornAt: string;
};

type Props = {
    onSelectionChange: (selectedIds: string[]) => void;
    onClose: () => void;
    operationTitle: string;
};

export const FamilyMemberSelector = ({onSelectionChange, onClose, operationTitle}: Props) => {
    const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);

    const {data: familyData, isLoading} = useQuery({
        queryKey: ['current-family'],
        queryFn: async () => {
            const res = await apiClient.api.families.current.$get();
            return await res.json();
        },
    });

    // Při načtení dat automaticky vybereme všechny členy
    useEffect(() => {
        if (familyData?.members && selectedMemberIds.length === 0) {
            const allIds = familyData.members.map((member: FamilyMember) => member.id);
            setSelectedMemberIds(allIds);
        }
    }, [familyData, selectedMemberIds.length]);

    const handleMemberToggle = (memberId: string) => {
        setSelectedMemberIds(prev => {
            if (prev.includes(memberId)) {
                return prev.filter(id => id !== memberId);
            } else {
                return [...prev, memberId];
            }
        });
    };

    const handleSelectAll = () => {
        if (familyData?.members) {
            const allIds = familyData.members.map((member: FamilyMember) => member.id);
            setSelectedMemberIds(allIds);
        }
    };

    const handleSelectNone = () => {
        setSelectedMemberIds([]);
    };

    const handleConfirm = () => {
        onSelectionChange(selectedMemberIds);
        onClose();
    };

    if (isLoading) {
        return (
            <Overlay>
                <Modal>
                    <ModalHeader>
                        <ModalTitle>Načítám členy rodiny...</ModalTitle>
                    </ModalHeader>
                </Modal>
            </Overlay>
        );
    }

    return (
        <Overlay>
            <Modal>
                <ModalHeader>
                    <ModalTitle>Spustit pro:</ModalTitle>
                    <CloseButton onClick={onClose}>✕</CloseButton>
                </ModalHeader>
                
                <OperationTitle>{operationTitle}</OperationTitle>
                
                <SelectionControls>
                    <ControlButton onClick={handleSelectAll}>
                        Vybrat všechny
                    </ControlButton>
                    <ControlButton onClick={handleSelectNone}>
                        Zrušit výběr
                    </ControlButton>
                </SelectionControls>

                <MembersList>
                    {familyData?.members?.map((member: FamilyMember) => (
                        <MemberItem key={member.id}>
                            <MemberCheckbox
                                type="checkbox"
                                id={`member-${member.id}`}
                                checked={selectedMemberIds.includes(member.id)}
                                onChange={() => handleMemberToggle(member.id)}
                            />
                            <MemberLabel htmlFor={`member-${member.id}`}>
                                <MemberName>{member.name}</MemberName>
                                <MemberDetails>
                                    {member.gender === 'male' ? '👨' : '👩'} • 
                                    {new Date().getFullYear() - new Date(member.bornAt).getFullYear()} let
                                </MemberDetails>
                            </MemberLabel>
                        </MemberItem>
                    ))}
                </MembersList>

                <ModalFooter>
                    <CancelButton onClick={onClose}>
                        Zrušit
                    </CancelButton>
                    <ConfirmButton 
                        onClick={handleConfirm}
                        disabled={selectedMemberIds.length === 0}
                    >
                        Spustit pro {selectedMemberIds.length} 
                        {selectedMemberIds.length === 1 ? ' osobu' : 
                         selectedMemberIds.length < 5 ? ' osoby' : ' osob'}
                    </ConfirmButton>
                </ModalFooter>
            </Modal>
        </Overlay>
    );
};

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
`;

const Modal = styled.div`
    background: white;
    border-radius: 12px;
    padding: 0;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #e0e0e0;
`;

const ModalTitle = styled.h2`
    margin: 0;
    color: #333;
    font-size: 1.3rem;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
    padding: 0.25rem;
    
    &:hover {
        color: #333;
    }
`;

const OperationTitle = styled.div`
    padding: 1rem 1.5rem;
    background: #f8f9fa;
    color: #666;
    font-weight: 500;
    border-bottom: 1px solid #e0e0e0;
`;

const SelectionControls = styled.div`
    display: flex;
    gap: 0.5rem;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e0e0e0;
`;

const ControlButton = styled.button`
    background: #f8f9fa;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 0.9rem;
    color: #666;
    
    &:hover {
        background: #e9ecef;
        color: #333;
    }
`;

const MembersList = styled.div`
    max-height: 300px;
    overflow-y: auto;
    padding: 1rem 0;
`;

const MemberItem = styled.div`
    display: flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    
    &:hover {
        background: #f8f9fa;
    }
`;

const MemberCheckbox = styled.input`
    margin-right: 1rem;
    width: 18px;
    height: 18px;
    cursor: pointer;
`;

const MemberLabel = styled.label`
    flex: 1;
    cursor: pointer;
    display: flex;
    flex-direction: column;
`;

const MemberName = styled.div`
    font-weight: 500;
    color: #333;
    margin-bottom: 0.25rem;
`;

const MemberDetails = styled.div`
    font-size: 0.85rem;
    color: #666;
`;

const ModalFooter = styled.div`
    display: flex;
    gap: 1rem;
    padding: 1.5rem;
    border-top: 1px solid #e0e0e0;
    justify-content: flex-end;
`;

const CancelButton = styled.button`
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    color: #666;
    
    &:hover {
        background: #f8f9fa;
        color: #333;
    }
`;

const ConfirmButton = styled.button`
    background: #007bff;
    border: none;
    border-radius: 6px;
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    color: white;
    font-weight: 500;
    
    &:hover:not(:disabled) {
        background: #0056b3;
    }
    
    &:disabled {
        background: #ccc;
        cursor: not-allowed;
    }
`;
