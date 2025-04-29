import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { prediccionSlice } from './prediccion/prediccionSlice';
import { userSlice } from './user/userSlice';
import { modalSlice } from './modal/modalSlice';
import { historialSlice } from './historial/historialSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        prediccion: prediccionSlice.reducer,
        user: userSlice.reducer,
        modal: modalSlice.reducer,
        historial: historialSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});