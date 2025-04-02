import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Transaction } from "./Transaction";
import { Library } from "./Library";
import { Reports } from "./Reports";
import { Utilities } from "./Utilities";
import { userAllowedViewSystemConfig } from "../constants/UserConstants";
import AuthContext from "../context/AuthContext";

export function Dashboard() {
  
  const { user } = useContext(AuthContext);
  const [openSidebar, setOpenSidebar] = useState(false);
  const location = useLocation();

  const isActiveLink = (path) => location.pathname === path || location.pathname.startsWith(path);

  // TRANSACTION drop-down menu
  const [transactionDropdown, setTransactionDropdown] = useState(false);
  // REPORTS drop-down menu
  const [reportsDropdown, setReportsDropdown] = useState(false);
  // LIBRARY drop-down menu
  const [libraryDropdown, setLibraryDropdown] = useState(false);
  // UTILITIES drop-down menu
  const [utilitiesDropdown, setUtilitiesDropdown] = useState(false);
  
  return (
    <>
      <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-72 h-screen pt-20 transition-transform ${
          openSidebar ? "translate-x-0" : "-translate-x-full"
        }  bg-[#57A0DE] border-r border-gray-200 lg:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-[#57A0DE] dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {/* TRANSACTION */}
            <Transaction
              isActiveLink={isActiveLink}
              transactionDropdown={transactionDropdown}
              setTransactionDropdown={setTransactionDropdown}
            />
            {/* REPORTS */}
            <Reports
              isActiveLink={isActiveLink}
              reportsDropdown={reportsDropdown}
              setReportsDropdown={setReportsDropdown}
            />
            {/* LIBRARY */}
            <Library
              isActiveLink={isActiveLink}
              libraryDropdown={libraryDropdown}
              setLibraryDropdown={setLibraryDropdown}
            />
            {/* UTILITIES */}
            <Utilities
              isActiveLink={isActiveLink}
              utilitiesDropdown={utilitiesDropdown}
              setUtilitiesDropdown={setUtilitiesDropdown}
            />
            <hr />
            {userAllowedViewSystemConfig(user?.permissions) && (
              <li>
                <Link to="/system-config">
                  <div
                    className={`flex items-center w-full p-2 ${
                      isActiveLink(`/system-config`)
                        ? "text-gray-900 bg-gray-100"
                        : "text-white hover:text-gray-900 hover:bg-gray-100"
                    } transition duration-75 rounded-lg group dark:text-white dark:hover:bg-gray-700`}
                  >
                    {/* {transactionIcons[index].svg} */}
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      {/* {transaction.name} */}
                      System Configuration
                    </span>
                  </div>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </aside>
    </>
  );
}
