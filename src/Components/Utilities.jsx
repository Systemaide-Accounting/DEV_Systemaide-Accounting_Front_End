import { useState, useEffect } from "react";
import { SubMenu } from "./SubMenu";

// IMPORT PAGES ROUTES OF UTILITIES
import { utilities, backups } from "./all-routes/utilities";
import { utilitiesIcons, backupIcons } from "./icons/utilityIcons";

export function Utilities({ isActiveLink, utilitiesDropdown, setUtilitiesDropdown }) {
  // Dropdown states for submenus
  const [utilitiesSectionDropdown, setUtilitiesSectionDropdown] = useState(false);
  const [backupsDropdown, setBackupsDropdown] = useState(false);

  const isActiveUtilities = utilities.some((utility) =>
    isActiveLink(utility.path)
  );
  const isActiveBackups = backups.some((backup) => isActiveLink(backup.path));

  const utilitiesSection = [
    {
      name: "Utilities",
      dropDown: utilitiesSectionDropdown,
      setDropDown: setUtilitiesSectionDropdown,
      menu: utilities,
      icons: utilitiesIcons,
      isActive: isActiveUtilities,
    },
    {
      name: "Backup",
      dropDown: backupsDropdown,
      setDropDown: setBackupsDropdown,
      menu: backups,
      icons: backupIcons,
      isActive: isActiveBackups,
    },
  ];

  useEffect(() => {
    isActiveUtilities ||
    isActiveBackups
      ? setUtilitiesDropdown(true) 
      : setUtilitiesDropdown(false);
      setUtilitiesSectionDropdown(isActiveUtilities);
      setBackupsDropdown(isActiveBackups);
  }, [setUtilitiesDropdown, isActiveUtilities, isActiveBackups]);

  const getDropdownIcon = (isOpen) => (
    <svg
      className="w-3 h-3"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d={isOpen ? "M1 5L5 1L9 5" : "m1 1 4 4 4-4"}
      />
    </svg>
  );

  const getSubMenuDropdownIcon = (isOpen) => (
    <svg
      className="w-[20px] h-[20px] dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d={isOpen ? "M5 12h14" : "M5 12h14M12 5v14"}
      />
    </svg>
  );

  return (
    <li>
      <button
        type="button"
        className={`flex items-center w-full p-2 text-base ${
          // reportsDropdown
          isActiveUtilities || isActiveBackups
            ? "text-gray-900 bg-gray-100"
            : "text-white hover:text-gray-900"
        } transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
        onClick={() => setUtilitiesDropdown(!utilitiesDropdown)}
      >
        <svg
          className="w-[30px] h-[30px] dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4"
          />
        </svg>
        <span className="flex-1 ms-3 text-left whitespace-nowrap">
          Utilities
        </span>
        {getDropdownIcon(utilitiesDropdown)}
      </button>
      {utilitiesDropdown && (
        <ul className="py-2 space-y-2">
          {utilitiesSection.map((utility, index) => (
            <>
              <li key={index} className="ml-5">
                <button
                  className={`flex items-center w-full p-2 ${
                    utility.isActive
                      ? "text-gray-900 bg-gray-100"
                      : "text-white hover:text-gray-900 hover:bg-gray-100"
                  } transition duration-75 rounded-lg group dark:text-white dark:hover:bg-gray-700`}
                  onClick={() => {
                    utility.setDropDown(!utility.dropDown);
                  }}
                >
                  <span className="flex-1 text-left rtl:text-right whitespace-nowrap">
                    {utility.name}
                  </span>
                  {getSubMenuDropdownIcon(utility.dropDown)}
                </button>
                {utility.dropDown && (
                  <ul key={index} className="py-2 space-y-2">
                    <SubMenu
                      items={utility.menu}
                      isActiveLink={isActiveLink}
                      icons={utility.icons}
                    />
                  </ul>
                )}
              </li>
            </>
          ))}
        </ul>
      )}
    </li>
  );
}
