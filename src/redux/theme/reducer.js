import actions from "./actions";

const initState = {};

export default function themeReducer(state = initState, action) {
  switch (action.type) {
    case actions.SET_THEME:
      return {
        ...state,
        currentTheme: action.payload,
      };
    default:
      return { ...state };
  }
}
