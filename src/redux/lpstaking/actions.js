const actions = {
  // LP Token
  GET_LPTOKEN_BALANCE: "GET_LPTOKEN_BALANCE",
  GET_LPTOKEN_BALANCE_SUCCESS: "GET_LPTOKEN_BALANCE_SUCCESS",

  // Staked Amount
  GET_STAKED_AMOUNT: "GET_STAKED_AMOUNT",
  GET_STAKED_AMOUNT_SUCCESS: "GET_STAKED_AMOUNT_SUCCESS",

  // Staked Amount
  GET_OLD_STAKED_AMOUNT: "GET_OLD_STAKED_AMOUNT",
  GET_OLD_STAKED_AMOUNT_SUCCESS: "GET_OLD_STAKED_AMOUNT_SUCCESS",

  // Earnings
  GET_EARNING_AMOUNT: "GET_EARNING_AMOUNT",
  GET_EARNING_AMOUNT_SUCCESS: "GET_EARNING_AMOUNT_SUCCESS",

  GET_NDR_BALANCE: "GET_NDR_BALANCE",
  GET_NDR_BALANCE_SUCCESS: "GET_NDR_BALANCE_SUCCESS",

  GET_ALLOWANCE_LP_TOKEN: "GET_ALLOWANCE_LP_TOKEN",
  GET_ALLOWANCE_LP_TOKEN_SUCCESS: "GET_ALLOWANCE_LP_TOKEN_SUCCESS",

  APPROVE_LP: "APPROVE_LP",
  DEPOSIT_LP: "DEPOSIT_LP",
  WITHDRAW_LP: "WITHDRAW_LP",
  WITHDRAW_OLD_LP: "WITHDRAW_OLD_LP",

  GET_STATISTICS: "GET_STATISTICS",
  GET_STATISTICS_SUCCESS: "GET_STATISTICS_SUCCESS",

  getLPTokenAllowance: () => ({
    type: actions.GET_ALLOWANCE_LP_TOKEN,
  }),
  getNDRBalance: () => ({
    type: actions.GET_NDR_BALANCE,
  }),
  getLPTokenBalance: () => ({
    type: actions.GET_LPTOKEN_BALANCE,
  }),
  getStakedAmount: () => ({
    type: actions.GET_STAKED_AMOUNT,
  }),
  getOldStakedAmount: () => ({
    type: actions.GET_OLD_STAKED_AMOUNT,
  }),
  getEarningAmount: () => ({
    type: actions.GET_EARNING_AMOUNT,
  }),

  approveLP: (callback) => ({
    type: actions.APPROVE_LP,
    payload: { callback },
  }),
  depositLP: (amount, isMax, callback) => ({
    type: actions.DEPOSIT_LP,
    payload: { amount, isMax, callback },
  }),
  withdrawLP: (amount, isMax, callback) => ({
    type: actions.WITHDRAW_LP,
    payload: { amount, isMax, callback },
  }),
  withdrawOldLP: (amount, callback) => ({
    type: actions.WITHDRAW_OLD_LP,
    payload: { amount, callback },
  }),

  getStatistics: () => ({
    type: actions.GET_STATISTICS
  })
};

export default actions;
