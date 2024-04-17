import React from 'react'
import CitizensSidebar from '../components/CitizensModule/CitizensSidebar'
import { Outlet } from 'react-router-dom'
import NavbarList from '../components/NavbarList'

export default function CitizensLayout() {
  return (
    <div className="min-h-full  font-poppins">
      <div className="w-full h-full  font-poppins ">
        {/* {currentUser && currentUser.Role == 0 ? ( */}
        <>
          <div className="flex flex-col w-full">
            <NavbarList />
            <div className="w-full flex font-poppins ">
              <span className="hidden sm:block h-screen">
                <CitizensSidebar />
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
