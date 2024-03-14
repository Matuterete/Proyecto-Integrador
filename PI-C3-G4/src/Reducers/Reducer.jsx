import { useReducer } from "react";

const TOGGLE_THEME = "TOGGLE_THEME";

const initialState = {
  theme: "light",
  data:[]
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
  const [state, dispatch] = useReducer(reducer, initialState);

  return [state, dispatch,];
};

export {
  userHook,
  TOGGLE_THEME,
};
