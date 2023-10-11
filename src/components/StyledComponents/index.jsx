import { styled } from "styled-components";

export const MenuStyled = styled.ul`
    li {
        a.active {
            color: #fcb914 !important
        }
    }
`



export const ModalFadeContainer = styled.div`
  display: ${(props) =>(props?.isShow ? "block" : "none")}
`