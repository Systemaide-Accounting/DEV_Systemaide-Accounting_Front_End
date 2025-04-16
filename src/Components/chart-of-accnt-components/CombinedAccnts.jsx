import { Edit, Plus, Search, Trash } from "lucide-react";
import mainAccountsDataJSON from "../../sample-data/mainAccountsData.json";
import { Button, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { getColorByLevel } from "../reusable-functions/getColorByLevel";
import { deleteAccount, getAccountById, getAllParentAccounts } from "../../services/systemaideService";
import { CombinedAccntsModalForm } from "./CombinedAccntsModalForm";
import swal2 from "sweetalert2";
import { SubAccntModalForm } from "./SubAccntModalForm";

export function CombinedAccnts() {
  // const [accountsData, setAccountsData] = useState(mainAccountsDataJSON);
  const [accountsData, setAccountsData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openSubAccntModal, setOpenSubAccntModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [accountData, setAccountData] = useState(null);
  const [parentAccountData, setParentAccountData] = useState(null);

  const fetchAllParentAccounts = async () => {
    try {
      const response = await getAllParentAccounts();
      if (response?.success) {
        setAccountsData(response?.data);
        // setAccountsData(mainAccountsDataJSON);
      } else {
        console.log(response?.message);
      }
    } catch (error) {
      console.error("Error fetching main accounts:", error);
    }
  };

  const flattenAccounts = (accounts, level = 1) => {
    let result = [];

    accounts.forEach((account) => {
      result.push({ ...account, level });

      if (account?.subAccounts && account?.subAccounts.length > 0) {
        result = [...result, ...flattenAccounts(account?.subAccounts, level + 1)];
      }
      // if (account?.children && account?.children.length > 0) {
      //   result = [...result, ...flattenAccounts(account?.children, level + 1)];
      // }
    });

    return result;
  };

  const handleAddMainAccntModalForm = () => {
    setOpenModal(true);
    setAccountData(null);
  };

  const handleAddSubAccntModalForm = async (id) => {
    try {
      setOpenSubAccntModal(true);
      const response = await getAccountById(id);
      if (response?.success) {
        setParentAccountData(response?.data);
        // setOpenModal(true);
      } else {
        console.log(response?.message);
      }
    } catch (error) {
      console.error("Error fetching main account:", error);
    }
  };

  const handleEditAccntModalForm = async (id) => {
    try {
      setOpenModal(true);
      const response = await getAccountById(id);
      if (response?.success) {
        setAccountData(response?.data);
        // setOpenModal(true);
      } else {
        console.log(response?.message);
      }
    } catch (error) {
      console.error("Error fetching main account:", error);
    }
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
          const response = await deleteAccount(id);
          if (response?.success) {
            await swal2.fire("Deleted!", "Account has been deleted.", "success");
            fetchAllParentAccounts();
          } else {
            await swal2.fire("Error!", "Account could not be deleted", "error");
          }
        } catch (error) {
          console.error("Error deleting account: ", error);
          await swal2.fire("Error!", "An error occurred while deleting the account.", "error");
        }
      }
    });
  };

  useEffect(() => {
    fetchAllParentAccounts();
  }, []);

  const filteredAccntsData = accountsData.filter(
    (account) =>
      (account?.accountCode?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (account?.accountName.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      )
  );

  const flattenedAccounts = flattenAccounts(filteredAccntsData);
  
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <h2 className="text-xl font-semibold">Account Classification</h2>
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <TextInput
                icon={Search}
                placeholder="Search accounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              color="blue"
              className="w-full sm:w-auto"
              onClick={() => handleAddMainAccntModalForm()}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Main Account
            </Button>
          </div>
        </div>
        
        {/* old search design */}
        {/* <h2 className="text-xl mb-4">Account Classification</h2>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <input
            type="text"
            placeholder="Search accounts..."
            className="flex-grow p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md"
            onClick={() => handleAddMainAccntModalForm()}
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Main Account
          </button>
        </div> */}

        <div className="overflow-x-auto" style={{ minHeight: "200px" }}>
          <Table hoverable striped>
            <Table.Head>
              <Table.HeadCell>Account Name</Table.HeadCell>
              <Table.HeadCell>Code</Table.HeadCell>
              <Table.HeadCell className="w-[100px]">Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {flattenedAccounts && flattenedAccounts.length > 0 ? (
                flattenedAccounts.map((account, index) => (
                  <Table.Row
                    key={index + 1}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell
                      className={`flex items-center text-sm`}
                      style={{
                        paddingLeft: `${account.level * 24}px`,
                        color: `${getColorByLevel(account.level)}`,
                      }}
                    >
                      {account?.accountName}
                      {/* {account?.name} */}
                    </Table.Cell>
                    <Table.Cell>{account?.accountCode}</Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="xs"
                          // color="blue"
                          className="bg-blue-500"
                          onClick={() =>
                            handleAddSubAccntModalForm(account?._id)
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          size="xs"
                          color="light"
                          onClick={() => handleEditAccntModalForm(account?._id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="xs"
                          color="failure"
                          onClick={() => handleDelete(account?._id)}
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
      <CombinedAccntsModalForm
        openModal={openModal}
        setOpenModal={setOpenModal}
        accountsData={accountsData}
        setAccountData={setAccountData}
        accountData={accountData}
        fetchAllParentAccounts={fetchAllParentAccounts}
      />

      {/* Sub Accounts Modal Form */}
      <SubAccntModalForm
        openModal={openSubAccntModal}
        setOpenModal={setOpenSubAccntModal}
        accountData={parentAccountData}
        fetchAllParentAccounts={fetchAllParentAccounts}
      />
    </>
  );
}