import { SalesAccntDataTable } from "../../Components/sales-accnt-components/SalesAccntDataTable";

export function SalesOnAccount() {

  return (
    <>
      {/* Title Card */}
      <div className="w-full p-4 border rounded-lg bg-white mb-4 shadow">
        <h2 className="text-xl font-bold text-gray-900">Sales On Account</h2>
      </div>

      {/* Content Card */}
      <div className="border rounded-lg dark:border-gray-700">
        {/* Sales On Account Table */}
        <SalesAccntDataTable />
      </div>
    </>
  );
}
