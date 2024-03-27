import { useReducer } from "react";

const initialState = {
  userData: []
};

const reducer = (state, action) => {
  switch (action.type) {
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
};
