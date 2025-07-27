import styled from "styled-components";
import {SignedIn, SignedOut} from "@clerk/clerk-react";
import {apiClient} from "../../globals";
import {useQuery} from "@tanstack/react-query";
import {FlexCol} from "../../layout/FlexCol";
import {QuickActions} from "./QuickActions";

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
                <HomeContainer>
                    <TipSection>
                        {isTipLoading ? (
                            <FlexCol>
                                <p>Počkejte... vymýšlím fakt dobrý tip!</p>
                                <HeroImage src="/waiting.png" alt="Waiting"/>
                            </FlexCol>
                        ) : (
                            <FlexCol>
                                <p>{tipData?.tipContent}</p>
                                <HeroImage src="/nice.png" alt="Nice!"/>
                            </FlexCol>
                        )}
                    </TipSection>
                    
                    <QuickActions />
                </HomeContainer>
            </SignedIn>
            <SignedOut>
                <h1>Co takhle si trochu zjednodušit život?</h1>
                <FeatureList>
                    <Feature>
                        <FeatureTitle>📅 Společný rodinný kalendář</FeatureTitle>
                        <FeatureDesc>Už nikdy nezapomeňte na keramiku své dcery, společné výročí nebo narozeniny tetičky
                            z Liberce</FeatureDesc>
                    </Feature>
                    <Feature>
                        <FeatureTitle>💡 Chytrá doporučení</FeatureTitle>
                        <FeatureDesc>Chytrá AI vám doporučí
                            jídelníček,
                            dárek k svátku nebo výlet - na míru!</FeatureDesc>
                    </Feature>
                    <Feature>
                        <FeatureTitle>📄 Společné dokumenty</FeatureTitle>
                        <FeatureDesc>Už nehledejte heslo k
                            Wifi</FeatureDesc>
                    </Feature>
                </FeatureList>
                <HeroImage src="/family.png" alt="Family"/>
            </SignedOut>
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
    margin: 0 auto;
    border-radius: 1em;
`

const HomeContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
`

const TipSection = styled.div`
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #e0e0e0;
`
