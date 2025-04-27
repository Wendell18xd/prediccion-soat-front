import { useDispatch, useSelector } from "react-redux"
import { prediccionApi } from "../api"
import { clearErrorMessage, onListPredictions, onLoad, setErrorMessage } from "../store/prediccion/prediccionSlice"

export const usePredictionStore = () => {
    const { predicciones, isLoading, errorMessage } = useSelector((state) => state.prediccion)
    const dispatch = useDispatch()

    const startListPredictions = async (tipo = "1", jsonExcel = []) => {
        dispatch(onLoad())

        try {
            const { data } = await prediccionApi.post("/predicciones/soat", {
                tipo,
                jsonExcel
            })
            dispatch(onListPredictions(data.data))

        } catch (error) {
            console.log(error)
            dispatch(setErrorMessage(error.response.data.msg || 'Error al cargar las predicciones'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10)
        }
    }

    return {
        //* Propiedades
        isLoading,
        predicciones,
        errorMessage,

        //* Metodos
        startListPredictions,

    }
}