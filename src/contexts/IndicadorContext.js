import { createContext, useContext, useReducer } from "react";

const IndicadorContext = createContext();

export const IndicadorProvider = ({ children, indicador, dispatch }) => {
  return (<IndicadorContext.Provider value={{ indicador, dispatch }}>
    {children}
  </IndicadorContext.Provider>)
};

export const useIndicador = () => useContext(IndicadorContext);