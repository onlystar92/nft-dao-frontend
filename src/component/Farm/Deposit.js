import React, { useState } from "react";

import styled from "styled-components";
import { ArrowBack, Done, DoubleArrow } from "@material-ui/icons";

import { STAKE_MAX_LIMIT } from "../../helper/constant";

const Deposit = ({
  loading,
  allowance,
  balance,
  staked,
  onClose,
  onApprove,
  onDeposit,
}) => {
  const [amount, setAmount] = useState("0.0000");
  const [isMax, setIsMax] = useState(false);

  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
    setIsMax(false);
  };

  const setMax = () => {
    if (balance > STAKE_MAX_LIMIT) {
      setAmount(STAKE_MAX_LIMIT);
    } else {
      setAmount(balance);
      setIsMax(true);
    }
  };

  return (
    <DepositWrapper>
      <div className="deposit-wrapper desktop animation-slideDown">
        <div className="action desktop button" role="button" onClick={onClose}>
          <ArrowBack />
          <span>Back</span>
        </div>
        <div className="credit">
          <div>
            <label>UNI-LP Staked:</label>
            <span>{staked}</span>
          </div>
          <div>
            <label>UNI-LP Balance:</label>
            <span>{balance}</span>
          </div>
        </div>
        <div className="input">
          <div className="buttons">
            <span role="button" className="min"></span>
            <span role="button" onClick={(e) => setMax()} className="max">
              MAX
              <br />
              <small>{STAKE_MAX_LIMIT}</small>
            </span>
          </div>
          <input type="text" value={amount} onChange={handleChangeAmount} />
        </div>
        {loading && (
          <div className="action desktop button">
            <img src="/static/images/icons/loading.gif" height="35" alt="" />
            <span>LOADING...</span>
          </div>
        )}
        {!loading && allowance <= 0 && (
          <div className="action desktop button" onClick={(e) => onApprove()}>
            <Done />
            <span>APPROVE</span>
          </div>
        )}
        {!loading && (
          <div
            className="action desktop button"
            onClick={(e) => onDeposit(amount, isMax)}
          >
            <DoubleArrow />
            <span>STAKE</span>
          </div>
        )}
      </div>
      <div className="deposit-wrapper mobile animation-slideDown">
        <div className="action mobile button" role="button" onClick={onClose}>
          <ArrowBack />
          <span>Back</span>
        </div>
        {loading && (
          <div className="action mobile button">
            <img src="/static/images/icons/loading.gif" height="35" alt="" />
            <span>LOADING...</span>
          </div>
        )}
        {!loading && allowance <= 0 && (
          <div className="action mobile button" onClick={(e) => onApprove()}>
            <Done />
            <span>APPROVE</span>
          </div>
        )}
        {!loading && (
          <div
            className="action mobile button"
            onClick={(e) => onDeposit(amount, isMax)}
          >
            <DoubleArrow />
            <span>STAKE</span>
          </div>
        )}
      </div>
    </DepositWrapper>
  );
};

const DepositWrapper = styled.div`
  .deposit-wrapper {
    display: flex;
    justify-content: center;

    &.desktop {
      @media screen and (max-width: 600px) {
        flex-direction: column;
        padding-left: 20px;
        padding-right: 20px;
      }
    }

    &.mobile {
      @media screen and (max-width: 400px) {
        flex-direction: column-reverse;
        padding-left: 20px;
        padding-right: 20px;
      }
    }

    > a,
    div {
      color: #212529;
      text-decoration: none;

      span {
        font-size: 16px;
        max-width: 125.6px;
        font-family: Orbitron-Black;
        text-transform: uppercase;
        text-shadow: 5px 5px 3px #27787580;
        line-height: 1;
      }

      &.action {
        background-image: url("/static/images/bg/pages/get-heroes/credit-button-bg.png");
        background-size: 100% 100%;
        width: 160px;
        height: 80px;
        margin-right: -10.4px;
        padding: 0 13.6px 17.6px 0;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &:hover {
          background-image: url("/static/images/bg/pages/get-heroes/credit-button-bg--active.png");
          color: #fec100;
        }

        &.button {
          width: 120px;
        }

        &:nth-child(5) {
          .MuiSvgIcon-root {
            transform: rotate(90deg);
          }
        }

        &.mobile {
          display: none;
        }

        @media screen and (max-width: 880px) {
          &.desktop {
            display: none;
          }

          &.mobile {
            display: flex;
          }
        }

        &.mobile {
          @media screen and (max-width: 600px) {
            background-image: none;
            background: #80f1ed;
            box-shadow: 0px 10px 10px #80f1ed80;
            padding: 0px 0px 0px 0px;
            margin-right: 0px;
            height: 70px;
            width: calc(33.3333% - 15px);
            margin-top: 10px;

            &:nth-child(2),
            &:nth-child(3) {
              margin-left: 5px;
            }
          }
          @media screen and (max-width: 400px) {
            width: 100%;
            height: 50px;
            flex-direction: row;

            &:nth-child(2),
            &:nth-child(3) {
              margin-left: 0px;
            }
          }
        }
      }

      &.input {
        background-image: url("/static/images/bg/pages/get-heroes/credit-button-bg-long--active.png");
        background-size: 100% 100%;
        width: 240px;
        height: 78.4px;
        margin-right: -10.4px;
        padding: 0 13.6px 17.6px 0;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #fec100;

        @media screen and (max-width: 600px) {
          background-image: none;
          background: #eb2ecd;
          box-shadow: 0px 10px 10px #eb2ecd80;
          height: 70px;
          width: 100%;
          margin-right: 0px;
          box-sizing: border-box;
          margin-top: 10px;
          padding: 20px 17px 22px 0;
        }

        span {
          text-shadow: none;
          font-size: 14px;
          color: #fec100;
          text-shadow: 5px 5px 3px #27787580;
        }

        .buttons {
          width: 95%;
          display: flex;
          justify-content: space-between;
          padding-left: 5px;
          padding-right: 10px;
          box-sizing: border-box;

          span {
            font-size: 0.8rem;
          }
        }

        input {
          width: 100%;
          text-align: center;
          background: none;
          border: none;
          outline: none;
          color: #fec100;
          font-weight: 600;
          height: 32px;
          font-size: 24px;
          line-height: 24px;
          text-shadow: 5px 5px 3px #27787580;
          font-family: Orbitron-Black;
        }
      }

      &.credit {
        background: url("/static/images/bg/pages/get-heroes/credit-bg.png");
        background-size: 100% 100%;
        margin-right: -13px;
        padding: 8px 17.6px 20.8px 8px;
        min-width: 324px;
        text-shadow: 8px 8px 8px #80f1ed91;
        box-sizing: border-box;

        @media screen and (max-width: 600px) {
          background: none;
          border: 4px solid #80f1ed;
          height: 70px;
          box-shadow: 0px 10px 10px #80f1ed80;
          width: 100%;
          min-width: 124px;
        }

        > div:first-child {
          margin-bottom: 4px;
        }

        label {
          color: #80f1ed;
          font-size: 16px;
          font-family: Orbitron-Medium;
          line-height: 0.8;
          margin: 0;
        }

        span {
          color: #fec100;
          font-size: 16px;
          font-family: Orbitron-Black;
          line-height: 0.8;
          padding-left: 7.2px;
          margin: 0;
          text-shadow: inherit;
        }
      }
    }
  }
`;

export default Deposit;
