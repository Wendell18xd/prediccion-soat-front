
import { createSlice } from "@reduxjs/toolkit";

const mockUsuarios = [
    {
        id: 1,
        nombre: "Juan Pérez",
        tipo: "admin",
        correo: "juan.perez@example.com",
    },
    {
        id: 2,
        nombre: "María Rodríguez",
        tipo: "user",
        correo: "maria.rodriguez@example.com",
    },
    {
        id: 3,
        nombre: "Carlos Sánchez",
        tipo: "admin",
        correo: "carlos.sanchez@example.com",
    },
    {
        id: 4,
        nombre: "Ana López",
        tipo: "user",
        correo: "ana.lopez@example.com",
    },
]

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: mockUsuarios,
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