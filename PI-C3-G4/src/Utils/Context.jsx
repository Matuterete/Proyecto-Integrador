import React, { createContext, useContext, useEffect } from 'react';
import { userHook } from '../Reducers/Reducer';

const Context = createContext();

const AppProvider = ({ children }) => {
  const [state,  dispatch, fetchDataDetail ] = userHook();
  

  return (
    <Context.Provider value={{ state, dispatch, fetchDataDetail}}>
      {children}
    </Context.Provider>
  );
};

const useCustomContext = () => {
  return useContext(Context);
};

export { AppProvider, useCustomContext as useContext };