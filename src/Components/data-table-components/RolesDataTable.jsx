import { SimplePagination } from "./SimplePagination";
import { SortButton } from "./SortButton";
import rolesDataJSON from "../../sample-data/rolesData.json";
import { useEffect, useState } from "react";
import { Button, Select, Table, TextInput } from "flowbite-react";
import { Search, Plus, Edit, Trash } from "lucide-react";

const rowSizeOptionsJSON = JSON.stringify([
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 50, label: "50" },
]);

export function RolesDataTable() {
  const [rolesData, setRolesData] = useState([]);
  const [roleSearch, setRoleSearch] = useState("");
  const [rolePage, setRolePage] = useState(1);
  const [roleSort, setRoleSort] = useState({
    column: "role",
    direction: "asc",
  });
  const [rolesPerPage, setRolesPerPage] = useState(5);
  const [rowSizeOptions, setRowSizeOptions] = useState([]);

  // Parse JSON data on component mount
  useEffect(() => {
    try {
      setRolesData(rolesDataJSON);
      setRowSizeOptions(JSON.parse(rowSizeOptionsJSON));
    } catch (error) {
      console.error("Error parsing JSON data:", error);
    }
  }, []);

  // Filter and sort roles
  const filteredRoles = rolesData
    .filter(
      (role) =>
        role.role.toLowerCase().includes(roleSearch.toLowerCase()) ||
        role.permissions.toLowerCase().includes(roleSearch.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[roleSort.column];
      const bValue = b[roleSort.column];

      if (roleSort.direction === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Pagination for roles
  const totalRolePages = Math.max(
    1,
    Math.ceil(filteredRoles.length / rolesPerPage)
  );
  const paginatedRoles = filteredRoles.slice(
    (rolePage - 1) * rolesPerPage,
    rolePage * rolesPerPage
  );

  // Sort handler for roles
  const handleRoleSort = (column) => {
    setRoleSort({
      column,
      direction:
        roleSort.column === column && roleSort.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  // Handle row size change
  const handleRoleRowSizeChange = (e) => {
    const newSize = Number.parseInt(e.target.value);
    setRolesPerPage(newSize);
    setRolePage(1); // Reset to first page when changing row size
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

  return (
    <div className="rounded bg-white dark:bg-gray-800 p-4 shadow">
      <div className="flex flex-col justify-between items-start mb-4 gap-4">
        <h2 className="text-xl font-semibold">Roles</h2>
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
          <div className="relative w-full sm:flex-1">
            <TextInput
              icon={Search}
              placeholder="Search roles..."
              value={roleSearch}
              onChange={(e) => {
                setRoleSearch(e.target.value);
                setRolePage(1);
              }}
            />
          </div>
          <Button
            color="blue"
            className="w-full sm:w-auto"
            onClick={() => handleCreate("role")}
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
                column="role"
                currentSort={roleSort}
                onSort={handleRoleSort}
              >
                Role
              </SortButton>
            </Table.HeadCell>
            <Table.HeadCell>
              <SortButton
                column="users"
                currentSort={roleSort}
                onSort={handleRoleSort}
              >
                Users
              </SortButton>
            </Table.HeadCell>
            <Table.HeadCell className="w-[100px]">Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {paginatedRoles.length > 0 ? (
              paginatedRoles.map((role) => (
                <Table.Row
                  key={role.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>{role.id}</Table.Cell>
                  <Table.Cell className="font-medium">{role.role}</Table.Cell>
                  <Table.Cell>{role.users}</Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="xs"
                        color="light"
                        onClick={() => handleEdit(role.id, "role")}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="xs"
                        color="failure"
                        onClick={() => handleDelete(role.id, "role")}
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
                  No roles found
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
              value={rolesPerPage}
              onChange={handleRoleRowSizeChange}
            >
              {rowSizeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
            {paginatedRoles.length > 0 ? (rolePage - 1) * rolesPerPage + 1 : 0}-
            {Math.min(rolePage * rolesPerPage, filteredRoles.length)} of{" "}
            {filteredRoles.length}
          </span>
        </div>
        <div className="flex items-center mt-2 sm:mt-0">
          <SimplePagination
            currentPage={rolePage}
            totalPages={totalRolePages}
            onPageChange={setRolePage}
          />
        </div>
      </div>
    </div>
  );
}
