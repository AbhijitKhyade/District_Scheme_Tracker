import React from 'react'
import NavbarList from '../components/NavbarList'
import OfficersSidebar from '../components/OfficersModule/OfficersSidebar'
import { Outlet } from 'react-router-dom'

export default function OfficersLayout() {
  return (
    <div className="min-h-full  font-poppins">
      <div className="w-full h-full  font-poppins ">
        {/* {currentUser && currentUser.Role == 0 ? ( */}
        <>
          <div className="flex flex-col w-full">
            <NavbarList />
            <div className="w-full flex font-poppins ">
              <span className="hidden sm:block h-screen">
                <OfficersSidebar />
              </span>
              <div className="border-l-2 w-full mx-0 px-0 overflow-x-auto">
                <Outlet />
              </div>
            </div>
          </div>
        </>
        {/* ) : (
          <></>
        )} */}
      </div>
    </div>
  )
}
