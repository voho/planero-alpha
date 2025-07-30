import styled from "styled-components";
import {SignedIn, SignedOut} from "@clerk/clerk-react";
import {FlexCol} from "../../layout/FlexCol";

export const HomePage = () => {

    return (
        <main>
            <HomeContainer>
                <SignedIn>
                    <WelcomeSection>
                        <FlexCol>
                            <h2>🏠 Vítejte doma!</h2>
                        </FlexCol>
                    </WelcomeSection>
                    <ActionsSection>
                        <HeroImage src="/nice.png" alt="Vítejte doma!"/>
                    </ActionsSection>
                </SignedIn>
                <SignedOut>
                    <h2>Váš chytrý digitální domov</h2>
                    <FeatureList>
                        <Feature>
                            <FeatureTitle>📅 Společný rodinný kalendář</FeatureTitle>
                            <FeatureDesc>Už nikdy nezapomeňte na keramiku své dcery, společné výročí nebo narozeniny
                                tetičky
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
            </HomeContainer>
        </main>
    )
}


const ActionsSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
`;

const FeatureList = styled.div`

`

const Feature = styled.div`
    padding-top: 1rem;
    padding-bottom: 1rem;
`

const FeatureTitle = styled.div`
    font-size: 120%;
    font-weight: 700;
`

const FeatureDesc = styled.div`
    font-weight: 400;
`

const HeroImage = styled.img`
    max-width: 100%;
    display: block;
    margin: 0 auto;
    border-radius: 1em;
`

const HomeContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`

const WelcomeSection = styled.div`
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #e0e0e0;
    text-align: center;

    h2 {
        margin-bottom: 0.5rem;
    }

    p {
        margin-bottom: 1.5rem;
    }
`
