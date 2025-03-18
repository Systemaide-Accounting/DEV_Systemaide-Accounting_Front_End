import { useEffect } from "react";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    setLibraryDropdown(isActiveLibrary);
  }, [isActiveLibrary, setLibraryDropdown]);

  return (
    <>
      <li>
        <button
          type="button"
          className={`flex items-center w-full p-2 text-base ${
            isActiveLibrary
              ? "text-gray-900 bg-gray-100"
              : "text-white hover:text-gray-900"
          } transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
          aria-controls="dropdown-example"
          data-collapse-toggle="dropdown-example"
          onClick={() => {
            setLibraryDropdown(!libraryDropdown);
          }}
        >
          <svg
            className="flex-shrink-0 w-[30px] h-[30px] transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 21"
          >
            <path
              fillRule="evenodd"
              d="M6 5a2 2 0 0 1 2-2h4.157a2 2 0 0 1 1.656.879L15.249 6H19a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2v-5a3 3 0 0 0-3-3h-3.22l-1.14-1.682A3 3 0 0 0 9.157 6H6V5Z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M3 9a2 2 0 0 1 2-2h4.157a2 2 0 0 1 1.656.879L12.249 10H3V9Zm0 3v7a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-7H3Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
            Library
          </span>
          {getDropdownIcon(libraryDropdown)}
        </button>
        <ul
          id="dropdown-example"
          className={`${libraryDropdown ? "" : "hidden"} py-2 space-y-2`}
        >
          {libraries.map((library, index) => (
            <li key={index} className="ml-5">
              <Link to={`${library.path}`}>
                <div
                  className={`flex items-center w-full p-2 ${
                    isActiveLink(`${library.path}`)
                      ? "text-gray-900 bg-gray-100"
                      : "text-white hover:text-gray-900 hover:bg-gray-100"
                  } transition duration-75 rounded-lg group dark:text-white dark:hover:bg-gray-700`}
                >
                  {libraryIcons[index].svg}
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    {library.name}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </li>
    </>
  );
}
