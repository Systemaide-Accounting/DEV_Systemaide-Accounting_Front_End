import { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import { libraries } from "./all-routes/libraries";
import { libraryIcons } from "./icons/libraryIcons";

export function Library({
  isActiveLink,
  libraryDropdown,
  setLibraryDropdown,
}) {
  const isActiveLibrary = libraries.some((library) =>
    isActiveLink(library.path)
  );

  const getDropdownIcon = (isOpen) => (
    <svg
      className={`w-4 h-4 transition-transform duration-200 ${
        isActiveLibrary ? "text-blue-600" : "text-gray-400 group-hover:text-gray-500"
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

  useEffect(() => {
    setLibraryDropdown(isActiveLibrary);
  }, [isActiveLibrary, setLibraryDropdown]);

  return (
    <div className="px-3" data-section="library">
      <button
        type="button"
        className={`flex items-center justify-between w-full px-4 py-2.5 text-4xl rounded-lg group transition duration-200 ${
          isActiveLibrary
            ? "bg-blue-50 text-blue-700"
            : "text-gray-700 hover:bg-gray-50"
        }`}
        onClick={() => setLibraryDropdown(!libraryDropdown)}
      >
        <div className="flex items-center gap-3">
          <svg
            className={`w-6 h-6 transition-colors duration-200 ${
              isActiveLibrary
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
              d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
            />
          </svg>
          <span>Library</span>
        </div>
        {getDropdownIcon(libraryDropdown)}
      </button>
      
      <div className={`mt-1.5 space-y-1 ${libraryDropdown ? "block" : "hidden"}`}>
        {libraries.map((library, index) => (
          <Link
            key={index}
            to={library.path}
            className={`flex items-center gap-2.5 w-full pl-11 pr-4 py-1.5 text-xs text-gray-500 font-poppins rounded-lg transition duration-200 ${
              isActiveLink(library.path)
                ? "text-blue-600 bg-blue-50/50"
                : "hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <span className={`${
              isActiveLink(library.path)
                ? "text-blue-600"
                : "text-gray-400 group-hover:text-gray-500"
            }`}>
              {React.cloneElement(libraryIcons[index].svg, {
                className: "w-5 h-5"
              })}
            </span>
            <span className={isActiveLink(library.path) ? "text-blue-600" : ""}>{library.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

Library.propTypes = {
  isActiveLink: PropTypes.func.isRequired,
  libraryDropdown: PropTypes.bool.isRequired,
  setLibraryDropdown: PropTypes.func.isRequired,
};
