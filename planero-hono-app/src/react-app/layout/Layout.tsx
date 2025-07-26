import {LoginStatus} from "../user/LoginStatus";
import {Link, Outlet} from "react-router-dom";
import {Protect} from "@clerk/clerk-react";
import {FlexRow} from "./FlexRow";
import styled from "styled-components";

export const Layout = () => {
    return (
        <div>
            <Header>
                <FlexRow>
                    <h1>Planero</h1>
                    <LoginStatus/>
                </FlexRow>
            </Header>
            <div>
                <Protect>
                    <Menu>
                        <MenuItem><Link to={"/"}>Domů</Link></MenuItem>
                        <MenuItem><Link to={"calendar"}>Kalendář</Link></MenuItem>
                        <MenuItem><Link to={"food"}>Jídelníček</Link></MenuItem>
                        <MenuItem><Link to={"notes"}>Poznámky</Link></MenuItem>
                        <MenuItem><Link to={"setup"}>Nastavení</Link></MenuItem>
                    </Menu>
                </Protect>
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
`

const Wrapper = styled.div`
    background: ${props => props.theme.palette.paper.bg};
    color: ${props => props.theme.palette.paper.fg};
    padding: ${props => props.theme.spacing(3)};
`

const Menu = styled.ul`
    background-color: ${props => props.theme.palette.primary.bg};
    display: flex;
    flex-direction: row;
    gap: 1rem;
    vertical-align: center;
    margin: 0;
    padding: 0 1em;
`

const MenuItem = styled.li`
    display: inline-block;
    
    a {
        color: ${props => props.theme.palette.primary.fg};
        display: inline-block;
        font-weight: bold;
        text-decoration: none;
        margin: 0.25em;
        padding: 0.5rem 1rem;
    }

    &:hover {
        background: ${props => props.theme.palette.header.fg};
        
        a {
                color: ${props => props.theme.palette.header.bg};
        }
    }
`