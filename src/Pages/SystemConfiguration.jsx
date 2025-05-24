// Data Table Components
import { UsersDataTable } from "../Components/system-config-components/UsersDataTable";
import { RolesDataTable } from "../Components/system-config-components/RolesDataTable";
import { PermissionsDataTable } from "../Components/system-config-components/PermissionsDataTable";

export function SystemConfiguration() {
  return (
    <>
      {/* Title Card */}
      <div className="w-full p-4 border rounded-lg bg-white mb-4 shadow">
        <h2 className="text-xl font-bold text-gray-900">
          System Configuration
        </h2>
      </div>

      {/* Content Card */}
      <div className="mb-4 border rounded-lg dark:border-gray-700 shadow">
        {/* Users Table */}
        <UsersDataTable />
      </div>

      {/* 2 Columns */}
      <div className="flex flex-col xl:flex-row gap-4 mb-4">
        {/* Roles Table */}
        <div className="flex-1 min-w-0">
          <RolesDataTable />
        </div>

        {/* Permissions Table */}
        <div className="flex-1 min-w-0">
          <PermissionsDataTable />
        </div>
      </div>
    </>
  );
}
