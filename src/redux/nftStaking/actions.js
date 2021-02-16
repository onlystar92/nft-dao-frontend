const actions = {
  GET_MY_CARDS_COUNT: "GET_MY_CARDS_COUNT",

  GET_MY_STAKED_STRENGTH: "GET_MY_STAKED_STRENGTH",
  GET_MY_STAKED_STRENGTH_SUCCESS: "GET_MY_STAKED_STRENGTH_SUCCESS",

  GET_TOTAL_STAKED_STRENGTH: "GET_TOTAL_STAKED_STRENGTH",
  GET_TOTAL_STAKED_STRENGTH_SUCCESS: "GET_TOTAL_STAKED_STRENGTH_SUCCESS",

  GET_CLAIMABLE_NDR: "GET_CLAIMABLE_NDR",
  GET_CLAIMABLE_NDR_SUCCESS: "GET_CLAIMABLE_NDR_SUCCESS",

  GET_NDR_PER_DAY: "GET_NDR_PER_DAY",
  GET_NDR_PER_DAY_SUCCESS: "GET_NDR_PER_DAY_SUCCESS",

  GET_STAKED_CARDS: "GET_STAKED_CARDS",
  GET_STAKED_CARDS_SUCCESS: "GET_STAKED_CARDS_SUCCESS",

  GET_APPROVED_STATUS: "GET_APPROVED_STATUS",

  UNSTAKE_CARD: "UNSTAKE_CARD",
  UNSTAKE_ALL_CARDS: "UNSTAKE_ALL_CARDS",
  CLAIM_NDR: "CLAIM_NDR",
  STAKE_CARD: "STAKE_CARD",
  APPROVE_ALL: "APPROVE_ALL",

  getMyCardsCount: (cards) => ({
    type: actions.GET_MY_CARDS_COUNT,
    payload: { cards },
  }),
  getApprovedStatus: (callback) => ({
    type: actions.GET_APPROVED_STATUS,
    payload: { callback },
  }),
  getMyStakedStrength: () => ({
    type: actions.GET_MY_STAKED_STRENGTH,
  }),
  getTotalStakedStrength: () => ({
    type: actions.GET_TOTAL_STAKED_STRENGTH,
  }),
  getClaimableNDR: () => ({
    type: actions.GET_CLAIMABLE_NDR,
  }),
  getNDRPerDay: () => ({
    type: actions.GET_NDR_PER_DAY,
  }),
  getStakedCards: () => ({
    type: actions.GET_STAKED_CARDS,
  }),

  approveAll: (approved, callback) => ({
    type: actions.APPROVE_ALL,
    payload: { approved, callback },
  }),
  unStakeCard: (cardIds, callback) => ({
    type: actions.UNSTAKE_CARD,
    payload: { cardIds, callback },
  }),
  unStakeAllCards: (callback) => ({
    type: actions.UNSTAKE_ALL_CARDS,
    payload: { callback },
  }),
  stakeCard: (cardIds, callback) => ({
    type: actions.STAKE_CARD,
    payload: { cardIds, callback },
  }),
  claimNDR: (callback) => ({
    type: actions.CLAIM_NDR,
    payload: { callback },
  }),
};

export default actions;
