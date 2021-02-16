import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import { toast } from "react-toastify";

import { convertFromWei } from "../../helper/utils";
import lpstakingActions from "../../redux/lpstaking/actions";
import customNFTStakingActions from "../../redux/customNFTStaking/actions";

import { getValueFromObject } from "../../helper/utils";
import { RESPONSE } from "../../helper/constant";

const CustomNFTStakingBoard = ({ nftToken }) => {
  const dispatch = useDispatch();

  const [unStakeAllLoading, setUnStakeAllLoading] = useState(false);
  const [claimNDRLoading, setClaimNDRLoading] = useState(false);

  const myStakedStrength = useSelector((state) => getValueFromObject(state.customNFTStaking.myStakedStrength, nftToken, 0));
  const totalStakedStrength = useSelector((state) => getValueFromObject(state.customNFTStaking.totalStakedStrength, nftToken, 0));
  const claimableNDR = useSelector((state) => getValueFromObject(state.customNFTStaking.claimableNDR, nftToken, 0));
  const ndrPerDay = useSelector((state) => getValueFromObject(state.customNFTStaking.ndrPerDay, nftToken, 0));

  const init = useCallback(() => {
    dispatch(customNFTStakingActions.getMyStakedStrength(nftToken));
    dispatch(customNFTStakingActions.getTotalStakedStrength(nftToken));
    dispatch(customNFTStakingActions.getClaimableNDR(nftToken));
    dispatch(customNFTStakingActions.getNDRPerDay(nftToken));
  }, [dispatch, nftToken]);

  // Timer to get <NDR Per Day>
  useEffect(() => {
    let interval = null;

    interval = setInterval(() => {
      dispatch(customNFTStakingActions.getClaimableNDR(nftToken));
      dispatch(customNFTStakingActions.getNDRPerDay(nftToken));
    }, 30000);
    return () => clearInterval(interval);
  }, [dispatch, nftToken]);

  useEffect(() => {
    init();
  }, [init]);

  const handleUnStakeAll = () => {
    setUnStakeAllLoading(true);
    dispatch(
      customNFTStakingActions.unStakeAllCards(nftToken, (status) => {
        setUnStakeAllLoading(false);
        if (status === RESPONSE.SUCCESS) {
          toast.success("Sucess");
          dispatch(customNFTStakingActions.getStakedCards(nftToken));
          dispatch(customNFTStakingActions.getMyStakedStrength(nftToken));
          dispatch(customNFTStakingActions.getTotalStakedStrength(nftToken));
          dispatch(customNFTStakingActions.getClaimableNDR(nftToken));
          dispatch(customNFTStakingActions.getNDRPerDay(nftToken));
        } else {
          toast.error("Failed...");
        }
      })
    );
  };

  const handleClaimNDR = () => {
    setClaimNDRLoading(true);
    dispatch(
      customNFTStakingActions.claimNDR(nftToken, (status) => {
        setClaimNDRLoading(false);
        if (status === RESPONSE.SUCCESS) {
          toast.success("Sucess");
          dispatch(customNFTStakingActions.getClaimableNDR(nftToken));
          dispatch(lpstakingActions.getNDRBalance());
        } else {
          toast.error("Failed...");
        }
      })
    );
  };

  return (
    <NFTStakeWrapper>
      <div className="stake-stats desktop animation-slideDown">
        {unStakeAllLoading ? (
          <div className="action button desktop">
            <img src="/static/images/icons/loading.gif" height="35" alt="" />
            <span>LOADING...</span>
          </div>
        ) : (
          <div
            className="action button desktop"
            role="button"
            onClick={handleUnStakeAll}
          >
            <span className="d-block text-center">unstake all</span>
          </div>
        )}
        <div className="stat">
          <h6>My Staked Strength</h6>
          <p>{myStakedStrength}</p>
        </div>
        <div className="stat">
          <h6>Total Staked Strength</h6>
          <p>{totalStakedStrength}</p>
        </div>
        <div className="stat">
          <div style={{ marginTop: -3 }}>
            <label>Claimable NDR:</label>
            <span>{convertFromWei(claimableNDR, 3)}</span>
          </div>
          <div>
            <label>NDR per day:</label>
            <span>{convertFromWei(ndrPerDay, 4)}</span>
          </div>
        </div>
        {claimNDRLoading ? (
          <div className="action button desktop">
            <img src="/static/images/icons/loading.gif" height="35" alt="" />
            <span>LOADING...</span>
          </div>
        ) : (
          <div className="action button desktop" role="button" onClick={handleClaimNDR}>
            <span className="d-block text-center">claim ndr</span>
          </div>
        )}
      </div>
      <div className="stake-stats mobile animation-slideDown">
        {unStakeAllLoading ? (
          <div className="action button mobile">
            <img src="/static/images/icons/loading.gif" height="35" alt="" />
            <span>LOADING...</span>
          </div>
        ) : (
          <div
            className="action button mobile"
            role="button"
            onClick={handleUnStakeAll}
          >
            <span className="d-block text-center">unstake all</span>
          </div>
        )}
        {claimNDRLoading ? (
          <div className="action button mobile">
            <img src="/static/images/icons/loading.gif" height="35" alt="" />
            <span>LOADING...</span>
          </div>
        ) : (
          <div className="action button mobile" role="button" onClick={handleClaimNDR}>
            <span className="d-block text-center">claim ndr</span>
          </div>
        )}
      </div>
    </NFTStakeWrapper>
  );
};

