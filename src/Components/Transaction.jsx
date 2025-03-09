// import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { transactions } from "./all-routes/transactions";
import { transactionIcons } from "./icons/transactionIcons";

export function Transaction({
  isActiveLink,
  transactionDropdown,
  setTransactionDropdown,
}) {

  const isActiveTransaction = transactions.some((transaction) =>
    isActiveLink(transaction.path)
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
    setTransactionDropdown(isActiveTransaction);
  }, [isActiveTransaction, setTransactionDropdown]);

  return (
    <li>
      <button
        type="button"
        className={`flex items-center w-full p-2 text-base ${
          isActiveTransaction
            ? "text-gray-900 bg-gray-100"
            : "text-white hover:text-gray-900"
        } transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
        aria-controls="dropdown-example"
        data-collapse-toggle="dropdown-example"
        onClick={() => setTransactionDropdown(!transactionDropdown)}
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
            strokeLinejoin="round"
            strokeWidth="3"
            d="m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3"
          />
        </svg>
        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
          Transaction
        </span>
        {getDropdownIcon(transactionDropdown)}
      </button>
      <ul
        id="dropdown-example"
        className={`${transactionDropdown ? "" : "hidden"} py-2 space-y-2`}
      >
        {transactions.map((transaction, index) => (
          <>
            <li key={index} className="ml-5">
              <Link to={`${transaction.path}`}>
                {/* <div className="flex items-center p-2 text-white hover:text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"> */}
                <div
                  className={`flex items-center w-full p-2 ${
                    isActiveLink(`${transaction.path}`)
                      ? "text-gray-900 bg-gray-100"
                      : "text-white hover:text-gray-900 hover:bg-gray-100"
                  } transition duration-75 rounded-lg group dark:text-white dark:hover:bg-gray-700`}
                >
                  {transactionIcons[index].svg}
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    {transaction.name}
                  </span>
                </div>
              </Link>
            </li>
          </>
        ))}
      </ul>
    </li>
  );
}
