import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        isOpen: false,
        modalType: null,
        modalProps: {},
    },
    reducers: {
        openModal: (state, { payload }) => {
            state.isOpen = true;
            state.modalType = payload.modalType;
            state.modalProps = payload.modalProps || {};
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.modalType = null;
            state.modalProps = {};
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
