import React from 'react';
import PrimaryCTAButton from "../PrimaryCTAButton/PrimaryCTAButton";
import styled from 'styled-components'
import { useGHStContext } from '../../utils/ContextProvider';

const ButtonWrapper = styled.div`
  color: white;
  font-size: 14px;
  .sub_btn {
    border:1px solid #EEE; 
    background:white;
  }
`

const SubscribeButton = props => {

  const {setModalOpen} = useGHStContext();
  const mailchimpModalHandler = () => {
    setModalOpen(true);
  }

  return (
    <ButtonWrapper>
     <div>
        <iframe src="https://dropsdao.substack.com/embed" width="480" height="320" className="sub_btn" frameBorder="0" scrolling="no"></iframe>
     </div>
    </ButtonWrapper>
  );
}

export default SubscribeButton;