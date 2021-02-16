const actions = {
  GET_CUSTOM_CARDS: "GET_CUSTOM_CARDS",
  GET_CUSTOM_CARDS_SUCCESS: "GET_CUSTOM_CARDS_SUCCESS",

  GET_STAKED_CARDS: "GET_CUSTOM_NFT_STAKED_CARDS",
  GET_STAKED_CARDS_SUCCESS: "GET_CUSTOM_NFT_STAKED_CARDS_SUCCESS",

  GET_APPROVED_STATUS: "GET_CUSTOM_NFT_APPROVED_STATUS",
  GET_APPROVED_STATUS_SUCCESS: "GET_CUSTOM_NFT_APPROVED_STATUS_SUCCESS",

  GET_MY_STAKED_STRENGTH: "GET_MY_CUSTOM_NFT_STAKED_STRENGTH",
  GET_MY_STAKED_STRENGTH_SUCCESS: "GET_MY_CUSTOM_NFT_STAKED_STRENGTH_SUCCESS",

  GET_TOTAL_STAKED_STRENGTH: "GET_TOTAL_CUSTOM_NFT_STAKED_STRENGTH",
  GET_TOTAL_STAKED_STRENGTH_SUCCESS: "GET_TOTAL_CUSTOM_NFT_STAKED_STRENGTH_SUCCESS",

  GET_CLAIMABLE_NDR: "GET_CUSTOM_NFT_CLAIMABLE_NDR",
  GET_CLAIMABLE_NDR_SUCCESS: "GET_CUSTOM_NFT_CLAIMABLE_NDR_SUCCESS",

  GET_NDR_PER_DAY: "GET_CUSTOM_NFT_NDR_PER_DAY",
  GET_NDR_PER_DAY_SUCCESS: "GET_CUSTOM_NFT_NDR_PER_DAY_SUCCESS",

  APPROVE_ALL: "APPROVE_ALL_CUSTOM_NFT",
  UNSTAKE_ALL_CARDS: "UNSTAKE_ALL_CUSTOM_NFT_CARDS",
  CLAIM_NDR: "CLAIM_CUSTOM_NFT_NDR",
  STAKE_CARD: "STAKE_CUSTOM_NFT_CARD",
  UNSTAKE_CARD: "UNSTAKE_CUSTOM_NFT_CARD",

  getCustomCards: () => ({
    type: actions.GET_CUSTOM_CARDS,
  }),
  getApprovedStatus: (token) => ({
    type: actions.GET_APPROVED_STATUS,
    payload: { token }
  }),
  getMyStakedStrength: (token) => ({
    type: actions.GET_MY_STAKED_STRENGTH,
    payload: { token }
  }),
  getTotalStakedStrength: (token) => ({
    type: actions.GET_TOTAL_STAKED_STRENGTH,
    payload: { token }
  }),
  getClaimableNDR: (token) => ({
    type: actions.GET_CLAIMABLE_NDR,
    payload: { token }
  }),
  getNDRPerDay: (token) => ({
    type: actions.GET_NDR_PER_DAY,
    payload: { token }
  }),
  getStakedCards: (token) => ({
    type: actions.GET_STAKED_CARDS,
    payload: { token }
  }),

  approveAll: (token, approved, callback) => ({
    type: actions.APPROVE_ALL,
    payload: { token, approved, callback },
  }),
  unStakeAllCards: (token, callback) => ({
    type: actions.UNSTAKE_ALL_CARDS,
    payload: { token, callback },
  }),
  claimNDR: (token, callback) => ({
    type: actions.CLAIM_NDR,
    payload: { token, callback },
  }),
  stakeCard: (token, cardIds, callback) => ({
    type: actions.STAKE_CARD,
    payload: { token, cardIds, callback },
  }),
  unStakeCard: (token, cardIds, callback) => ({
    type: actions.UNSTAKE_CARD,
    payload: { token, cardIds, callback },
  }),
};

export default actions;
