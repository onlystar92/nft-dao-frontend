import {
  all,
  takeLatest,
  call,
  put,
  fork,
  takeEvery,
} from "redux-saga/effects";

import BigNumber from "bignumber.js";

import actions from "./actions";

import { RESPONSE } from "../../helper/constant";

import { getWeb3 } from "../../services/web3";
import {
  getEarningAsync,
  getBalanceAsync,
  getAllowanceAsync,
  getRewardRateAsync,
  getTotalSupplyAsync,
  approveAsync,
  depositAsync,
  claimAsync,
  exitAsync,
  getReservesAsync,
  getReleaseTimeAsync
} from "../../services/web3/lpStaking";

import { getPairInfo, getTokenInfo } from "../../services/graphql";
import { lookUpPrices } from "../../services/web3";

import { farms } from "../../helper/contractFarm";

import { getFarmInstance } from "../../services/web3/instance";

// Get Token Approve Status
export function* getTokenApproveStatus() {
  yield takeEvery(actions.GET_TOKEN_APPROVE_STATUS, function* ({ payload }) {
    const { token } = payload;

    const web3 = yield call(getWeb3);
    const tokenInstance = getFarmInstance(web3, token);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const allowance = yield call(
      getAllowanceAsync,
      tokenInstance.token.instance,
      accounts[0],
      tokenInstance.staking.address
    );

    yield put({
      type: actions.GET_TOKEN_APPROVE_STATUS_SUCCESS,
      token,
      approved: allowance > 0,
    });
  });
}

// Token balance
export function* getTokenBalance() {
  yield takeEvery(actions.GET_TOKEN_BALANCE, function* ({ payload }) {
    const { token } = payload;

    const web3 = yield call(getWeb3);
    const tokenInstance = getFarmInstance(web3, token);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const balance = yield call(
      getBalanceAsync,
      tokenInstance.token.instance,
      accounts[0]
    );

    yield put({
      type: actions.GET_TOKEN_BALANCE_SUCCESS,
      token,
      balance,
    });
  });
}

// Get Staked Amount
export function* getTokenStakedAmount() {
  yield takeEvery(actions.GET_TOKEN_STAKED_AMOUNT, function* ({ payload }) {
    const { token } = payload;

    const web3 = yield call(getWeb3);
    const tokenInstance = getFarmInstance(web3, token);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const stakedAmount = yield call(
      getBalanceAsync,
      tokenInstance.staking.instance,
      accounts[0]
    );

    yield put({
      type: actions.GET_TOKEN_STAKED_AMOUNT_SUCCESS,
      token,
      staked: stakedAmount,
    });
  });
}

// Get Claimable Amount
export function* getTokenClaimableAmount() {
  yield takeEvery(actions.GET_TOKEN_CLAIMABLE_AMOUNT, function* ({ payload }) {
    const { token } = payload;

    const web3 = yield call(getWeb3);
    const tokenInstance = getFarmInstance(web3, token);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const claimableAmount = yield call(
      getEarningAsync,
      tokenInstance.staking.instance,
      accounts[0]
    );

    yield put({
      type: actions.GET_TOKEN_CLAIMABLE_AMOUNT_SUCCESS,
      token,
      claimable: claimableAmount,
    });
  });
}

