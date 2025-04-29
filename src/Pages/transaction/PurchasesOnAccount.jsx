import { PurchasesAccntDataTable } from "../../Components/purchases-accnt-components/PurchasesAccntDataTable";

export function PurchasesOnAccount() {
  return (
    <>
      {/* Header */}
      {/* <h2 className="text-xl font-semibold">Purchases On Account</h2> */}
      <div className="border-2 border-gray-200 rounded-lg dark:border-gray-700">
        {/* <h2 className="text-xl font-semibold">Purchases On Account</h2> */}

        {/* Purchases On Account Table */}
        <PurchasesAccntDataTable />
      </div>
    </>
  );
}
