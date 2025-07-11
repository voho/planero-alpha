import {SignedOut, SignInButton, SignedIn, UserButton} from '@clerk/clerk-react';
import styled from "styled-components";

export const LoginStatus = () => {
    return (
        <>
            <SignedOut>
                <Title>Hi!</Title>
                <SubTitle>Welcome to Planero<br/>Family life, the easy way</SubTitle>
                <Centered>
                    <SignInButton mode={"modal"} withSignUp={true}>
                        <CustomSignInButton>Sign in</CustomSignInButton>
                    </SignInButton>
                </Centered>
            </SignedOut>
            <SignedIn>
                <UserButton/>
            </SignedIn>
        </>
    )
}

const Title = styled.h1`
    font-size: 3rem;
    text-align: center;
    margin: 0;
    padding: 1em 0;
`;

const SubTitle = styled.h2`
    font-size: 2rem;
    text-align: center;
    margin: 0;
    padding: 1em 0;
`;

const CustomSignInButton = styled.button`
    font-size: 2rem;
    margin: 1em 0;
    padding: 1ex 1em;
    border-radius: 1em;
    background: ${props => props.theme.palette.primary.bg};
    color: ${props => props.theme.palette.primary.fg};
    border: 0;
    box-shadow: ${props => props.theme.palette.common.fg} 1ex 1ex 1em;
`

const Centered = styled.div`
    text-align: center
`