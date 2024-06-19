import React from "react";
import {
    Drawer,
    Button,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import OfficersSidebar from "./OfficersModule/OfficersSidebar";
import CitizensSidebar from "./CitizensModule/CitizensSidebar";
import AdminSidebar from "./AdminModule/AdminSidebar";

export default function DrawerWithNavigation({ open, closeDrawer }) {
    const currentUser = useSelector((state) => state.user.currentUser);

    return (
        <>
            {/* <Button onClick={openDrawer}>Open Drawer</Button> */}
            <Drawer open={open} onClose={closeDrawer} >
                <div className="mb-2 flex items-center justify-between p-4 ">
                    <Typography variant="h5" color="blue-gray">
                        Sidebar
                    </Typography>
                    <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </div>
                <div className="p-3 h-full">
                    {/* Render appropriate sidebar based on user type */}
                    {currentUser?.role === "Officers" && (
                        <OfficersSidebar closeSidebar={closeDrawer} />
                    )}
                    {currentUser?.role === "Citizen" && (
                        <div className="h-16">
                            <CitizensSidebar closeSidebar={closeDrawer} />
                        </div>
                    )}
                    {currentUser?.role === "Admin" && (
                        <AdminSidebar closeSidebar={closeDrawer} />
                    )}
                </div>
            </Drawer>
        </>
    );
}