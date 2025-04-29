
import { createSlice } from "@reduxjs/toolkit";

export const historialSlice = createSlice({
    name: 'historial',
    initialState: {
        isLoading: false,
        historiales: [],
    },
    reducers: {
        onLoad: (state, { payload = true }) => {
            state.historiales = [];
            state.isLoading = payload;
        },
        onListHistoriales: (state, { payload }) => {
            state.isLoading = false;
            state.historiales = payload;
        },
    }

})

export const { onLoad, onListHistoriales } = historialSlice.actions;