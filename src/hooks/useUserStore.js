import { useDispatch, useSelector } from "react-redux"
import { onAddNewUser, onDeleteUser, onisDeleteUser, onLoadUsers, onSendEmailResetPassword, onSetActiveUser, onSetLoading, onUpdateUser } from "../store/user/userSlice"
import { prediccionApi } from "../api"

export const useUserStore = () => {
  const dispatch = useDispatch()
  const { users, activeUser, isDelete, tipos, isLoading } = useSelector(state => state.user)

  const setActiveUser = (user) => {
    dispatch(onSetActiveUser(user))
  }

  const isDeleteUser = (estado) => {
    dispatch(onisDeleteUser(estado))
  }

  const startSavingUser = async (user) => {

    dispatch(onSetLoading(true))
    try {
      if (user.uid) {
        // Actualizar
        await prediccionApi.put(`/auth/${user.uid}`, {
          displayName: user.name,
          email: user.email,
          tipo: user.tipo,
          recibeCorreo: user.recibeCorreo,
        })
        dispatch(onUpdateUser({ ...user }))
        return
      }

      // Crear
      const { data } = await prediccionApi.post('/auth/register', {
        displayName: user.name,
        email: user.email,
        tipo: user.tipo,
        recibeCorreo: user.recibeCorreo,
      })
      dispatch(onAddNewUser({ ...user, uid: data.uid }))

    } catch (error) {
      dispatch(onSetLoading(false))
      throw new Error(error.response.data.msg || 'Error al guardar el usuario')
    }
  }

  const startDeletingUser = async () => {
    dispatch(onSetLoading(true))
    try {
      const { uid } = activeUser
      await prediccionApi.delete(`/auth/${uid}`)
      dispatch(onDeleteUser());
    } catch (error) {
      dispatch(onSetLoading(false))
      throw new Error(error.response.data.msg || 'Error al eliminar el usuario')
    }
  }

  const startLoadingUsers = async () => {
    dispatch(onSetLoading(true))
    try {
      const { data } = await prediccionApi.get('/auth/users')
      dispatch(onLoadUsers(data.usuarios))
      console.log(data)

    } catch (error) {
      dispatch(onSetLoading(false))
      throw new Error(error.response.data.msg || 'Error al eliminar el usuario')
    }
  }

  const startSendResetPasswordUser = async () => {
    dispatch(onSetLoading(true))
    try {
      const { email } = activeUser
      await prediccionApi.post(`/auth/reset_password`, { email })
      dispatch(onSendEmailResetPassword());
    } catch (error) {
      dispatch(onSetLoading(false))
      throw new Error(error.response.data.msg || 'Error al enviar correo de restablecimiento de contraseña')
    }
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
    isLoading,

    //* Metodos
    setActiveUser,
    startSavingUser,
    startDeletingUser,
    isDeleteUser,
    findTipo,
    startLoadingUsers,
    startSendResetPasswordUser,
  }
} 
