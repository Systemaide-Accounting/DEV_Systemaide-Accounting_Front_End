import { CashReceiptDataTable } from "../../Components/cash-receipt-components/CashReceiptDataTable";

export function CashReceipts() {
  return (
    <>
      {/* Title Card */}
      <div className="w-full p-4 border rounded-lg bg-white mb-4 shadow">
        <h2 className="text-xl font-bold text-gray-900">
          Cash Receipts Transactions
        </h2>
      </div>

      <div className="border rounded-lg dark:border-gray-700 shadow">
        {/* Cash Receipts Table */}
        <CashReceiptDataTable />
      </div>
    </>
  );
}
