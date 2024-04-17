import React from 'react'
import NavbarList from '../components/NavbarList'
import AdminSidebar from '../components/AdminModule/AdminSidebar'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  // const { currentUser } = useSelector((state) => state.user);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // Check if currentUser is not present, then redirect to "/"
  //   if (!currentUser || currentUser.Role !== 0) {
  //     navigate("/");
  //   }
  // }, [currentUser, navigate]);

  // if (!currentUser || currentUser.Role !== 0) {
  //   // If redirecting, return null or an empty div
  //   return null;
  // }
  return (
    <div className="min-h-full  font-poppins">
      <div className="w-full h-full  font-poppins ">
        {/* {currentUser && currentUser.Role == 0 ? ( */}
        <>
          <div className="flex flex-col w-full">
            <NavbarList />
            <div className="w-full flex font-poppins ">
              <span className="hidden sm:block h-screen ">
                <AdminSidebar />
              </span>
              <div className="border-l-2 w-full mx-0 px-0 overflow-x-auto">
                <Outlet />
              </div>
            </div>
          </div>
        </>
        {/* ) : (
          <></>
        )} */}
      </div>
    </div>
  )
}
