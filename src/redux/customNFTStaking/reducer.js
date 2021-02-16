import actions from "./actions";

const initState = {
  cards: {},
  approved: {},
  myStakedStrength: {},
  totalStakedStrength: {},
  claimableNDR: {},
  ndrPerDay: {},
  staked: {} ,
  owned: {}
};

export default function customNFTStakingReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_CUSTOM_CARDS_SUCCESS:
      return {
        ...state,
        cards: action.cards,
      };
    case actions.GET_APPROVED_STATUS_SUCCESS: 
      return {
        ...state,
        approved: {
          ...state.approved,
          [action.token]: action.approved
        }
      }
    case actions.GET_MY_STAKED_STRENGTH_SUCCESS:
      return {
        ...state,
        myStakedStrength: {
          ...state.myStakedStrength,
          [action.token]: action.value
        },
      };
    case actions.GET_TOTAL_STAKED_STRENGTH_SUCCESS:
      return {
        ...state,
        totalStakedStrength: {
          ...state.totalStakedStrength,
          [action.token]: action.value
        },
      };
    case actions.GET_CLAIMABLE_NDR_SUCCESS:
      return {
        ...state,
        claimableNDR: {
          ...state.claimableNDR,
          [action.token]: action.value
        },
      };
    case actions.GET_NDR_PER_DAY_SUCCESS:
      return {
        ...state,
        ndrPerDay: {
          ...state.ndrPerDay,
          [action.token]: action.value,
        }
      };
    case actions.GET_STAKED_CARDS_SUCCESS:
      return {
        ...state,
        staked: {
          ...state.staked,
          [action.token]: action.staked,
        },
        owned: {
          ...state.owned,
          [action.token]: action.owned,
        }
      };
    default:
      return state;
  }
}
