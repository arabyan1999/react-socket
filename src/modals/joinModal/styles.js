import styled from "styled-components";

export const ModalBackground = styled.div`
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100vh;
    display: flex;
    top: 0;
    justify-content: center;
    align-items: center;
    position: absolute;
`

export const Modal = styled.div`
    width: max-content;
    padding: 50px 80px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    position: relative;
`

export const StyledCloseButton = styled.button`
    background: transparent;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
`
