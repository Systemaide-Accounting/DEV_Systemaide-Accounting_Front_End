import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  ArrowUpDown,
  Edit,
  Trash,
  Plus,
} from "lucide-react";
import { Button, Table, TextInput, Badge, Select } from "flowbite-react";
// Mock Data
import usersDataJSON from "../sample-data/usersData.json";
import rolesDataJSON from "../sample-data/rolesData.json";
import permissionsDataJSON from "../sample-data/permissionsData.json";


// Row size options as JSON

const rowSizeOptionsJSON = JSON.stringify([
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 50, label: "50" },
]);

// Custom pagination component to avoid ResizeObserver issues
const SimplePagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        size="xs"
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>
      <Button
        size="xs"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        size="xs"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button
        size="xs"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export function SystemConfiguration() {
  // Parse JSON data
  const [usersData, setUsersData] = useState([]);
  const [rolesData, setRolesData] = useState([]);
  const [permissionsData, setPermissionsData] = useState([]);
  const [rowSizeOptions, setRowSizeOptions] = useState([]);

  // State for Users table
  const [userSearch, setUserSearch] = useState("");
  const [userPage, setUserPage] = useState(1);
  const [userSort, setUserSort] = useState({
    column: "name",
    direction: "asc",
  });
  const [usersPerPage, setUsersPerPage] = useState(5);

  // State for Roles table
  const [roleSearch, setRoleSearch] = useState("");
  const [rolePage, setRolePage] = useState(1);
  const [roleSort, setRoleSort] = useState({
    column: "role",
    direction: "asc",
  });
  const [rolesPerPage, setRolesPerPage] = useState(5);

  // State for Permissions table
  const [permissionSearch, setPermissionSearch] = useState("");
  const [permissionPage, setPermissionPage] = useState(1);
  const [permissionSort, setPermissionSort] = useState({
    column: "name",
    direction: "asc",
  });
  const [permissionsPerPage, setPermissionsPerPage] = useState(5);

  // State to prevent ResizeObserver issues during initial render
  const [isClient, setIsClient] = useState(false);

  // Parse JSON data on component mount
  useEffect(() => {
    try {
      setUsersData(usersDataJSON);
      setRolesData(rolesDataJSON);
      setPermissionsData(permissionsDataJSON);
      setRowSizeOptions(JSON.parse(rowSizeOptionsJSON));
      setIsClient(true);
    } catch (error) {
      console.error("Error parsing JSON data:", error);
    }
  }, []);

  // Filter and sort users
  const filteredUsers = usersData
    .filter(
      (user) =>
        user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(userSearch.toLowerCase()) ||
        user.status.toLowerCase().includes(userSearch.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[userSort.column];
      const bValue = b[userSort.column];

      if (userSort.direction === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

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

  // Filter and sort permissions
  const filteredPermissions = permissionsData
    .filter(
      (permission) =>
        permission.name
          .toLowerCase()
          .includes(permissionSearch.toLowerCase()) ||
        permission.type.toLowerCase().includes(permissionSearch.toLowerCase())
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

  // Pagination for users
  const totalUserPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / usersPerPage)
  );
  const paginatedUsers = filteredUsers.slice(
    (userPage - 1) * usersPerPage,
    userPage * usersPerPage
  );

  // Pagination for roles
  const totalRolePages = Math.max(
    1,
    Math.ceil(filteredRoles.length / rolesPerPage)
  );
  const paginatedRoles = filteredRoles.slice(
    (rolePage - 1) * rolesPerPage,
    rolePage * rolesPerPage
  );

  // Pagination for permissions
  const totalPermissionPages = Math.max(
    1,
    Math.ceil(filteredPermissions.length / permissionsPerPage)
  );
  const paginatedPermissions = filteredPermissions.slice(
    (permissionPage - 1) * permissionsPerPage,
    permissionPage * permissionsPerPage
  );

  // Sort handler for users
  const handleUserSort = (column) => {
    setUserSort({
      column,
      direction:
        userSort.column === column && userSort.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

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
  const handleUserRowSizeChange = (e) => {
    const newSize = Number.parseInt(e.target.value);
    setUsersPerPage(newSize);
    setUserPage(1); // Reset to first page when changing row size
  };

  const handleRoleRowSizeChange = (e) => {
    const newSize = Number.parseInt(e.target.value);
    setRolesPerPage(newSize);
    setRolePage(1); // Reset to first page when changing row size
  };

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

  // Custom sort button component
  const SortButton = ({ column, currentSort, onSort, children }) => {
    return (
      <div
        className="flex items-center cursor-pointer"
        onClick={() => onSort(column)}
      >
        {children}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    );
  };
  return (
    <>
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <h1 className="text-2xl font-bold mb-2">System Configuration</h1>

        {/* 1 column - Users Table */}
        <div className="mb-4 rounded bg-white dark:bg-gray-800 p-4 shadow">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <h2 className="text-xl font-semibold">Users</h2>
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <TextInput
                  icon={Search}
                  placeholder="Search users..."
                  value={userSearch}
                  onChange={(e) => {
                    setUserSearch(e.target.value);
                    setUserPage(1);
                  }}
                />
              </div>
              <Button
                color="blue"
                className="w-full sm:w-auto"
                onClick={() => handleCreate("user")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create
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
                    currentSort={userSort}
                    onSort={handleUserSort}
                  >
                    Name
                  </SortButton>
                </Table.HeadCell>
                <Table.HeadCell>
                  <SortButton
                    column="email"
                    currentSort={userSort}
                    onSort={handleUserSort}
                  >
                    Email
                  </SortButton>
                </Table.HeadCell>
                <Table.HeadCell>
                  <SortButton
                    column="status"
                    currentSort={userSort}
                    onSort={handleUserSort}
                  >
                    Status
                  </SortButton>
                </Table.HeadCell>
                <Table.HeadCell>
                  <SortButton
                    column="lastLogin"
                    currentSort={userSort}
                    onSort={handleUserSort}
                  >
                    Last Login
                  </SortButton>
                </Table.HeadCell>
                <Table.HeadCell className="w-[100px]">Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user) => (
                    <Table.Row
                      key={user.id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell>{user.id}</Table.Cell>
                      <Table.Cell>{user.name}</Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell className="text-green-400">
                        {/* <span>{user.status}</span> */}
                        {user.status}
                      </Table.Cell>
                      <Table.Cell>{user.lastLogin}</Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="xs"
                            color="light"
                            onClick={() => handleEdit(user.id, "user")}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="xs"
                            color="failure"
                            onClick={() => handleDelete(user.id, "user")}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <Table.Cell colSpan={6} className="text-center py-4">
                      No users found
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
                  value={usersPerPage}
                  onChange={handleUserRowSizeChange}
                >
                  {rowSizeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {paginatedUsers.length > 0
                  ? (userPage - 1) * usersPerPage + 1
                  : 0}
                -{Math.min(userPage * usersPerPage, filteredUsers.length)} of{" "}
                {filteredUsers.length}
              </span>
            </div>
            <div className="flex items-center mt-2 sm:mt-0">
              <SimplePagination
                currentPage={userPage}
                totalPages={totalUserPages}
                onPageChange={setUserPage}
              />
            </div>
          </div>
        </div>

        {/* 2 columns - Roles and Permissions Tables */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
          {/* Roles Table */}
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
                        <Table.Cell className="font-medium">
                          {role.role}
                        </Table.Cell>
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
                  {paginatedRoles.length > 0
                    ? (rolePage - 1) * rolesPerPage + 1
                    : 0}
                  -{Math.min(rolePage * rolesPerPage, filteredRoles.length)} of{" "}
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

          {/* Permissions Table */}
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
                    <SortButton
                      column="type"
                      currentSort={permissionSort}
                      onSort={handlePermissionSort}
                    >
                      Type
                    </SortButton>
                  </Table.HeadCell>
                  <Table.HeadCell className="w-[100px]">Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {paginatedPermissions.length > 0 ? (
                    paginatedPermissions.map((permission) => (
                      <Table.Row
                        key={permission.id}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <Table.Cell>{permission.id}</Table.Cell>
                        <Table.Cell className="font-medium">
                          {permission.name}
                        </Table.Cell>
                        <Table.Cell>{permission.type}</Table.Cell>
                        <Table.Cell>
                          <div className="flex items-center gap-2">
                            <Button
                              size="xs"
                              color="light"
                              onClick={() =>
                                handleEdit(permission.id, "permission")
                              }
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
        </div>
      </div>
    </>
  );
}
