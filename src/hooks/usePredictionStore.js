import { useDispatch, useSelector } from "react-redux"
import { prediccionApi } from "../api"
import { clearErrorMessage, onListPredictions, onLoad, setErrorMessage } from "../store/prediccion/prediccionSlice"
import { onLoad as onLoadHistorial } from "../store/historial/historialSlice"

export const usePredictionStore = () => {
    const { predicciones, isLoading, errorMessage, codeSelected } = useSelector((state) => state.prediccion)
    const dispatch = useDispatch()

    const startListPredictions = async (tipo = "1", jsonExcel = []) => {
        dispatch(onLoad())
        dispatch(onLoadHistorial())

        try {
            await prediccionApi.post("/predicciones/soat", {
                tipo: tipo,
                jsonExcel: jsonExcel
            })

            const { data } = await prediccionApi.get("/predicciones/soat/ultima-carga")

            dispatch(onListPredictions({ datos: data.data, codigo: data.codigo }))

        } catch (error) {
            console.log(error)
            dispatch(setErrorMessage(error?.response?.data?.msg || 'Error al cargar las predicciones'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10)
        }
    }

    const listUltimaPrediccion = async () => {
        dispatch(onLoad())
        try {
            const { data } = await prediccionApi.get("/predicciones/soat/ultima-carga")
            dispatch(onListPredictions({ datos: data.data, codigo: data.codigo }))
        } catch (error) {
            dispatch(onLoad(false))
            console.log(error)
            throw new Error(error?.response?.data?.msg || 'Error al cargar las predicciones');
        }
    }

    const listPrediccionWithCodigo = async (codigo) => {
        dispatch(onLoad())
        try {
            const { data } = await prediccionApi.get(`/predicciones/soat/${codigo}`)
            dispatch(onListPredictions({ datos: data.data, codigo: data.codigo }))
        } catch (error) {
            dispatch(onLoad(false))
            console.log(error)
            throw new Error(error?.response?.data?.msg || 'Error al cargar las predicciones');
        }
    }

    return {
        //* Propiedades
        isLoading,
        predicciones,
        errorMessage,
        codeSelected,

        //* Metodos
        startListPredictions,
        listUltimaPrediccion,
        listPrediccionWithCodigo,

    }
}