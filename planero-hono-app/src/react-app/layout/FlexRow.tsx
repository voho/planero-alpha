import styled from "styled-components";
import {PropsWithChildren} from "react";

export const FlexRow = ({ children }: PropsWithChildren) => {
    return <FlexRowStyled>{children}</FlexRowStyled>
}

const FlexRowStyled = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1em;
    align-items: center;
    place-content: center;
`