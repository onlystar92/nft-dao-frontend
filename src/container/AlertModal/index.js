import React from "react";
import styled from "styled-components";

const AlertModal = ({ children, title, onClose }) => {
  return (
    <AlertModalContainer onClick={(e) => onClose()} >
      <div className="confirm-modal-content">
        <h2 className="confirm-modal-title">{title}</h2>
        <div className="confirm-modal-description">{children}</div>
        <div className="confirm-modal-buttons">
          <div role="button" className="confirm-modal-button" onClick={(e) => onClose()}>Close</div>
        </div>
      </div>
    </AlertModalContainer>
  );
};

export default AlertModal;

const AlertModalContainer = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  background: transparent;
  z-index: 200;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .confirm-modal-content {
    border-top: 2px solid #e48bed;
    border-bottom: 2px solid #e48bed;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Orbitron-Black;
    font-size: 1.5rem;
    padding: 30px 0px;
  }

  .confirm-modal-title {
    color: #fec100;
    text-align: center;
  }

  .confirm-modal-description {
    color: #ff24c8;
    margin-top: 8px;
    width: 70%;

    @media screen and (max-width: 425px) {
      width: 90%;
    }
  }

  .confirm-modal-buttons {
    display: flex;
    flex-direction: row;
    margin-top: 15px;

    .confirm-modal-button {
      background-image: url("/static/images/bg/pages/stake/button.png");
      background-size: 100% 100%;
      color: #161617;
      cursor: pointer;
      width: 210px;
      height: 32px;
      font-size: 1.2rem;
      display: flex;
      justify-content: center;
      padding-top: 5px;

      &:hover {
        background-image: url("/static/images/bg/pages/stake/button--active.png");
        color: #fec100;
      }
    }
  }
`;
