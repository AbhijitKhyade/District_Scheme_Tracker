import CitizensDashbord from "../components/CitizensModule/CitizensDashbord";
import CitizensLayout from "../layouts/CitizensLayout";
import Govt_Schemes from "../pages/Citizens/Govt_Schemes";
import SchemeProgress from "../pages/Citizens/SchemeProgress";

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
        {
            path: "scheme-progress",
            element: <SchemeProgress />
        },
    ]
}