const NFTStakeWrapper = styled.div`
  .stake-stats {
    display: flex;
    justify-content: center;
    height: 80px;

    &.desktop {
      @media screen and (max-width: 768px) {
        flex-direction: column;
        height: 200px;
        padding-left: 20px;
        padding-right: 20px;
      }
    }

    &.mobile {
      display: none;
      @media screen and (max-width: 1024px) {
        display: flex;
      }
    }

    div {
      span {
        font-size: 16px;
        max-width: 101.6px;
        font-family: Orbitron-Black;
        text-transform: uppercase;
        text-shadow: 5px 5px 3px #27787580;
        line-height: 1;
      }

      &.action {
        background-image: url("/static/images/bg/pages/get-heroes/credit-button-bg.png");
        background-size: 100% 100%;
        width: 144px;
        height: 80px;
        margin-right: -5.6px;
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

        &.desktop {
          @media screen and (max-width: 1024px) {
            display: none;
          }
        }

        &.mobile {
          display: none;

          @media screen and (max-width: 1024px) {
            display: flex;
          }
        }
      }

      &.stat {
        background-image: url("/static/images/bg/card-menu/stat-bg.png");
        background-size: cover;
        margin: 0 -5.6px;
        padding: 8px 9.6px 0px;
        min-width: 234.4px;
        text-shadow: 0px 8px 8px #80f1ed91;
        font-family: Orbitron-Black;

        @media screen and (max-width: 768px) {
          background-image: none;
          border: 4px solid #80f1ed;
          padding-top: 5px;
          padding-bottom: 5px;

          &:nth-child(2), &:nth-child(3) {
            border-bottom: none;
          }
        }

        > div:first-child {
          margin-bottom: 3.2px;
        }

        div {
          label {
            color: #80f1ed;
            font-size: 0.8rem;
            // font-family: Orbitron-Medium;
            line-height: 1rem;
            margin: 0;
          }

          span {
            color: #fec100;
            font-size: 1rem;
            // font-family: Orbitron-Black;
            line-height: 1rem;
            padding-left: 9px;
            margin: 0;
            text-shadow: inherit;
          }
        }

        h6 {
          color: #80f1ed;
          font-size: 16px;
          line-height: 1;
          margin: 0 0 5.6px;
        }

        p {
          color: #fec100;
          font-size: 24px;
          line-height: 1;
          margin: 0;
        }
      }
    }
  }
`;

export default CustomNFTStakingBoard;
