import { useContext, useEffect, useState } from "react";
import { Plus, Edit, Trash } from "lucide-react";
import ChartOfAccntContext from "../../context/ChartOfAccntContext";
import mainAccountsDataJSON from "../../sample-data/mainAccountsData.json";
import { deleteAccount, getAccountById, getAllParentAccounts } from "../../services/systemaideService";
import swal2 from "sweetalert2";
import { MainAccntModalForm } from "./MainAccntModalForm";
import { Button, Table } from "flowbite-react";

export function MainAccnt() {
  const { selectedAccount, setSelectedAccount } =
    useContext(ChartOfAccntContext);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [mainAccountsData, setMainAccountsData] = useState([]);
  const [accountData, setAccountData] = useState(null);

  const fetchAllParentAccounts = async () => {
    try {
      const response = await getAllParentAccounts();
      if (response?.success) {
        setMainAccountsData(response?.data);
      } else {
        console.log(response?.message);
      }
    } catch (error) {
      console.error("Error fetching main accounts:", error);
    }
  };

  useEffect(() => {
    fetchAllParentAccounts();
  }, []);

  // Fetch parent accounts every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(fetchAllParentAccounts, 3000);
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const handleAddMainAccntModalForm = () => {
    setOpenModal(true);
    setAccountData(null);
  };
  
  const handleEditMainAccntModalForm = async (id) => {
    try {
      const response = await getAccountById(id);
      if (response?.success) {
        setAccountData(response?.data);
        setOpenModal(true);
      } else {
        console.log(response?.message);
      }
    } catch (error) {
      console.error("Error fetching main account:", error);
    }
  }

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
                const response = await deleteAccount(id);
                if (response?.success) {
                    await swal2.fire("Deleted!", "Account has been deleted.", "success");
                    fetchAllParentAccounts();
                } else {
                    await swal2.fire("Error", "Account could not be deleted", "error");
                }
            } catch (error) {
                console.error("Error deleting account: ", error);
                await swal2.fire("Error", "An error occurred while deleting the account.", "error");
            }
        }
    });
  };

  const handleAccountClick = (account) => {    
    setSelectedAccount(account);
  };

  const filteredMainAccntsData = mainAccountsData.filter(
    (account) =>
      (account?.accountCode?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (account?.accountName.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      )
  );

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <div className="flex justify-end items-center mb-4">
          <button
            className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={() => handleAddMainAccntModalForm()}
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Main Account
          </button>
        </div>
        <h2 className="text-xl mb-4">Account Classification</h2>
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 mb-4 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="overflow-x-auto" style={{ minHeight: "200px" }}>
          <Table hoverable striped>
            <Table.Head>
              <Table.HeadCell>Code</Table.HeadCell>
              <Table.HeadCell>Account Classification</Table.HeadCell>
              <Table.HeadCell className="w-[100px]">Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {filteredMainAccntsData && filteredMainAccntsData.length > 0 ? (
                filteredMainAccntsData.map((item, index) => (
                  <Table.Row
                    key={index + 1}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    onClick={() => handleAccountClick(item)}
                  >
                    <Table.Cell>{item?.accountCode}</Table.Cell>
                    <Table.Cell>{item?.accountName}</Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="xs"
                          color="light"
                          onClick={() =>
                            handleEditMainAccntModalForm(item?._id)
                          }
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="xs"
                          color="failure"
                          onClick={() => handleDelete(item?._id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={3} className="text-center py-4">
                    No accounts found
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </div>

      {/* Modal for CRUD */}
      <MainAccntModalForm
        openModal={openModal}
        setOpenModal={setOpenModal}
        accountData={accountData}
      />
    </>
  );
}