import styled from "styled-components";
import {SignedIn, SignedOut} from "@clerk/clerk-react";
import {apiClient} from "../../globals";
import {useQuery} from "@tanstack/react-query";

export const HomePage = () => {
    const {data: tipData, isLoading: isTipLoading} = useQuery({
        queryKey: ["family-tip"],
        queryFn: async () => {
            const res = await apiClient.api.ai.tip.$get()
            return await res.json()
        },
    })

    return (
        <main>
            <SignedIn>
                <WelcomeSection>
                    <TipSection>
                        <TipTitle>💡 Tip dne pro vaši rodinu</TipTitle>
                        {isTipLoading ? (
                            <LoadingText>Počkejte... vymýšlím fakt dobrý tip!</LoadingText>
                        ) : (
                            <TipContent>{tipData?.tip}</TipContent>
                        )}
                    </TipSection>
                </WelcomeSection>
            </SignedIn>
            <SignedOut>
            <h1>Co takhle si trochu zjednodušit život?</h1>
            <FeatureList>
                <Feature><FeatureTitle>📅 Společný rodinný kalendář</FeatureTitle><FeatureDesc>Už nikdy nezapomeňte na
                    keramiku své dcery, společné výročí nebo narozeniny tetičky z Liberce</FeatureDesc></Feature>
                <Feature><FeatureTitle>💡 Chytrá doporučení</FeatureTitle><FeatureDesc>Chytrá AI vám doporučí jídelníček,
                    dárek k svátku nebo výlet - na míru!</FeatureDesc></Feature>
                <Feature><FeatureTitle>📄 Společné dokumenty</FeatureTitle><FeatureDesc>Už nehledejte heslo k
                    Wifi</FeatureDesc></Feature>
            </FeatureList>
            </SignedOut>
            <HeroImage src="/family.png" alt="Family"/>
        </main>
    )
}


const FeatureList = styled.div`

`

const Feature = styled.div`
    padding-top: 1rem;
    padding-bottom: 1rem;
`

const FeatureTitle = styled.div`
    font-size: 2em;
    font-weight: bold;
`

const FeatureDesc = styled.div`
    font-weight: bold;
`

const HeroImage = styled.img`
    max-width: 80%;
    display: block;
    margin: 0 auto 1rem auto;
    border-radius: 1em;
`

const WelcomeSection = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const TipSection = styled.div`
    background-color: #f8f9fa;
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const TipTitle = styled.h2`
    margin-top: 0;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.palette.primary.bg};
`

const TipContent = styled.p`
    font-size: 1.2rem;
    margin: 0;
`

const LoadingText = styled.p`
    font-style: italic;
    color: #6c757d;
`