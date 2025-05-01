import { useDispatch, useSelector } from "react-redux"
import { prediccionApi } from "../api"
import { onListHistoriales, onLoad } from "../store/historial/historialSlice"

export const useHistorialStore = () => {
    const { historiales, isLoading } = useSelector((state) => state.historial)
    const dispatch = useDispatch()

    const startListHistorial = async () => {
        dispatch(onLoad())
        try {
            const { data } = await prediccionApi.get("/predicciones/soat/todos")
            dispatch(onListHistoriales(data.data))
        } catch (error) {
            dispatch(onLoad(false))
            throw new Error(error?.response?.data?.msg || 'Error al cargar las predicciones');
        }
    }

    return {
        //* Propiedades
        isLoading,
        historiales,

        //* Metodos
        startListHistorial,
    }
}