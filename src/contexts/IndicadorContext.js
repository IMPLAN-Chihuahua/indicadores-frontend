import { createContext, useContext, useReducer } from "react";

const IndicadorContext = createContext();

export const IndicadorProvider = ({ children, ...props }) => {
  return (
    <IndicadorContext.Provider value={{ ...props }}>
      {children}
    </IndicadorContext.Provider>
  );
};

export const useIndicadorContext = () => useContext(IndicadorContext);