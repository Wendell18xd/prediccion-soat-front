
import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        showModal: false
    },
    reducers: {
        onToogleModal: (state, { payload }) => {
            state.showModal = payload;
        }
    }

})

export const { onToogleModal } = modalSlice.actions;