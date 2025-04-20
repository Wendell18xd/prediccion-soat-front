// src/hooks/useUserStore.js
import { useState } from "react"

const mockUsuarios = [
  {
    id: 1,
    nombre: "Juan Pérez",
    tipo: "admin",
    correo: "juan.perez@example.com",
  },
  {
    id: 2,
    nombre: "María Rodríguez",
    tipo: "usuario",
    correo: "maria.rodriguez@example.com",
  },
  {
    id: 3,
    nombre: "Carlos Sánchez",
    tipo: "admin",
    correo: "carlos.sanchez@example.com",
  },
  {
    id: 4,
    nombre: "Ana López",
    tipo: "usuario",
    correo: "ana.lopez@example.com",
  },
]

export const useUserStore = () => {
  const [usuarios, setUsuarios] = useState(mockUsuarios)

  const addUsuario = (usuario) => {
    setUsuarios([...usuarios, usuario])
  }

  const removeUsuario = (index) => {
    const nuevos = [...usuarios]
    nuevos.splice(index, 1)
    setUsuarios(nuevos)
  }

  const editUsuario = (index) => {
    const usuario = usuarios[index]
    removeUsuario(index)
    return usuario
  }

  return {
    usuarios,
    addUsuario,
    removeUsuario,
    editUsuario,
  }
} 
