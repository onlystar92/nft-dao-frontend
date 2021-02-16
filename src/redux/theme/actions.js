const actions = {
  SET_THEME: "SET_THEME",

  setTheme: (value) => ({
    type: actions.SET_THEME,
    payload: value,
  }),
};

export default actions;
