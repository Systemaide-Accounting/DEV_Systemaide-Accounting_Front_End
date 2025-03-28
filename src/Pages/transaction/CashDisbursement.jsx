import { useState } from "react";
import { CashDisbursementDataTable } from "../../Components/cash-disbursement-components/CashDisbursementDataTable";

export function CashDisbursement() {
  

  return (
    <>
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <h2 className="text-xl font-semibold">Cash Disbursement</h2>

        {/* Cash Disbursement Table */}
        <CashDisbursementDataTable />
      </div>
    </>
  );
}
