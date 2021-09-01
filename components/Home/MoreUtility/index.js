import React from "react";

import styled from "styled-components";

const MoreUtility = ({ className, data, idx }) => (
  <MoreUtilityWrapper className={className} style={{ marginLeft: 100 * idx }}>
    <div className="more-utility-img">
      <img src={data.image} alt="utility" />
    </div>
    <div className="more-utility-title">{data.title}</div>
    <div className="more-utility-description">{data.description}</div>
  </MoreUtilityWrapper>
);

const MoreUtilityWrapper = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  background: #FFFFFF;
  border: 1px solid #EDEDED;
  box-sizing: border-box;
  border-radius: 16px;
  padding: 24px;

  @media screen and (max-width: 1024px) {
    width: 100%;
    margin-left: 0px !important;
  }

  @media screen and (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
  }

  .more-utility-img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    min-width: 80px;
    min-height: 80px;
    background: radial-gradient(100% 106.05% at 0% 100%, #4C3897 0%, #6C53C6 100%);
    border-radius: 16px;

    @media screen and (max-width: 768px) {
      width: 66px;
      height: 66px;
    }
  }

  .more-utility-title {
    min-width: 150px;
    font-weight: bold;
    font-size: 24px;
    letter-spacing: -0.04em;
    color: var(--color-black);
    margin-left: 40px;
    margin-right: 75px;

    @media screen and (max-width: 768px) {
      font-size: 22px;
    }

    @media screen and (max-width: 576px) {
      margin-left: 0px;
      margin-right: 0px;
      margin-top: 24px;
      margin-bottom: 8px;
    }
  }

  .more-utility-description {
    max-width: 685px;
    font-size: 16px;
    color: var(--color-black);

    @media screen and (max-width: 768px) {
      font-size: 14px;
    }
  }
`;

export default MoreUtility;
