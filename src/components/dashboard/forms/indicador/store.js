import { configureStore } from "@reduxjs/toolkit";
import indicadoresReducer from '../../../../features/indicador/indicadorSlice';

export const indicadorStore = configureStore({
    reducer: {
        indicadores: indicadoresReducer
    }
});