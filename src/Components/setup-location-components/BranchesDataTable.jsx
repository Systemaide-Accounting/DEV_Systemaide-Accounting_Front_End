import { Button, Select, Table, TextInput } from "flowbite-react";
import { Edit, Plus, Search, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { SortButton } from "../data-table-components/SortButton";
import { deleteBranch, getAllBranches, getBranchById } from "../../services/systemaideService";
import swal2 from "sweetalert2";
import { SimplePagination } from "../data-table-components/SimplePagination";
import { BranchModalForm } from "./BranchModalForm";

const rowSizeOptionsJSON = JSON.stringify([
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 50, label: "50" },
]);

export function BranchesDataTable() {
  const [branchesData, setBranchesData] = useState([]);
  const [branchSearch, setBranchSearch] = useState("");
  const [branchPage, setBranchPage] = useState(1);
  const [branchSort, setBranchSort] = useState({
    column: "name",
    direction: "asc",
  });
  const [branchesPerPage, setBranchesPerPage] = useState(5);
  const [rowSizeOptions, setRowSizeOptions] = useState([]);
  const [branchData, setBranchData] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const fetchAllBranches = async () => {
    try {
      const response = await getAllBranches();
      if (response?.success) {
        setBranchesData(response?.data);
      } else {
        console.log(response?.message);
      }
    } catch (error) {
      console.error("Error fetching branches: ", error);
    }
  };

  useEffect(() => {
    fetchAllBranches();
    setRowSizeOptions(JSON.parse(rowSizeOptionsJSON));
  }, []);

  // Fetch branches every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(fetchAllBranches, 3000);
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  // Sort handler for branches
  const handleBranchSort = (column) => {
    setBranchSort({
      column,
      direction:
        branchSort.column === column && branchSort.direction === "asc"
          ? "desc"
          : "asc",
    });
  }   

  // Handle row size change
    const handleBranchRowSizeChange = (e) => {
      const newSize = Number.parseInt(e.target.value);
      setBranchesPerPage(newSize);
      setBranchPage(1); // Reset to first page when changing row size
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
                    const response = await deleteBranch(id);
                    if (response?.success) {
                        await swal2.fire("Deleted!", "Branch has been deleted.", "success");
                        fetchAllBranches();
                    } else {
                        await swal2.fire("Error", "Branch could not be deleted", "error");
                    }
                } catch (error) {
                    console.error("Error deleting branch: ", error);
                    await swal2.fire("Error", "An error occurred while deleting the branch.", "error");
                }
            }
        });
    };
   
    const handleAddBranchModalForm = () => {
        setBranchData(null);
        setOpenModal(true);
    };

    const handleEditBranchModalForm = async (id) => {
      try {
        const response = await getBranchById(id);
        if(response?.success) {
          setBranchData(response?.data);
          setOpenModal(true);
        } else {
          console.log(response?.message);
        }
      } catch (error) {
        console.error("Error fetching branch: ", error);
      }
    };

    // filtered and sorted branches
    const filteredBranches = branchesData
      .filter(
        (branch) =>
        (branch?.name?.toLowerCase() || "").includes(branchSearch.toLowerCase())
      )
      .sort((a, b) => {
        const aValue = a[branchSort.column] || ""; // Default to empty string if missing
        const bValue = b[branchSort.column] || "";

        if (branchSort.direction === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });

      // Pagination for branches
      const totalBranchPages = Math.max(
        1,
        Math.ceil(filteredBranches.length / branchesPerPage)
      );
      const paginatedBranches = filteredBranches.slice(
        (branchPage - 1) * branchesPerPage,
        branchPage * branchesPerPage
      );

  return (
    <>
      {/* Data Table */}
      <div className="mb-4 rounded bg-white dark:bg-gray-800 p-4 shadow">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <h2 className="text-xl font-semibold">Branches</h2>
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <TextInput
                icon={Search}
                placeholder="Search branches..."
                value={branchSearch}
                onChange={(e) => {
                  setBranchSearch(e.target.value);
                  setBranchPage(1);
                }}
              />
            </div>
            <Button
              color="blue"
              className="w-full sm:w-auto"
              onClick={() => handleAddBranchModalForm()}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
        </div>

        <div className="table-scroll-x" style={{ minHeight: "200px" }}>
          <Table hoverable striped>
            <Table.Head>
              <Table.HeadCell className="w-[60px]">ID</Table.HeadCell>
              <Table.HeadCell>
                <SortButton
                  column="name"
                  currentSort={branchSort}
                  onSort={handleBranchSort}
                >
                  Branch Name
                </SortButton>
              </Table.HeadCell>
              <Table.HeadCell>
                <SortButton
                  column="address"
                  currentSort={branchSort}
                  onSort={handleBranchSort}
                >
                  Address
                </SortButton>
              </Table.HeadCell>
              <Table.HeadCell>TIN</Table.HeadCell>
              <Table.HeadCell>Machine ID No.</Table.HeadCell>
              <Table.HeadCell className="w-[100px]">Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {paginatedBranches.length > 0 ? (
                paginatedBranches.map((branch, index) => (
                  <Table.Row
                    key={index + 1}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>
                      {(branchPage - 1) * branchesPerPage + index + 1}
                    </Table.Cell>
                    <Table.Cell>{branch?.name}</Table.Cell>
                    <Table.Cell>{branch?.address}</Table.Cell>
                    <Table.Cell>{branch?.tin}</Table.Cell>
                    <Table.Cell>{branch?.machineId}</Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="xs"
                          color="light"
                          onClick={() =>
                            handleEditBranchModalForm(branch?._id)
                          }
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="xs"
                          color="failure"
                          onClick={() => handleDelete(branch?._id)}
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
                    No branches found
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
                value={branchesPerPage}
                onChange={handleBranchRowSizeChange}
              >
                {rowSizeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
              {paginatedBranches.length > 0
                ? (branchPage - 1) * branchesPerPage + 1
                : 0}
              -
              {Math.min(
                branchPage * branchesPerPage,
                filteredBranches.length
              )}{" "}
              of {filteredBranches.length}
            </span>
          </div>
          <div className="flex items-center mt-2 sm:mt-0">
            <SimplePagination
              currentPage={branchPage}
              totalPages={totalBranchPages}
              onPageChange={setBranchPage}
            />
          </div>
        </div>
      </div>

      {/* Modal for CRUD */}
      <BranchModalForm 
        branchData={branchData}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
}