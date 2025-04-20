
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
        isLoading: false,
        users: [],
        tipos: tipos,
        activeUser: null,
        isDelete: false,
    },
    reducers: {
        onSetLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        onSetActiveUser: (state, { payload }) => {
            state.activeUser = payload;
        },
        onisDeleteUser: (state, { payload }) => {
            state.isDelete = payload;
        },
        onAddNewUser: (state, { payload }) => {
            state.isLoading = false;
            state.users.push(payload);
            state.activeUser = null;
        },
        onUpdateUser: (state, { payload }) => {
            state.isLoading = false;
            state.users = state.users.map(user => {
                if (user.uid === payload.uid) {
                    return payload;
                }
                return user;
            })
        },
        onDeleteUser: (state) => {
            if (state.activeUser) {
                state.isLoading = false;
                state.users = state.users.filter(user => user.uid !== state.activeUser.uid);
                state.activeUser = null;
            }
        },
        onLoadUsers: (state, { payload = [] }) => {
            state.isLoading = false;
            state.users = payload;

            /* payload.forEach(user => {
                const exist = state.users.some(dbUser => dbUser.uid === user.uid);
                if (!exist) {
                    state.users.push(user);
                }
            }) */
        },
    },

})

export const { onSetActiveUser, onAddNewUser, onUpdateUser, onDeleteUser, onisDeleteUser, onLoadUsers, onSetLoading } = userSlice.actions;