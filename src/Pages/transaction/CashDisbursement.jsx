import { CashDisbursementDataTable } from "../../Components/cash-disbursement-components/CashDisbursementDataTable";

export function CashDisbursement() {
  
  return (
    <>
      {/* Header */}
      {/* <h2 className="text-xl font-semibold">Cash Disbursement</h2> */}
      <div className="border-2 border-gray-200 rounded-lg dark:border-gray-700">
        {/* <div className=" p-5 border-b">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Cash Disbursement</h2>
          </div>
        </div> */}

        {/* Cash Disbursement Table */}
        <CashDisbursementDataTable />
      </div>
    </>
  );
}
