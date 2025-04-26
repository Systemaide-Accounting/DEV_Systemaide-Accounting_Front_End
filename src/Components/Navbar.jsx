import { useState, useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import companyLogo from "../assets/company-logo.gif";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { HandleSimpleNameFormat } from "./reusable-functions/NameFormatter";
import swal2 from "sweetalert2";

export function Navbar({ openSidebar, setOpenSidebar, sidebarRef }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdown(false);
      }
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest('[data-drawer-toggle="logo-sidebar"]')
      ) {
        setOpenSidebar(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, sidebarRef, setOpenSidebar]);

  const signOut = async () => {
    const response = await swal2.fire({
      title: "Are you sure you want to log out?",
      showCancelButton: true,
      confirmButtonText: "Log out",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      icon: "question",
      background: "#ffffff",
      color: "#1f2937",
      titleColor: "#1f2937",
      textColor: "#4b5563",
      iconColor: "#3b82f6",
      showClass: {
        popup: 'animate__animated animate__fadeInDown animate__faster'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp animate__faster'
      },
      customClass: {
        popup: 'rounded-xl shadow-lg',
        title: 'text-xl font-light font-poppins',
        text: 'text-sm font-light font-poppins',
        confirmButton: 'rounded-lg px-6 py-2.5 text-sm font-light font-poppins shadow-sm',
        cancelButton: 'rounded-lg px-6 py-2.5 text-sm font-light font-poppins shadow-sm',
        icon: 'border-2'
      }
    });
    if (response.isConfirmed) {
      localStorage.clear();
      window.location.href = import.meta.env.VITE_SYSTEMAIDE_LOGIN;
    }
  };

  const navigateToHome = async () => {
    navigate("/home");
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-[2000px] mx-auto">
        <div className="flex items-center justify-between px-4 py-2.5 lg:px-6">
          {/* Logo & Menu Toggle */}
          <div className="flex items-center gap-4">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              aria-expanded={openSidebar}
              type="button"
              onClick={() => setOpenSidebar((prev) => !prev)}
              className="inline-flex items-center justify-center w-8 h-8 text-gray-500 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 lg:hidden"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>

            <div 
              className="flex items-center gap-3 cursor-pointer transition-transform duration-200 hover:transform hover:scale-[0.98]" 
              onClick={navigateToHome}
            >
              <img src={companyLogo} className="h-8 w-auto" alt="Systemaide Logo" />
              <div className="hidden sm:flex flex-col">
                <span className="text-gray-900 font-semibold text-lg tracking-tight font-poppins">
                  Systemaide
                </span>
                <span className="text-xs text-gray-500 -mt-1 font-poppins">
                  Solutions Inc.
                </span>
              </div>
            </div>
          </div>

          {/* Right Section: Profile */}
          <div className="flex items-center gap-4">
            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
                onClick={() => setProfileDropdown(!profileDropdown)}
              >
                <img
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="User"
                />
                <svg 
                  className="w-4 h-4 text-gray-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {profileDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">
                      <HandleSimpleNameFormat firstName={user?.firstName} lastName={user?.lastName} />
                    </p>
                    <p className="text-xs text-gray-500 mt-1 break-all">{user?.email ?? "No email available"}</p>
                  </div>
                  <div className="py-1">
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <svg className="w-4 h-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <svg className="w-4 h-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </a>
                  </div>
                  <div className="border-t border-gray-100">
                    <button
                      onClick={signOut}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  openSidebar: PropTypes.bool.isRequired,
  setOpenSidebar: PropTypes.func.isRequired,
  sidebarRef: PropTypes.object.isRequired
};