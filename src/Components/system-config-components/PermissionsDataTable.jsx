import { SimplePagination } from "../data-table-components/SimplePagination";
import { SortButton } from "../data-table-components/SortButton";
import permissionsDataJSON from "../../sample-data/permissionsData.json";
import { useEffect, useState } from "react";
import { Button, Select, Table, TextInput } from "flowbite-react";
import { Search, Plus, Edit, Trash } from "lucide-react";
import { deletePermission, getAllPermissions, getPermissionById } from "../../services/systemaideService";
import { PermissionModalForm } from "./PermissionModalForm";
import swal2 from "sweetalert2";

const rowSizeOptionsJSON = JSON.stringify([
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 50, label: "50" },
]);

export function PermissionsDataTable() {
  const [permissionsData, setPermissionsData] = useState([]);
  const [permissionSearch, setPermissionSearch] = useState("");
  const [permissionPage, setPermissionPage] = useState(1);
  const [permissionSort, setPermissionSort] = useState({
    column: "name",
    direction: "asc",
  });
  const [permissionsPerPage, setPermissionsPerPage] = useState(5);
  const [rowSizeOptions, setRowSizeOptions] = useState([]);
  const [permissionData, setPermissionData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const fetchAllPermissions = async () => {
    try {
      const response = await getAllPermissions();
      if (!response?.success) console.log(response?.message);
      setPermissionsData(response?.data);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  // Parse JSON data on component mount
  useEffect(() => {
    try {
      fetchAllPermissions();
      // setPermissionsData(permissionsDataJSON);
      setRowSizeOptions(JSON.parse(rowSizeOptionsJSON));
    } catch (error) {
      console.error("Error parsing JSON data:", error);
    }
  }, []);

  // Fetch permissions every 3 seconds
  // useEffect(() => {
  //   const intervalId = setInterval(fetchAllPermissions, 3000);
  //   return () => clearInterval(intervalId); // Cleanup interval on component unmount
  // }, []);

  // Sort handler for permissions
  const handlePermissionSort = (column) => {
    setPermissionSort({
      column,
      direction:
        permissionSort.column === column && permissionSort.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  // Handle row size change
  const handlePermissionRowSizeChange = (e) => {
    const newSize = Number.parseInt(e.target.value);
    setPermissionsPerPage(newSize);
    setPermissionPage(1); // Reset to first page when changing row size
  };

  const handleDelete = async (id) => {
    await swal2.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deletePermission(id);
          if (response?.success) {
            await fetchAllPermissions();
            await swal2.fire("Deleted!", "The permission has been deleted.", "success");
          } else {
            await swal2.fire("Error!", "Permission could not be deleted", "error");
          }
        } catch (error) {
          // console.error("Error deleting permission:", error);
          await swal2.fire("Error!", "An error occurred while deleting the permission.", "error");
        }
      }
    });
  };

  const handleAddPermissionModalForm = () => {
    setPermissionData(null);
    setOpenModal(true);
  };

  const handleEditPermissionModalForm = async (id) => {
    try {
      const response = await getPermissionById(id);
      if (response?.success) {
        setPermissionData(response?.data);
        setOpenModal(true);
      } else {
        console.error("Error fetching permission:", response?.message);
      }
    } catch (error) {
      console.error("Error fetching permission:", error);
    }
  };

  // Filter and sort permissions
  const filteredPermissions = permissionsData
    .filter(
      (permission) =>
        (permission?.name?.toLowerCase() || "").includes(
          permissionSearch.toLowerCase()
        ) ||
        (permission?.description?.toLowerCase() || "").includes(
          permissionSearch.toLowerCase()
        )
    )
    .sort((a, b) => {
      const aValue = a[permissionSort.column];
      const bValue = b[permissionSort.column];

      if (permissionSort.direction === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Pagination for permissions
  const totalPermissionPages = Math.max(
    1,
    Math.ceil(filteredPermissions.length / permissionsPerPage)
  );
  const paginatedPermissions = filteredPermissions.slice(
    (permissionPage - 1) * permissionsPerPage,
    permissionPage * permissionsPerPage
  );

  return (
    <>
      <div className="rounded bg-white dark:bg-gray-800 p-4 shadow">
        <div className="flex flex-col justify-between items-start mb-4 gap-4">
          <h2 className="text-xl font-semibold">Permissions</h2>
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
            <div className="relative w-full sm:flex-1">
              <TextInput
                icon={Search}
                placeholder="Search permissions..."
                value={permissionSearch}
                onChange={(e) => {
                  setPermissionSearch(e.target.value);
                  setPermissionPage(1);
                }}
              />
            </div>
            <Button
              color="blue"
              className="w-full sm:w-auto"
              onClick={() => handleAddPermissionModalForm()}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto" style={{ minHeight: "200px" }}>
          <Table hoverable striped>
            <Table.Head>
              <Table.HeadCell className="w-[50px]">ID</Table.HeadCell>
              <Table.HeadCell>
                <SortButton
                  column="name"
                  currentSort={permissionSort}
                  onSort={handlePermissionSort}
                >
                  Permission
                </SortButton>
              </Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell className="w-[100px]">Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {paginatedPermissions.length > 0 ? (
                paginatedPermissions.map((permission, index) => (
                  <Table.Row
                    key={index + 1}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>
                      {(permissionPage - 1) * permissionsPerPage + index + 1}
                    </Table.Cell>
                    <Table.Cell className="font-medium">
                      {permission?.name}
                    </Table.Cell>
                    <Table.Cell>{permission?.description}</Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="xs"
                          color="light"
                          onClick={() =>
                            handleEditPermissionModalForm(permission?._id)
                          }
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="xs"
                          color="failure"
                          onClick={() => handleDelete(permission?._id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={4} className="text-center py-4">
                    No permissions found
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
                value={permissionsPerPage}
                onChange={handlePermissionRowSizeChange}
              >
                {rowSizeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
              {paginatedPermissions.length > 0
                ? (permissionPage - 1) * permissionsPerPage + 1
                : 0}
              -
              {Math.min(
                permissionPage * permissionsPerPage,
                filteredPermissions.length
              )}{" "}
              of {filteredPermissions.length}
            </span>
          </div>
          <div className="flex items-center mt-2 sm:mt-0">
            <SimplePagination
              currentPage={permissionPage}
              totalPages={totalPermissionPages}
              onPageChange={setPermissionPage}
            />
          </div>
        </div>
      </div>

      <PermissionModalForm
        openModal={openModal}
        setOpenModal={setOpenModal}
        permissionData={permissionData}
        fetchAllPermissions={fetchAllPermissions}
      />
    </>
  );
}
