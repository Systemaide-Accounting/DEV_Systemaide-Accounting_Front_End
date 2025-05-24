import { CashDisbursementDataTable } from "../Components/cash-disbursement-components/CashDisbursementDataTable";

export function Archive() {
    return (
      <>
        {/* Title Card */}
        <div className="w-full p-4 border rounded-lg bg-white mb-4 shadow">
          <h2 className="text-xl font-bold text-gray-900">
            Transactions Archive
          </h2>
        </div>

        {/* Content Card */}
        <div className="mb-4 border rounded-lg dark:border-gray-700 shadow">
          {/* Deleted Cash Disbursement Table */}
          <CashDisbursementDataTable type={"deleted"} />
        </div>

        {/* Title Card */}
        <div className="w-full p-4 border rounded-lg bg-white mb-4 shadow">
          <h2 className="text-xl font-bold text-gray-900">
            System Configuration Archive
          </h2>
        </div>
      </>
    );
};