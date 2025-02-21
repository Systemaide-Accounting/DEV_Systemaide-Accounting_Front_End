import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Transaction } from "./Transaction";
import { Library } from "./Library";
import { Reports } from "./Reports";
import { Utilities } from "./Utilities";

export function Dashboard() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const location = useLocation();

  const isActiveLink = (path) => location.pathname === path;

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
      <Navbar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />

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
          </ul>
        </div>
      </aside>
    </>
  );
}
