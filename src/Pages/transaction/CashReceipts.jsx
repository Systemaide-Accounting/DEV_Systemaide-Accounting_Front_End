import { CashReceiptDataTable } from "../../Components/cash-receipt-components/CashReceiptDataTable";

export function CashReceipts() {
  return (
    <>
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <h2 className="text-xl font-semibold">Cash Receipts</h2>

        {/* Cash Receipts Table */}
        <CashReceiptDataTable />
      </div>
    </>
  );
}
