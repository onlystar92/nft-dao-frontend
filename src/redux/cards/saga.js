import { all, takeLatest, call, put, fork } from "redux-saga/effects";

import actions from "./actions";

import { PROD_NDR_ADDRESS } from "../../helper/contract";

import { getWeb3, getGasPrice } from "../../services/web3";
import {
  getLPStakingInstance,
  getNFTStakingInstance,
  getNFTInstance,
} from "../../services/web3/instance";

import {
  getHeroPriceAsync,
  getSupportPriceAsync,
  getCirculatingSupplyAsync,
  getTotalStakedStrengthAsync,
} from "../../services/web3/cards";

import {
  getEarningAsync,
  getRewardRateAsync,
} from "../../services/web3/lpStaking";
import { getTokenInfo } from "../../services/graphql";

import {
  CARD_RARITY,
  CARD_HASH_PRICE_UNIT,
  CARD_TYPE,
  RESPONSE,
} from "../../helper/constant";
import {
  CARD_STRENGTH_MULTIPLIER,
  getGasFee
} from "../../helper/contract";
import { cardCompare, getCardType } from "../../helper/utils";
import { getCardsAPI } from "../../services/axios/api";

export function* getCards() {
  yield takeLatest(actions.GET_CARDS, function* () {
    const getCardsAsync = async () =>
      await getCardsAPI()
        .then((result) => result)
        .catch((error) => error);

    const res = yield call(getCardsAsync);

    if (res.status === 200) {
      const cards = [];
      res.data.cards.forEach((element) => {
        cards.push({ ...element, minted: 0, owned: 0, apy: 0 });
      });

      cards.sort(cardCompare);

      yield put({
        type: actions.GET_MINTED_COUNT,
        payload: { cards },
      });
    }
  });
}

export function* getCardsPrice() {
  yield takeLatest(actions.GET_CARDS_PRICE, function* () {
    const web3 = yield call(getWeb3);
    const lpStaking = getLPStakingInstance(web3);

    const cardPrice = {
      [CARD_RARITY.BASIC]: {
        hero: 0,
        support: 0,
      },
      [CARD_RARITY.COMMON]: {
        hero: 0,
        support: 0,
      },
      [CARD_RARITY.RARE]: {
        hero: 0,
        support: 0,
      },
      [CARD_RARITY.EPIC]: {
        hero: 0,
        support: 0,
      },
      [CARD_RARITY.LEGENDARY]: {
        hero: 0,
        support: 0,
      },
    };

    cardPrice[CARD_RARITY.BASIC].hero = yield call(
      getHeroPriceAsync,
      lpStaking.instance,
      CARD_RARITY.BASIC
    );
    cardPrice[CARD_RARITY.BASIC].support = yield call(
      getSupportPriceAsync,
      lpStaking.instance,
      CARD_RARITY.BASIC
    );

    cardPrice[CARD_RARITY.COMMON].hero = yield call(
      getHeroPriceAsync,
      lpStaking.instance,
      CARD_RARITY.COMMON
    );
    cardPrice[CARD_RARITY.COMMON].support = yield call(
      getSupportPriceAsync,
      lpStaking.instance,
      CARD_RARITY.COMMON
    );

    cardPrice[CARD_RARITY.RARE].hero = yield call(
      getHeroPriceAsync,
      lpStaking.instance,
      CARD_RARITY.RARE
    );
    cardPrice[CARD_RARITY.RARE].support = yield call(
      getSupportPriceAsync,
      lpStaking.instance,
      CARD_RARITY.RARE
    );

    cardPrice[CARD_RARITY.EPIC].hero = yield call(
      getHeroPriceAsync,
      lpStaking.instance,
      CARD_RARITY.EPIC
    );
    cardPrice[CARD_RARITY.EPIC].support = yield call(
      getSupportPriceAsync,
      lpStaking.instance,
      CARD_RARITY.EPIC
    );

    cardPrice[CARD_RARITY.LEGENDARY].hero = yield call(
      getHeroPriceAsync,
      lpStaking.instance,
      CARD_RARITY.LEGENDARY
    );
    cardPrice[CARD_RARITY.LEGENDARY].support = yield call(
      getSupportPriceAsync,
      lpStaking.instance,
      CARD_RARITY.LEGENDARY
    );

    yield put({
      type: actions.GET_CARDS_PRICE_SUCCESS,
      cardPrice: cardPrice,
    });
  });
}

