import React from "react";
import styled from "styled-components";

import cn from "classnames";

const SubscribeInput = ({ type, onClick, children, className }) => (
  <SubscribeInputWrapper className={cn(className, type, "font-button")}>
    <input className="subscribe-input" type="text" placeholder="Enter your email" />
    <ButtonWrapper className="subscribe-button font-button" onClick={(e) => onClick()}>
      Stake & Earn
    </ButtonWrapper>
  </SubscribeInputWrapper>
);

const SubscribeInputWrapper = styled.div`
  width: 574px;
  height: 64px;
  border-radius: 32px;
  border: 1px solid #282B49;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  padding: 4px 4px 4px 20px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    border: none;
    width: 100%;
    height: 124px;
  }

  .subscribe-input {
    flex: 1;
    margin-right: 4px;
    border: none;
    background: transparent;
    outline: none;

    @media screen and (max-width: 768px) {
      flex: 1;
      height: 48px;
      border-radius: 24px;
      border: 1px solid #282B49;
      padding: 10px;
    }
  }
`;

const ButtonWrapper = styled.button`
  width: 240px;
  height: 56px;
  border-radius: 28px;
  border: 1px solid #282B49;
  cursor: pointer;
  outline: none;
  background: #282b49;
  color: #fff;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 48px;
    border-radius: 24px;
    margin-top: 20px;
  }
`;

export default SubscribeInput;
