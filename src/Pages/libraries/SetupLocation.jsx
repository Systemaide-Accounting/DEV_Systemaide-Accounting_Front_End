import { LocationsDataTable } from "../../Components/setup-location-components/LocationsDataTable";

export function SetupLocation() {
  return (
    <>
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <h1 className="text-2xl font-bold mb-2">Setup Location</h1>

        {/* Locations Table */}
        <LocationsDataTable />

        {/* Branches Table */}
      </div>
    </>
  );
}
