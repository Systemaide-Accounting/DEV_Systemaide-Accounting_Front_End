import { useState, useEffect } from "react";
import { SubMenu } from "./SubMenu";

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
    isActiveJournals ||
    isActiveLedgers ||
    isActiveTriBalance ||
    isActiveWorksheet
      ? setReportsDropdown(true)
      : setReportsDropdown(false);
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
  ]);

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
          isActiveJournals ||
          isActiveLedgers ||
          isActiveTriBalance ||
          isActiveWorksheet
            ? "text-gray-900 bg-gray-100"
            : "text-white hover:text-gray-900"
        } transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
        onClick={() => setReportsDropdown(!reportsDropdown)}
      >
        <svg
          className="w-[30px] h-[30px] dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Zm2 0V2h7a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Zm-1 9a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Zm2-5a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Zm4 4a1 1 0 1 0-2 0v3a1 1 0 1 0 2 0v-3Z"
            clipRule="evenodd"
          />
        </svg>
        <span className="flex-1 ms-3 text-left whitespace-nowrap">Reports</span>
        {getDropdownIcon(reportsDropdown)}
      </button>
      {reportsDropdown && (
        <ul className="py-2 space-y-2">
          {reports.map((report, index) => (
            <>
              <li key={index} className="ml-5">
                <button
                  className={`flex items-center w-full p-2 ${
                    report.isActive
                      ? "text-gray-900 bg-gray-100"
                      : "text-white hover:text-gray-900 hover:bg-gray-100"
                  } transition duration-75 rounded-lg group dark:text-white dark:hover:bg-gray-700`}
                  onClick={() => {
                    report.setDropDown(!report.dropDown);
                  }}
                >
                  <span className="flex-1 text-left rtl:text-right whitespace-nowrap">
                    {report.name}
                  </span>
                  {getSubMenuDropdownIcon(report.dropDown)}
                </button>
                {report.dropDown && (
                  <ul key={index} className="py-2 space-y-2">
                    <SubMenu
                      items={report.menu}
                      icons={report.icons}
                      isActiveLink={isActiveLink}
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
