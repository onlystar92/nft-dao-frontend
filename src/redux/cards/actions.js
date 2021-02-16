const actions = {
  GET_CARDS: "GET_CARDS",
  GET_CARDS_SUCCESS: "GET_CARDS_SUCCESS",

  GET_CARDS_PRICE: "GET_CARDS_PRICE",
  GET_CARDS_PRICE_SUCCESS: "GET_CARDS_PRICE_SUCCESS",

  GET_CARDS_APY: "GET_CARDS_APY",
  GET_CARDS_APY_SUCCESS: "GET_CARDS_APY_SUCCESS",

  BUY_HERO_CARD_ETH: "BUY_HERO_CARD_ETH",
  BUY_HERO_CARD_HASH: "BUY_HERO_CARD_HASH",

  GET_MINTED_COUNT: "GET_MINTED_COUNT",

  getCards: () => ({
    type: actions.GET_CARDS,
  }),
  getCardsPrice: () => ({
    type: actions.GET_CARDS_PRICE,
  }),
  getMintedCount: (cards) => ({
    type: actions.GET_MINTED_COUNT,
    payload: { cards },
  }),
  getCardsApy: (cards, cardPrice) => ({
    type: actions.GET_CARDS_APY,
    payload: { cards, cardPrice }
  }),
  buyHeroCardEth: (card, callback) => ({
    type: actions.BUY_HERO_CARD_ETH,
    payload: { card, callback },
  }),
  buyHeroCardHash: (card, callback) => ({
    type: actions.BUY_HERO_CARD_HASH,
    payload: { card, callback },
  }),
};

export default actions;
