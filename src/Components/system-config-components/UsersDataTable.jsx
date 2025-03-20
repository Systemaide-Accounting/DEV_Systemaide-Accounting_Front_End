import { SimplePagination } from "../data-table-components/SimplePagination";
import { SortButton } from "../data-table-components/SortButton";
// import usersDataJSON from "../../sample-data/usersData.json";
import { useContext, useEffect, useState } from "react";
import { Button, Select, Table, TextInput } from "flowbite-react";
import { Search, Plus, Edit, Trash } from "lucide-react";
import { getAllUsers, deleteUser, getUserById } from "../../services/systemaideService";
import swal2 from "sweetalert2";
import { UserModalForm } from "./UserModalForm";
import AuthContext from "../../context/AuthContext";

const rowSizeOptionsJSON = JSON.stringify([
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 50, label: "50" },
]);

export function UsersDataTable() {
  
  const { user } = useContext(AuthContext);
  const [usersData, setUsersData] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [userPage, setUserPage] = useState(1);
  const [userSort, setUserSort] = useState({
    column: "name",
    direction: "asc",
  });
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [rowSizeOptions, setRowSizeOptions] = useState([]);
  const [userData, setUserData] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const fetchAllUsers = async () => {
    try {
      const response = await getAllUsers();
      if (!response?.success) console.log(response?.message);
      // const usersDataJSON = response?.data;
      setUsersData(response?.data);
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  };

  // Parse JSON data on component mount
  useEffect(() => {
    try {
      fetchAllUsers();
      // fetchAllRoles();
      setRowSizeOptions(JSON.parse(rowSizeOptionsJSON));
    } catch (error) {
      console.error("Error parsing JSON data:", error);
    }
  }, []);

  // Fetch users every 3 seconds
  // useEffect(() => {
  //   const intervalId = setInterval(fetchAllUsers, 3000);
  //   return () => clearInterval(intervalId); // Cleanup interval on component unmount
  // }, []);

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
          // const response = await deleteUser(id);
          const response = await deleteUser(id);
          if(response?.success) {
            await fetchAllUsers();
            await swal2.fire("Deleted!", "User has been deleted.", "success");
          } else {
            await swal2.fire("Error!", "User could not be deleted.", "error");
          }
        } catch (error) {
          // console.error("Error deleting User:", error);
          await swal2.fire("Error!", "User could not be deleted.", "error");
        }
      }
    });
    // In a real app, this would show a confirmation dialog
  };

  const handleAddUserModalForm = () => {
    setUserData(null);
    setOpenModal(true);
  };

  const handleEditUserModalForm = async (id) => {
    try {
      const response = await getUserById(id);
      if (response?.success) {
        setUserData(response?.data);
        setOpenModal(true);
      } else {
        console.log(response?.message);
      } 
    } catch (error) {
      console.error("Error fetching User:", error);
    }
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
              onClick={() => handleAddUserModalForm()}
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
                paginatedUsers.map((userItem, index) => (
                  <Table.Row
                    key={index + 1}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>
                      {(userPage - 1) * usersPerPage + index + 1}
                    </Table.Cell>
                    {/* <Table.Cell>{user.firstName}{" "}{user.lastName}</Table.Cell> */}
                    <Table.Cell>{userItem?.name}</Table.Cell>
                    <Table.Cell>{userItem?.email}</Table.Cell>
                    <Table.Cell className="text-green-400">
                      {/* <span>{user.status}</span> */}
                      {userItem?.status}
                    </Table.Cell>
                    {/* <Table.Cell>{user.lastLogin}</Table.Cell> */}
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="xs"
                          color="light"
                          onClick={() => handleEditUserModalForm(userItem?._id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>

                        {user?._id !== userItem?._id && (
                          <Button
                            size="xs"
                            color="failure"
                            onClick={() => handleDelete(userItem?._id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
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
      <UserModalForm
        openModal={openModal}
        setOpenModal={setOpenModal}
        userData={userData}
      />
    </>
  );
}
