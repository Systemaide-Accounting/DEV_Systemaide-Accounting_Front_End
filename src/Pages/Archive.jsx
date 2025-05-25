import { useContext } from "react";
import { CashDisbursementDataTable } from "../Components/cash-disbursement-components/CashDisbursementDataTable";
import { userAllowedRestoreAccount, userAllowedRestoreTransaction } from "../constants/UserConstants";
import AuthContext from "../context/AuthContext";
import { CashReceiptDataTable } from "../Components/cash-receipt-components/CashReceiptDataTable";

export function Archive() {

  const { user } = useContext(AuthContext);
  console.log("user", user);

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

        {/* Title Card */}
        <div className="w-full p-4 border rounded-lg bg-white mb-4 shadow">
          <h2 className="text-xl font-bold text-gray-900">
            System Configuration Archive
          </h2>
        </div>
      </>
    );
};