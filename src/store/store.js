import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { prediccionSlice } from './prediccion/prediccionSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        prediccion: prediccionSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});