// Get Token Stats
export function* getTokenStats() {
  yield takeEvery(actions.GET_TOKEN_STATISTICS, function* ({ payload }) {
    const { token } = payload;

    const web3 = yield call(getWeb3);
    const tokenInstance = getFarmInstance(web3, token);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const ethPrice = (yield call(lookUpPrices, ["ethereum"])).ethereum.usd;

    const stakedAmount = yield call(
      getBalanceAsync,
      tokenInstance.staking.instance,
      accounts[0]
    );
    const rewardRate = yield call(
      getRewardRateAsync,
      tokenInstance.staking.instance,
      accounts[0]
    );
    const totalSupply = yield call(
      getTotalSupplyAsync,
      tokenInstance.staking.instance,
      accounts[0]
    );

    // NDR per day
    const claimablePerDay =
      totalSupply > 0 ? (stakedAmount * rewardRate * 86400) / totalSupply : 0;

    const uniTotalSupply = yield call(
      getTotalSupplyAsync,
      tokenInstance.token.instance
    );

    const totalStakedAmount = yield call(
      getBalanceAsync,
      tokenInstance.token.instance,
      tokenInstance.staking.address
    );

    let apy = 0;

    if (farms[token].locked) {
      // const farm = farms[token].prod;
      // const tokenInfo = yield call(getTokenInfo, farm.token.address);

      // const tokenPrice = tokenInfo.derivedETH * ethPrice;

      apy =
        totalStakedAmount > 0
        ? ((rewardRate * 86400 * 365 * (365 / farms[token].lock_days)) / totalStakedAmount) * 100
          : 0;
    } else if (token === "NDR_SUSHI") {
      const sushiFarm = farms[token].prod;
      const sushiTokenInfo = yield call(getTokenInfo, sushiFarm.token.token0);
      const ndrTokenInfo = yield call(getTokenInfo, sushiFarm.token.token1);

      const sushiLPReserves = yield call(
        getReservesAsync,
        tokenInstance.token.instance
      );

      const stakingTokenPriceEth =
        (sushiTokenInfo.derivedETH * sushiLPReserves._reserve0 +
          ndrTokenInfo.derivedETH * sushiLPReserves._reserve1) /
        Number(uniTotalSupply);

      apy =
        totalStakedAmount > 0
          ? ((rewardRate * 86400 * 365 * ndrTokenInfo.derivedETH * ethPrice) /
              (stakingTokenPriceEth * totalStakedAmount * ethPrice)) *
            100
          : 0;
    } else {
      const pairtokenInfo = yield call(
        getPairInfo,
        tokenInstance.token.prodAddress
      );

      let ndrPrice = pairtokenInfo.token0.derivedETH * ethPrice;

      if (token === "NDR_GHST") {
        ndrPrice = pairtokenInfo.token1.derivedETH * ethPrice;
      }

      const stakingTokenPriceEth =
        (pairtokenInfo.token0.derivedETH * pairtokenInfo.reserve0 +
          pairtokenInfo.token1.derivedETH * pairtokenInfo.reserve1) /
        (Number(uniTotalSupply) / Math.pow(10, 18));

      // console.log("stakingTokenPrice", stakingTokenPriceEth * ethPrice);
      // console.log("ndr price", pairtokenInfo.token0.derivedETH * ethPrice);
      // console.log("totalStakedAmount", totalStakedAmount);
      // console.log(
      //   "rewardRate",
      //   rewardRate,
      //   (rewardRate * 86400 * 365 * ndrPrice) / Math.pow(10, 18)
      // );

      apy =
        totalStakedAmount > 0
          ? ((rewardRate * 86400 * 365 * ndrPrice) /
              totalStakedAmount /
              stakingTokenPriceEth /
              ethPrice) *
            100
          : 0;
    }

    yield put({
      type: actions.GET_TOKEN_STATISTICS_SUCCESS,
      token,
      stats: {
        apy,
        rewardPerDay: claimablePerDay,
      },
    });
  });
}

// Get Release Time
export function* getReleaseTime() {
  yield takeEvery(actions.GET_RELEASE_TIME, function* ({ payload }) {
    const { token, callback } = payload;

    const web3 = yield call(getWeb3);
    const tokenInstance = getFarmInstance(web3, token);

    const releaseTime = yield call(
      getReleaseTimeAsync,
      tokenInstance.staking.instance,
    );

    const releaseDate = new Date(releaseTime * 1000);
    const dateStr = releaseDate.toLocaleDateString();

    const currentTime = new Date().getTime();

    const allowed = currentTime >= releaseTime * 1000 ? true : false;

    callback(dateStr, allowed);
  });
}

