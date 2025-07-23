import {SignedOut, SignInButton, SignedIn, UserButton} from '@clerk/clerk-react';
import styled from "styled-components";
import {apiClient} from "../globals";
import {useQuery} from "@tanstack/react-query";
import {FlexRow} from "../layout/FlexRow";

export const LoginStatus = () => {
    const {data, isLoading} = useQuery({
        queryKey: ["current-family"],
        queryFn: async () => {
            const res = await apiClient.api.families.current.$get()
            return await res.json()
        },
    })

    return (
        <>
            <SignedOut>
                <Centered>
                    <SignInButton mode={"modal"} withSignUp={true}>
                        <CustomSignInButton>Přihlásit se</CustomSignInButton>
                    </SignInButton>
                </Centered>
            </SignedOut>
            <SignedIn>
                <FlexRow>
                    <UserButton/>
                    {isLoading && <p>loading</p>}
                    <p>{data?.name}</p>
                </FlexRow>
            </SignedIn>
        </>
    )
}

const CustomSignInButton = styled.button`
    font-size: 2rem;
    margin: 1em 0;
    padding: 1ex 1em;
    border-radius: 1ex;
    background: ${props => props.theme.palette.primary.bg};
    color: ${props => props.theme.palette.primary.fg};
    border: 0;
`

const Centered = styled.div`
    text-align: center
`