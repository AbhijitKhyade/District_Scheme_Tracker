import React from 'react'
import { Link } from "react-router-dom";

import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { MdDashboard, MdRateReview } from 'react-icons/md';
import { BiSolidPieChartAlt2 } from 'react-icons/bi';

const links = [
  {
    links: [
      {
        name: "Dashbaord",
        icon: <MdDashboard className='w-5 h-5' />,
        path: "dashboard",
      },
      {
        name: "Govt Schemes",
        path: "govt-schemes",
        icon: <BiSolidPieChartAlt2 className="h-5 w-5" />,
      },
      {
        name: "Scheme Monitoring",
        path: "scheme-monitoring",
        icon: <MdRateReview className="h-5 w-5" />,
      },
    ],
  },
];

export default function OfficersSidebar() {
  // const { currentUser } = useSelector((state) => state.user);
  const activeLink =
    "flex items-center gap-3 pl-2 pt-3 pb-2.5 rounded-lg text-white text-md m-2 w-full bg-blue-gray-800 dark:bg-blue-gray-800 dark:hover:text-black";
  const normalLink =
    "flex items-center gap-3 pl-2 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black m-2 w-full";

  return (
    <div className="h-auto lg:max-w-[18rem] w-1/24 sm:w-2/5 p-4 shadow-blue-gray-900/5 ">
      <div>
        <div className="mb-1 p-2">
          <Typography
            variant="h5"
            color="blue-gray"
            className="flex justify-start items-center gap-2"
          >
            <div className="rounded-full bg-gray-400 p-3 w-10 h-10 flex items-center justify-center text-dark font-bold">
              {/* {currentUser.Name ? currentUser.Name[0] : "A"} */}
              A
            </div>
            <div>
              <p className="font-semibold"> Abhishek  </p>
              <p className="text-xs font-normal"> abhishek@gmail.com  </p>
            </div>
          </Typography>
        </div>
        <div>
          <List className="mt-2 p-4">
            {links.map((item) => (
              <div key={item.title}>
                {item.links.map((link) => (
                  <Link
                    to={`/officers/${link.path}`}
                    // onClick={closeSidebar}
                    key={link.name}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    <ListItem className="hover:w-full">
                      {" "}
                      {/* Adjust the width as needed */}
                      <ListItemPrefix>{link.icon}</ListItemPrefix>
                      <span className="capitalize">{link.name}</span>
                    </ListItem>
                  </Link>
                ))}
              </div>
            ))}
          </List>
        </div>
      </div>
    </div>
  )
}