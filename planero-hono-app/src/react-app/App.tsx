import './main.css';
import {createGlobalStyle} from 'styled-components'
import {Layout} from "./layout/Layout";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {CalendarPage} from "./pages/calendar/CalendarPage";
import {SetupPage} from "./pages/setup/SetupPage";
import {HomePage} from "./pages/home/HomePage";
import {FoodPage} from "./pages/food/FoodPage";
import {NotesPage} from "./pages/notes/NotesPage";

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
                        <Route path="food" element={<FoodPage/>}/>
                        <Route path="notes" element={<NotesPage/>}/>
                        <Route path="setup" element={<SetupPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}