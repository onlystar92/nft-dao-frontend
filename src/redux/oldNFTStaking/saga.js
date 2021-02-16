import { all, takeLatest, call, put, fork, takeEvery } from "redux-saga/effects";

import actions from "./actions";
import cardActions from "../cards/actions";

import { getWeb3 } from "../../services/web3";
import {
  getOldNFTInstance,
  getOldNFTStakingInstance,
} from "../../services/web3/instance";

import {
  getOwnedCardsCountAsync,
  getStakedStrengthByAddressAsync,
  getTotalStakedStrengthAsync,
  getClaimableNDRAsync,
  getStakedCardsAsync,
  isApprovedAllAsync,
  approveAllCardsAsync,
  unStakeCardAsync,
  unStakeAllCardsAsync,
  stakeCardAsync,
} from "../../services/web3/cards";

import { getRewardRateAsync, claimAsync } from "../../services/web3/lpStaking";

import {
  RESPONSE,
} from "../../helper/constant";

export function* getMyCardsCount() {
  yield takeLatest(actions.GET_MY_CARDS_COUNT, function* ({ payload }) {
    const { cards } = payload;

    const web3 = yield call(getWeb3);
    const oldNft = getOldNFTInstance(web3);

    const accounts = yield call(web3.eth.getAccounts);

    const newCards = [...cards];
    for (let i = 0; i < cards.length; i++){
      const ownedCount = yield call(getOwnedCardsCountAsync, oldNft.instance, accounts[0], cards[i].id);
      newCards[i].owned = ownedCount;
    }

    yield put({
      type: cardActions.GET_CARDS_SUCCESS,
      cards: newCards,
    });
  });
}

export function* getApprovedStatus() {
  yield takeEvery(actions.GET_APPROVED_STATUS, function* ({ payload }) {
    const { callback } = payload;

    const web3 = yield call(getWeb3);
    const oldNft = getOldNFTInstance(web3);
    const oldNftStaking = getOldNFTStakingInstance(web3);

    const accounts = yield call(web3.eth.getAccounts);

    const approvedStatusResponse = yield call(
      isApprovedAllAsync,
      oldNft.instance,
      accounts[0],
      oldNftStaking.address
    );

    callback(approvedStatusResponse);
  });
}

export function* getMyStakedStrength() {
  yield takeLatest(actions.GET_MY_STAKED_STRENGTH, function* () {
    const web3 = yield call(getWeb3);
    const oldNftStaking = getOldNFTStakingInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const ret = yield call(
      getStakedStrengthByAddressAsync,
      oldNftStaking.instance,
      accounts[0]
    );

    yield put({
      type: actions.GET_MY_STAKED_STRENGTH_SUCCESS,
      myStakedStrength: ret,
    });
  });
}

export function* getTotalStakedStrength() {
  yield takeLatest(actions.GET_TOTAL_STAKED_STRENGTH, function* () {
    const web3 = yield call(getWeb3);
    const oldNftStaking = getOldNFTStakingInstance(web3);

    // Get Wallet Account
    const ret = yield call(getTotalStakedStrengthAsync, oldNftStaking.instance);

    yield put({
      type: actions.GET_TOTAL_STAKED_STRENGTH_SUCCESS,
      totalStakedStrength: ret,
    });
  });
}

export function* getClaimableNDR() {
  yield takeLatest(actions.GET_CLAIMABLE_NDR, function* () {
    const web3 = yield call(getWeb3);
    const oldNftStaking = getOldNFTStakingInstance(web3);

    const accounts = yield call(web3.eth.getAccounts);
    const ret = yield call(
      getClaimableNDRAsync,
      oldNftStaking.instance,
      accounts[0]
    );

    yield put({
      type: actions.GET_CLAIMABLE_NDR_SUCCESS,
      claimableNDR: ret,
    });
  });
}

