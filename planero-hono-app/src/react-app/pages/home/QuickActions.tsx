import React, {useState} from 'react';
import styled from 'styled-components';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {apiClient} from '../../globals';
import {FlexCol} from '../../layout/FlexCol';
import {FamilyMemberSelector} from './FamilyMemberSelector';

type SmartOperation = {
    id: string;
    title: string;
    description: string;
};

type SmartOperationResult = {
    operation: string;
    title: string;
    result: string;
    selectedMembers: {id: string; name: string}[];
};

export const QuickActions = () => {
    const [selectedOperation, setSelectedOperation] = useState<string | null>(null);
    const [operationResult, setOperationResult] = useState<SmartOperationResult | null>(null);
    const [showMemberSelector, setShowMemberSelector] = useState<string | null>(null);
    const queryClient = useQueryClient();

    const {data: operationsData, isLoading: isLoadingOperations} = useQuery({
        queryKey: ['smart-operations'],
        queryFn: async () => {
            const res = await apiClient.api.ai['smart-operations'].$get();
            return await res.json();
        },
    });

    const executeOperationMutation = useMutation({
        mutationFn: async ({operationId, selectedMemberIds}: {operationId: string; selectedMemberIds: string[]}) => {
            const res = await apiClient.api.ai['smart-operations'][operationId].$post({
                json: { selectedMemberIds }
            });
            return await res.json();
        },
        onSuccess: (data) => {
            setOperationResult(data as SmartOperationResult);
            setSelectedOperation(null);
        },
        onError: (error) => {
            console.error('Error executing operation:', error);
            setSelectedOperation(null);
        }
    });

    const handleOperationClick = (operationId: string) => {
        setShowMemberSelector(operationId);
        setOperationResult(null);
    };
    
    const handleMemberSelectionConfirm = (selectedMemberIds: string[]) => {
        if (showMemberSelector) {
            setSelectedOperation(showMemberSelector);
            setShowMemberSelector(null);
            executeOperationMutation.mutate({
                operationId: showMemberSelector,
                selectedMemberIds
            });
        }
    };
    
    const handleMemberSelectorClose = () => {
        setShowMemberSelector(null);
    };

    const handleCloseResult = () => {
        setOperationResult(null);
    };

    if (isLoadingOperations) {
        return (
            <QuickActionsContainer>
                <SectionTitle>🚀 Rychlé akce</SectionTitle>
                <LoadingText>Načítám akce...</LoadingText>
            </QuickActionsContainer>
        );
    }

    return (
        <QuickActionsContainer>
            <SectionTitle>🚀 Rychlé akce</SectionTitle>
            
            {showMemberSelector && (
                <FamilyMemberSelector
                    operationTitle={operationsData?.operations?.find((op: SmartOperation) => op.id === showMemberSelector)?.title || ''}
                    onSelectionChange={handleMemberSelectionConfirm}
                    onClose={handleMemberSelectorClose}
                />
            )}
            
            {operationResult && (
                <ResultModal>
                    <ResultHeader>
                        <ResultTitle>{operationResult.title}</ResultTitle>
                        <CloseButton onClick={handleCloseResult}>✕</CloseButton>
                    </ResultHeader>
                    {operationResult.selectedMembers && operationResult.selectedMembers.length > 0 && (
                        <SelectedMembersInfo>
                            Pro: {operationResult.selectedMembers.map(m => m.name).join(', ')}
                        </SelectedMembersInfo>
                    )}
                    <ResultContent>{operationResult.result}</ResultContent>
                </ResultModal>
            )}

            <ActionsGrid>
                {operationsData?.operations?.map((operation: SmartOperation) => (
                    <ActionButton
                        key={operation.id}
                        onClick={() => handleOperationClick(operation.id)}
                        disabled={selectedOperation === operation.id || executeOperationMutation.isPending}
                        $isLoading={selectedOperation === operation.id}
                    >
                        {selectedOperation === operation.id ? (
                            <FlexCol>
                                <ActionTitle>⏳ Pracuji...</ActionTitle>
                                <ActionDescription>Generuji odpověď...</ActionDescription>
                            </FlexCol>
                        ) : (
                            <FlexCol>
                                <ActionTitle>{operation.title}</ActionTitle>
                                <ActionDescription>{operation.description}</ActionDescription>
                            </FlexCol>
                        )}
                    </ActionButton>
                ))}
            </ActionsGrid>
        </QuickActionsContainer>
    );
};

const QuickActionsContainer = styled.div`
    margin: 2rem 0;
`;

const SectionTitle = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #333;
`;

const LoadingText = styled.p`
    color: #666;
    font-style: italic;
`;

const ActionsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
`;

const ActionButton = styled.button<{$isLoading?: boolean}>`
    background: ${props => props.$isLoading ? '#f0f0f0' : 'white'};
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    padding: 1.5rem;
    cursor: ${props => props.$isLoading ? 'not-allowed' : 'pointer'};
    transition: all 0.2s ease;
    text-align: left;
    
    &:hover:not(:disabled) {
        border-color: #007bff;
        box-shadow: 0 4px 12px rgba(0, 123, 255, 0.15);
        transform: translateY(-2px);
    }
    
    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

const ActionTitle = styled.h3`
    font-size: 1.1rem;
    margin: 0 0 0.5rem 0;
    color: #333;
`;

const ActionDescription = styled.p`
    font-size: 0.9rem;
    color: #666;
    margin: 0;
    line-height: 1.4;
`;

const ResultModal = styled.div`
    background: white;
    border: 2px solid #007bff;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 20px rgba(0, 123, 255, 0.15);
`;

const ResultHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`;

const ResultTitle = styled.h3`
    margin: 0;
    color: #007bff;
    font-size: 1.2rem;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: #666;
    padding: 0.25rem;
    
    &:hover {
        color: #333;
    }
`;

const ResultContent = styled.div`
    color: #333;
    line-height: 1.6;
    white-space: pre-wrap;
`;

const SelectedMembersInfo = styled.div`
    background: #f8f9fa;
    padding: 0.75rem 1.5rem;
    margin: 0 -1.5rem 1rem -1.5rem;
    color: #666;
    font-size: 0.9rem;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
`;
