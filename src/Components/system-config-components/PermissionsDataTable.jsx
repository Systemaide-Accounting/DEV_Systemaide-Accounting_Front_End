import { SimplePagination } from "../data-table-components/SimplePagination";
import { SortButton } from "../data-table-components/SortButton";
import permissionsDataJSON from "../../sample-data/permissionsData.json";
import { useEffect, useState } from "react";
import { Button, Select, Table, TextInput } from "flowbite-react";
import { Search, Plus, Edit, Trash } from "lucide-react";
import { getAllPermissions } from "../../services/systemaideService";

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

  // Mock handlers for CRUD operations
  const handleEdit = (id, type) => {
    console.log(`Edit ${type} with ID: ${id}`);
    // In a real app, this would open a modal or navigate to an edit page
  };

  const handleDelete = (id, type) => {
    console.log(`Delete ${type} with ID: ${id}`);
    // In a real app, this would show a confirmation dialog
  };

  const handleCreate = (type) => {
    console.log(`Create new ${type}`);
    // In a real app, this would open a modal or navigate to a create page
  };

  // Filter and sort permissions
  const filteredPermissions = permissionsData
    .filter(
      (permission) =>
        (permission?.name?.toLowerCase() || "").includes(permissionSearch.toLowerCase()) ||
        (permission?.description?.toLowerCase() || "").includes(permissionSearch.toLowerCase())
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
            onClick={() => handleCreate("permission")}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create
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
            <Table.HeadCell>
              Description
            </Table.HeadCell>
            <Table.HeadCell className="w-[100px]">Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {paginatedPermissions.length > 0 ? (
              paginatedPermissions.map((permission, index) => (
                <Table.Row
                  key={index + 1}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>{(permissionPage -1) * permissionsPerPage + index + 1}</Table.Cell>
                  <Table.Cell className="font-medium">
                    {permission?.name}
                  </Table.Cell>
                  <Table.Cell>{permission?.description}</Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="xs"
                        color="light"
                        onClick={() => handleEdit(permission.id, "permission")}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="xs"
                        color="failure"
                        onClick={() =>
                          handleDelete(permission.id, "permission")
                        }
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
  );
}
