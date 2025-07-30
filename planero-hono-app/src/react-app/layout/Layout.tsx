import {LoginStatus} from "../user/LoginStatus";
import {Link, Outlet} from "react-router-dom";
import {Protect} from "@clerk/clerk-react";
import styled from "styled-components";

export const Layout = () => {
    return (
        <div>
            <Header>
                <HeaderContent>
                    <LogoSection>
                        <Logo>🧭 Planero</Logo>
                    </LogoSection>
                    <UserSection>
                        <LoginStatus/>
                    </UserSection>
                </HeaderContent>
            </Header>
            <Protect>
                <MenuContainer>
                    <Menu>
                        <MenuItem><Link to={"/"}>Domů</Link></MenuItem>
                        <MenuItem><Link to={"setup"}>Nastavení</Link></MenuItem>
                    </Menu>
                </MenuContainer>
            </Protect>
            <div>
                <main>
                    <Wrapper>
                        <Outlet/>
                    </Wrapper>
                </main>
            </div>
        </div>
    )
}

const Header = styled.header`
    background: ${props => props.theme.palette.header.bg};
    color: ${props => props.theme.palette.header.fg};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 0;
`;

const LogoSection = styled.div`
    display: flex;
    align-items: center;
`;

const Logo = styled.h1`
    margin: 0;
    font-size: 3rem;
    font-weight: 700;
`;

const UserSection = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
`;

const Wrapper = styled.div`
    padding: ${props => props.theme.spacing(3)};
`

const MenuContainer = styled.div`
    background: ${props => props.theme.palette.menu.bg};
`;

const Menu = styled.ul`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 0;
    list-style: none;
`

const MenuItem = styled.li`
    a {
        color: ${props => props.theme.palette.menu.fg};
        display: block;
        font-weight: 500;
        text-decoration: none;
        transition: all 0.2s ease;
        border-bottom: 3px solid transparent;
    }

    &:hover a {
        border-bottom-color: ${props => props.theme.palette.primary.bg};
    }
`