import { LoginStatus } from './user/LoginStatus';
import './main.css';

import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
      background-color: ${props => props.theme.palette.common.bg};
      color: ${props => props.theme.palette.common.fg};
      padding: ${props => props.theme.spacing(2)}
  }
`

export const App = () =>{
  return (
      <>
          <GlobalStyle />
      <LoginStatus />
      </>
  )
}