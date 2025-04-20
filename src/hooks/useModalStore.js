import { useDispatch, useSelector } from "react-redux"
import { onToogleModal } from "../store/modal/modalSlice"

export const useModalStore = () => {
    const dispatch = useDispatch()
    const { showModal } = useSelector((state) => state.modal)

    const setToogleModal = () => {
        dispatch(onToogleModal(!showModal))
    }

    return {
        //* Propiedades
        showModal,

        //* Metodos
        setToogleModal,
    }
}