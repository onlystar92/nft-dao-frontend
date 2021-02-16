import actions from "./actions";

const initState = {
  myStakedStrength: 0,
  totalStakedStrength: 0,
  claimableNDR: 0,
  ndrPerDay: 0,
  stakedCardTokens: [],
};

export default function pageReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_MY_STAKED_STRENGTH_SUCCESS:
      return {
        ...state,
        myStakedStrength: action.myStakedStrength,
      };
    case actions.GET_TOTAL_STAKED_STRENGTH_SUCCESS:
      return {
        ...state,
        totalStakedStrength: action.totalStakedStrength,
      };
    case actions.GET_CLAIMABLE_NDR_SUCCESS:
      return {
        ...state,
        claimableNDR: action.claimableNDR,
      };
    case actions.GET_NDR_PER_DAY_SUCCESS:
      return {
        ...state,
        ndrPerDay: action.ndrPerDay,
      };
    case actions.GET_STAKED_CARDS_SUCCESS:
      return {
        ...state,
        stakedCardTokens: [...action.stakedCardTokens],
      };
    default:
      return state;
  }
}
