import React, { createContext, useContext, useEffect, useState } from 'react';
import { userHook } from '../Reducers/Reducer';
import axios from 'axios';

const Context = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = userHook();

  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  );
};

const useCustomContext = () => {
  return useContext(Context);
};

export { AppProvider, useCustomContext as useContext };