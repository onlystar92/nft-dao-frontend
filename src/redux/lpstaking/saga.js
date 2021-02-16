import { all, takeLatest, call, put, fork } from "redux-saga/effects";

import BigNumber from "bignumber.js";

import actions from "./actions";

import { PROD_UNISWAPV2PAIR_ADDRESS } from "../../helper/contract";
import { RESPONSE } from "../../helper/constant";

import { getWeb3 } from "../../services/web3";
import {
  getEarningAsync,
  getBalanceAsync,
  getAllowanceAsync,
  depositAsync,
  withdrawAsync,
  approveAsync,
  getTotalSupplyAsync,
} from "../../services/web3/lpStaking";

import { getPairInfo } from "../../services/graphql";
import { lookUpPrices } from "../../services/web3";

import {
  getLPStakingInstance,
  getOldLPStakingInstance,
  getNDRInstance,
  getUniInstance,
} from "../../services/web3/instance";

// Get LPToken Allowance
export function* getLPTokenAllowance() {
  yield takeLatest(actions.GET_ALLOWANCE_LP_TOKEN, function* ({ payload }) {
    const web3 = yield call(getWeb3);

    const uni = getUniInstance(web3);
    const lpStaking = getLPStakingInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const allowance = yield call(
      getAllowanceAsync,
      uni.instance,
      accounts[0],
      lpStaking.address
    );

    yield put({
      type: actions.GET_ALLOWANCE_LP_TOKEN_SUCCESS,
      allowance: allowance,
    });
  });
}

// NDR balanec
export function* getNDRBalance() {
  yield takeLatest(actions.GET_NDR_BALANCE, function* () {
    const web3 = yield call(getWeb3);
    const ndr = getNDRInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const ndrBalance = yield call(getBalanceAsync, ndr.instance, accounts[0]);

    yield put({
      type: actions.GET_NDR_BALANCE_SUCCESS,
      ndrBalance: ndrBalance,
    });
  });
}

// LPToken Balance
export function* getLPTokenBalance() {
  yield takeLatest(actions.GET_LPTOKEN_BALANCE, function* () {
    const web3 = yield call(getWeb3);
    const uni = getUniInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const lpTokenBalance = yield call(
      getBalanceAsync,
      uni.instance,
      accounts[0]
    );

    yield put({
      type: actions.GET_LPTOKEN_BALANCE_SUCCESS,
      lpTokenBalance: lpTokenBalance,
    });
  });
}

// Get Staked Amound
export function* getStakedAmount() {
  yield takeLatest(actions.GET_STAKED_AMOUNT, function* () {
    const web3 = yield call(getWeb3);
    const lpStaking = getLPStakingInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const stakedAmount = yield call(
      getBalanceAsync,
      lpStaking.instance,
      accounts[0]
    );

    yield put({
      type: actions.GET_STAKED_AMOUNT_SUCCESS,
      stakedAmount: stakedAmount,
    });
  });
}

export function* getOldStakedAmount() {
  yield takeLatest(actions.GET_OLD_STAKED_AMOUNT, function* ({ payload }) {
    const web3 = yield call(getWeb3);
    const oldLpStaking = getOldLPStakingInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const oldStakedAmount = yield call(
      getBalanceAsync,
      oldLpStaking.instance,
      accounts[0]
    );

    yield put({
      type: actions.GET_OLD_STAKED_AMOUNT_SUCCESS,
      oldStakedAmount: oldStakedAmount,
    });
  });
}

// Get Earning
export function* getEarningAmount() {
  yield takeLatest(actions.GET_EARNING_AMOUNT, function* ({ payload }) {
    const web3 = yield call(getWeb3);
    const lpStaking = getLPStakingInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const earningAmount = yield call(
      getEarningAsync,
      lpStaking.instance,
      accounts[0]
    );

    yield put({
      type: actions.GET_EARNING_AMOUNT_SUCCESS,
      earningAmount: earningAmount,
    });
  });
}

export function* approveLP() {
  yield takeLatest(actions.APPROVE_LP, function* ({ payload }) {
    const { callback } = payload;

    const web3 = yield call(getWeb3);
    const uni = getUniInstance(web3);
    const lpStaking = getLPStakingInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    // Check balance
    const lpBalance = yield call(getBalanceAsync, uni.instance, accounts[0]);

    if (lpBalance <= 0) {
      callback(RESPONSE.INSUFFICIENT);
      return;
    }

    // Approve
    const approveResult = yield call(
      approveAsync,
      uni.instance,
      web3,
      lpBalance,
      accounts[0],
      lpStaking.address
    );

    // console.log("approve result", approveResult);
    if (approveResult.status) {
      callback(RESPONSE.SUCCESS);
    } else {
      callback(RESPONSE.ERROR);
    }
  });
}

