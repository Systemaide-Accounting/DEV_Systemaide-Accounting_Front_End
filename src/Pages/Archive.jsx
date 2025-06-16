import { useContext } from "react";
import { CashDisbursementDataTable } from "../Components/cash-disbursement-components/CashDisbursementDataTable";
import { userAllowedRestoreAccount, userAllowedRestoreAgent, userAllowedRestoreBranch, userAllowedRestoreLocation, userAllowedRestoreTransaction, userAllowedRestoreUser } from "../constants/UserConstants";
import AuthContext from "../context/AuthContext";
import { CashReceiptDataTable } from "../Components/cash-receipt-components/CashReceiptDataTable";
import { SalesAccntDataTable } from "../Components/sales-accnt-components/SalesAccntDataTable";
import { PurchasesAccntDataTable } from "../Components/purchases-accnt-components/PurchasesAccntDataTable";
import { GeneralJournalDataTable } from "../Components/general-journal-components/GeneralJournalDataTable";
import { AgentsDataTable } from "../Components/agents-library-components/AgentsDataTable";
import { DeletedAccnts } from "../Components/chart-of-accnt-components/DeletedAccnts";
import { LocationsDataTable } from "../Components/setup-location-components/LocationsDataTable";
import { BranchesDataTable } from "../Components/setup-location-components/BranchesDataTable";
import { UsersDataTable } from "../Components/system-config-components/UsersDataTable";

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
        {userAllowedRestoreTransaction(user?.permissions) && (
          <div className="mb-4 border rounded-lg dark:border-gray-700 shadow">
            {/* Deleted Sales Accounts Table */}
            <SalesAccntDataTable type={"deleted"} />
          </div>
        )}

        {/* Content Card */}
        {userAllowedRestoreTransaction(user?.permissions) && (
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
          <h2 className="text-xl font-bold text-gray-900">Library Archive</h2>
        </div>

        {/* Content Card */}
        {userAllowedRestoreAgent(user?.permissions) && (
          <div className="mb-4 border rounded-lg dark:border-gray-700 shadow">
            {/* Deleted Agents Table */}
            <AgentsDataTable type={"deleted"} />
          </div>
        )}

        {/* Content Card */}
        {userAllowedRestoreAccount(user?.permissions) && (
          <div className="mb-4 border rounded-lg dark:border-gray-700 shadow">
            {/* Deleted Accounts Table */}
            <DeletedAccnts />
          </div>
        )}

        {/* Content Card */}
        {userAllowedRestoreLocation(user?.permissions) && (
          <div className="mb-4 border rounded-lg dark:border-gray-700 shadow">
            {/* Locations Table */}
            <LocationsDataTable type={"deleted"} />
          </div>
        )}

        {/* Content Card */}
        {userAllowedRestoreBranch(user?.permissions) && (
          <div className="mb-4 border rounded-lg dark:border-gray-700 shadow">
            {/* Branches Table */}
            <BranchesDataTable type={"deleted"} />
          </div>
        )}


        {userAllowedRestoreUser(user?.permissions) && (
          <>
            <div className="w-full p-4 border rounded-lg bg-white mb-4 shadow">
              <h2 className="text-xl font-bold text-gray-900">
                System Configuration Archive
              </h2>
            </div>

            <div className="mb-4 border rounded-lg dark:border-gray-700 shadow">
              {/* Users Table */}
              <UsersDataTable type={"deleted"} />
            </div>
          </>
        )}
      </>
    );
};