import './main.css';
import {createGlobalStyle} from 'styled-components'
import {Layout} from "./layout/Layout";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {SetupPage} from "./pages/setup/SetupPage";
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
                        <Route path="setup" element={<SetupPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}