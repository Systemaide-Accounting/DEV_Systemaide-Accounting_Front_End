import { Button, Table, TextInput, Tooltip } from "flowbite-react";
import { useEffect, useState } from "react";
import { getAllDeletedAccounts, restoreAccount } from "../../services/systemaideService";
import { RotateCcw, Search } from "lucide-react";
import swal2 from "sweetalert2";

export function DeletedAccnts() {

    const [accountsData, setAccountsData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchAllAccounts = async () => {
        try {
            const response = await getAllDeletedAccounts();
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

    // Handle restore action
      const handleRestoreAccount = async (accountId) => {
        await swal2
          .fire({
            title: "Are you sure?",
            text: "You want to restore this account?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, restore it!",
            cancelButtonText: "No, cancel!",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              try {
                const response = await restoreAccount(accountId);
                if (response?.success) {
                  await fetchAllAccounts();
                  await swal2.fire(
                    "Restored!",
                    "Account has been restored.",
                    "success"
                  );
                } else {
                  await swal2.fire({
                    icon: "error",
                    title: "Error!",
                    text: "Account could not be restored.",
                  });
                }
              } catch (error) {
                await swal2.fire({
                  icon: "error",
                  title: "Error!",
                  text: "An error occurred while restoring the account.",
                });
              }
            }
          });
      };

    useEffect(() => {
        fetchAllAccounts();
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

    return (
      <>
        <div className="bg-white p-4 dark:bg-gray-800 shadow-sm rounded-lg dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <h2 className="text-xl font-semibold">Chart of Accounts</h2>
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <TextInput
                  icon={Search}
                  placeholder="Search accounts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto" style={{ minHeight: "200px" }}>
            <Table hoverable striped>
              <Table.Head>
                <Table.HeadCell>Account Name</Table.HeadCell>
                <Table.HeadCell>Code</Table.HeadCell>
                <Table.HeadCell className="w-[100px]">Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {filteredAccntsData.length > 0 ? (
                  filteredAccntsData.map((account, index) => (
                    <Table.Row
                      key={index + 1}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell>{account?.accountName}</Table.Cell>
                      <Table.Cell>{account?.accountCode}</Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          <Tooltip content="Restore Account" placement="top">
                            <Button
                              size="xs"
                              color="light"
                              onClick={() =>
                                handleRestoreAccount(account?._id)
                              }
                            >
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                          </Tooltip>
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
      </>
    );
};