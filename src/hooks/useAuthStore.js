import { useDispatch, useSelector } from "react-redux"
import { prediccionApi } from "../api"
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice"

export const useAuthStore = () => {
    const { status, user, errorMessage, isLoading } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const startLogin = async ({ email, password }) => {
        dispatch(onChecking())

        try {
            const { data } = await prediccionApi.post("/auth/login", { email, password })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({ name: data.name, uid: data.uid, tipo: data.tipo }))

        } catch (error) {
            console.log(error)
            dispatch(onLogout('Credenciales incorrectas'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10)
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token')
        if (!token) return dispatch(onLogout())

        try {
            const { data } = await prediccionApi.get("/auth/renew")
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({ name: data.name, uid: data.uid, tipo: data.tipo }))
        } catch (error) {
            console.log(error)
            localStorage.removeItem('token')
            localStorage.removeItem('token-init-date')
            dispatch(onLogout())
            throw new Error("Token inválido o expirado");
        }
    }

    const startLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('token-init-date')
        dispatch(onLogout())
    }

    return {
        //* Propiedades
        status,
        user,
        errorMessage,
        isLoading,

        //* Metodos
        startLogin,
        checkAuthToken,
        startLogout
    }
}