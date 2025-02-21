// JOURNAL REPORTS
import { CashReceiptsJournal } from "../../Pages/reports/journals/CashReceiptsJournal";
import { DisbursementJournal } from "../../Pages/reports/journals/DisbursementJournal";
import { GeneralJournalReports } from "../../Pages/reports/journals/GeneralJournalReports";
import { PurchasesJournal } from "../../Pages/reports/journals/PurchasesJournal";
import { SalesJournal } from "../../Pages/reports/journals/SalesJournal";
// LEDGER REPORTS
import { GeneralLedger } from "../../Pages/reports/ledger/GeneralLedger";
import { SubsidiaryLedger } from "../../Pages/reports/ledger/SubsidiaryLedger";
// TRIAL BALANCE REPORTS
import { CurrentNetChange } from "../../Pages/reports/trialBalance/CurrentNetChange";
import { YearToDate } from "../../Pages/reports/trialBalance/YearToDate";
// WORKSHEET REPORTS
import { Worksheet } from "../../Pages/reports/Worksheet";

const REPORTS_URL = "/reports";

export const journals = [
  {
    path: `${REPORTS_URL}/disbursementjournal`,
    element: DisbursementJournal,
    name: "Disbursement",
  },
  {
    path: `${REPORTS_URL}/cashreceiptsjournal`,
    element: CashReceiptsJournal,
    name: "Cash Receipts",
  },
  {
    path: `${REPORTS_URL}/salesjournal`,
    element: SalesJournal,
    name: "Sales",
  },
  {
    path: `${REPORTS_URL}/purchasesjournal`,
    element: PurchasesJournal,
    name: "Purchases",
  },
  {
    path: `${REPORTS_URL}/generaljournalreports`,
    element: GeneralJournalReports,
    name: "General Reports",
  },
];

export const ledgers = [
  {
    path: `${REPORTS_URL}/subsidiaryledger`,
    element: SubsidiaryLedger,
    name: "Subsidiary",
  },
  {
    path: `${REPORTS_URL}/generalledger`,
    element: GeneralLedger,
    name: "General",
  },
];

export const triBalances = [
  {
    path: `${REPORTS_URL}/currnetchange`,
    element: CurrentNetChange,
    name: "Curr. Net Change",
  },
  {
    path: `${REPORTS_URL}/yrtodate`,
    element: YearToDate,
    name: "Year To Date",
  },
];

export const worksheets = [
  {
    path: `${REPORTS_URL}/worksheet`,
    element: Worksheet,
    name: "Worksheet",
  },
];
