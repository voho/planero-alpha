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
                <main>
                    <Outlet/>
                </main>
                <nav>
                    <ul>
                        <Protect>
                            <li><Link to={"calendar"}>Calendar</Link></li>
                            <li><Link to={"setup/family"}>Family Setup</Link></li>
                        </Protect>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

const Header = styled.header`
    background: ${props => props.theme.palette.header.bg};
`