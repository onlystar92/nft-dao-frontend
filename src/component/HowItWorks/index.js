import React from "react";

import styled from "styled-components";
import cn from "classnames";

const HowItWorks = ({ className, bg, data }) => (
  <HowItWorksWrapper className={cn(className, `bg-${bg}`)}>
    <span className="font-size-xd font-color-dark">{data.title}</span>
    <p className="font-size-md font-color-dark">{data.description}</p>
  </HowItWorksWrapper>
);

const HowItWorksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 53px;
  padding-top: 54px;
  height: 254px;
  
  @media screen and (max-width: 768px) {
    padding-left: 34px;
    padding-top: 16px;
    margin-bottom: 28px;
    height: 200px;
  }

  &.bg-0 {
    background: url("/static/images/bg/bg-c-1.png");
    background-position: top left;
    background-repeat: no-repeat;
    background-size: contain;

    @media screen and (max-width: 768px) {
      background-size: 150px;
    }
  }

  &.bg-1 {
    background: url("/static/images/bg/bg-c-2.png");
    background-position: top left;
    background-repeat: no-repeat;
    background-size: contain;

    @media screen and (max-width: 768px) {
      background-size: 150px;
    }
  }

  &.bg-2 {
    background: url("/static/images/bg/bg-c-3.png");
    background-position: top left;
    background-repeat: no-repeat;
    background-size: contain;

    @media screen and (max-width: 768px) {
      background-size: 150px;
    }
  }
`;

export default HowItWorks;
