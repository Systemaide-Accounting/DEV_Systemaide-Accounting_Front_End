import { PurchasesAccntDataTable } from "../../Components/purchases-accnt-components/PurchasesAccntDataTable";

export function PurchasesOnAccount() {
  return (
    <>
      {/* Title Card */}
      <div className="w-full p-4 border rounded-lg bg-white mb-4 shadow">
        <h2 className="text-xl font-bold text-gray-900">
          Purchases On Account
        </h2>
      </div>

      {/* Content Card */}
      <div className="border rounded-lg dark:border-gray-700">
        {/* Purchases On Account Table */}
        <PurchasesAccntDataTable />
      </div>
    </>
  );
}
