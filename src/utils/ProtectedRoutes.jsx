import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

function ProtectedRoutes() {
    // const user = null
    const user = localStorage.getItem("email");

    return user ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoutes