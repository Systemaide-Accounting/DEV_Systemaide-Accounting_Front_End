import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import React from "react";
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
  const isAnyUtilityActive = isActiveUtilities || isActiveBackups;

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
    setUtilitiesDropdown(isAnyUtilityActive);
    setUtilitiesSectionDropdown(isActiveUtilities);
    setBackupsDropdown(isActiveBackups);
  }, [setUtilitiesDropdown, isActiveUtilities, isActiveBackups, isAnyUtilityActive]);

  const getDropdownIcon = (isOpen) => (
    <svg
      className={`w-4 h-4 transition-transform duration-200 ${
        isAnyUtilityActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-500"
      }`}
      style={{ transform: isOpen ? "rotate(-180deg)" : "rotate(0deg)" }}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  );

  const getSubMenuDropdownIcon = (isOpen, isActive) => (
    <svg
      className={`w-4 h-4 transition-all duration-500 ease-in-out ${
        isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-500"
      }`}
      style={{ 
        transform: isOpen ? "rotate(360deg) scale(0.8)" : "rotate(0deg) scale(1)",
        transformOrigin: "center"
      }}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {isOpen ? (
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M6 18L18 6M6 6l12 12" 
        />
      ) : (
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M12 4v16m8-8H4" 
        />
      )}
    </svg>
  );

  return (
    <div className="px-3" data-section="utilities">
      <button
        type="button"
        className={`flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium rounded-lg group transition duration-200 ${
          isAnyUtilityActive
            ? "bg-blue-50 text-blue-700"
            : "text-gray-700 hover:bg-gray-50"
        }`}
        onClick={() => setUtilitiesDropdown(!utilitiesDropdown)}
      >
        <div className="flex items-center gap-3">
          <svg
            className={`w-6 h-6 transition-colors duration-200 ${
              isAnyUtilityActive
                ? "text-blue-600"
                : "text-gray-400 group-hover:text-gray-500"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
          <span>Utilities</span>
        </div>
        {getDropdownIcon(utilitiesDropdown)}
      </button>
      
      <div className={`mt-1.5 space-y-1 ${utilitiesDropdown ? "block" : "hidden"}`}>
        {utilitiesSection.map((utility, index) => (
          <div key={index} className="pl-3">
            <button
              className={`flex items-center justify-between w-full px-4 py-1.5 text-xs text-gray-500 font-poppins rounded-lg transition duration-200 ${
                utility.isActive
                  ? "text-gray-900 bg-blue-50/50"
                  : "hover:text-gray-900 hover:bg-gray-50"
              }`}
              onClick={() => utility.setDropDown(!utility.dropDown)}
            >
              <span>{utility.name}</span>
              {getSubMenuDropdownIcon(utility.dropDown, utility.isActive)}
            </button>
            
            <div className={`mt-1 ${utility.dropDown ? "block" : "hidden"}`}>
              <SubMenu
                items={utility.menu}
                isActiveLink={isActiveLink}
                icons={utility.icons.map(icon => ({
                  ...icon,
                  svg: React.cloneElement(icon.svg, {
                    className: "w-5 h-5"
                  })
                }))}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Utilities.propTypes = {
  isActiveLink: PropTypes.func.isRequired,
  utilitiesDropdown: PropTypes.bool.isRequired,
  setUtilitiesDropdown: PropTypes.func.isRequired,
};