import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarList from '../components/NavbarList'

export default function AuthLayout() {
  return (
    <div className="min-h-full  font-poppins ">
      <div className="w-full h-full  font-poppins ">
        <NavbarList />
        <Outlet />
      </div>
    </div>
  )
}
