import React from 'react';
import PrimaryCTAButton from "../PrimaryCTAButton/PrimaryCTAButton";
import styled from 'styled-components'
import { useGHStContext } from '../../utils/ContextProvider';

const ButtonWrapper = styled.div`
  color: white;
  font-size: 14px;
`

const SubscribeButton = props => {

  const {setModalOpen} = useGHStContext();
  const mailchimpModalHandler = () => {
    setModalOpen(true);
  }

  return (
    <ButtonWrapper>
     <div>
       <p>Subscribe to the newsletter to hear about Drops Loans updates and events.</p>
       <br />
       <PrimaryCTAButton
          handleClick={mailchimpModalHandler}
          label="Subscribe"
          icon={null}
        />
     </div>
    </ButtonWrapper>
  );
}

export default SubscribeButton;