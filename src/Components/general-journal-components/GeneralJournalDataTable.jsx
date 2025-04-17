import { Button, Select, Table, TextInput } from "flowbite-react";
import { Edit, Plus, Search, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SortButton } from "../data-table-components/SortButton";
import { SimplePagination } from "../data-table-components/SimplePagination";
import { deleteGeneralJournalTransaction, getAllGeneralJournalTransactions } from "../../services/systemaideService";
import { rowSizeOptionsJSON } from "../data-table-components/rowSizeOptionsJSON";
import { HandleDateFormat } from "../reusable-functions/DateFormatter";
import swal2 from "sweetalert2";

export function GeneralJournalDataTable() {
  const navigate = useNavigate();
  const [transactionsData, setTransactionsData] = useState([]);
  const [transactionSearch, setTransactionSearch] = useState("");
  const [transactionPage, setTransactionPage] = useState(1);
  const [transactionSort, setTransactionSort] = useState({
    column: "date",
    direction: "asc",
  });
  const [transactionsPerPage, setTransactionsPerPage] = useState(5);
  const [rowSizeOptions, setRowSizeOptions] = useState([]);

  const fetchAllTransactions = async () => {
    try {
      const response = await getAllGeneralJournalTransactions();
      if (response?.success) {
        setTransactionsData(response?.data);
      } else {
        console.log(response?.message);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchAllTransactions();
    setRowSizeOptions(JSON.parse(rowSizeOptionsJSON));
  }, []);

  // Fetch transactions every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(fetchAllTransactions, 3000);
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  // Handle edit action
  const handleEditTransaction = (transactionId) => {
    navigate(`/transaction/generaljournal/form/${transactionId}`);
  };

  // Handle delete action
  const handleDelete = async (transactionId) => {
    await swal2
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await deleteGeneralJournalTransaction(
              transactionId
            );
            if (response?.success) {
              await fetchAllTransactions();
              await swal2.fire(
                "Deleted!",
                "Your transaction has been deleted.",
                "success"
              );
            } else {
              await swal2.fire({
                icon: "error",
                title: "Error!",
                text: "Transaction could not be deleted.",
              });
            }
          } catch (error) {
            console.error("Error deleting transaction:", error);
            await swal2.fire({
              icon: "error",
              title: "Error!",
              text: "An error occurred while deleting the transaction.",
            });
          }
        }
      });
  };

  const handleTransactionSort = (column) => {
    setTransactionSort({
      column,
      direction:
        transactionSort.column === column && transactionSort.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  // Handle row size change
  const handleTransactionRowSizeChange = (e) => {
    const newSize = Number.parseInt(e.target.value);
    setTransactionsPerPage(newSize);
    setTransactionPage(1); // Reset to first page when changing row size
  };

  const navigateToForm = async () => {
    navigate("/transaction/generaljournal/form");
  };

  // filtered and sorted transactions
  const filteredTransactions = transactionsData
    .filter(
      (transaction) =>
        (transaction?.jvNo?.toLowerCase() || "").includes(
          transactionSearch.toLowerCase()
        ) ||
        (transaction?.particular?.toLowerCase() || "").includes(
          transactionSearch.toLowerCase()
        )
    )
    .sort((a, b) => {
      let aValue, bValue;

      if (transactionSort.column === "registeredName") {
        aValue = (a.payeeName?.registeredName || "").toLowerCase();
        bValue = (b.payeeName?.registeredName || "").toLowerCase();
      } else if (transactionSort.column === "cashAccount") {
        aValue = (a.cashAccount?.accountName || "").toLowerCase();
        bValue = (b.cashAccount?.accountName || "").toLowerCase();
      } else {
        aValue = (a[transactionSort.column] || "").toLowerCase();
        bValue = (b[transactionSort.column] || "").toLowerCase();
      }

      if (transactionSort.direction === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Pagination for transactions
  const totalTransactionPages = Math.max(
    1,
    Math.ceil(filteredTransactions.length / transactionsPerPage)
  );
  const paginatedTransactions = filteredTransactions.slice(
    (transactionPage - 1) * transactionsPerPage,
    transactionPage * transactionsPerPage
  );

  return (
    <>
      {/* Data Table */}
      <div className="mb-4 rounded bg-white dark:bg-gray-800 p-4 shadow">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <h2 className="text-xl font-semibold">Summary</h2>
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <TextInput
                icon={Search}
                placeholder="Search transactions..."
                value={transactionSearch}
                onChange={(e) => {
                  setTransactionSearch(e.target.value);
                  setTransactionPage(1);
                }}
              />
            </div>
            <Button
              color="blue"
              className="w-full sm:w-auto"
              onClick={navigateToForm}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Entry
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto" style={{ minHeight: "200px" }}>
          <Table hoverable striped>
            <Table.Head>
              <Table.HeadCell className="w-[60px]">No.</Table.HeadCell>
              <Table.HeadCell>
                <SortButton
                  column="date"
                  currentSort={transactionSort}
                  onSort={handleTransactionSort}
                >
                  Date
                </SortButton>
              </Table.HeadCell>
              <Table.HeadCell className="whitespace-nowrap overflow-hidden truncate">
                JV No.
              </Table.HeadCell>
              <Table.HeadCell className="whitespace-nowrap overflow-hidden truncate">
                Particular
              </Table.HeadCell>
              <Table.HeadCell className="w-[100px]">Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {paginatedTransactions.length > 0 ? (
                paginatedTransactions.map((transaction, index) => (
                  <Table.Row
                    key={index + 1}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>
                      {(transactionPage - 1) * transactionsPerPage + index + 1}
                    </Table.Cell>
                    <Table.Cell className="capitalize">
                      <HandleDateFormat date={transaction?.date} />
                    </Table.Cell>
                    <Table.Cell className="capitalize">
                      {transaction?.jvNo}
                    </Table.Cell>
                    <Table.Cell className="capitalize">
                      {transaction?.particular}
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="xs"
                          color="light"
                          onClick={() =>
                            handleEditTransaction(transaction?._id)
                          }
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="xs"
                          color="failure"
                          onClick={() => handleDelete(transaction?._id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={9} className="text-center py-4">
                    No transactions found
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
                value={transactionsPerPage}
                onChange={handleTransactionRowSizeChange}
              >
                {rowSizeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
              {paginatedTransactions.length > 0
                ? (transactionPage - 1) * transactionsPerPage + 1
                : 0}
              -
              {Math.min(
                transactionPage * transactionsPerPage,
                filteredTransactions.length
              )}{" "}
              of {filteredTransactions.length}
            </span>
          </div>
          <div className="flex items-center mt-2 sm:mt-0">
            <SimplePagination
              currentPage={transactionPage}
              totalPages={totalTransactionPages}
              onPageChange={setTransactionPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}