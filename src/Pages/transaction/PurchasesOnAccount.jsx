import { PurchasesAccntDataTable } from "../../Components/purchases-accnt-components/PurchasesAccntDataTable";

export function PurchasesOnAccount() {
  return (
    <>
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <h2 className="text-xl font-semibold">Purchases On Account</h2>

        {/* Purchases On Account Table */}
        <PurchasesAccntDataTable />
      </div>
    </>
  );
}
