import { useEffect, useReducer } from "react";

const TOGGLE_THEME = "TOGGLE_THEME";

const initialState = {
  theme: "light",
};

const reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
    default:
      return state;
  }
};

const userHook = () => {
};

export {
  userHook,
  TOGGLE_THEME,
  reducer
};