export function* getCardsApy() {
  yield takeLatest(actions.GET_CARDS_APY, function* ({ payload }) {
    const web3 = yield call(getWeb3);

    const nftStaking = getNFTStakingInstance(web3);

    const { cards, cardPrice } = payload;
    const cardsApy = [];

    cards.forEach((card) => {
      const cardType = getCardType(card);

      if (
        cardsApy.findIndex(
          (element) =>
            element.type === cardType &&
            element.rarity === card.rarity.weight &&
            element.strength === card.strength
        ) === -1
      ) {
        cardsApy.push({
          type: cardType,
          rarity: card.rarity.weight,
          strength: card.strength,
          price: cardPrice[card.rarity.weight][cardType],
          apy: 0,
        });
      }
    });

    const rewardRate = yield call(getRewardRateAsync, nftStaking.instance);
    const totalStrength = yield call(
      getTotalStakedStrengthAsync,
      nftStaking.instance
    );

    const ndrTokenInfo = yield call(getTokenInfo, PROD_NDR_ADDRESS);
    const ndrEthPrice = parseFloat(ndrTokenInfo.derivedETH).toFixed(4);

    cardsApy.forEach((card, index) => {
      const ndrPerDay =
        Number(totalStrength) === 0
          ? 0
          : ((rewardRate * card.strength) /
              (totalStrength / CARD_STRENGTH_MULTIPLIER)) *
            86400;
      const apy = ((ndrPerDay * ndrEthPrice * 365) / card.price) * 100;
      cardsApy[index].apy = apy.toFixed(2);
      cardsApy[index].ndrPerDay = (ndrPerDay / Math.pow(10, 18)).toFixed(4);
    });

    yield put({
      type: actions.GET_CARDS_APY_SUCCESS,
      cardsApy: cardsApy,
    });
  });
}

export function* getMintedCount() {
  yield takeLatest(actions.GET_MINTED_COUNT, function* ({ payload }) {
    const { cards } = payload;

    const web3 = yield call(getWeb3);
    const nft = getNFTInstance(web3);

    const newCards = [...cards];
    for (let i = 0; i < cards.length; i++) {
      const mintedCount = yield call(
        getCirculatingSupplyAsync,
        nft.instance,
        cards[i].id
      );
      newCards[i].minted = mintedCount;
    }

    yield put({
      type: actions.GET_CARDS_SUCCESS,
      cards: newCards,
    });
  });
}

export function* buyHeroCardEth() {
  yield takeLatest(actions.BUY_HERO_CARD_ETH, function* ({ payload }) {
    const { card, callback } = payload;

    const web3 = yield call(getWeb3);
    const lpStaking = getLPStakingInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);
    const ethBalance = yield call(web3.eth.getBalance, accounts[0]);

    let cardPriceEth;
    if (CARD_TYPE.HERO.includes(card.series)) {
      cardPriceEth = yield call(
        getHeroPriceAsync,
        lpStaking.instance,
        card.rarity.weight
      );
    } else if (CARD_TYPE.SUPPORT.includes(card.series)) {
      cardPriceEth = yield call(
        getSupportPriceAsync,
        lpStaking.instance,
        card.rarity.weight
      );
    } else {
      callback(RESPONSE.ERROR);
      return;
    }

    if (Number(ethBalance) < Number(cardPriceEth)) {
      callback(RESPONSE.INSUFFICIENT);
      return;
    }

    const buyCardAsync = async (cardId, cardPrice, address) => {
      const prices = await getGasPrice();

      const gasLimit = await lpStaking.instance.methods
        .buy(cardId)
        .estimateGas({
          from: address,
          value: cardPrice.toString(),
        });

      return await lpStaking.instance.methods
        .buy(cardId)
        .send({
          from: address,
          value: cardPrice.toString(),
          gasPrice: web3.utils.toWei(prices.medium.toString(), "gwei"),
          gas: getGasFee(gasLimit),
        })
        .then((data) => {
          return data;
        })
        .catch((error) => {
          return error;
        });
    };

    const buyCardResponse = yield call(
      buyCardAsync,
      card.id,
      cardPriceEth,
      accounts[0]
    );

    if (buyCardResponse.status) {
      callback(RESPONSE.SUCCESS);
    } else {
      callback(RESPONSE.ERROR);
    }
  });
}

export function* buyHeroCardHash() {
  yield takeLatest(actions.BUY_HERO_CARD_HASH, function* ({ payload }) {
    const { card, callback } = payload;

    const web3 = yield call(getWeb3);
    const lpStaking = getLPStakingInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const earning = yield call(
      getEarningAsync,
      lpStaking.instance,
      accounts[0]
    );
    const cardHashPrice =
      card.rarity.weight * CARD_HASH_PRICE_UNIT * Math.pow(10, 18);

    if (Number(earning) < Number(cardHashPrice)) {
      callback(RESPONSE.INSUFFICIENT);
      return;
    }

    const buyCardAsync = async (cardId, address) => {
      const gasLimit = await lpStaking.instance.methods
        .redeem(cardId)
        .estimateGas({ from: address });

      const prices = await getGasPrice();

      return await lpStaking.instance.methods
        .redeem(cardId)
        .send({
          from: address,
          gasPrice: web3.utils.toWei(prices.medium.toString(), "gwei"),
          gas: getGasFee(gasLimit),
        })
        .then((data) => {
          return data;
        })
        .catch((error) => {
          return error;
        });
    };

    const buyCardResponse = yield call(buyCardAsync, card.id, accounts[0]);

    if (buyCardResponse.status) {
      callback(RESPONSE.SUCCESS);
    } else {
      callback(RESPONSE.ERROR);
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(buyHeroCardEth),
    fork(buyHeroCardHash),
    fork(getCards),
    fork(getCardsPrice),
    fork(getCardsApy),
    fork(getMintedCount),
  ]);
}
