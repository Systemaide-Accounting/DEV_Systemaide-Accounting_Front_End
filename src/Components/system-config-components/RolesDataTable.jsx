import { SimplePagination } from "../data-table-components/SimplePagination";
import { SortButton } from "../data-table-components/SortButton";
import rolesDataJSON from "../../sample-data/rolesData.json";
import { useEffect, useState } from "react";
import { Button, Select, Table, TextInput } from "flowbite-react";
import { Search, Plus, Edit, Trash } from "lucide-react";
import { deleteRole, getAllRoles, getRoleById } from "../../services/systemaideService";
import { RoleModalForm } from "./RoleModalForm";
import swal2 from "sweetalert2";

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
    column: "name",
    direction: "asc",
  });
  const [rolesPerPage, setRolesPerPage] = useState(5);
  const [rowSizeOptions, setRowSizeOptions] = useState([]);
  const [roleData, setRoleData] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const fetchAllRoles = async () => {
    try {
      const response = await getAllRoles();
      if (!response?.success) console.log(response?.message);
      setRolesData(response?.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  // Parse JSON data on component mount
  useEffect(() => {
    try {
      fetchAllRoles();
      // setRolesData(rolesDataJSON);
      setRowSizeOptions(JSON.parse(rowSizeOptionsJSON));
    } catch (error) {
      console.error("Error parsing JSON data:", error);
    }
  }, []);

  // Fetch roles every 3 seconds
  // useEffect(() => {
  //   const intervalId = setInterval(fetchAllRoles, 3000);
  //   return () => clearInterval(intervalId); // Cleanup interval on component unmount
  // }, []);

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

  const handleDelete = async (id) => {
    await swal2.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await deleteRole(id);
            if (response?.success) {
              await fetchAllRoles();
              swal2.fire("Deleted!", "The role has been deleted.", "success");
            } else {
              swal2.fire("Error!", "Role could not be deleted.", "error");
            }
          } catch (error) {
            swal2.fire("Error!", "An error occurred while deleting the role.", "error");
          }
        }
      });
  };

  const handleAddRoleModalForm = () => {
    setRoleData(null);
    setOpenModal(true);
  };

  const handleEditUserModalForm = async (id) => {
    try {
      const response = await getRoleById(id);
      if (response?.success) {
        setRoleData(response?.data);
        setOpenModal(true);
      } else {
        swal2.fire("Error!", "Role could not be fetched.", "error");
      }
    } catch (error) {
      console.error("Error fetching role:", error);
    }
  };

  // Filter and sort roles
  const filteredRoles = rolesData
    .filter((role) => {
      const roleNameMatches = (role?.name?.toLowerCase() || "").includes(
        roleSearch.toLowerCase()
      );
      const permissionsMatch = role?.permissions?.some((permission) =>
        permission?.name?.toLowerCase().includes(roleSearch.toLowerCase())
      );
      return roleNameMatches || permissionsMatch;
    })
    .sort((a, b) => {
      const aValue = a[roleSort.column]?.toString().toLowerCase() || "";
      const bValue = b[roleSort.column]?.toString().toLowerCase() || "";

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

  return (
    <>
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
              onClick={() => handleAddRoleModalForm()}
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
                  currentSort={roleSort}
                  onSort={handleRoleSort}
                >
                  Role
                </SortButton>
              </Table.HeadCell>
              <Table.HeadCell>Permissions</Table.HeadCell>
              <Table.HeadCell className="w-[100px]">Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {paginatedRoles.length > 0 ? (
                paginatedRoles.map((role, index) => (
                  <Table.Row
                    key={index + 1}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>
                      {(rolePage - 1) * rolesPerPage + index + 1}
                    </Table.Cell>
                    <Table.Cell className="font-medium">
                      {role?.name}
                    </Table.Cell>
                    <Table.Cell>
                      {role?.permissions
                        ?.map((permission) => permission?.name)
                        .join(", ")}
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="xs"
                          color="light"
                          onClick={() => handleEditUserModalForm(role?._id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="xs"
                          color="failure"
                          onClick={() => handleDelete(role?._id)}
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

      {/* Modal for CRUD */}
      <RoleModalForm
        roleData={roleData}
        openModal={openModal}
        setOpenModal={setOpenModal}
        fetchAllRoles={fetchAllRoles}
      />
    </>
  );
}
