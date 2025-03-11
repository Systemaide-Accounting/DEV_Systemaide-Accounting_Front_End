import { useState, useEffect, useRef, useContext } from "react";
import companyLogo from "../assets/company-logo.gif";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { HandleSimpleNameFormat } from "./reusable-functions/NameFormatter";
import swal2 from "sweetalert2";

export function Navbar({ openSidebar, setOpenSidebar }) {

  const navigate = useNavigate();
  const {user} = useContext(AuthContext);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdown(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpenSidebar(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, sidebarRef]);

  const signOut = async () => {
    const response = await swal2.fire({
        title: 'Are you sure you want to log out?',
        showCancelButton: true,
        confirmButtonText: 'Log out'
    });
    if(response.isConfirmed) {
      localStorage.clear();
      window.location.href = import.meta.env.VITE_SYSTEMAIDE_LOGIN;
    }
  };

  const navigateToHome = async () => {
    navigate("/home");
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                aria-expanded={openSidebar}
                type="button"
                onClick={() => setOpenSidebar((prevState) => !prevState)}
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open Sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <div
                className="flex ms-2 md:me-24"
                onClick={navigateToHome}
                style={{ cursor: "pointer" }}
              >
                <img src={companyLogo} className="h-8 me-3" alt="Logo" />
                <span className="hidden sm:inline self-center uppercase text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Systemaide Solutions Inc.
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  aria-expanded={profileDropdown}
                  data-dropdown-toggle="dropdown-user"
                  onClick={() => setProfileDropdown((prevState) => !prevState)}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="UserPhoto"
                  />
                </button>

                {profileDropdown && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-48 w-48 bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="dropdown-user"
                  >
                    <div className="px-4 py-3" role="none">
                      <span
                        className="text-sm text-gray-900 dark:text-white"
                        role="none"
                      >
                        <HandleSimpleNameFormat
                          firstName={user?.firstName}
                          lastName={user?.lastName}
                        />
                      </span>
                      <p
                        className="text-sm font-medium break-words text-gray-900 dark:text-gray-300"
                        role="none"
                      >
                        {user?.email ?? "Email is not available"}
                      </p>
                    </div>

                    <ul className="py-1" role="none">
                      <li>
                        {/* disabled temporarily */}
                        <a
                          href="#"
                          className="pointer-events-none block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Settings
                        </a>
                      </li>
                      <li>
                        <Link
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                          onClick={signOut}
                        >
                          Sign out
                        </Link>
                        {/* <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Sign out
                        </a> */}
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}