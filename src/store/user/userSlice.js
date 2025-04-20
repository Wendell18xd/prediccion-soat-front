
import { createSlice } from "@reduxjs/toolkit";

const tipos = [
    {
        cod_para: 'admin',
        nom_para: 'Administrador',
    },
    {
        cod_para: 'user',
        nom_para: 'Usuario',
    },
]

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        tipos: tipos,
        activeUser: null,
        isDelete: false,
    },
    reducers: {
        onSetActiveUser: (state, { payload }) => {
            state.activeUser = payload;
        },
        onisDeleteUser: (state, { payload }) => {
            state.isDelete = payload;
        },
        onAddNewUser: (state, { payload }) => {
            state.users.push(payload);
            state.activeUser = null;
        },
        onUpdateUser: (state, { payload }) => {
            state.users = state.users.map(user => {
                if (user.id === payload.id) {
                    return payload;
                }
                return user;
            })
        },
        onDeleteUser: (state) => {
            if (state.activeUser) {
                state.users = state.users.filter(user => user.id !== state.activeUser.id);
                state.activeUser = null;
            }
        },
    },

})

export const { onSetActiveUser, onAddNewUser, onUpdateUser, onDeleteUser, onisDeleteUser } = userSlice.actions;