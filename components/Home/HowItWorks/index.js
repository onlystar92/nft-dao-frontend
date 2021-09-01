import React from "react";

import styled from "styled-components";
import cn from "classnames";

const HowItWorks = ({ className, bg, data }) => (
  <HowItWorksWrapper className={cn(className, `bg-${bg}`)}>
    <img src={data.iconUrl} alt="card logo" />
    <span>{data.title}</span>
    <p>{data.description}</p>
  </HowItWorksWrapper>
);

const HowItWorksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 47px 40px;
  width: 100%;

  img {
    width: 80px;
    height: 80px;
  }

  span {
    font-weight: bold;
    font-size: 32px;
    letter-spacing: -0.04em;
    color: var(--color-white);
    margin-top: 24px;
    margin-bottom: 16px;
  }

  p {
    font-size: 20px;
    color: var(--color-white);
    @media screen and (max-width: 768px) {
      margin: 0;
    }  
  }

  @media screen and (max-width: 768px) {
    margin-bottom: 24px;
  }

  &.bg-0 {
    background: url("/static/images/bg/bg-5.png");
    background-position: top left;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  &.bg-1 {
    background: url("/static/images/bg/bg-6.png");
    background-position: top left;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  &.bg-2 {
    background: url("/static/images/bg/bg-7.png");
    background-position: top left;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
`;

export default HowItWorks;
