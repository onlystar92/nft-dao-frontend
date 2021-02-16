import actions from "./actions";

const initState = {
  approved: {},
  balance: {},
  staked: {},
  claimable: {},
  stats: {},
};

export default function pageReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_TOKEN_APPROVE_STATUS_SUCCESS:
      return {
        ...state,
        approved: {
          ...state.approved,
          [action.token]: action.approved,
        },
      };
    case actions.GET_TOKEN_BALANCE_SUCCESS:
      return {
        ...state,
        balance: {
          ...state.balance,
          [action.token]: action.balance,
        },
      };
    case actions.GET_TOKEN_STAKED_AMOUNT_SUCCESS:
      return {
        ...state,
        staked: {
          ...state.staked,
          [action.token]: action.staked,
        },
      };
    case actions.GET_TOKEN_CLAIMABLE_AMOUNT_SUCCESS:
      return {
        ...state,
        claimable: {
          ...state.claimable,
          [action.token]: action.claimable,
        },
      };
    case actions.GET_TOKEN_STATISTICS_SUCCESS:
      return {
        ...state,
        stats: {
          ...state.stats,
          [action.token]: { ...action.stats },
        },
      };
    default:
      return state;
  }
}
