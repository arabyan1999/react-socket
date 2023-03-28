import React from "react";
import { ModalBackground, Modal, StyledCloseButton } from "./styles";

const Join = (props) => {
    const {
        closeModal,
        userName,
        handleNameChange,
        isSubmitDone,
        joinChat,
    } = props;
    return (
        <ModalBackground>
            <Modal>
                <StyledCloseButton onClick={closeModal}>x</StyledCloseButton>
                <input
                    placeholder="Insert your name"
                    value={userName}
                    onChange={handleNameChange}
                />
                {
                    isSubmitDone && userName.length === 0 &&
                     (<p>Name is required</p>)
                }
                <button onClick={joinChat}>
                    Join
                </button>
            </Modal>
        </ModalBackground>
    )
}

export default Join