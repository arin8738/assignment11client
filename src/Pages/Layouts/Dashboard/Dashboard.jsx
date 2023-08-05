/* eslint-disable no-unused-vars */
import React from "react";
import Header from "../../SharedPages/Header";
import Footer from "../../SharedPages/Footer";
import { Link, NavLink, Outlet } from "react-router-dom";
import { FaAd, FaCheckDouble, FaList, FaListAlt, FaRegListAlt, FaShoppingCart, FaThList, FaUser, FaUsers, FaWallet } from "react-icons/fa";
import { MdPlaylistAdd } from "react-icons/md";
import useUser from "../../../Components/Hooks/useUser";
import CustomHelmet from "../../../Components/Helmet/CustomHelmet";

const Dashboard = () => {

  const [loggedUser] = useUser();
  console.log("logged", loggedUser)

  let isUser = false, isAdmin = false;

  if(loggedUser?.designation == "Student"){
    isUser= true;
  }
  else if(loggedUser?.designation == "Admin"){
    isAdmin = true;
  }
  else{
    isAdmin = false;
    isUser = false;
  }
  // const isAdmin = true;

  // const isAdmin = false;
  // const isUser = false;
  // const isUser = true;

  const userOptions = (
    <>
    <li className="text-center text-2xl font-bold text-white mt-5">User Dashboard</li>
    <li className="divider"></li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-white text-lg font-semibold" : ""
          }
          to="/dashboard/my-selected-classes"
        >
          <FaList></FaList>
          {/* <span>{data.length}</span> */}
          My Selected Classes
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-white text-lg font-semibold" : ""
          }
          to="/dashboard/my-enrolled-classes"
        >
          <FaCheckDouble></FaCheckDouble> My Enrolled Classes
        </NavLink>
      </li>

      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-white text-lg font-semibold" : ""
          }
          to="/dashboard/my-payment-history"
        >
          <FaWallet></FaWallet> Payment History
        </NavLink>
      </li>
    </>
  );

  const instructorOptions = (
    <>
    <li className="text-center text-2xl font-bold text-white mt-5">Instructor Dashboard</li>
    <li className="divider"></li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-white text-lg font-semibold" : ""
          }
          to="/dashboard/my-classes"
        >
          <FaList></FaList>
          {/* <span>{data.length}</span> */}
          My Classes
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-white text-lg font-semibold" : ""
          }
          to="/dashboard/add-a-class"
        >
          <MdPlaylistAdd className="text-2xl"></MdPlaylistAdd> Add a class
        </NavLink>
      </li>
    </>
  );
  const adminOptions = (
    <>
    <li className="text-center text-2xl font-bold text-white mt-5">Admin Dashboard</li>
    <li className="divider"></li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-white text-lg font-semibold" : ""
          }
          to="/dashboard/classes"
        >
          <FaRegListAlt></FaRegListAlt>
          {/* <span>{data.length}</span> */}
          Manage Classes
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-white text-lg font-semibold" : ""
          }
          to="/dashboard/users"
        >
          <FaUsers></FaUsers> Manage Users
        </NavLink>
      </li>
    </>
  );
  return (
    <>
      <div className="max-w-7xl mx-auto">
      <CustomHelmet>Dashboard</CustomHelmet>
        <Header></Header>

        <div className="drawer lg:drawer-open  ">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center pt-20">
            {/* Page content here */}
            <Outlet></Outlet>
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              Open drawer
            </label>
          </div>
          <div className="drawer-side ">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 h-full text-base-content pt-24 bg-my-secondary">
              {/* Sidebar content here */}

              {
                isUser? userOptions: (isAdmin? adminOptions: instructorOptions)
              }

            </ul>
          </div>
        </div>
      </div>
      {/* <Footer></Footer> */}
    </>
  );
};

export default Dashboard;
