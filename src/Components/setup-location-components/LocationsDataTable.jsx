import { Button, Select, Table, TextInput } from "flowbite-react";
import { Edit, Plus, Search, Trash } from "lucide-react";
import { SortButton } from "../data-table-components/SortButton";
import { SimplePagination } from "../data-table-components/SimplePagination";
import { useEffect, useState } from "react";
import { deleteLocation, getAllLocations, getLocationById } from "../../services/systemaideService";
import { LocationModalForm } from "./LocationModalForm";
import swal2 from "sweetalert2";

const rowSizeOptionsJSON = JSON.stringify([
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 50, label: "50" },
]);

export function LocationsDataTable() {
  const [locationsData, setLocationsData] = useState([]);
  const [locationSearch, setLocationSearch] = useState("");
  const [locationPage, setLocationPage] = useState(1);
  const [locationSort, setLocationSort] = useState({
    column: "name",
    order: "asc",
  });
  const [locationsPerPage, setLocationsPerPage] = useState(5);
  const [rowSizeOptions, setRowSizeOptions] = useState([]);
  const [locationData, setLocationData] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const fetchAllLocations = async () => {
    try {
      const response = await getAllLocations();
      if (response?.success) {
        setLocationsData(response?.data);
      } else {
        console.log(response?.message);
      } 
    } catch (error) {
      console.error("Error fetching locations", error);
    }
  };

  useEffect(() => {
    fetchAllLocations();
    setRowSizeOptions(JSON.parse(rowSizeOptionsJSON));
  }, []);

  // Fetch locations every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(fetchAllLocations, 3000);
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  // Sort handler for locations
  const handleLocationSort = (column) => {
    setLocationSort({
      column,
      direction:
        locationSort.column === column && locationSort.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  // Handle row size change
  const handleLocationRowSizeChange = (e) => {
    const newSize = Number.parseInt(e.target.value);
    setLocationsPerPage(newSize);
    setLocationPage(1); // Reset to first page when changing row size
  };

  const handleDelete = async (id) => {
    await swal2.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteLocation(id);
          if (response?.success) {
            await fetchAllLocations();
            await swal2.fire("Deleted!", "The location has been deleted.", "success");
          } else {
            await swal2.fire("Error!", "Location could not be deleted.", "error");
          }
        } catch (error) {
          console.error("Error deleting location:", error);
          await swal2.fire("Error!", "An error occurred while deleting the location.", "error");
        }
      }
    });
  };

  const handleAddLocationModalForm = () => {
    setLocationData(null);
    setOpenModal(true);
  };

  const handleEditLocationModalForm = async (id) => {
    try {
        const response = await getLocationById(id);
        if (response?.success) {
            setLocationData(response?.data);
            setOpenModal(true);
        } else {
            console.log(response?.message);
        }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  // filtered and sorted locations
  const filteredLocations = locationsData
    .filter(
    (location) => 
        (location?.name?.toLowerCase() || "").includes(locationSearch.toLowerCase())
    )
    .sort((a, b) => {
        const aValue = a[locationSort.column] || ""; // Default to empty string if missing
        const bValue = b[locationSort.column] || "";

        if (locationSort.direction === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
    });

    // Pagination for locations
    const totalLocationPages = Math.max(
      1,
      Math.ceil(filteredLocations.length / locationsPerPage)
    );
    const paginatedLocations = filteredLocations.slice(
      (locationPage - 1) * locationsPerPage,
      locationPage * locationsPerPage
    );

  return (
    <>
      {/* Data Table */}
      <div className="mb-4 rounded bg-white dark:bg-gray-800 p-4 shadow">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <h2 className="text-xl font-semibold">Locations</h2>
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <TextInput
                icon={Search}
                placeholder="Search locations..."
                value={locationSearch}
                onChange={(e) => {
                  setLocationSearch(e.target.value);
                  setLocationPage(1);
                }}
              />
            </div>
            <Button
              color="blue"
              className="w-full sm:w-auto"
              onClick={() => handleAddLocationModalForm()}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto" style={{ minHeight: "200px" }}>
          <Table hoverable striped>
            <Table.Head>
              <Table.HeadCell className="w-[60px]">ID</Table.HeadCell>
              <Table.HeadCell>
                <SortButton
                  column="name"
                  currentSort={locationSort}
                  onSort={handleLocationSort}
                >
                  Location Name
                </SortButton>
              </Table.HeadCell>
              <Table.HeadCell>
                <SortButton
                  column="address"
                  currentSort={locationSort}
                  onSort={handleLocationSort}
                >
                  Address
                </SortButton>
              </Table.HeadCell>
              <Table.HeadCell>TIN</Table.HeadCell>
              <Table.HeadCell>Machine ID No.</Table.HeadCell>
              <Table.HeadCell>Branch Class</Table.HeadCell>
              <Table.HeadCell className="w-[100px]">Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {paginatedLocations.length > 0 ? (
                paginatedLocations.map((location, index) => (
                  <Table.Row
                    key={index + 1}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>
                      {(locationPage - 1) * locationsPerPage + index + 1}
                    </Table.Cell>
                    <Table.Cell>{location?.name}</Table.Cell>
                    <Table.Cell>{location?.address}</Table.Cell>
                    <Table.Cell>{location?.tin}</Table.Cell>
                    <Table.Cell>{location?.machineId}</Table.Cell>
                    <Table.Cell>{location?.branch?.name}</Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="xs"
                          color="light"
                          onClick={() => handleEditLocationModalForm(location?._id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="xs"
                          color="failure"
                            onClick={() => handleDelete(location?._id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={7} className="text-center py-4">
                    No locations found
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                Rows per page:
              </span>
              <Select
                className="w-16"
                value={locationsPerPage}
                onChange={handleLocationRowSizeChange}
              >
                {rowSizeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
              {paginatedLocations.length > 0
                ? (locationPage - 1) * locationsPerPage + 1
                : 0}
              -
              {Math.min(
                locationPage * locationsPerPage,
                filteredLocations.length
              )}{" "}
              of {filteredLocations.length}
            </span>
          </div>
          <div className="flex items-center mt-2 sm:mt-0">
            <SimplePagination
              currentPage={locationPage}
              totalPages={totalLocationPages}
              onPageChange={setLocationPage}
            />
          </div>
        </div>
      </div>

      {/* Modal for CRUD */}
      <LocationModalForm
        locationData={locationData}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
}