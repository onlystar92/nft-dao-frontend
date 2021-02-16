import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";

import Stake from "../../component/Farm/Stake";
import Deposit from "../../component/Farm/Deposit";
import Withdraw from "../../component/Farm/Withdraw";

import { STAKE_MAX_LIMIT, RESPONSE } from "../../helper/constant";
import { convertFromWei } from "../../helper/utils";

import lpstakingActions from "../../redux/lpstaking/actions";

const DLG_STAKE = 0;
const DLG_DEPOSIT = 1;
const DLG_WITHDRAW = 2;
const DLG_OLD_WITHDRAW = 3;

const LPStakingBoard = () => {
  const dispatch = useDispatch();

  // 0: stake 1: deposit 2: withdraw
  const [openStatus, setOpenStatus] = useState(DLG_STAKE);

  const [loading, setLoading] = useState(false);

  const balance = useSelector((state) => state.LpStaking.lpTokenBalance);
  const stakedAmount = useSelector((state) => state.LpStaking.stakedAmount);
  const oldStakedAmount = useSelector(
    (state) => state.LpStaking.oldStakedAmount
  );
  const earningAmount = useSelector((state) => state.LpStaking.earningAmount);
  const stat = useSelector((state) => state.LpStaking.stat);
  const allowance = useSelector((state) => state.LpStaking.allowance);

  const init = useCallback(() => {
    dispatch(lpstakingActions.getLPTokenAllowance());
    dispatch(lpstakingActions.getLPTokenBalance());
    dispatch(lpstakingActions.getStakedAmount());
    dispatch(lpstakingActions.getOldStakedAmount());
    dispatch(lpstakingActions.getEarningAmount());
    dispatch(lpstakingActions.getStatistics());
  }, [dispatch]);

  useEffect(() => {
    init();
  }, [init]);

  /*
    Deposit(Stake)
  */
  const handleOpenDeposit = () => {
    dispatch(lpstakingActions.getLPTokenBalance());
    setOpenStatus(DLG_DEPOSIT);
  };

  const handleDeposit = (amount, isMax) => {
    if (checkAmount(amount)) {
      setLoading(true);
      dispatch(lpstakingActions.depositLP(amount, isMax, callbackDeposit));
    }
  };

  const callbackDeposit = (status) => {
    setLoading(false);
    if (status === RESPONSE.INSUFFICIENT) {
      toast.error("Insufficient balance...");
    } else if (status === RESPONSE.SHOULD_APPROVE) {
      toast.error("You should approve first");
    } else if (status === RESPONSE.SHOULD_STAKE) {
      toast.error("Staked amount is not enough");
    } else if (status === RESPONSE.SUCCESS) {
      toast.success("Success");
      setOpenStatus(DLG_STAKE);
      dispatch(lpstakingActions.getLPTokenBalance());
      dispatch(lpstakingActions.getStakedAmount());
      // dispatch(lpstakingActions.getOldStakedAmount());
      dispatch(lpstakingActions.getEarningAmount());
      dispatch(lpstakingActions.getStatistics());
    } else {
      toast.error("Unexpected error...");
    }
  };

  const handleApprove = () => {
    setLoading(true);
    dispatch(
      lpstakingActions.approveLP((status) => {
        setLoading(false);
        if (status === RESPONSE.SUCCESS) {
          toast.success("Approved successfully");
        } else if (status === RESPONSE.INSUFFICIENT) {
          toast.error("Failed. No balance...");
        } else {
          toast.error("Failed...");
        }
      })
    );
  };

  // ************************************************************

  const handleOpenWithdraw = () => {
    dispatch(lpstakingActions.getStakedAmount());
    setOpenStatus(DLG_WITHDRAW);
  };

  const handleOpenOldWithdraw = () => {
    dispatch(lpstakingActions.getOldStakedAmount());
    setOpenStatus(DLG_OLD_WITHDRAW);
  };

  const handleWithdraw = (amount, isMax) => {
    if (checkAmount(amount)) {
      setLoading(true);
      dispatch(lpstakingActions.withdrawLP(amount, isMax, callbackDeposit));
    }
  };

  const handleOldWithdraw = (amount, isMax) => {
    if (checkAmount(amount)) {
      setLoading(true);
      dispatch(lpstakingActions.withdrawOldLP(amount, isMax, callbackDeposit));
    }
  };

  // ***********************************************************
  const handleOpenStake = () => {
    setLoading(false);
    setOpenStatus(DLG_STAKE);
  };

  const checkAmount = (amount) => {
    if (isNaN(amount) || amount.trim() === "") {
      toast.error("Amount should be a number");
      return false;
    }
    if (parseFloat(amount) > parseFloat(STAKE_MAX_LIMIT)) {
      toast.error(`Amount can not be more than ${STAKE_MAX_LIMIT}`);
      return false;
    }

    return true;
  };

  return (
    <div style={{ marginTop: 20 }}>
      {openStatus === DLG_STAKE && (
        <Stake
          hashes={convertFromWei(earningAmount, 2)}
          staked={convertFromWei(stakedAmount)}
          balance={convertFromWei(balance)}
          stat={stat}
          onOpenDeposit={handleOpenDeposit}
          onOpenWithdraw={handleOpenWithdraw}
          onOpenOldWithdraw={handleOpenOldWithdraw}
        />
      )}
      {openStatus === DLG_DEPOSIT && (
        <Deposit
          loading={loading}
          allowance={allowance}
          balance={convertFromWei(balance)}
          staked={convertFromWei(stakedAmount)}
          onClose={handleOpenStake}
          onApprove={handleApprove}
          onDeposit={handleDeposit}
        />
      )}
      {openStatus === DLG_WITHDRAW && (
        <Withdraw
          loading={loading}
          staked={convertFromWei(stakedAmount)}
          onClose={handleOpenStake}
          onWithdraw={handleWithdraw}
        />
      )}
      {openStatus === DLG_OLD_WITHDRAW && (
        <Withdraw
          old
          loading={loading}
          staked={convertFromWei(oldStakedAmount)}
          onClose={handleOpenStake}
          onWithdraw={handleOldWithdraw}
        />
      )}
    </div>
  );
};

export default LPStakingBoard;
