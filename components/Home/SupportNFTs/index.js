import React from "react";

import styled from "styled-components";
import cn from "classnames";

const SupportNFTs = ({ className, bg, data }) => (
  <SupportNFTsWrapper className={cn(className, `bg-${bg}`)}>
    <div className="flex-all icon-wrapper">
      <img src={data.iconUrl} alt="card logo" />
    </div>
    <span>{data.title}</span>
    <p>{data.description}</p>
  </SupportNFTsWrapper>
);

const SupportNFTsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  width: 100%;
  background: #FFFFFF;
  border: 1px solid #EDEDED;
  box-sizing: border-box;
  border-radius: 16px;

  @media screen and (max-width: 768px) {
    padding: 24px;
  }
  
  .icon-wrapper {
    border-radius: 16px;
    width: 80px;
    height: 80px;
    padding: 20px;

    img {
      width: 100%
    }
  }

  span {
    font-weight: bold;
    font-size: 32px;
    letter-spacing: -0.04em;
    color: var(--color-black);
    margin-top: 64px;
    margin-bottom: 16px;

    @media screen and (max-width: 768px) {
      margin-top: 24px;
    }
  }

  p {
    font-size: 20px;
    color: var(--color-black);
    @media screen and (max-width: 768px) {
      margin: 0;
    }
  }

  &.bg-0 {
    .icon-wrapper {
      background: radial-gradient(109.98% 82.68% at 0% 91.61%, #8A0C47 0%, #FF3656 100%);
    }
  }

  &.bg-1 {
    margin-top: 24px;
    .icon-wrapper {
      background: radial-gradient(133.02% 100% at 0% 100%, #ED5A00 0%, #FFC700 100%);
    }
  }

  &.bg-2 {
    margin-top: 48px;
    .icon-wrapper {
      background: radial-gradient(128.27% 98.36% at 0% 100%, #540061 0%, #A5006D 100%);
    }
  }
`;

export default SupportNFTs;
