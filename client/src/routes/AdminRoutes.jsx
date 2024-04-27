import React from 'react'
import AdminDashboard from '../components/AdminModule/AdminDashboard'
import AdminLayout from '../layouts/AdminLayout'
import District_Officers from '../pages/Admin/District_Officers'
import Govt_Schemes from '../pages/Admin/Govt_Schemes'
import Reports from '../pages/Admin/Reports'
import Manage_Officers from '../pages/Admin/Manage_Officers'
import Scheme_Tracking from '../pages/Admin/Scheme_Tracking'
import SingleSchemeDetails from '../pages/Admin/SingleSchemeDetails'
import EditSchemes from '../pages/Admin/EditSchemes'
import Feedback from '../pages/Admin/Feedback'
import ChatComponent from '../components/ChatComponent'

export const AdminRoutes = {
    path: "admin/",
    element: <AdminLayout />,
    children: [
        {
            path: "dashboard",
            element: <AdminDashboard />
        },
        {
            path: "district-officers",
            element: <District_Officers />
        },
        {
            path: "govt-schemes",
            element: <Govt_Schemes />
        },
        {
            path: "scheme-progress",
            element: <Scheme_Tracking />
        },
        {
            path: "reports",
            element: <Reports />
        },
        {
            path: "manage-officers",
            element: <Manage_Officers />
        },
        {
            path: "single-scheme-details",
            element: <SingleSchemeDetails />
        },
        {
            path: "edit-scheme",
            element: <EditSchemes />
        },
        {
            path: "feedback",
            element: <Feedback />
        },
        {
            path: "messages",
            element: <ChatComponent />
        }
    ]

}