import React, { useEffect } from 'react'
import CitizensSidebar from '../components/CitizensModule/CitizensSidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import NavbarList from '../components/NavbarList'
import { useSelector } from 'react-redux';

export default function CitizensLayout() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if currentUser is not present, then redirect to "/"
    if (!currentUser || currentUser.role !== "Citizen") {
      navigate("/");
    }
  }, [currentUser, navigate]);

  if (!currentUser || currentUser.role !== "Citizen") {
    // If redirecting, return null or an empty div
    return null;
  }
  return (
    <div className="min-h-full  font-poppins">
      <div className="w-full h-full  font-poppins ">
        {currentUser && currentUser.role === "Citizen" ? (
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
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
