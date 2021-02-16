import { all, takeLatest, call, put, fork, takeEvery } from "redux-saga/effects";

import actions from "./actions";
import cardActions from "../cards/actions";

import { getWeb3 } from "../../services/web3";
import {
  getNFTInstance,
  getNFTStakingInstance,
} from "../../services/web3/instance";

import {
  getOwnedCardsCountAsync,
  getStakedStrengthByAddressAsync,
  getTotalStakedStrengthAsync,
  getClaimableNDRAsync,
  getAllStakedCardsAsync,
  getStakedCountByTokenIdAsync,
  isApprovedAllAsync,
  approveAllCardsAsync,
  unStakeMultiCardAsync,
  unStakeAllCardsAsync,
  stakeMultiCardAsync,
  getClaimFeeAsync
} from "../../services/web3/cards";

import { getRewardRateAsync, claimWithFeeAsync } from "../../services/web3/lpStaking";

import {
  RESPONSE,
} from "../../helper/constant";

export function* getMyCardsCount() {
  yield takeLatest(actions.GET_MY_CARDS_COUNT, function* ({ payload }) {
    const { cards } = payload;

    const web3 = yield call(getWeb3);
    const nft = getNFTInstance(web3);

    const accounts = yield call(web3.eth.getAccounts);

    const newCards = [...cards];
    for (let i = 0; i < cards.length; i++) {
      const ownedCount = yield call(getOwnedCardsCountAsync, nft.instance, accounts[0], cards[i].id);
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
    const nft = getNFTInstance(web3);
    const nftStaking = getNFTStakingInstance(web3);

    const accounts = yield call(web3.eth.getAccounts);

    const approvedStatusResponse = yield call(
      isApprovedAllAsync,
      nft.instance,
      accounts[0],
      nftStaking.address
    );

    callback(approvedStatusResponse);
  });
}

export function* getMyStakedStrength() {
  yield takeLatest(actions.GET_MY_STAKED_STRENGTH, function* () {
    const web3 = yield call(getWeb3);
    const nftStaking = getNFTStakingInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const ret = yield call(
      getStakedStrengthByAddressAsync,
      nftStaking.instance,
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
    const nftStaking = getNFTStakingInstance(web3);

    // Get Wallet Account
    const ret = yield call(getTotalStakedStrengthAsync, nftStaking.instance);

    yield put({
      type: actions.GET_TOTAL_STAKED_STRENGTH_SUCCESS,
      totalStakedStrength: ret,
    });
  });
}

export function* getClaimableNDR() {
  yield takeLatest(actions.GET_CLAIMABLE_NDR, function* () {
    const web3 = yield call(getWeb3);
    const nftStaking = getNFTStakingInstance(web3);

    const accounts = yield call(web3.eth.getAccounts);
    const ret = yield call(
      getClaimableNDRAsync,
      nftStaking.instance,
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
    const nftStaking = getNFTStakingInstance(web3);

    const accounts = yield call(web3.eth.getAccounts);

    const rewardRate = yield call(getRewardRateAsync, nftStaking.instance);
    const myStrength = yield call(
      getStakedStrengthByAddressAsync,
      nftStaking.instance,
      accounts[0]
    );
    const totalStrength = yield call(
      getTotalStakedStrengthAsync,
      nftStaking.instance
    );

    const ndrPerDay = Number(totalStrength) === 0 ? 0 : ((rewardRate * myStrength) / totalStrength) * 86400;

    yield put({
      type: actions.GET_NDR_PER_DAY_SUCCESS,
      ndrPerDay: ndrPerDay,
    });
  });
}

export function* getStakedCards() {
  yield takeLatest(actions.GET_STAKED_CARDS, function* () {
    const web3 = yield call(getWeb3);
    const nftStaking = getNFTStakingInstance(web3);

    const accounts = yield call(web3.eth.getAccounts);

    const myStakedCards = [];

    const allStakedCards = yield call(getAllStakedCardsAsync, nftStaking.instance);
    for (let i = 0; i < allStakedCards.length; i++) {
      const cnt = yield call(getStakedCountByTokenIdAsync, nftStaking.instance, allStakedCards[i], accounts[0]);
      if (cnt > 0) {
        myStakedCards.push(allStakedCards[i]);
      }
    }

    yield put({
      type: actions.GET_STAKED_CARDS_SUCCESS,
      stakedCardTokens: myStakedCards,
    });
  });
}

export function* unStakeCard() {
  yield takeLatest(actions.UNSTAKE_CARD, function* ({ payload }) {
    const { cardIds, callback } = payload;

    const web3 = yield call(getWeb3);
    const nftStaking = getNFTStakingInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const amounts = Array(cardIds.length).fill(1);

    const unstakeCardResponse = yield call(
      unStakeMultiCardAsync,
      nftStaking.instance,
      web3,
      cardIds,
      amounts,
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
    const nftStaking = getNFTStakingInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const unstakeAllCardsResponse = yield call(
      unStakeAllCardsAsync,
      nftStaking.instance,
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
    const nftStaking = getNFTStakingInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const claimFee = yield call(getClaimFeeAsync, nftStaking.instance);
    const claimNDRResponse = yield call(
      claimWithFeeAsync,
      nftStaking.instance,
      web3,
      claimFee,
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
    const nft = getNFTInstance(web3);
    const nftStaking = getNFTStakingInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const approveResponse = yield call(
      approveAllCardsAsync,
      nft.instance,
      web3,
      nftStaking.address,
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
    const { cardIds, callback } = payload;

    // const newCardIds = [];
    // cardIds.forEach(id => {
    //   newCardIds.push(id - 1);
    // });

    const amounts = Array(cardIds.length).fill(1);
    const web3 = yield call(getWeb3);
    const nftStaking = getNFTStakingInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const stakeCardResponse = yield call(
      stakeMultiCardAsync,
      nftStaking.instance,
      web3,
      cardIds,
      amounts,
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
