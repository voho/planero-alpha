import {SignedOut, SignInButton, SignedIn, UserButton, useClerk, SignOutButton} from '@clerk/clerk-react';
import styled from "styled-components";
import {apiClient} from "../globals";
import {useQuery} from "@tanstack/react-query";
import {useFormatter} from "../hooks/useFormatter";
import {Button} from "../components/Button";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export const LoginStatus = () => {
    const {formatRole} = useFormatter()
    const {isSignedIn} = useClerk()
    const navigate = useNavigate()

    const {data} = useQuery({
        queryKey: ["api.users.current"],
        queryFn: async () => {
            const res = await apiClient.api.users.current.$get()
            return await res.json()
        },
        retry: false,
        enabled: isSignedIn
    });

    useEffect(() => {
        if (isSignedIn && !data?.family) {
            navigate('/setup')
        }
    }, [isSignedIn, data?.family, navigate])

    return (
        <>
            <SignedOut>
                <SignInButton mode={"modal"} withSignUp={true}>
                    <CustomSignInButton>👋🏻 Přihlásit se</CustomSignInButton>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <FamilyInfo>
                    <FamilySubInfo>
                        <UserButton/>
                        {data?.user && <span>{data?.user.name}</span>}
                    </FamilySubInfo>
                    <FamilySubInfo>
                        {data?.family && <FamilyName>{data.family.name}</FamilyName>}
                        {data?.role && <FamilyRole>{formatRole(data.role ?? '')}</FamilyRole>}
                        <SignOutButton>
                            <CustomSignOutButton>🔒 Odhlásit se</CustomSignOutButton>
                        </SignOutButton>
                    </FamilySubInfo>
                </FamilyInfo>
            </SignedIn>
        </>
    )
}

const CustomSignInButton = styled(Button)`
    font-size: 150%;
`

const CustomSignOutButton = styled(Button)`
    font-size: 0.8rem;
    padding: 0.25rem 0.5rem;
`

const FamilyInfo = styled.div`
    display: flex;
    flex-direction: row;
    gap: 3rem;
    align-items: center;
    place-content: center;
`;

const FamilySubInfo = styled.div`
    border: 2px solid ${props => props.theme.palette.menu.bg};
    border-radius: 0.5rem;
    background: radial-gradient(#ffffff50, transparent);
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.5rem 1rem;
    align-items: center;
    place-content: center;
`;

const FamilyName = styled.span`
    font-size: 0.8rem;
    font-weight: 600;
    color: ${props => props.theme.palette.header.fg};
`;

const FamilyRole = styled.span`
    font-size: 0.8rem;
    color: ${props => props.theme.palette.header.fg};
    opacity: 0.85;
`;