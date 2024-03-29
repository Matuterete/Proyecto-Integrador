import { useReducer } from "react";
import '../Components/styles/Theme.css'

const TOGGLE_THEME = "TOGGLE_THEME";

const initialState = {
  theme: "light",
  userData: []
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
