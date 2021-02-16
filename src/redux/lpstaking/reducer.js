import actions from "./actions";
const initState = {
  ndrBalance: 0,
  lpTokenBalance: 0, // lptoken amount
  stakedAmount: 0, // staked amount
  oldStakedAmount: 0, // staked amount for lp pool
  earningAmount: 0, // earning
  allowance: 0,
  stat: {
    tvl: 0,
    lpPriceNDR: 0,
    lpPriceETH: 0
  }
};

export default function pageReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_NDR_BALANCE_SUCCESS:
      return {
        ...state,
        ndrBalance: action.ndrBalance,
      };
    case actions.GET_STAKED_AMOUNT_SUCCESS:
      return {
        ...state,
        stakedAmount: action.stakedAmount,
      };
    case actions.GET_OLD_STAKED_AMOUNT_SUCCESS:
      return {
        ...state,
        oldStakedAmount: action.oldStakedAmount,
      };
    case actions.GET_EARNING_AMOUNT_SUCCESS:
      return {
        ...state,
        earningAmount: action.earningAmount,
      };
    case actions.GET_LPTOKEN_BALANCE_SUCCESS:
      return {
        ...state,
        lpTokenBalance: action.lpTokenBalance,
      };
    case actions.GET_ALLOWANCE_LP_TOKEN_SUCCESS:
      return {
        ...state,
        allowance: action.allowance,
      };
    case actions.GET_STATISTICS_SUCCESS:
      return {
        ...state,
        stat: {
          ...action.stat
        }
      }
    default:
      return state;
  }
}
