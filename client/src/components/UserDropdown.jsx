import React, { useState } from 'react';
import { Menu, MenuHandler, MenuList, MenuItem, Avatar } from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaUserCircle, FaPowerOff } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { resetUser } from './../redux/userSlice';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const UserDropdown = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getProfileLink = () => {
        switch (currentUser.role) {
            case "Admin":
                return "/admin/dashboard";
            case "District Officer":
                return "/officers/dashboard";
            case "Citizen":
                return "/citizens/dashboard";
            default:
                return "/";
        }
    };

    const profileMenuItems = [
        {
            label: "My Profile",
            icon: FaUserCircle,
            link: getProfileLink(),
        },
        {
            label: "Sign Out",
            icon: FaPowerOff,
        },
    ];

    const handleSignOut = () => {
        console.log('Sign Out');
        dispatch(resetUser());
        navigate("/");
        toast.success("Logout Successful", {
            position: "top-left",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    return (

        <>
            <Menu>
                <MenuHandler>
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <Avatar
                            src="https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"
                            alt="User Avatar"
                            size="small"
                            color="lightBlue"
                            className='w-9 h-9'
                        />
                    </div>
                </MenuHandler>
                <MenuList>
                    {profileMenuItems.map((menuItem, index) => (
                        <MenuItem key={index}>
                            {menuItem.link ? (
                                <Link to={menuItem.link} className="text-black flex items-center">
                                    <menuItem.icon className="w-4 h-4 mr-2" />
                                    {menuItem.label}
                                </Link>
                            ) : (
                                <button onClick={() => {
                                    handleSignOut();
                                }} className=" flex items-center text-red-500">
                                    <menuItem.icon className="w-4 h-4 mr-2" />
                                    {menuItem.label}
                                </button>
                            )}
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>

        </>

    );
};

export default UserDropdown;
