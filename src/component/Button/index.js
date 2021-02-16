import React from "react";
import styled from "styled-components";

import cn from "classnames";

const Button = ({ type, onClick, children, className }) => (
  <ButtonWrapper className={cn(className, type, "font-button")} onClick={(e) => onClick()}>
    {children}
  </ButtonWrapper>
);

const ButtonWrapper = styled.button`
  width: 240px;
  height: 56px;
  border-radius: 28px;
  border: 1px solid #282B49;
  cursor: pointer;
  outline: none;

  &.dark {
    background: #282b49;
    color: #fff;
  }

  &.light {
    background: #fff;
    color: #282b49;
  }

  @media screen and (max-width: 768px) {
    width: 224px;
    height: 48px;
  }
`;

export default Button;
