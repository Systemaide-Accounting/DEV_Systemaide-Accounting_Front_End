import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { SubMenu } from "./SubMenu";
import React from "react";

// IMPORT PAGES ROUTES OF REPORTS
import { journals, ledgers, triBalances, worksheets } from "./all-routes/reports";

import {
  journalIcons,
  ledgerIcons,
  triBalancesIcons,
  worksheetsIcons,
} from "./icons/reportsIcons";

export function Reports({ isActiveLink, reportsDropdown, setReportsDropdown }) {
  // Dropdown states for submenus
  const [journalsDropdown, setJournalsDropdown] = useState(false);
  const [ledgersDropdown, setLedgersDropdown] = useState(false);
  const [triBalanceDropdown, setTriBalanceDropdown] = useState(false);
  const [worksheet, setWorksheet] = useState(false);

  const isActiveJournals = journals.some((journal) =>
    isActiveLink(journal.path)
  );
  const isActiveLedgers = ledgers.some((ledger) => isActiveLink(ledger.path));
  const isActiveTriBalance = triBalances.some((balance) =>
    isActiveLink(balance.path)
  );
  const isActiveWorksheet = worksheets.some((worksheet) =>
    isActiveLink(worksheet.path)
  );

  const isAnyReportActive = isActiveJournals || isActiveLedgers || isActiveTriBalance || isActiveWorksheet;

  const reports = [
    {
      name: "Journals",
      dropDown: journalsDropdown,
      setDropDown: setJournalsDropdown,
      menu: journals,
      icons: journalIcons,
      isActive: isActiveJournals,
    },
    {
      name: "Ledgers",
      dropDown: ledgersDropdown,
      setDropDown: setLedgersDropdown,
      menu: ledgers,
      icons: ledgerIcons,
      isActive: isActiveLedgers,
    },
    {
      name: "Trial Balance",
      dropDown: triBalanceDropdown,
      setDropDown: setTriBalanceDropdown,
      menu: triBalances,
      icons: triBalancesIcons,
      isActive: isActiveTriBalance,
    },
    {
      name: "Worksheet",
      dropDown: worksheet,
      setDropDown: setWorksheet,
      menu: worksheets,
      icons: worksheetsIcons,
      isActive: isActiveWorksheet,
    },
  ];

  useEffect(() => {
    setReportsDropdown(isAnyReportActive);
    setJournalsDropdown(isActiveJournals);
    setLedgersDropdown(isActiveLedgers);
    setTriBalanceDropdown(isActiveTriBalance);
    setWorksheet(isActiveWorksheet);
  }, [
    isActiveJournals,
    isActiveLedgers,
    isActiveTriBalance,
    isActiveWorksheet,
    setReportsDropdown,
    isAnyReportActive,
  ]);

  const getDropdownIcon = (isOpen) => (
    <svg
      className={`w-4 h-4 transition-transform duration-200 ${
        isAnyReportActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-500"
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
    <div className="px-3" data-section="reports">
      <button
        type="button"
        className={`flex items-center justify-between w-full px-4 py-2.5 text-4xl rounded-lg group transition duration-200 ${
          isAnyReportActive
            ? "bg-blue-50 text-blue-700"
            : "text-gray-700 hover:bg-gray-50"
        }`}
        onClick={() => setReportsDropdown(!reportsDropdown)}
      >
        <div className="flex items-center gap-3">
          <svg
            className={`w-5 h-5 transition-colors duration-200 ${
              isAnyReportActive
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
              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span>Reports</span>
        </div>
        {getDropdownIcon(reportsDropdown)}
      </button>

      <div className={`mt-1 ${reportsDropdown ? "block" : "hidden"}`}>
        <div className="space-y-1">
          {reports.map((report, index) => (
            <div key={index} className="pl-3">
              <button
                className={`flex items-center justify-between w-full px-4 py-1.5 text-xs text-gray-500 font-poppins rounded-lg transition duration-200 ${
                  report.isActive
                    ? "text-blue-600 bg-blue-50/50"
                    : "hover:text-gray-900 hover:bg-gray-50"
                }`}
                onClick={() => report.setDropDown(!report.dropDown)}
              >
                <span>{report.name}</span>
                {getSubMenuDropdownIcon(report.dropDown, report.isActive)}
              </button>
              
              <div className={`mt-1 ${report.dropDown ? "block" : "hidden"}`}>
                <SubMenu
                  items={report.menu}
                  icons={report.icons.map(icon => ({
                    ...icon,
                    svg: React.cloneElement(icon.svg, {
                      className: "w-5 h-5"
                    })
                  }))}
                  isActiveLink={isActiveLink}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Reports.propTypes = {
  isActiveLink: PropTypes.func.isRequired,
  reportsDropdown: PropTypes.bool.isRequired,
  setReportsDropdown: PropTypes.func.isRequired,
};