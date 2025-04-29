import { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

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
      className={`w-4 h-4 transition-transform duration-200 ${
        isActiveTransaction ? "text-blue-600" : "text-gray-400 group-hover:text-gray-500"
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
    setTransactionDropdown(isActiveTransaction);
  }, [isActiveTransaction, setTransactionDropdown]);

  return (
    <div className="px-3 pt-1.5" data-section="transactions">
      <button
        type="button"
        className={`flex items-center justify-between w-full px-4 py-2.5 text-4xl rounded-lg group transition duration-200 ${
          isActiveTransaction
            ? "bg-blue-50 text-blue-700"
            : "text-gray-700 hover:bg-gray-50"
        }`}
        onClick={() => setTransactionDropdown(!transactionDropdown)}
      >
        <div className="flex items-center gap-3">
          <svg
            className={`w-5 h-5 transition-colors duration-200 ${
              isActiveTransaction
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
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
          <span>Transaction</span>
        </div>
        {getDropdownIcon(transactionDropdown)}
      </button>
      
      <div className={`mt-1.5 space-y-1 ${transactionDropdown ? "block" : "hidden"}`}>
        {transactions.map((transaction, index) => (
          <Link
            key={index}
            to={transaction.path}
            className={`flex items-center gap-2.5 w-full pl-11 pr-4 py-1.5 text-xs text-gray-500 font-poppins rounded-lg transition duration-200 ${
              isActiveLink(transaction.path)
                ? "text-blue-600 bg-blue-50/50"
                : "hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <span className={`${
              isActiveLink(transaction.path)
                ? "text-blue-600"
                : "text-gray-400 group-hover:text-gray-500"
            }`}>
              {React.cloneElement(transactionIcons[index].svg, {
                className: "w-5 h-5"
              })}
            </span>
            <span className={isActiveLink(transaction.path) ? "text-blue-600" : ""}>{transaction.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

Transaction.propTypes = {
  isActiveLink: PropTypes.func.isRequired,
  transactionDropdown: PropTypes.bool.isRequired,
  setTransactionDropdown: PropTypes.func.isRequired,
};