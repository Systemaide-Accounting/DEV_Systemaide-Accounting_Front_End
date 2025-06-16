import { BranchesDataTable } from "../../Components/setup-location-components/BranchesDataTable";
import { LocationsDataTable } from "../../Components/setup-location-components/LocationsDataTable";

export function SetupLocation() {
  return (
    <>
      {/* Title Card */}
      <div className="w-full p-4 border rounded-lg bg-white mb-4 shadow">
        <h2 className="text-xl font-bold text-gray-900">Setup Location</h2>
      </div>

      {/* Content Card */}
      <div className="border mb-4 rounded-lg dark:border-gray-700 shadow">
        {/* Locations Table */}
        <LocationsDataTable type={""} />
      </div>

      {/* Content Card */}
      <div className="border rounded-lg dark:border-gray-700 shadow">
        {/* Branches Table */}
        <BranchesDataTable type={""} />
      </div>
    </>
  );
}
