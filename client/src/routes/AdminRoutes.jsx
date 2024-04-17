import React from 'react'
import AdminDashboard from '../components/AdminModule/AdminDashboard'
import AdminLayout from '../layouts/AdminLayout'
import District_Officers from '../pages/Admin/District_Officers'
import Govt_Schemes from '../pages/Admin/Govt_Schemes'
import District_Monitoring from '../pages/Admin/District_Monitoring'
import Reports from '../pages/Admin/Reports'

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
            path: "district-monitoring",
            element: <District_Monitoring />
        },
        {
            path: "reports",
            element: <Reports />
        }
    ]

}