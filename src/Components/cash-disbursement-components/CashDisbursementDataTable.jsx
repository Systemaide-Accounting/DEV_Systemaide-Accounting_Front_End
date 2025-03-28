import { Button, Select, Table, TextInput } from "flowbite-react";
import { Plus, Search } from "lucide-react";
import { SortButton } from "../data-table-components/SortButton";
import { SimplePagination } from "../data-table-components/SimplePagination";
import { safeJsonParse } from "../reusable-functions/safeJsonParse";
import { useNavigate } from "react-router-dom";

const rowSizeOptionsJSON = JSON.stringify([
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 50, label: "50" },
]);

export function CashDisbursementDataTable() {

  const navigate = useNavigate();

  const navigateToForm = async () => {
    navigate("/transaction/cashdisbursement/form");
  };

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
                //   value={agentSearch}
                //   onChange={(e) => {
                //     setAgentSearch(e.target.value);
                //     setAgentPage(1);
                //   }}
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
                {/* <Table.HeadCell className="w-[60px]">ID</Table.HeadCell> */}
                <Table.HeadCell>Code</Table.HeadCell>
                <Table.HeadCell className="whitespace-nowrap overflow-hidden truncate">
                  <SortButton
                    column="agentName"
                    // currentSort={agentSort}
                    // onSort={handleAgentSort}
                  >
                    Agent Name
                  </SortButton>
                </Table.HeadCell>
                <Table.HeadCell className="whitespace-nowrap overflow-hidden truncate">
                  <SortButton
                    column="tradeName"
                    // currentSort={agentSort}
                    // onSort={handleAgentSort}
                  >
                    Trade Name
                  </SortButton>
                </Table.HeadCell>
                <Table.HeadCell className="whitespace-nowrap overflow-hidden truncate">
                  <SortButton
                    column="registeredName"
                    // currentSort={agentSort}
                    // onSort={handleAgentSort}
                  >
                    Registered Name
                  </SortButton>
                </Table.HeadCell>
                <Table.HeadCell>TIN</Table.HeadCell>
                <Table.HeadCell className="whitespace-nowrap overflow-hidden truncate">
                  Agent Address
                </Table.HeadCell>
                <Table.HeadCell className="whitespace-nowrap overflow-hidden truncate">
                  Agent Type
                </Table.HeadCell>
                <Table.HeadCell className="whitespace-nowrap overflow-hidden truncate">
                  Tax Classifiction
                </Table.HeadCell>
                <Table.HeadCell className="whitespace-nowrap overflow-hidden truncate">
                  Registration Type
                </Table.HeadCell>
                <Table.HeadCell className="whitespace-nowrap overflow-hidden truncate">
                  Authorized Representative
                </Table.HeadCell>
                <Table.HeadCell className="w-[100px]">Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {/* {paginatedAgents.length > 0 ? (
                  paginatedAgents.map((agent, index) => (
                    <Table.Row
                      key={index + 1}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell>{agent?.agentCode}</Table.Cell>
                      <Table.Cell className="capitalize">
                        {agent?.agentName
                          ? (() => {
                              const parsedName = safeJsonParse(
                                agent?.agentName
                              );
                              if (
                                parsedName &&
                                typeof parsedName === "object"
                              ) {
                                return (
                                  <HandleFullNameFormat
                                    firstName={parsedName?.firstName}
                                    lastName={parsedName?.lastName}
                                    middleName={parsedName?.middleName}
                                  />
                                );
                              } else {
                                return agent?.agentName; // Pass the value as is if not JSON
                              }
                            })()
                          : "Name not available"}
                      </Table.Cell>
                      <Table.Cell>{agent?.tradeName}</Table.Cell>
                      <Table.Cell className="capitalize">
                        {agent?.registeredName}
                      </Table.Cell>
                      <Table.Cell>{agent?.tin}</Table.Cell>
                      <Table.Cell className="capitalize">
                        {agent?.agentAddress
                          ? (() => {
                              const parsedAddress = safeJsonParse(
                                agent?.agentAddress
                              );
                              if (
                                parsedAddress &&
                                typeof parsedAddress === "object"
                              ) {
                                return (
                                  <HandleSimpleAddressFormat
                                    barangay={parsedAddress?.brgy}
                                    city={parsedAddress?.city}
                                  />
                                );
                              } else {
                                return agent?.agentAddress; // Pass the value as is if not JSON
                              }
                            })()
                          : "Address not available"}
                      </Table.Cell>
                      <Table.Cell className="capitalize">
                        {agent?.agentType}
                      </Table.Cell>
                      <Table.Cell className="capitalize">
                        {agent?.taxClassification}
                      </Table.Cell>
                      <Table.Cell className="capitalize">
                        {agent?.registrationType}
                      </Table.Cell>
                      <Table.Cell className="capitalize">
                        {agent?.authorizedRepresentative}
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="xs"
                            color="light"
                            onClick={() => handleEditAgentModalForm(agent?._id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="xs"
                            color="failure"
                            onClick={() => handleDelete(agent?._id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <Table.Cell colSpan={11} className="text-center py-4">
                      No agents found
                    </Table.Cell>
                  </Table.Row>
                )} */}
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
                //   value={agentsPerPage}
                //   onChange={handleLocationRowSizeChange}
                >
                  {/* {rowSizeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))} */}
                </Select>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {/* {paginatedAgents.length > 0
                  ? (agentPage - 1) * agentsPerPage + 1
                  : 0}
                -{Math.min(agentPage * agentsPerPage, filteredAgents.length)} of{" "}
                {filteredAgents.length} */}
              </span>
            </div>
            <div className="flex items-center mt-2 sm:mt-0">
              <SimplePagination
                // currentPage={agentPage}
                // totalPages={totalAgentPages}
                // onPageChange={setAgentPage}
              />
            </div>
          </div>
        </div>
      </>
    );
}