import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SideBar = () => {
  const { profileDate, isAuthenticated } = useAuth();
  console.log("role->", profileDate, isAuthenticated);
  return (
    <>
      {isAuthenticated && profileDate?.user?.role === "DONOR" && (
        <>
          <NavLink
            to="/user-dashboard/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9  cursor-pointer ${
                isActive ? "bg-red-100 border-r-4 border-primary" : ""
              }`
            }
          >
            <p className="py-1">Dashboard</p>
          </NavLink>
          {/* <NavLink
            to="/user-dashboard/donors"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9  cursor-pointer ${
                isActive ? "bg-red-100 border-r-4 border-primary" : ""
              }`
            }
          >
            <p className="py-1">Donars</p>
          </NavLink>
          <NavLink
            to="/user-dashboard/history"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9  cursor-pointer ${
                isActive ? "bg-red-100 border-r-4 border-primary" : ""
              }`
            }
          >
            <p className="py-1">Donation History</p>
          </NavLink> */}
          <NavLink
            to="/user-dashboard/centers"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9  cursor-pointer ${
                isActive ? "bg-red-100 border-r-4 border-primary" : ""
              }`
            }
          >
            <p className="py-1">Blood Centers</p>
          </NavLink>
          <NavLink
            to="/user-dashboard/camps"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9  cursor-pointer ${
                isActive ? "bg-red-100 border-r-4 border-primary" : ""
              }`
            }
          >
            <p className="py-1">Blood Camps</p>
          </NavLink>
        </>
      )}
      {isAuthenticated && profileDate?.user?.role === "ORG-ADMIN" && (
        <>
          <NavLink
            to="/organization-dashboard/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9  cursor-pointer ${
                isActive ? "bg-red-100 border-r-4 border-primary" : ""
              }`
            }
          >
            <p className="py-1">Dashboard</p>
          </NavLink>

          <NavLink
            to="/organization-dashboard/donors"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9  cursor-pointer ${
                isActive ? "bg-red-100 border-r-4 border-primary" : ""
              }`
            }
          >
            <p className="py-1">Donars List</p>
          </NavLink>
          {/* <NavLink
            to="/organization-dashboard/history"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9  cursor-pointer ${
                isActive ? "bg-red-100 border-r-4 border-primary" : ""
              }`
            }
          >
            <p className="py-1">Blood Requests</p>
          </NavLink>
          <NavLink
            to="/organization-dashboard/historyk"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9  cursor-pointer ${
                isActive ? "bg-red-100 border-r-4 border-primary" : ""
              }`
            }
          >
            <p className="py-1">Requests History</p>
          </NavLink> */}
          <NavLink
            to="/organization-dashboard/centers"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9  cursor-pointer ${
                isActive ? "bg-red-100 border-r-4 border-primary" : ""
              }`
            }
          >
            <p className="py-1">Blood Centers</p>
          </NavLink>
          <NavLink
            to="/organization-dashboard/camps"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9  cursor-pointer ${
                isActive ? "bg-red-100 border-r-4 border-primary" : ""
              }`
            }
          >
            <p className="py-1">Blood Camps</p>
          </NavLink>
        </>
      )}
      {isAuthenticated && profileDate?.user?.role === "ADMIN" && (
        <>
          <NavLink
            to="/admin-dashboard/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9  cursor-pointer ${
                isActive ? "bg-red-100 border-r-4 border-primary" : ""
              }`
            }
          >
            <p className="py-1">Dashboard</p>
          </NavLink>
          <NavLink
            to="/admin-dashboard/organizations"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9  cursor-pointer ${
                isActive ? "bg-red-100 border-r-4 border-primary" : ""
              }`
            }
          >
            <p className="py-1">Organization Requests</p>
          </NavLink>
          <NavLink
            to="/admin-dashboard/donors"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9  cursor-pointer ${
                isActive ? "bg-red-100 border-r-4 border-primary" : ""
              }`
            }
          >
            <p className="py-1">Donars List</p>
          </NavLink>
          {/* <NavLink
            to="/organization-dashboard/history"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9  cursor-pointer ${
                isActive ? "bg-red-100 border-r-4 border-primary" : ""
              }`
            }
          >
            <p className="py-1">Blood Requests</p>
          </NavLink>
          <NavLink
            to="/organization-dashboard/historyk"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9  cursor-pointer ${
                isActive ? "bg-red-100 border-r-4 border-primary" : ""
              }`
            }
          >
            <p className="py-1">Requests History</p>
          </NavLink> */}
          <NavLink
            to="/organization-dashboard/centers"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9  cursor-pointer ${
                isActive ? "bg-red-100 border-r-4 border-primary" : ""
              }`
            }
          >
            <p className="py-1">Blood Centers</p>
          </NavLink>
          <NavLink
            to="/organization-dashboard/camps"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9  cursor-pointer ${
                isActive ? "bg-red-100 border-r-4 border-primary" : ""
              }`
            }
          >
            <p className="py-1">Blood Camps</p>
          </NavLink>
        </>
      )}
    </>
  );
};

export default SideBar;
