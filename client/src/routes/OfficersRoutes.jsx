import ChatComponent from "../components/ChatComponent";
import OfficersDashboard from "../components/OfficersModule/OfficersDashboard";
import OfficersLayout from "../layouts/OfficersLayout";
import Feedback from "../pages/Officers/Feedback";
import Govt_Schemes from "../pages/Officers/Govt_Schemes";
import Scheme_Monitoring from "../pages/Officers/Scheme_Monitoring";


export const OfficersRoutes = {
    path: "officers/",
    element: <OfficersLayout />,
    children: [
        {
            path: "dashboard",
            element: <OfficersDashboard />
        },
        {
            path: "govt-schemes",
            element: <Govt_Schemes />
        },
        {
            path: "scheme-monitoring",
            element: <Scheme_Monitoring />
        },
        {
            path: "feedback",
            element: < Feedback />
        },
        {
            path: "messages",
            element: <ChatComponent />
        }
    ]
}