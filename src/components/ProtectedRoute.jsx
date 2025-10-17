import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {

  const { user } = useAuth();
  return (
    user ? <Outlet /> : <Navigate to={'/login'} />
  )
}

export default ProtectedRoute