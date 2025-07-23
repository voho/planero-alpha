import styled from "styled-components";
import {PropsWithChildren} from "react";

export const FlexCol = ({children}: PropsWithChildren) => {
    return <FlexColStyled>{children}</FlexColStyled>
}

const FlexColStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
    align-items: center;
    place-content: center;
`