import React, { useState } from 'react';
import { Menu, MenuHandler, MenuList, MenuItem, Avatar } from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaUserCircle, FaPowerOff, FaCompass } from 'react-icons/fa';
import { MdDashboard, MdRateReview } from "react-icons/md";
import { BiSolidPieChartAlt2 } from 'react-icons/bi';
import { GiProgression } from 'react-icons/gi';
import { resetUser } from './../redux/userSlice';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiFeedbackFill, RiShieldUserFill } from 'react-icons/ri';
import { AiFillMessage } from 'react-icons/ai';

const UserDropdown = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
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

    const citizenLinks = [
        {
            name: "Govt Schemes",
            path: "/citizens/govt-schemes",
            icon: BiSolidPieChartAlt2,
        },
        {
            name: "Schemes Progress",
            path: "/citizens/schemes-summary",
            icon: GiProgression,
        },
        {
            name: "Scheme Exploration",
            path: "/citizens/schemes-explore",
            icon: FaCompass,
        },
    ];

    const adminLinks = [
        // {
        //     name: "Dashbaord",
        //     icon: <MdDashboard className='w-5 h-5' />,
        //     path: "dashboard",
        // },
        {
            name: "District Officers",
            path: "/admin/district-officers",
            icon: RiShieldUserFill,
        },
        {
            name: "Govt Schemes",
            path: "/admin/govt-schemes",
            icon: BiSolidPieChartAlt2,
        },
        {
            name: "Scheme Progress",
            path: "/admin/scheme-progress",
            icon: MdRateReview,
        },
        // {
        //   name: "Reports",
        //   path: "reports",
        //   icon: <BiSolidReport className="h-5 w-5" />,
        // },
        {
            name: "Feedback",
            path: "/admin/feedback",
            icon: RiFeedbackFill,
        },
        // {
        //     name: "Messages",
        //     path: "/admin/messages",
        //     icon: AiFillMessage,
        // }
    ]

    const officerLinks = [
        // {
        //     name: "Dashboard",
        //     path: "/officers/dashboard",
        //     icon: MdDashboard,
        // },
        {
            name: "Govt Schemes",
            path: "/officers/govt-schemes",
            icon: BiSolidPieChartAlt2,
        },
        {
            name: "Scheme Monitoring",
            path: "/officers/scheme-monitoring",
            icon: MdRateReview,
        },
        {
            name: "Feedback",
            path: "/officers/feedback",
            icon: RiFeedbackFill,
        },
        // {
        //     name: "Messages",
        //     path: "/officers/messages",
        //     icon: AiFillMessage,
        // }
    ];

    const generateProfileMenuItems = () => {
        const commonItems = [
            {
                label: "My Dashboard",
                icon: MdDashboard,
                link: getProfileLink(),
            },
        ];

        const roleBasedItems = [];

        if (currentUser.role === "Admin") {
            adminLinks.forEach(link => {
                roleBasedItems.push({
                    label: link.name,
                    icon: link.icon,
                    link: link.path,
                });
            });
        } else if (currentUser.role === "District Officer") {
            officerLinks.forEach(link => {
                roleBasedItems.push({
                    label: link.name,
                    icon: link.icon,
                    link: link.path,
                });
            });
        } else if (currentUser.role === "Citizen") {
            citizenLinks.forEach(link => {
                roleBasedItems.push({
                    label: link.name,
                    icon: link.icon,
                    link: link.path,
                });
            });
        }

        return { commonItems, roleBasedItems };
    };

    const { commonItems, roleBasedItems } = generateProfileMenuItems();

    const handleSignOut = () => {
        // console.log('Sign Out');
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
                    {commonItems.map((menuItem, index) => (
                        <MenuItem key={index}>
                            {menuItem.link ? (
                                <Link to={menuItem.link} className="text-black flex items-center">
                                    <menuItem.icon className="w-4 h-4 mr-2" />
                                    {menuItem.label}
                                </Link>
                            ) : null}
                        </MenuItem>
                    ))}
                    {roleBasedItems.map((menuItem, index) => (
                        <MenuItem key={index} className="lg:hidden md:hidden">
                            {menuItem.link ? (
                                <Link to={menuItem.link} className="text-black flex items-center">
                                    <menuItem.icon className="w-4 h-4 mr-2" />
                                    {menuItem.label}
                                </Link>
                            ) : null}
                        </MenuItem>
                    ))}
                    <MenuItem className="lg:hidden order-last">
                        <button onClick={handleSignOut} className="flex items-center text-red-700">
                            <FaPowerOff className="w-4 h-4 mr-2" />
                            Sign Out
                        </button>
                    </MenuItem>
                    <MenuItem className="hidden lg:flex">
                        <button onClick={handleSignOut} className="flex items-center text-red-700">
                            <FaPowerOff className="w-4 h-4 mr-2" />
                            Sign Out
                        </button>
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    );
};

export default UserDropdown;
