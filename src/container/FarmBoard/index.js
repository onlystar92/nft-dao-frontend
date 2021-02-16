import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { toast } from "react-toastify";

import AmountInput from "../../component/Farm/AmountInput";
import LoadingTextIcon from "../../component/LoadingTextIcon";

import farmsAction from "../../redux/farms/actions";
import { RESPONSE } from "../../helper/constant";
import { convertFromWei } from "../../helper/utils";

const FarmBoard = ({
  token,
  farm,
  approved,
  balance,
  staked,
  claimable,
  stats,
}) => {
  const dispatch = useDispatch();

  const [approveLoading, setApproveLoading] = useState(false);
  const [stakeLoading, setStakeLoading] = useState(false);
  const [claimLoading, setClaimLoading] = useState(false);
  const [exitLoading, setExitLoading] = useState(false);

  const [amount, setAmount] = useState("0.0000000");
  const [isMax, setIsMax] = useState(false);

  const handleSetAmount = (input) => {
    if (input === "MAX") {
      setAmount(convertFromWei(balance, 7));
      setIsMax(true);
    } else {
      setAmount(input);
      setIsMax(false);
    }
  };

  const init = () => {
    dispatch(farmsAction.getTokenBalance(token));
    dispatch(farmsAction.getTokenApproveStatus(token));
    dispatch(farmsAction.getTokenClaimableAmount(token));
    dispatch(farmsAction.getTokenStakedAmount(token));
    dispatch(farmsAction.getTokenStats(token));
  };

  useEffect(() => {
    dispatch(farmsAction.getTokenBalance(token));
    dispatch(farmsAction.getTokenApproveStatus(token));
    dispatch(farmsAction.getTokenClaimableAmount(token));
    dispatch(farmsAction.getTokenStakedAmount(token));
    dispatch(farmsAction.getTokenStats(token));
  }, [dispatch, token]);

  const handleApprove = () => {
    if (approveLoading) {
      return;
    }
    setApproveLoading(true);
    dispatch(
      farmsAction.approveToken(token, (status) => {
        setApproveLoading(false);
        callback(status);
      })
    );
  };

  const handleStake = () => {
    if (stakeLoading) {
      return;
    }

    if (!checkAmount(amount)) {
      return;
    }

    setStakeLoading(true);
    dispatch(
      farmsAction.stakeToken(token, amount, isMax, (status) => {
        setStakeLoading(false);
        setAmount(0);
        init();
        callback(status);
      })
    );
  };

  const handleExit = () => {
    if (exitLoading) {
      return;
    }
    setExitLoading(true);
    dispatch(
      farmsAction.exitToken(token, (status) => {
        setExitLoading(false);
        init();
        callback(status);
      })
    );
  };

  const handleClaim = () => {
    if (claimLoading) {
      return;
    }
    setClaimLoading(true);
    dispatch(
      farmsAction.claimToken(token, (status) => {
        setClaimLoading(false);
        init();
        callback(status);
      })
    );
  };

  const callback = (status) => {
    if (status === RESPONSE.INSUFFICIENT) {
      toast.error("Insufficient balance");
    }
    if (status === RESPONSE.ERROR) {
      toast.error("Your transaction has been failed");
    }
    if (status === RESPONSE.SUCCESS) {
      toast.success("Your transaction has been successfully");
    }
    if (status === RESPONSE.SHOULD_APPROVE) {
      toast.success("You should approve first");
    }
  };

  const checkAmount = (amount) => {
    if (isNaN(amount) || amount.trim() === "") {
      toast.error("Amount should be a number");
      return false;
    }
    if (parseFloat(amount) <= 0) {
      toast.error(`Amount should be greater than zero`);
      return false;
    }
    return true;
  };

  return (
    <BoostStakeWrapper>
      <div className="token">{farm.title}</div>
      {('note' in farm) && <div className="token1">{farm.note}</div>}
      <a
        href={farm.link}
        target="_blank"
        className="token-link"
        rel="noopener noreferrer"
      >
        {farm.link_title}
      </a>
      <div className="block">
        {farm.active && <div className="row">
          <span className="title">APY:</span>
          <span className="value">{`${
            stats ? stats.apy.toFixed(2) : 0
            } %`}</span>
        </div>}
        <div className="row">
          <span className="title">NDR Claimable:</span>
          <span className="value">{convertFromWei(claimable, 4)}</span>
        </div>
        {farm.active && <div className="row">
          <span className="title">NDR per Day:</span>
          <span className="value">
            {convertFromWei(stats ? stats.rewardPerDay : 0, 4)}
          </span>
        </div>}
      </div>
      <div className="block">
        <div className="row">
          <span className="title">Staked:</span>
          <span className="value">{convertFromWei(staked, 4)}</span>
        </div>
        {farm.active && <div className="row">
          <span className="title">Balance:</span>
          <span className="value">{`${convertFromWei(balance, 4)}`}</span>
        </div>}
      </div>
      {farm.active && (
        <div className="section">
          <div className="row">
            <AmountInput
              className="amount"
              showMin={false}
              min={0}
              showMax={true}
              max={0}
              value={amount}
              onSetAmount={(amount) => handleSetAmount(amount)}
            />
          </div>
        </div>
      )}
      {farm.active && <div className="row">
        {approved ? (
          <button className="action stake" onClick={(e) => handleStake()}>
            {stakeLoading ? (
              <LoadingTextIcon loadingText="Staking..." />
            ) : (
                `STAKE`
              )}
          </button>
        ) : (
            <button className="action approve" onClick={(e) => handleApprove()}>
              {approveLoading ? (
                <LoadingTextIcon loadingText="Approving..." />
              ) : (
                  `APPROVE`
                )}
            </button>
          )}
      </div>}
      {approved && (
        <>
          <div className="row">
            <button className="action unstake" onClick={(e) => handleExit()}>
              {exitLoading ? (
                <LoadingTextIcon loadingText="Loading..." />
              ) : (
                  `Claim and Unstake`
                )}
            </button>
          </div>
          {farm.active && <div className="row">
            <button className="action claim" onClick={(e) => handleClaim()}>
              {claimLoading ? (
                <LoadingTextIcon loadingText="Loading..." />
              ) : (
                  `Claim NDR`
                )}
            </button>
          </div>}
        </>
      )}
      {/* <div className="row">
        <span className="fee-label">{`2% Unstake fee`}</span>
      </div> */}
    </BoostStakeWrapper>
  );
};

