import React from 'react'
import { useAuth } from './context/AuthProvider'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRouteAuth = () => {
  const { user } = useAuth()
  console.log(user.role === "MERCHANT")
  return (
    user.role === "MERCHANT" ? <Outlet /> : <Navigate to={'/'} replace />
  )
}

export default ProtectedRouteAuth