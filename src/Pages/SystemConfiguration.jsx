// Data Table Components
import { UsersDataTable } from "../Components/data-table-components/UsersDataTable";
import { RolesDataTable } from "../Components/data-table-components/RolesDataTable";
import { PermissionsDataTable } from "../Components/data-table-components/PermissionsDataTable";

export function SystemConfiguration() {
  
  
  return (
    <>
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <h1 className="text-2xl font-bold mb-2">System Configuration</h1>

        {/* Users Table */}
        <UsersDataTable />

        {/* 2 Columns */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
          {/* Roles Table */}
          <RolesDataTable />

          {/* Permissions Table */}
          <PermissionsDataTable />
        </div>
      </div>
    </>
  );
}
