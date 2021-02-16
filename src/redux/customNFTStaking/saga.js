import { all, takeLatest, call, put, fork, takeEvery } from "redux-saga/effects";

import actions from "./actions";

import { getWeb3 } from "../../services/web3";
import {
  getPartnerNFTInstance
} from "../../services/web3/instance";

import {
  // getOwnedCardsCountMultiAsync,
  getOwnedCardsCountAsync,
  getStakedStrengthByAddressAsync,
  getTotalStakedStrengthAsync,
  getClaimableNDRAsync,
  getAllStakedCardsAsync,
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

import { getPartnerCardsAPI } from "../../services/axios/api";

export function* getCustomCards() {
  yield takeEvery(actions.GET_CUSTOM_CARDS, function* () {
    const getCustomCardsAsync = async () =>
      await getPartnerCardsAPI()
        .then((result) => result)
        .catch((error) => error);

    const res = yield call(getCustomCardsAsync);

    if (res.status === 200) {
      const cards = {};
      const cardsResult = res.data.cards;
      Object.keys(cardsResult).forEach((key) => {
        const subCards = cardsResult[key];
        cards[key] = { name: subCards.name, cards: [] };
        subCards.cards.forEach((element) => {
          cards[key].cards.push({ ...element, balance: 0, stakedAmount: 0 });
        })
      });

      yield put({
        type: actions.GET_CUSTOM_CARDS_SUCCESS,
        cards
      });
    }
  });
}

export function* getStakedCards() {
  yield takeEvery(actions.GET_STAKED_CARDS, function* ({ payload }) {

    const { token } = payload;

    const web3 = yield call(getWeb3);
    const partnerNft = getPartnerNFTInstance(web3, token);

    const accounts = yield call(web3.eth.getAccounts);

    // const addresses = Array(cards.length).fill(accounts[0]);
    // const tokenIds = [];
    // cards.forEach((c) => {
    //   tokenIds.push(c.id);
    // });

    // const cardsWithBalance = yield call(getOwnedCardsCountMultiAsync, partnerNft.token.instance, addresses, tokenIds);

    const stakableTokenIds = yield call(getAllStakedCardsAsync, partnerNft.staking.instance);
    const ownedTokens = [];
    for (let i = 0; i < stakableTokenIds.length; i++) {
      const balance = yield call(getOwnedCardsCountAsync, partnerNft.token.instance, accounts[0], stakableTokenIds[i]);
      if (Number(balance) > 0) {
        ownedTokens.push(stakableTokenIds[i]);
      }
    }
    // cardsWithBalance.forEach((c, index) => {
    //   if (Number(c) > 0) {
    //     ownedTokens.push(cards[index].id);
    //   }
    // });
    
    const stakedTokens = [];
    for (let i = 0; i < stakableTokenIds.length; i++) {
      const stakingBalance = yield call(getOwnedCardsCountAsync, partnerNft.staking.instance, stakableTokenIds[i], accounts[0]);
      if (stakingBalance > 0) {
        stakedTokens.push(stakableTokenIds[i]);
      }
    }

    yield put({
      type: actions.GET_STAKED_CARDS_SUCCESS,
      token,
      owned: [...ownedTokens],
      staked: [...stakedTokens]
    });
  });
}

export function* getApprovedStatus() {
  yield takeEvery(actions.GET_APPROVED_STATUS, function* ({ payload }) {
    const { token } = payload;

    const web3 = yield call(getWeb3);
    const partnerNft = getPartnerNFTInstance(web3, token);

    const accounts = yield call(web3.eth.getAccounts);

    const approvedStatusResponse = yield call(
      isApprovedAllAsync,
      partnerNft.token.instance,
      accounts[0],
      partnerNft.staking.address
    );

    yield put({
      type: actions.GET_APPROVED_STATUS_SUCCESS,
      token,
      approved: approvedStatusResponse
    });
  });
}

export function* getMyStakedStrength() {
  yield takeEvery(actions.GET_MY_STAKED_STRENGTH, function* ({ payload }) {
    const { token } = payload;

    const web3 = yield call(getWeb3);
    const partnerNft = getPartnerNFTInstance(web3, token);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const ret = yield call(
      getStakedStrengthByAddressAsync,
      partnerNft.staking.instance,
      accounts[0]
    );

    yield put({
      type: actions.GET_MY_STAKED_STRENGTH_SUCCESS,
      token,
      value: ret,
    });
  });
}

export function* getTotalStakedStrength() {
  yield takeEvery(actions.GET_TOTAL_STAKED_STRENGTH, function* ({ payload }) {
    const { token } = payload;

    const web3 = yield call(getWeb3);
    const partnerNft = getPartnerNFTInstance(web3, token);

    // Get Wallet Account
    const ret = yield call(getTotalStakedStrengthAsync, partnerNft.staking.instance);

    yield put({
      type: actions.GET_TOTAL_STAKED_STRENGTH_SUCCESS,
      token,
      value: ret,
    });
  });
}

export function* getClaimableNDR() {
  yield takeEvery(actions.GET_CLAIMABLE_NDR, function* ({ payload }) {
    const { token } = payload;

    const web3 = yield call(getWeb3);
    const partnerNft = getPartnerNFTInstance(web3, token);

    const accounts = yield call(web3.eth.getAccounts);
    const ret = yield call(getClaimableNDRAsync, partnerNft.staking.instance, accounts[0]);

    yield put({
      type: actions.GET_CLAIMABLE_NDR_SUCCESS,
      token,
      value: ret,
    });
  });
}

export function* getNDRPerDay() {
  yield takeEvery(actions.GET_NDR_PER_DAY, function* ({ payload }) {
    const { token } = payload;

    const web3 = yield call(getWeb3);
    const partnerNft = getPartnerNFTInstance(web3, token);

    const accounts = yield call(web3.eth.getAccounts);

    const rewardRate = yield call(getRewardRateAsync, partnerNft.staking.instance);
    const myStrength = yield call(getStakedStrengthByAddressAsync, partnerNft.staking.instance, accounts[0]);
    const totalStrength = yield call(getTotalStakedStrengthAsync, partnerNft.staking.instance );

    const ndrPerDay = Number(totalStrength) === 0 ? 0 : ((rewardRate * myStrength) / totalStrength) * 86400;

    yield put({
      type: actions.GET_NDR_PER_DAY_SUCCESS,
      token,
      value: ndrPerDay,
    });
  });
}

export function* approveAll() {
  yield takeLatest(actions.APPROVE_ALL, function* ({ payload }) {
    const { token, approved, callback } = payload;

    const web3 = yield call(getWeb3);
    const partnerNft = getPartnerNFTInstance(web3, token);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const approveResponse = yield call(
      approveAllCardsAsync,
      partnerNft.token.instance,
      web3,
      partnerNft.staking.address,
      approved,
      accounts[0]
    );

    if (approveResponse.status) {
      yield put({
        type: actions.GET_APPROVED_STATUS,
        payload: { token },
      });

      callback(RESPONSE.SUCCESS);
    } else {
      callback(RESPONSE.ERROR);
    }
  });
}

export function* unStakeAllCards() {
  yield takeLatest(actions.UNSTAKE_ALL_CARDS, function* ({ payload }) {
    const { token, callback } = payload;

    const web3 = yield call(getWeb3);
    const partnerNft = getPartnerNFTInstance(web3, token);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const unstakeAllCardsResponse = yield call(
      unStakeAllCardsAsync,
      partnerNft.staking.instance,
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
    const { token, callback } = payload;

    const web3 = yield call(getWeb3);
    const partnerNft = getPartnerNFTInstance(web3, token);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const claimFee = yield call(getClaimFeeAsync, partnerNft.staking.instance);
    const claimNDRResponse = yield call(
      claimWithFeeAsync,
      partnerNft.staking.instance,
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

export function* stakeCard() {
  yield takeLatest(actions.STAKE_CARD, function* ({ payload }) {
    const { token, cardIds, callback } = payload;

    // const newCardIds = [];
    // cardIds.forEach(id => {
    //   newCardIds.push(id - 1);
    // });

    const amounts = Array(cardIds.length).fill(1);
    const web3 = yield call(getWeb3);
    const partnerNft = getPartnerNFTInstance(web3, token);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const stakeCardResponse = yield call(
      stakeMultiCardAsync,
      partnerNft.staking.instance,
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

export function* unStakeCard() {
  yield takeLatest(actions.UNSTAKE_CARD, function* ({ payload }) {
    const { token, cardIds, callback } = payload;

    const web3 = yield call(getWeb3);
    const partnerNft = getPartnerNFTInstance(web3, token);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const amounts = Array(cardIds.length).fill(1);

    const unstakeCardResponse = yield call(
      unStakeMultiCardAsync,
      partnerNft.staking.instance,
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

export default function* rootSaga() {
  yield all([
    fork(getCustomCards),
    fork(getStakedCards),
    fork(getApprovedStatus),
    fork(approveAll),
    fork(getMyStakedStrength),
    fork(getTotalStakedStrength),
    fork(getClaimableNDR),
    fork(getNDRPerDay),
    fork(unStakeAllCards),
    fork(claimNDR),
    fork(stakeCard),
    fork(unStakeCard)
  ]);
}
