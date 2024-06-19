import React, { useState } from "react";
import {

  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.webp';
import ButtonComp from "./Button";
import { useSelector } from "react-redux";
import UserDropdown from "./UserDropdown";
import { RiMenu2Line } from "react-icons/ri";
import { AppBar, Container } from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import AdminSidebar from "../components/AdminModule/AdminSidebar";
import CitizensSidebar from "../components/CitizensModule/CitizensSidebar";
import OfficersSidebar from "../components/OfficersModule/OfficersSidebar";
import SideDrawer from "./SideDrawer";


export default function NavbarList() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to open the sidebar
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  // Function to close the sidebar
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <nav className=" block w-full rounded-xl border  border-white/80 bg-white bg-opacity-80 py-2 px-2 text-white shadow-md backdrop-blur-2xl backdrop-saturate-200 lg:px-2 lg:py-2">
        <div>
          <div className="w-full flex items-center px-2 gap-x-2 justify-between text-gray-900">
            {/* Burger Menu Button */}
            {/* <div className="block sm:hidden cursor-pointer">
              <RiMenu2Line className="w-7 h-7" onClick={openSidebar} />
            </div> */}
            <Link
              to={"/"}
              className="mr-4 w-full font-bold cursor-pointer py-1.5 
      font-sans text-xl sm:text-2xl leading-normal text-inherit antialiased flex items-center"
            >
              <img src={logo} className="w-12 h-10" />
              <span>District Schemes</span>
            </Link>
            {currentUser ? (
              <UserDropdown />
            ) : (
              <Link
                to={"/auth/login"}
                className="w-full flex items-center justify-end"
              >
                <ButtonComp name={"Log In"} className={'h-9'} />
              </Link>
            )}
          </div>
        </div>

        {isSidebarOpen && (
          // <div
          //   className="fixed top-0 left-0 w-full h-screen bg-white bg-opacity-100 backdrop-filter backdrop-blur-lg z-50"
          //   style={{ zIndex: 1000 }}  // Ensure high z-index
          // >
          //   <div className="absolute top-2 right-2">
          //     <IconButton onClick={closeSidebar}>
          //       <IoClose className="w-7 h-7" />
          //     </IconButton>
          //   </div>
          //   <div className="p-3 h-full">
          //     {/* Render appropriate sidebar based on user type */}
          //     {currentUser?.role === "Officers" && (
          //       <OfficersSidebar closeSidebar={closeSidebar} />
          //     )}
          //     {currentUser?.role === "Citizen" && (
          //       <div className="h-16">
          //         <CitizensSidebar closeSidebar={closeSidebar} />
          //       </div>
          //     )}
          //     {currentUser?.role === "Admin" && (
          //       <AdminSidebar closeSidebar={closeSidebar} />
          //     )}
          //   </div>
          // </div>
          <div >
            <SideDrawer open={isSidebarOpen} closeDrawer={closeSidebar} />
          </div>
        )}


      </nav >

    </ >
  )
}
