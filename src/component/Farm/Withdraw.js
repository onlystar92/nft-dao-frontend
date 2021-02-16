import React, { useState } from "react";

import styled from "styled-components";
import { DoubleArrow, ArrowBack } from "@material-ui/icons";
import { STAKE_MAX_LIMIT } from "../../helper/constant";

const Withdraw = ({ loading, old, staked, onClose, onWithdraw }) => {
  const [amount, setAmount] = useState("0.0000");
  const [isMax, setIsMax] = useState(false);

  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
    setIsMax(false);
  };

  const setMax = () => {
    if (staked > STAKE_MAX_LIMIT) {
      setAmount(STAKE_MAX_LIMIT);
    } else {
      setAmount(staked);
      setIsMax(true);
    }
  };

  return (
    <WithdrawWrapper>
      <div className="withdraw-wrapper desktop animation-slideDown">
        <div className="action button desktop" role="button" onClick={onClose}>
          <ArrowBack />
          <span>Back</span>
        </div>
        <div className="credit">
          <div>
            <label>{old ? "OLD" : ""} UNI-LP Staked:</label>
          </div>
          <div>
            <span>{staked}</span>
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
          <span className="unstake-fee">Unstake fee 2%</span>
        </div>
        {loading && (
          <div className="action button desktop">
            <img src="/static/images/icons/loading.gif" height="35" alt="" />
            <span>LOADING...</span>
          </div>
        )}
        {!loading && (
          <div
            className="action button desktop"
            onClick={(e) => onWithdraw(amount, isMax)}
          >
            <DoubleArrow />
            <span>UNSTAKE</span>
          </div>
        )}
      </div>
      <div className="withdraw-wrapper mobile animation-slideDown">
        <div className="action button mobile" role="button" onClick={onClose}>
          <ArrowBack />
          <span>Back</span>
        </div>
        {loading && (
          <div className="action button mobile">
            <img src="/static/images/icons/loading.gif" height="35" alt="" />
            <span>LOADING...</span>
          </div>
        )}
        {!loading && (
          <div
            className="action button mobile"
            onClick={(e) => onWithdraw(amount, isMax)}
          >
            <DoubleArrow />
            <span>UNSTAKE</span>
          </div>
        )}
      </div>
    </WithdrawWrapper>
  );
};

const WithdrawWrapper = styled.div`
  .withdraw-wrapper {
    display: flex;
    flex-direction: row;
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
        line-height: 1.2;
      }

      &.action {
        background-image: url("/static/images/bg/pages/get-heroes/credit-button-bg.png");
        background-size: 100% 100%;
        width: 144px;
        height: 80px;
        margin-right: -13px;
        padding: 0 17px 22px 0;
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
          width: 160px;
        }

        &:nth-child(4) {
          .MuiSvgIcon-root {
            transform: rotate(-90deg);
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
            margin-top: 30px;
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
            width: calc(50% - 25px);

            &:nth-child(1) {
              margin-right: 5px;
            }

            &:nth-child(2) {
              margin-left: 5px;
            }
          }
          @media screen and (max-width: 400px) {
            width: 100%;
            height: 50px;
            flex-direction: row;

            &:nth-child(1) {
              margin-right: 0px;
              margin-top: 15px;
            }

            &:nth-child(2) {
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
        padding: 10px 17px 22px 0;
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
          font-size: 12px;
          color: #fec100;
        }

        .buttons {
          width: 95%;
          display: flex;
          justify-content: space-between;
          padding-left: 5px;
          padding-right: 10px;
          box-sizing: border-box;
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

        .unstake-fee {
          position: absolute;
          font-size: 0.9rem;
          font-family: Orbitron-Black;
          color: #fec100;
          margin-top: 108px;
          max-width: 240px;
        }
      }

      &.credit {
        background: url("/static/images/bg/pages/get-heroes/credit-bg.png");
        background-size: 100% 100%;
        margin-right: -10.4px;
        padding: 4.8px 17.6px 20.8px 8px;
        width: 324px;
        text-shadow: 10px 10px 10px #80f1ed91;

        @media screen and (max-width: 600px) {
          background: none;
          border: 4px solid #80f1ed;
          height: 70px;
          box-shadow: 0px 10px 10px #80f1ed80;
          width: 100%;
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
          font-size: 24px;
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

export default Withdraw;
