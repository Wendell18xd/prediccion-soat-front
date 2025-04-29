
import { createSlice } from "@reduxjs/toolkit";

export const prediccionSlice = createSlice({
    name: 'prediccion',
    initialState: {
        isLoading: false,
        predicciones: [],
        errorMessage: undefined
    },
    reducers: {
        onLoad: (state, { payload = true }) => {
            state.predicciones = [];
            state.isLoading = payload;
        },
        onListPredictions: (state, { payload }) => {
            state.isLoading = false;
            state.predicciones = payload;
        },
        setErrorMessage: (state, { payload }) => {
            state.errorMessage = payload;
            state.isLoading = false;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined;
            state.isLoading = false;
        },
    }

})

export const { onLoad, onListPredictions, setErrorMessage, clearErrorMessage } = prediccionSlice.actions;