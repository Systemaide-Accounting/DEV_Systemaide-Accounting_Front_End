// transactions.js

import { CashDisbursement } from "../../Pages/transaction/CashDisbursement";
import { CashReceipts } from "../../Pages/transaction/CashReceipts";
import { SalesOnAccount } from "../../Pages/transaction/SalesOnAccount";
import { PurchasesOnAccount } from "../../Pages/transaction/PurchasesOnAccount";
import { GeneralJournal } from "../../Pages/transaction/GeneralJournal";

const TRANSACTION_URL = "/transaction";

export const transactions = [
  {
    path: `${TRANSACTION_URL}/cashdisbursement`,
    element: CashDisbursement,
    name: "Cash Disbursement",
  },
  {
    path: `${TRANSACTION_URL}/cashreceipts`,
    element: CashReceipts,
    name: "Cash Receipts",
  },
  {
    path: `${TRANSACTION_URL}/salesonaccount`,
    element: SalesOnAccount,
    name: "Sales On Account",
  },
  {
    path: `${TRANSACTION_URL}/purchasesonaccount`,
    element: PurchasesOnAccount,
    name: "Purchases On Acct.",
  },
  {
    path: `${TRANSACTION_URL}/generaljournal`,
    element: GeneralJournal,
    name: "General Journal",
  },
];


