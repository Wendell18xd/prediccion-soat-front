import axios from "axios";
import { getEnvVariables } from "../helpers";
import { triggerCheckToken } from "../helpers/authRedirectHelper";

const { VITE_API_URL } = getEnvVariables();

const prediccionApi = axios.create({
    baseURL: VITE_API_URL,
});

// Interceptor de solicitudes: agrega el token
prediccionApi.interceptors.request.use(
    async (config) => {
        // Excepción para la ruta de renovación de token
        if (!config.url.includes("/auth/renew") && !config.url.includes("/auth/login")) {
            await triggerCheckToken(); // Espera antes de continuar
        }

        config.headers = {
            ...config.headers,
            "x-token": localStorage.getItem("token") || "",
        };

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default prediccionApi;
