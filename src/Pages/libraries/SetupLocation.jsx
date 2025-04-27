import { BranchesDataTable } from "../../Components/setup-location-components/BranchesDataTable";
import { LocationsDataTable } from "../../Components/setup-location-components/LocationsDataTable";

export function SetupLocation() {
  return (
    <>
      {/* Header */}
      <h1 className="text-xl font-semibold">Setup Location</h1>

      <div className="border-2 border-gray-200 rounded-lg dark:border-gray-700">
        {/* <h1 className="text-2xl font-bold mb-2">Setup Location</h1> */}

        {/* Locations Table */}
        <LocationsDataTable />

        {/* Branches Table */}
        <BranchesDataTable />
      </div>
    </>
  );
}
