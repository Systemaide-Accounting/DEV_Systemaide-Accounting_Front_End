import { SalesAccntDataTable } from "../../Components/sales-accnt-components/SalesAccntDataTable";

export function SalesOnAccount() {

  return (
    <>
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <h2 className="text-xl font-semibold">Sales On Account</h2>

        {/* Sales On Account Table */}
        <SalesAccntDataTable />
      </div>
    </>
  );
}
