import { CashDisbursementDataTable } from "../../Components/cash-disbursement-components/CashDisbursementDataTable";

export function CashDisbursement() {
  
  return (
    <>
      {/* Title Card */}
      <div className="w-full p-4 border rounded-lg bg-white mb-4 shadow">
        <h2 className="text-xl font-bold text-gray-900">
          Cash Disbursement Transactions
        </h2>
      </div>

      {/* Content Card */}
      <div className="border rounded-lg dark:border-gray-700 shadow">
        {/* Cash Disbursement Table */}
        <CashDisbursementDataTable />
      </div>
    </>
  );
}
