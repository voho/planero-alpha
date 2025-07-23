import styled from "styled-components";
import { SignedIn } from "@clerk/clerk-react";
import { apiClient } from "../../globals";
import { useQuery } from "@tanstack/react-query";
import { FlexCol } from "../../layout/FlexCol";

export const FoodPage = () => {
    const { data: foodPlanData, isLoading } = useQuery({
        queryKey: ["weekly-food-plan"],
        queryFn: async () => {
            const res = await apiClient.api.ai.food["weekly-food-plan"].$get();
            return await res.json();
        },
    });

    return (
        <main>
            <h1>Jídelníček</h1>
            <SignedIn>
                {isLoading ? (
                    <FlexCol>
                        <p>Načítám jídelníček...</p>
                        <HeroImage src="/waiting.png" alt="Waiting" />
                    </FlexCol>
                ) : (
                    <FoodPlanContainer>
                        <p>{foodPlanData?.answer}</p>
                    </FoodPlanContainer>
                )}
            </SignedIn>
        </main>
    );
};

const FoodPlanContainer = styled.div`
    background-color: #f9f9f9;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-top: 1rem;
    white-space: pre-line;
`;

const HeroImage = styled.img`
    max-width: 80%;
    display: block;
    margin: 0 auto;
    border-radius: 1em;
`;