export function* depositLP() {
  yield takeLatest(actions.DEPOSIT_LP, function* ({ payload }) {
    const { amount, isMax, callback } = payload;

    const web3 = yield call(getWeb3);

    const lpStaking = getLPStakingInstance(web3);
    const uni = getUniInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    // Check balance
    const lpTokenBalance = yield call(
      getBalanceAsync,
      uni.instance,
      accounts[0]
    );

    const stakeAmount = isMax
      ? new BigNumber(lpTokenBalance)
      : new BigNumber(amount).times(new BigNumber(10).pow(18));

    if (new BigNumber(lpTokenBalance).comparedTo(stakeAmount) === -1) {
      callback(RESPONSE.INSUFFICIENT);
      return;
    }

    // Check Allowance
    const uniAllowance = yield call(
      getAllowanceAsync,
      uni.instance,
      accounts[0],
      lpStaking.address
    );

    if (new BigNumber(uniAllowance).comparedTo(stakeAmount) === -1) {
      callback(RESPONSE.SHOULD_APPROVE);
      return;
    }

    const depositResult = yield call(
      depositAsync,
      lpStaking.instance,
      web3,
      stakeAmount,
      accounts[0]
    );

    // console.log("deposit Result", depositResult);
    if (depositResult.status) {
      callback(RESPONSE.SUCCESS);
    } else {
      callback(RESPONSE.ERROR);
    }
  });
}

export function* withdrawLP() {
  yield takeLatest(actions.WITHDRAW_LP, function* ({ payload }) {
    const { amount, isMax, callback } = payload;

    const web3 = yield call(getWeb3);

    const lpStaking = getLPStakingInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    // Check staked amount
    const lpBalance = yield call(
      getBalanceAsync,
      lpStaking.instance,
      accounts[0]
    );

    const unstakeAmount = isMax
      ? new BigNumber(lpBalance)
      : new BigNumber(amount).times(new BigNumber(10).pow(18));

    if (new BigNumber(lpBalance).comparedTo(unstakeAmount) === -1) {
      callback(RESPONSE.SHOULD_STAKE);
      return;
    }

    const withdrawResult = yield call(
      withdrawAsync,
      lpStaking.instance,
      web3,
      unstakeAmount,
      accounts[0]
    );

    if (withdrawResult.status) {
      callback(RESPONSE.SUCCESS);
    } else {
      callback(RESPONSE.ERROR);
    }
  });
}

export function* withdrawOldLP() {
  yield takeLatest(actions.WITHDRAW_OLD_LP, function* ({ payload }) {
    const { amount, isMax, callback } = payload;

    const web3 = yield call(getWeb3);

    const oldLpStaking = getOldLPStakingInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    // Check staked amount
    const lpBalance = yield call(
      getBalanceAsync,
      oldLpStaking.instance,
      accounts[0]
    );

    const unstakeAmount = isMax
      ? new BigNumber(lpBalance)
      : new BigNumber(amount).times(new BigNumber(10).pow(18));

    if (new BigNumber(lpBalance).comparedTo(unstakeAmount) === -1) {
      callback(RESPONSE.SHOULD_STAKE);
      return;
    }

    const withdrawResult = yield call(
      withdrawAsync,
      oldLpStaking.instance,
      web3,
      unstakeAmount,
      accounts[0]
    );

    if (withdrawResult.status) {
      callback(RESPONSE.SUCCESS);
    } else {
      callback(RESPONSE.ERROR);
    }
  });
}

export function* getStatistics() {
  yield takeLatest(actions.GET_STATISTICS, function* () {
    const web3 = yield call(getWeb3);
    const uni = getUniInstance(web3);
    const lp = getLPStakingInstance(web3);

    const ethPrice = (yield call(lookUpPrices, ["ethereum"])).ethereum.usd;

    const pairtokenInfo = yield call(getPairInfo, PROD_UNISWAPV2PAIR_ADDRESS);

    const uniTotalSupply = yield call(getTotalSupplyAsync, uni.instance);

    const stakingTokenPriceEth =
      (pairtokenInfo.token0.derivedETH * pairtokenInfo.reserve0 +
        pairtokenInfo.token1.derivedETH * pairtokenInfo.reserve1) /
      (Number(uniTotalSupply) / Math.pow(10, 18)) /
      2;
    const stakingTokenPriceNDR =
      (stakingTokenPriceEth * pairtokenInfo.reserve0) / pairtokenInfo.reserve1;

    // console.log(
    //   ethPrice,
    //   pairtokenInfo,
    //   uniTotalSupply,
    //   stakingTokenPriceEth,
    //   stakingTokenPriceNDR
    // );

    // Get TVL
    const lockedAmount = yield call(getBalanceAsync, uni.instance, lp.address);
    const stakingTokenPrice =
      (pairtokenInfo.token0.derivedETH * ethPrice * pairtokenInfo.reserve0 +
        pairtokenInfo.token1.derivedETH * ethPrice * pairtokenInfo.reserve1) /
      (Number(uniTotalSupply) / Math.pow(10, 18));

    const tvl = (stakingTokenPrice * lockedAmount) / Math.pow(10, 18);

    // console.log(lockedAmount, tvl);

    yield put({
      type: actions.GET_STATISTICS_SUCCESS,
      stat: {
        tvl: tvl.toLocaleString("en-US", { maximumFractionDigits: 2 }),
        lpPriceNDR: stakingTokenPriceNDR.toFixed(3),
        lpPriceETH: stakingTokenPriceEth.toFixed(3),
      },
    });
  });
}

export default function* rootSaga() {
  yield all([
    fork(getNDRBalance),
    fork(approveLP),
    fork(depositLP),
    fork(withdrawLP),
    fork(withdrawOldLP),
    fork(getStakedAmount),
    fork(getOldStakedAmount),
    fork(getEarningAmount),
    fork(getLPTokenBalance),
    fork(getLPTokenAllowance),
    fork(getStatistics),
  ]);
}
