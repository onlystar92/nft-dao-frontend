import React from "react";

import styled from "styled-components";

const UpcomingDrops = ({ className, data }) => (
  <UpcomingDropssWrapper className={className}>
    <img className="drop-img" src={data.image} alt="" />
    <div className="drop-info">
      <img className="drop-info-userimg" src={data.user} alt="" />
      <div className="drop-info-content">
        <div className="drop-info-dropname">{data.dropName}</div>
        <div className="drop-info-dropuser">{data.artist}</div>
      </div>
    </div>
  </UpcomingDropssWrapper>
);

const UpcomingDropssWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    margin-bottom: 23px;
  }

  .drop-img {
    width: 100%;
  }

  .drop-info {
    display: flex;
    flex-direction: row;

    &-userimg {
      width: 45px;
      height: 45px;
    }

    &-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 10px;
    }

    &-dropname {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 22px;
    }

    &-dropuser {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 300;
      font-size: 14px;
      line-height: 17px;
    }
  }
`;

export default UpcomingDrops;
