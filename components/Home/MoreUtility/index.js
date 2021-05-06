import React from "react";

import styled from "styled-components";

const MoreUtility = ({ className, data }) => (
  <MoreUtilityWrapper className={className}>
    <img className="more-utility-img" src={data.image} alt="" />
    <div className="more-utility-content">
      <div className="more-utility-title">{data.title}</div>
      <div className="more-utility-description">{data.description}</div>
    </div>
  </MoreUtilityWrapper>
);

const MoreUtilityWrapper = styled.div`
  display: flex;
  flex-direction: row;

  .more-utility-img {
    width: 96px;
    height: 96px;

    @media screen and (max-width: 768px) {
      width: 66px;
      height: 66px;
    }
  }

  .more-utility-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 33px;

    @media screen and (max-width: 768px) {
      margin-left: 14px;
    }
  }

  .more-utility-title {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 800;
    font-size: 20px;
    line-height: 28px;
    text-transform: uppercase;

    @media screen and (max-width: 768px) {
      font-size: 22px;
    }
  }

  .more-utility-description {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 28px;

    @media screen and (max-width: 768px) {
      font-size: 14px;
    }
  }
`;

export default MoreUtility;
