import React from "react";
import {
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.webp';

export default function NavbarList() {
  return (
    <div>
      <nav className=" block w-full rounded-xl border  border-white/80 bg-white bg-opacity-80 py-2 px-2 text-white shadow-md backdrop-blur-2xl backdrop-saturate-200 lg:px-2 lg:py-2">
        <div>
          <div className="w-full flex items-center px-2 gap-x-2 justify-between text-gray-900">
            {/* Burger Menu Button */}
            {/* <div className="block sm:hidden bg-white">
              <IconButton onClick={openSidebar}>
                <MenuIcon color="white" />
              </IconButton>
            </div> */}

            <img src={logo} className="w-12 h-10" />
            <Link
              to={"/"}
              className="mr-4 w-full font-bold  cursor-pointer py-1.5 font-sans text-2xl leading-normal text-inherit antialiased"
            >
              <span>District Schemes</span>
            </Link>
            <Link
              to={"/auth/login"}
              className="w-full flex items-center justify-end"
            >
              <Button
                className="h-9"
              >
                Log In
              </Button>
            </Link>

          </div>
        </div>
      </nav>
    </div>
  )
}
