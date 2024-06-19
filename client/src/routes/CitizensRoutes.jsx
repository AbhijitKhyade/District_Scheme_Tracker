import CitizensDashbord from "../components/CitizensModule/CitizensDashbord";
import CitizensLayout from "../layouts/CitizensLayout";
import Govt_Schemes from "../pages/Citizens/Govt_Schemes";
import SchemeAction from "../pages/Citizens/SchemeAction";
import SchemeExplore from "../pages/Citizens/SchemeExplore";
import SchemeProgress from "../pages/Citizens/SchemeProgress";
import SchemeSummary from "../pages/Citizens/SchemeSummary";

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
        {
            path: "schemes-summary",
            element: <SchemeSummary />
        },
        {
            path: "scheme",
            element: <SchemeAction />
        },
        {
            path: "schemes-explore",
            element: <SchemeExplore />
        },
    ]
}