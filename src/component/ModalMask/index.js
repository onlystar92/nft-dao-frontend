import React from "react";
import styled from "styled-components";

const ModalMask = ({ onClose }) => {
  return (
    <ModalMaskWrapper onClick={e => onClose()} />
  )
}

export default ModalMask;

const ModalMaskWrapper = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  max-width: 100%;
  min-height: 100vh;
  background: #000;
  opacity: 0.9;
  z-index: 100;
`;