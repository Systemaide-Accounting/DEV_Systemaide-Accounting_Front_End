import { useContext } from "react";
import { CashDisbursementDataTable } from "../Components/cash-disbursement-components/CashDisbursementDataTable";
import { userAllowedRestoreAccount, userAllowedRestoreTransaction } from "../constants/UserConstants";
import AuthContext from "../context/AuthContext";
import { CashReceiptDataTable } from "../Components/cash-receipt-components/CashReceiptDataTable";
import { SalesAccntDataTable } from "../Components/sales-accnt-components/SalesAccntDataTable";
import { PurchasesAccntDataTable } from "../Components/purchases-accnt-components/PurchasesAccntDataTable";
import { GeneralJournalDataTable } from "../Components/general-journal-components/GeneralJournalDataTable";

export function Archive() {

  const { user } = useContext(AuthContext);

    return (
      <>
        {/* Title Card */}
        {userAllowedRestoreTransaction(user?.permissions) && (
          <div className="w-full p-4 border rounded-lg bg-white mb-4 shadow">
            <h2 className="text-xl font-bold text-gray-900">
              Transactions Archive
            </h2>
          </div>
        )}

        {/* Content Card */}
        {userAllowedRestoreTransaction(user?.permissions) && (
          <div className="mb-4 border rounded-lg dark:border-gray-700 shadow">
            {/* Deleted Cash Disbursement Table */}
            <CashDisbursementDataTable type={"deleted"} />
          </div>
        )}

        {/* Content Card */}
        {userAllowedRestoreTransaction(user?.permissions) && (
          <div className="mb-4 border rounded-lg dark:border-gray-700 shadow">
            {/* Deleted Cash Receipts Table */}
            <CashReceiptDataTable type={"deleted"} />
          </div>
        )}

        {/* Content Card */}
        {userAllowedRestoreAccount(user?.permissions) && (
          <div className="mb-4 border rounded-lg dark:border-gray-700 shadow">
            {/* Deleted Sales Accounts Table */}
            <SalesAccntDataTable type={"deleted"} />
          </div>
        )}

        {/* Content Card */}
        {userAllowedRestoreAccount(user?.permissions) && (
          <div className="mb-4 border rounded-lg dark:border-gray-700 shadow">
            {/* Deleted Purchases Accounts Table */}
            <PurchasesAccntDataTable type={"deleted"} />
          </div>
        )}

        {/* Content Card */}
        {userAllowedRestoreTransaction(user?.permissions) && (
          <div className="mb-4 border rounded-lg dark:border-gray-700 shadow">
            {/* Deleted General Journal Table */}
            <GeneralJournalDataTable type={"deleted"} />
          </div>
        )}

        {/* Title Card */}
        <div className="w-full p-4 border rounded-lg bg-white mb-4 shadow">
          <h2 className="text-xl font-bold text-gray-900">
            System Configuration Archive
          </h2>
        </div>
      </>
    );
};