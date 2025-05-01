import axios from "axios";
import { getEnvVariables } from "../helpers";
import { triggerLogout } from "../helpers/authRedirectHelper";

const { VITE_API_URL } = getEnvVariables();

const prediccionApi = axios.create({
    baseURL: VITE_API_URL,
});

// Interceptor de solicitudes: agrega el token
prediccionApi.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        "x-token": localStorage.getItem("token") || "",
    };

    return config;
});

// Interceptor de respuestas: maneja errores globales
prediccionApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            triggerLogout();
        }
        return Promise.reject(error);
    }
);

export default prediccionApi;
