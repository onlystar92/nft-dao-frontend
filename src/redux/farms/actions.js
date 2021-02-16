const actions = {
  GET_TOKEN_APPROVE_STATUS: "GET_TOKEN_APPROVE_STATUS",
  GET_TOKEN_APPROVE_STATUS_SUCCESS: "GET_TOKEN_APPROVE_STATUS_SUCCESS",

  GET_TOKEN_BALANCE: "GET_TOKEN_BALANCE",
  GET_TOKEN_BALANCE_SUCCESS: "GET_TOKEN_BALANCE_SUCCESS",

  GET_TOKEN_STAKED_AMOUNT: "GET_TOKEN_STAKED_AMOUNT",
  GET_TOKEN_STAKED_AMOUNT_SUCCESS: "GET_TOKEN_STAKED_AMOUNT_SUCCESS",

  GET_TOKEN_CLAIMABLE_AMOUNT: "GET_TOKEN_CLAIMABLE_AMOUNT",
  GET_TOKEN_CLAIMABLE_AMOUNT_SUCCESS: "GET_TOKEN_CLAIMABLE_AMOUNT_SUCCESS",

  GET_TOKEN_STATISTICS: "GET_TOKEN_STATISTICS",
  GET_TOKEN_STATISTICS_SUCCESS: "GET_TOKEN_STATISTICS_SUCCESS",

  APPROVE_TOKEN: "APPROVE_TOKEN",
  STAKE_TOKEN: "STAKE_TOKEN",
  CLIAM_TOKEN: "CLAIM_TOKEN",
  EXIT_TOKEN: "EXIT_TOKEN",

  GET_RELEASE_TIME: "GET_RELEASE_TIME",

  getTokenApproveStatus: (token) => ({
    type: actions.GET_TOKEN_APPROVE_STATUS,
    payload: { token },
  }),
  getTokenBalance: (token) => ({
    type: actions.GET_TOKEN_BALANCE,
    payload: { token },
  }),
  getTokenStakedAmount: (token) => ({
    type: actions.GET_TOKEN_STAKED_AMOUNT,
    payload: { token },
  }),
  getTokenClaimableAmount: (token) => ({
    type: actions.GET_TOKEN_CLAIMABLE_AMOUNT,
    payload: { token },
  }),
  getTokenStats: (token) => ({
    type: actions.GET_TOKEN_STATISTICS,
    payload: { token },
  }),
  getReleaseTime: (token, callback) => ({
    type: actions.GET_RELEASE_TIME,
    payload: { token, callback }
  }),

  approveToken: (token, callback) => ({
    type: actions.APPROVE_TOKEN,
    payload: { token, callback },
  }),
  stakeToken: (token, amount, isMax, callback) => ({
    type: actions.STAKE_TOKEN,
    payload: { token, amount, isMax, callback },
  }),
  claimToken: (token, callback) => ({
    type: actions.CLIAM_TOKEN,
    payload: { token, callback },
  }),
  exitToken: (token, callback) => ({
    type: actions.EXIT_TOKEN,
    payload: { token, callback },
  }),
};

export default actions;
