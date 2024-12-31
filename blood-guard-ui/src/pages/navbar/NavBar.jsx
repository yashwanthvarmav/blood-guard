import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Profile from "../../assests/profile_pic.png";
import Dropdown from "../../assests/dropdown_icon.svg";
import Menu from "../../assests/menu_icon.svg";
import Close from "../../assests/cross_icon.png";
import { useAuth } from "../../context/AuthContext";
import SideBar from "../../components/SideBar";
import ResetPassword from "../../components/ResetPassword";

const NavBar = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [resetPasswordModal, setResetPasswordModal] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between text-sm py-4 items-center border-b border-b-grey-400 sticky top-0 bg-white z-10">
      <h3 className="w-44 cursor-pointer font-outfit font-semibold text-2xl text-primary">
        Blood Guard
      </h3>

      {!isAuthenticated && (
        <ul className="hidden md:flex items-start gap-5 font-medium text-sm uppercase">
          <NavLink to="/">
            <li className="py-1">Home</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>
          {/* <NavLink to="/centers-camps">
            <li className="py-1">Centers & Camps</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink> */}
          <NavLink to="/csr-impact">
            <li className="py-1">Corporate Impact </li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to="/eligibility-guide">
            <li className="py-1">Eligibility Guide</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to="/motivation-hub">
            <li className="py-1">Motivation Hub</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to="/about">
            <li className="py-1">About</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to="/contact">
            <li className="py-1">Contact</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>
        </ul>
      )}
      <div className="flex items-center gap-4">
        {isLogged || isAuthenticated ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img src={Profile} alt="profile" className="w-8 rounded-full" />
            <img src={Dropdown} alt="dropdown" className="w-2.5" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden  group-hover:block">
              <div className="min-w-48 bg-stone-100  rounded flex flex-col gap-4 p-4">
                <p
                  className="hover:text-primary cursor-pointer"
                  onClick={() => {
                    navigate("/user-dashboard/profile");
                  }}
                >
                  My Profile
                </p>
                {/* <p
                  className="hover:text-primary cursor-pointer"
                  onClick={() => setResetPasswordModal(true)}
                >
                  Reset Password
                </p> */}
                <p
                  className="hover:text-primary cursor-pointer"
                  onClick={logout}
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            className="bg-primary text-white px-8 py-3 rounded-full font-light font-outfit  hidden md:block "
            onClick={() => {
              navigate("/login");
            }}
          >
            Login / Register
          </button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          src={Menu}
          alt="menu"
          className="w-6 md:hidden"
        />
        {showMenu && (
          <div
            className={`w-full fixed md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
          >
            <div className="flex items-center justify-between px-5 py-6">
              <h3 className="w-44 cursor-pointer font-outfit font-semibold text-2xl">
                Blood Guard
              </h3>
              <img
                src={Close}
                alt="close"
                onClick={() => {
                  setShowMenu(false);
                }}
                className="w-7"
              />
            </div>
            <ul className="flex flex-col items-center gap-2 mt-4 px-5 text-lg font-medium">
              {isAuthenticated ? (
                <>
                  <SideBar />
                </>
              ) : (
                <>
                  {" "}
                  <NavLink to="/">
                    <li className="py-1">Home</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
                  </NavLink>
                  {/* <NavLink to="/centers-camps">
                    <li className="py-1">Centers & Camps</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
                  </NavLink> */}
                  <NavLink to="/csr">
                    <li className="py-1">Corporate Impact </li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
                  </NavLink>
                  <NavLink to="/eligibility-guide">
                    <li className="py-1">Eligibility Guide</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
                  </NavLink>
                  <NavLink to="/motivation-hub">
                    <li className="py-1">Motivation Hub</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
                  </NavLink>
                  <NavLink to="/about">
                    <li className="py-1">About</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
                  </NavLink>
                  <NavLink to="/contact">
                    <li className="py-1">Contact</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
                  </NavLink>
                </>
              )}
            </ul>
          </div>
        )}
      </div>

      {resetPasswordModal && (
        <ResetPassword
          isModalOpen={resetPasswordModal}
          setIsModalOpen={setResetPasswordModal}
        />
      )}
    </div>
  );
};

export default NavBar;
