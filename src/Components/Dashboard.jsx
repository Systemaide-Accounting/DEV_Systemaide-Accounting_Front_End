import { useContext, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Navbar } from "./Navbar";
import { Transaction } from "./Transaction";
import { Library } from "./Library";
import { Reports } from "./Reports";
import { Utilities } from "./Utilities";
import { userAllowedViewSystemConfig } from "../constants/UserConstants";
import AuthContext from "../context/AuthContext";
import { Home } from "../Pages/Home";

export function Dashboard({ children }) {
  const { user } = useContext(AuthContext);
  const [openSidebar, setOpenSidebar] = useState(false);
  const location = useLocation();
  const sidebarRef = useRef(null);

  const isActiveLink = (path) => location.pathname === path || location.pathname.startsWith(path);

  const [transactionDropdown, setTransactionDropdown] = useState(false);
  const [reportsDropdown, setReportsDropdown] = useState(false);
  const [libraryDropdown, setLibraryDropdown] = useState(false);
  const [utilitiesDropdown, setUtilitiesDropdown] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Navbar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        sidebarRef={sidebarRef}
      />

      <aside
        ref={sidebarRef}
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-72 h-screen pt-20 transition-transform ${
          openSidebar ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-100 shadow-sm lg:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col">
          {/* Scrollable Navigation Section */}
          <div className="flex-1 px-4 pb-4 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
            <div className="space-y-1.5 font-medium">
              <Transaction
                isActiveLink={isActiveLink}
                transactionDropdown={transactionDropdown}
                setTransactionDropdown={setTransactionDropdown}
              />
              <Reports
                isActiveLink={isActiveLink}
                reportsDropdown={reportsDropdown}
                setReportsDropdown={setReportsDropdown}
              />
              <Library
                isActiveLink={isActiveLink}
                libraryDropdown={libraryDropdown}
                setLibraryDropdown={setLibraryDropdown}
              />
              <Utilities
                isActiveLink={isActiveLink}
                utilitiesDropdown={utilitiesDropdown}
                setUtilitiesDropdown={setUtilitiesDropdown}
              />

              {/* <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-2 text-xs font-medium text-gray-500 bg-white">SYSTEM</span>
                </div>
              </div> */}

              {userAllowedViewSystemConfig(user?.permissions) && (
                <>
                  {/* Horizontal line */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-2 text-xs font-medium text-gray-500 bg-white">
                        SYSTEM
                      </span>
                    </div>
                  </div>
                  {/* System Configuration Section */}
                  <div className="px-3" data-section="system">
                    <Link to="/system-config">
                      <div
                        className={`group flex items-center gap-2 w-full px-4 py-2 rounded-lg transition duration-200 ${
                          isActiveLink("/system-config")
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <svg
                          className={`w-5 h-5 transition-colors duration-200 ${
                            isActiveLink("/system-config")
                              ? "text-blue-700"
                              : "text-gray-500 group-hover:text-gray-700"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="text-lg tracking-tighter">
                          System Configuration
                        </span>
                      </div>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Fixed User Info Section */}
          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="flex items-center gap-3">
              <img
                className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="User"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email ?? "No email available"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main
        className={`transition-all duration-200 lg:ml-72 min-h-screen bg-gray-50 pt-16`}
      >
        <div className="p-6">
          {location.pathname === "/home" ? (
            <Home
              setOpenSidebar={setOpenSidebar}
              setTransactionDropdown={setTransactionDropdown}
              setReportsDropdown={setReportsDropdown}
              setLibraryDropdown={setLibraryDropdown}
              setUtilitiesDropdown={setUtilitiesDropdown}
            />
          ) : (
            children
          )}
        </div>
      </main>
    </div>
  );
}

Dashboard.propTypes = {
  children: PropTypes.node
};