import CitizensDashbord from "../components/CitizensModule/CitizensDashbord";
import CitizensLayout from "../layouts/CitizensLayout";
import Govt_Schemes from "../pages/Citizens/Govt_Schemes";

export const CitizensRoutes = {
    path: "citizens/",
    element: <CitizensLayout />,
    children: [
        {
            path: "dashboard",
            element: <CitizensDashbord />
        },
        {
            path: "govt-schemes",
            element: <Govt_Schemes />
        },
    ]
}