export function* getNDRPerDay() {
  yield takeLatest(actions.GET_NDR_PER_DAY, function* () {
    const web3 = yield call(getWeb3);
    const oldNftStaking = getOldNFTStakingInstance(web3);

    const accounts = yield call(web3.eth.getAccounts);

    const rewardRate = yield call(getRewardRateAsync, oldNftStaking.instance);
    const myStrength = yield call(
      getStakedStrengthByAddressAsync,
      oldNftStaking.instance,
      accounts[0]
    );
    const totalStrength = yield call(
      getTotalStakedStrengthAsync,
      oldNftStaking.instance
    );

    const ndrPerDay = ((rewardRate * myStrength) / totalStrength) * 86400;

    yield put({
      type: actions.GET_NDR_PER_DAY_SUCCESS,
      ndrPerDay: ndrPerDay,
    });
  });
}

export function* getStakedCards() {
  yield takeLatest(actions.GET_STAKED_CARDS, function* () {
    const web3 = yield call(getWeb3);
    const oldNftStaking = getOldNFTStakingInstance(web3);

    const accounts = yield call(web3.eth.getAccounts);
    const ret = yield call(
      getStakedCardsAsync,
      oldNftStaking.instance,
      accounts[0]
    );

    yield put({
      type: actions.GET_STAKED_CARDS_SUCCESS,
      stakedCardTokens: ret,
    });
  });
}

export function* unStakeCard() {
  yield takeLatest(actions.UNSTAKE_CARD, function* ({ payload }) {
    const { cardId, callback } = payload;

    const web3 = yield call(getWeb3);
    const oldNftStaking = getOldNFTStakingInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const unstakeCardResponse = yield call(
      unStakeCardAsync,
      oldNftStaking.instance,
      web3,
      cardId,
      accounts[0]
    );

    if (unstakeCardResponse.status) {
      callback(RESPONSE.SUCCESS);
    } else {
      callback(RESPONSE.ERROR);
    }
  });
}

export function* unStakeAllCards() {
  yield takeLatest(actions.UNSTAKE_ALL_CARDS, function* ({ payload }) {
    const { callback } = payload;

    const web3 = yield call(getWeb3);
    const oldNftStaking = getOldNFTStakingInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const unstakeAllCardsResponse = yield call(
      unStakeAllCardsAsync,
      oldNftStaking.instance,
      web3,
      accounts[0]
    );

    if (unstakeAllCardsResponse.status) {
      callback(RESPONSE.SUCCESS);
    } else {
      callback(RESPONSE.ERROR);
    }
  });
}

export function* claimNDR() {
  yield takeLatest(actions.CLAIM_NDR, function* ({ payload }) {
    const { callback } = payload;

    const web3 = yield call(getWeb3);
    const oldNftStaking = getOldNFTStakingInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const claimNDRResponse = yield call(
      claimAsync,
      oldNftStaking.instance,
      web3,
      accounts[0]
    );

    if (claimNDRResponse.status) {
      callback(RESPONSE.SUCCESS);
    } else {
      callback(RESPONSE.ERROR);
    }
  });
}

export function* approveAll() {
  yield takeLatest(actions.APPROVE_ALL, function* ({ payload }) {
    const { approved, callback } = payload;

    const web3 = yield call(getWeb3);
    const oldNft = getOldNFTInstance(web3);
    const oldNftStaking = getOldNFTStakingInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const approveResponse = yield call(
      approveAllCardsAsync,
      oldNft.instance,
      web3,
      oldNftStaking.address,
      approved,
      accounts[0]
    );

    if (approveResponse.status) {
      callback(RESPONSE.SUCCESS);
    } else {
      callback(RESPONSE.ERROR);
    }
  });
}

export function* stakeCard() {
  yield takeLatest(actions.STAKE_CARD, function* ({ payload }) {
    const { cardId, callback } = payload;

    const web3 = yield call(getWeb3);
    const oldNftStaking = getOldNFTStakingInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const stakeCardResponse = yield call(
      stakeCardAsync,
      oldNftStaking.instance,
      web3,
      cardId,
      accounts[0]
    );

    if (stakeCardResponse.status) {
      callback(RESPONSE.SUCCESS);
    } else {
      callback(RESPONSE.ERROR);
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(getMyCardsCount),
    fork(getMyStakedStrength),
    fork(getTotalStakedStrength),
    fork(getClaimableNDR),
    fork(getNDRPerDay),
    fork(getStakedCards),
    fork(unStakeCard),
    fork(unStakeAllCards),
    fork(claimNDR),
    fork(approveAll),
    fork(getApprovedStatus),
    fork(stakeCard),
  ]);
}
