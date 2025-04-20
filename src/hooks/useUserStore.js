import { useDispatch, useSelector } from "react-redux"
import { onAddNewUser, onDeleteUser, onisDeleteUser, onSetActiveUser, onUpdateUser } from "../store/user/userSlice"

export const useUserStore = () => {
  const dispatch = useDispatch()
  const { users, activeUser, isDelete, tipos } = useSelector(state => state.user)

  const setActiveUser = (user) => {
    dispatch(onSetActiveUser(user))
  }

  const isDeleteUser = (estado) => {
    dispatch(onisDeleteUser(estado))
  }

  const startSavingUser = async (user) => {
    // TODO: llegar al backend

    // Todo bien
    if (user.id) {
      // Actualizar
      dispatch(onUpdateUser({ ...user }))
    } else {
      // Crear
      dispatch(onAddNewUser({ ...user, id: new Date().getTime() }))
    }
  }

  const startDeletingUser = () => {
    // TODO: llegar al backend
    dispatch(onDeleteUser());
  }

  const findTipo = (cod) => {
    const tipo = tipos.find(tipo => tipo.cod_para === cod)
    return tipo ? tipo.nom_para : cod
  }

  return {
    //* Propiedades
    users,
    activeUser,
    hasUserSelected: !!activeUser,
    isDelete,
    tipos,

    //* Metodos
    setActiveUser,
    startSavingUser,
    startDeletingUser,
    isDeleteUser,
    findTipo
  }
} 