const BoostStakeWrapper = styled.div`
  width: 380px;
  min-height: 553.58px;
  background: url("/static/images/bg/components/card/card-border.png");
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 26px 46px;
  box-sizing: border-box;

  .token {
    font-family: Orbitron-Black;
    text-shadow: 0px 10px 5px #fec10080;
    color: #fec100;
    font-size: 1.7rem;
    margin-bottom: 10px;
  }

  .token1 {
    font-family: Orbitron-Black;
    text-shadow: 0px 10px 5px #fec10080;
    color: #fec100;
    font-size: 1.4rem;
    margin-bottom: 10px;
  }

  .token-link {
    font-family: Orbitron-Black;
    text-shadow: 0px 10px 5px #fec10080;
    color: #fec100;
    font-size: 1rem;
    margin-bottom: 10px;
    text-decoration: underline;
  }

  .section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .block {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 3px solid #80f1ed;
    box-shadow: 0px 5px 3px #80f1ed80;
    width: 100%;
    margin-bottom: 15px;
  }

  .row {
    display: flex;
    justify-content: center;
    width: 100%;

    font-family: Orbitron-Medium;
    font-size: 1.1rem;
    padding-top: 4px;
    padding-bottom: 4px;

    .title {
      color: #80f1ed;
      text-shadow: 5px 5px 3px #80f1ed80;
      padding-right: 5px;
    }

    .value {
      font-family: Orbitron-Black;
      color: #fec100;
      text-shadow: 5px 5px 3px #fec10080;
    }

    .action {
      flex: 1;
      border: none;
      outline: none;
      height: 60px;
      font-family: Orbitron-Black;
      font-size: 15px;

      &.approve {
        background: url("/static/images/bg/components/card/button-bg.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;

        &:hover {
          background: url("/static/images/bg/components/card/button-bg--active.png");
          background-size: 100% 100%;
          color: #fec100;
        }
      }

      &.stake {
        background: url("/static/images/bg/components/card/button-bg.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;

        &:hover {
          background: url("/static/images/bg/components/card/button-bg--active.png");
          background-size: 100% 100%;
          color: #fec100;
        }
      }

      &.unstake {
        background: url("/static/images/bg/components/card/button-bg.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin-top: -20px;

        &:hover {
          background: url("/static/images/bg/components/card/button-bg--active.png");
          background-size: 100% 100%;
          color: #fec100;
        }
      }

      &.claim {
        background: url("/static/images/bg/components/card/button-bg.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin-top: -15px;

        &:hover {
          background: url("/static/images/bg/components/card/button-bg--active.png");
          background-size: 100% 100%;
          color: #fec100;
        }
      }
    }

    .fee-label {
      font-family: Orbitron-Medium;
      color: #fec100;
    }

    .amount {
      flex: 1;
      height: 65px;
    }

    .str {
      height: 65px;
      width: 65px;
      border: 4px solid #e182ea;
      margin-left: 5px;
      font-family: Orbitron-Black;
      color: #fec100;
      text-align: center;
      box-sizing: border-box;
    }
  }
`;

export default FarmBoard;
