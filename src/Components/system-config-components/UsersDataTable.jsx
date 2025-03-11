import { SimplePagination } from "../data-table-components/SimplePagination";
import { SortButton } from "../data-table-components/SortButton";
// import usersDataJSON from "../../sample-data/usersData.json";
import { useContext, useEffect, useState } from "react";
import { Button, Label, Modal, Select, Table, TextInput } from "flowbite-react";
import { Search, Plus, Edit, Trash } from "lucide-react";
import { getAllUsers } from "../../services/systemaideService";
import AuthContext from "../../context/AuthContext";

const rowSizeOptionsJSON = JSON.stringify([
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 50, label: "50" },
]);

export function UsersDataTable() {
  const { accessToken } = useContext(AuthContext);
  const [usersData, setUsersData] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [userPage, setUserPage] = useState(1);
  const [userSort, setUserSort] = useState({
    column: "name",
    direction: "asc",
  });
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [rowSizeOptions, setRowSizeOptions] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const fetchData = async () => {
    try {
      const response = await getAllUsers(accessToken);
      if (!response?.success) console.log(response?.message);
      // const usersDataJSON = response?.data;
      setUsersData(response?.data);
    } catch (error) {
      console.error("Error parsing JSON data:", error);
    }
  };

  // Parse JSON data on component mount
  useEffect(() => {
    fetchData();    
    setRowSizeOptions(JSON.parse(rowSizeOptionsJSON));
  }, []);

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

  // Handle row size change
  const handleUserRowSizeChange = (e) => {
    const newSize = Number.parseInt(e.target.value);
    setUsersPerPage(newSize);
    setUserPage(1); // Reset to first page when changing row size
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (id, type) => {
    console.log(`Edit ${type} with ID: ${id}`);
    // In a real app, this would open a modal or navigate to an edit page
  };

  const handleDelete = (id, type) => {
    console.log(`Delete ${type} with ID: ${id}`);
    // In a real app, this would show a confirmation dialog
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    setOpenModal(false);
  };

  usersData.map((user) => {
    user.name = user.firstName + " " + user.lastName;
  });

  // Filtered and sorted users
  const filteredUsers = usersData
    .filter(
      (user) =>
        (user.name?.toLowerCase() || "").includes(userSearch.toLowerCase()) ||
        (user.email?.toLowerCase() || "").includes(userSearch.toLowerCase()) ||
        (user.status?.toLowerCase() || "").includes(userSearch.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[userSort.column] || ""; // Default to empty string if missing
      const bValue = b[userSort.column] || "";

      if (userSort.direction === "asc") {
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

  return (
    <>
      {/* Data Table */}
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
              onClick={() => setOpenModal(true)}
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
              {/* <Table.HeadCell>
                <SortButton
                  column="lastLogin"
                  currentSort={userSort}
                  onSort={handleUserSort}
                >
                  Last Login
                </SortButton>
              </Table.HeadCell> */}
              <Table.HeadCell className="w-[100px]">Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user, index) => (
                  <Table.Row
                    key={index + 1}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>{(userPage - 1) * usersPerPage + index + 1}</Table.Cell>
                    {/* <Table.Cell>{user.firstName}{" "}{user.lastName}</Table.Cell> */}
                    <Table.Cell>{user.name}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell className="text-green-400">
                      {/* <span>{user.status}</span> */}
                      {user.status}
                    </Table.Cell>
                    {/* <Table.Cell>{user.lastLogin}</Table.Cell> */}
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

      {/* Modal for CRUD */}
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add New User</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="firstName" value="First Name" />
              </div>
              <TextInput
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Enter first name"
                required={true}
                // value={accountName}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="lastName" value="Last Name" />
              </div>
              <TextInput
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Enter last name"
                required={true}
                // value={accountCode}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                id="email"
                name="email"
                type="text"
                placeholder="Enter email"
                required={true}
                // value={accountCode}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Password" />
              </div>
              <TextInput
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                required={true}
                // value={accountCode}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center text-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Add
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
