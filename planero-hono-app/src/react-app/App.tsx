import './main.css';
import {createGlobalStyle} from 'styled-components'
import {Layout} from "./layout/Layout";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {CalendarPage} from "./pages/calendar/CalendarPage";
import {GroupPage} from "./pages/setup/GroupPage";
import {HomePage} from "./pages/home/HomePage";

const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${props => props.theme.palette.common.bg};
        color: ${props => props.theme.palette.common.fg};
    }
`

export const App = () => {
    return (
        <>
            <GlobalStyle/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<HomePage/>}/>
                        <Route path="calendar" element={<CalendarPage/>}/>
                        <Route path="setup/group" element={<GroupPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}