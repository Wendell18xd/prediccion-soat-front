import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../store/modal/modalSlice";

export const useModalStore = () => {
    const { isOpen, modalType, modalProps } = useSelector((state) => state.modal);
    const dispatch = useDispatch();

    const showModal = (type, props = {}) => {
        dispatch(openModal({ modalType: type, modalProps: props }));
    };

    const hideModal = () => {
        dispatch(closeModal());
    };

    return {
        isOpen,
        modalType,
        modalProps,
        showModal,
        hideModal,
    };
};