export function* approveToken() {
  yield takeLatest(actions.APPROVE_TOKEN, function* ({ payload }) {
    const { token, callback } = payload;

    const web3 = yield call(getWeb3);
    const tokenInstance = getFarmInstance(web3, token);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    // Check balance
    const tokenBalance = yield call(
      getBalanceAsync,
      tokenInstance.token.instance,
      accounts[0]
    );

    if (tokenBalance <= 0) {
      callback(RESPONSE.INSUFFICIENT);
      return;
    }

    // Approve
    const approveResult = yield call(
      approveAsync,
      tokenInstance.token.instance,
      web3,
      tokenBalance,
      accounts[0],
      tokenInstance.staking.address
    );

    if (approveResult.status) {
      yield put({
        type: actions.GET_TOKEN_APPROVE_STATUS,
        payload: { token },
      });

      callback(RESPONSE.SUCCESS);
    } else {
      callback(RESPONSE.ERROR);
    }
  });
}

export function* stakeToken() {
  yield takeLatest(actions.STAKE_TOKEN, function* ({ payload }) {
    const { token, amount, isMax, callback } = payload;

    const web3 = yield call(getWeb3);
    const tokenInstance = getFarmInstance(web3, token);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    // Check balance
    const tokenBalance = yield call(
      getBalanceAsync,
      tokenInstance.token.instance,
      accounts[0]
    );

    const stakeAmount = isMax
      ? new BigNumber(tokenBalance)
      : new BigNumber(amount).times(new BigNumber(10).pow(18));

    if (new BigNumber(tokenBalance).comparedTo(stakeAmount) === -1) {
      callback(RESPONSE.INSUFFICIENT);
      return;
    }

    // Check Allowance
    const tokenAllowance = yield call(
      getAllowanceAsync,
      tokenInstance.token.instance,
      accounts[0],
      tokenInstance.staking.address
    );

    if (new BigNumber(tokenAllowance).comparedTo(stakeAmount) === -1) {
      callback(RESPONSE.SHOULD_APPROVE);
      return;
    }

    const stakeResult = yield call(
      depositAsync,
      tokenInstance.staking.instance,
      web3,
      stakeAmount,
      accounts[0]
    );

    // console.log("deposit Result", depositResult);
    if (stakeResult.status) {
      callback(RESPONSE.SUCCESS);
    } else {
      callback(RESPONSE.ERROR);
    }
  });
}

export function* claimToken() {
  yield takeLatest(actions.CLIAM_TOKEN, function* ({ payload }) {
    const { token, callback } = payload;

    const web3 = yield call(getWeb3);
    const tokenInstance = getFarmInstance(web3, token);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const claimResponse = yield call(
      claimAsync,
      tokenInstance.staking.instance,
      web3,
      accounts[0]
    );

    if (claimResponse.status) {
      callback(RESPONSE.SUCCESS);
    } else {
      callback(RESPONSE.ERROR);
    }
  });
}

export function* exitToken() {
  yield takeLatest(actions.EXIT_TOKEN, function* ({ payload }) {
    const { token, callback } = payload;

    const web3 = yield call(getWeb3);
    const tokenInstance = getFarmInstance(web3, token);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const exitResponse = yield call(
      exitAsync,
      tokenInstance.staking.instance,
      web3,
      accounts[0]
    );

    if (exitResponse.status) {
      callback(RESPONSE.SUCCESS);
    } else {
      callback(RESPONSE.ERROR);
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(getTokenBalance),
    fork(getTokenStakedAmount),
    fork(getTokenApproveStatus),
    fork(getTokenClaimableAmount),
    fork(getTokenStats),
    fork(getReleaseTime),
    fork(approveToken),
    fork(stakeToken),
    fork(claimToken),
    fork(exitToken),
  ]);
}
