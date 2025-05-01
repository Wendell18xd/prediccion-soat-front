
import { createSlice } from "@reduxjs/toolkit";

export const prediccionSlice = createSlice({
    name: 'prediccion',
    initialState: {
        isLoading: false,
        predicciones: [],
        codeSelected: null,
        errorMessage: undefined
    },
    reducers: {
        onLoad: (state, { payload = true }) => {
            state.codeSelected = null
            state.predicciones = [];
            state.isLoading = payload;
        },
        onListPredictions: (state, { payload }) => {
            state.isLoading = false;
            state.predicciones = payload.datos;
            state.codeSelected = payload.codigo
        },
        setErrorMessage: (state, { payload }) => {
            state.errorMessage = payload;
            state.isLoading = false;
            state.codeSelected = null
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined;
            state.isLoading = false;
            state.codeSelected = null
        },
    }

})

export const { onLoad, onListPredictions, setErrorMessage, clearErrorMessage } = prediccionSlice.actions;