import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {

  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>
  return (
    user ? <Outlet /> : <Navigate to={'/login'} replace />
  )
}

export default ProtectedRoute