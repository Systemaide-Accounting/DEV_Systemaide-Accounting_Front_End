import { CashReceiptDataTable } from "../../Components/cash-receipt-components/CashReceiptDataTable";

export function CashReceipts() {
  return (
    <>
      {/* Header */}
      {/* <h2 className="text-xl font-semibold">Cash Receipts</h2> */}
      <div className="border-2 border-gray-200 rounded-lg dark:border-gray-700">
        {/* <h2 className="text-xl font-semibold">Cash Receipts</h2> */}

        {/* Cash Receipts Table */}
        <CashReceiptDataTable />
      </div>
    </>
  );
}
