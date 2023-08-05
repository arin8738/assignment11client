/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import BtnOutLine from "../../Components/Buttons/BtnOutLine";
import BtnSolid from "../../Components/Buttons/BtnSolid";
import { AuthContext } from "../AuthPage/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../Components/Hooks/useCart";
import useUser from "../../Components/Hooks/useUser";

const Header = () => {
  const { user, Logout } = useContext(AuthContext);
  const [cart] = useCart();
  // console.log("header", cart);

  // console.log(user)
  const handleLogout = () => {
    Logout()
      .then(() => {
        console.log("Log out successfully");
      })
      .catch((err) => console.log(err));
  };

  const menu = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-my-primary text-lg font-semibold" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/instructors"
          className={({ isActive }) =>
            isActive ? "text-my-primary text-lg font-semibold" : ""
          }
        >
          Instructors
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/classes"
          className={({ isActive }) =>
            isActive ? "text-my-primary text-lg font-semibold" : ""
          }
        >
          Classes
        </NavLink>
      </li>
    </>
  );

  const conditionalMenu = (
    <>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "text-my-primary text-lg font-semibold" : ""
          }
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="text-white">
      <div className="navbar bg-[black] max-w-7xl mx-auto fixed bg-opacity-50 px-2 md:px-5 z-10">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="flex items-center menu menu-compact dropdown-content mt-3 p-2 shadow bg-bermuda rounded-box w-52 text-base font-semibold"
            >
              {menu}
              {user && conditionalMenu}
              <NavLink
                to="/dashboard/my-selected-classes"
                className={({ isActive }) =>
                  isActive
                    ? "text-[black] bg-white text-lg font-semibold btn bg-transparent"
                    : "btn bg-transparent hover:text-[black] text-white"
                }
                //  className="btn bg-transparent hover:text-[black] text-white"
              >
                <FaShoppingCart className=" "></FaShoppingCart>
                <div className="badge badge-secondary">{cart?.length || 0}</div>
              </NavLink>
            </ul>
          </div>
          <Link
            to="/"
            className="text-my-secondary text-3xl font-bold relative flex flex-col items-center"
          >
            <span className="">Language</span>
            <span className="text-my-primary ">Master</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center menu menu-horizontal px-1 text-base font-semibold">
            {menu}
            {user && conditionalMenu}
            <NavLink
              to="/dashboard/my-selected-classes"
              className={({ isActive }) =>
                isActive
                  ? "text-[black] bg-white text-lg font-semibold btn bg-transparent"
                  : "btn bg-transparent hover:text-[black] text-white"
              }
              //  className="btn bg-transparent hover:text-[black] text-white"
            >
              <FaShoppingCart className=" "></FaShoppingCart>
              <div className="badge badge-secondary">{cart?.length || 0}</div>
            </NavLink>
            {/* {conditionalMenu} */}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <>
              <img
                className="h-12 w-12 rounded-full mx-3"
                title={user?.displayName}
                src={user?.photoURL}
                alt="userImg"
              />
              <Link
                onClick={handleLogout}
                to="/login"
                className="btn btn-outline hover:bg-my-primary hover:border-my-primary text-my-secondary border-my-secondary"
              >
                Log out
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              className="btn btn-outline hover:bg-my-primary hover:border-my-primary text-my-secondary border-my-secondary"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
