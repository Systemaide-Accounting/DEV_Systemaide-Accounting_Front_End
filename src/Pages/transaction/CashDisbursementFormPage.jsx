import { Button, Label, TextInput, Select, Table, Badge } from "flowbite-react";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Plus, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllAccounts, getAllAgents, getAllLocations } from "../../services/systemaideService";

export function CashDisbursementFormPage() {

    const navigate = useNavigate();
    const [locationsSelectOptions, setLocationsSelectOptions] = useState([]);
    const [agentsSelectOptions, setAgentsSelectOptions] = useState([]);
    const [accountsSelectOptions, setAccountsSelectOptions] = useState([]);
    const [formData, setFormData] = useState({
      date: "",
      month: new Date().toLocaleString("default", { month: "long" }),
      year: new Date().getFullYear(),
      location: "",
      cvNo: "",
      checkNo: "",
      payeeName: "",
      addressTin: "",
      cashAccount: "",
      particular: "",
      transactions: ""
    });
    const [lines, setLines] = useState([
      {
        id: 1,
        invoiceNo: "",
        purchaseType: "",
        vatComputation: "",
        inventoryAccount: "",
        grossAmount: "",
        withholdingTax: "",
        ap: "",
        expenseAccountTitle: "",
        taxSource: "",
      },
    ]);
    const [isLinesCollapsed, setIsLinesCollapsed] = useState(false);

    const fetchAllLocations = async () => {
      try {
        const response = await getAllLocations();
        if (!response?.success) console.log(response?.message);
        setLocationsSelectOptions(response?.data);
      } catch (error) {
        console.error("Error fetching Locations:", error);
      }
    };

    const fetchAllAgents = async () => {
      try {
        const response = await getAllAgents();
        if (!response?.success) console.log(response?.message);
        setAgentsSelectOptions(response?.data);
      } catch (error) {
        console.error("Error fetching Agents:", error);
      }
    };

    const fetchAllAccounts = async () => {
      try {
        const response = await getAllAccounts();
        if (!response?.success) console.log(response?.message);
        setAccountsSelectOptions(response?.data);
      } catch (error) {
        console.error("Error fetching Accounts:", error);
      }
    };

    const handleChange = async (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
    
      const addLine = () => {
        const newLine = {
          id: Date.now(),
          invoiceNo: "",
          purchaseType: "",
          vatComputation: "",
          inventoryAccount: "",
          grossAmount: "",
          withholdingTax: "",
          ap: "",
          expenseAccountTitle: "",
          taxSource: "",
        };
        setLines([...lines, newLine]);
      };
    
      const deleteLine = (id) => {
        setLines(lines.filter((line) => line.id !== id));
      };
    
      const toggleLinesCollapse = () => {
        setIsLinesCollapsed(!isLinesCollapsed);
      };

      const handleCancel = async () => {
        navigate(-1);
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
      };

      useEffect(() => {
        fetchAllLocations();
        fetchAllAgents();
        fetchAllAccounts();
      }, []);
      
    return (
      <>
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <h2 className="text-xl font-semibold">Cash Disbursement Journal</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4 rounded bg-white dark:bg-gray-800 p-4 shadow">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <TextInput
                    id="date"
                    name="date"
                    type="date"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="month">Month</Label>
                  <TextInput
                    id="month"
                    name="month"
                    type="text"
                    onChange={handleChange}
                    value={new Date().toLocaleString("default", {
                      month: "long",
                    })}
                    readOnly
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="year">Year</Label>
                  <TextInput
                    id="year"
                    name="year"
                    type="text"
                    onChange={handleChange}
                    value={new Date().getFullYear().toString()}
                    readOnly
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Select
                    id="location"
                    name="location"
                    onChange={handleChange}
                    value={formData?.location}
                    required
                  >
                    {locationsSelectOptions.map((location, index) => (
                      <option key={index + 1} value={location?.name}>
                        {location?.name.toUpperCase()}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <Label htmlFor="cvNo">CV No.</Label>
                  <TextInput
                    id="cvNo"
                    type="text"
                    name="cvNo"
                    onChange={handleChange}
                    placeholder="CV No."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="checkNo">Check No.</Label>
                  <TextInput
                    id="checkNo"
                    type="text"
                    name="checkNo"
                    onChange={handleChange}
                    placeholder="Check No."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="payeeName">Payee's Name</Label>
                  <Select
                    id="payeeName"
                    name="payeeName"
                    onChange={handleChange}
                    required
                  >
                    {agentsSelectOptions.map((agent, index) => (
                      <option key={index + 1} value={agent?.registeredName}>
                        {agent?.registeredName.toUpperCase()}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <Label htmlFor="addressTin">Address/TIN</Label>
                  <TextInput
                    id="addressTin"
                    type="text"
                    name="addressTin"
                    onChange={handleChange}
                    placeholder="Address/TIN"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="cashAccount">Cash Account</Label>
                  <Select
                    id="cashAccount"
                    name="cashAccount"
                    onChange={handleChange}
                    required
                  >
                    {accountsSelectOptions.map((account, index) => (
                      <option key={index + 1} value={account?.accountName}>
                        {account?.accountName?.toUpperCase()}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <Label htmlFor="particular">Particular</Label>
                  <TextInput
                    id="particular"
                    type="text"
                    name="particular"
                    onChange={handleChange}
                    placeholder="Particular"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="border rounded-md">
              <div className="bg-blue-50 p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-blue-700">
                    Transaction Lines
                  </h3>
                  <Badge color="info">
                    {lines.length > 1
                      ? `${lines.length} items`
                      : `${lines.length} item`}
                  </Badge>
                </div>
                <Button
                  color="light"
                  onClick={toggleLinesCollapse}
                  className="flex items-center gap-1"
                >
                  {isLinesCollapsed ? (
                    <>
                      <ChevronDown size={16} />
                    </>
                  ) : (
                    <>
                      <ChevronUp size={16} />
                    </>
                  )}
                </Button>
              </div>

              {!isLinesCollapsed && (
                <div className="overflow-x-auto">
                  <Table>
                    <Table.Head>
                      <Table.HeadCell className=" bg-blue-300 whitespace-nowrap overflow-hidden truncate">
                        Invoice No.
                      </Table.HeadCell>
                      <Table.HeadCell className=" bg-blue-300 whitespace-nowrap overflow-hidden truncate">
                        Purchase Type
                      </Table.HeadCell>
                      <Table.HeadCell className="bg-blue-300 whitespace-nowrap overflow-hidden truncate">
                        VAT Computation
                      </Table.HeadCell>
                      <Table.HeadCell className="bg-blue-300 whitespace-nowrap overflow-hidden truncate">
                        Inventory Account
                      </Table.HeadCell>
                      <Table.HeadCell className="bg-blue-300 whitespace-nowrap overflow-hidden truncate">
                        Gross Amount
                      </Table.HeadCell>
                      <Table.HeadCell className="bg-blue-300 whitespace-nowrap overflow-hidden truncate">
                        Withholding Tax
                      </Table.HeadCell>
                      <Table.HeadCell className="bg-blue-300 whitespace-nowrap overflow-hidden truncate">
                        A/P
                      </Table.HeadCell>
                      <Table.HeadCell className="bg-blue-300 whitespace-nowrap overflow-hidden truncate">
                        Expense Account Title
                      </Table.HeadCell>
                      <Table.HeadCell className="bg-blue-300 whitespace-nowrap overflow-hidden truncate">
                        Tax Source
                      </Table.HeadCell>
                      <Table.HeadCell className="bg-blue-300 whitespace-nowrap overflow-hidden truncate">
                        Action
                      </Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                      {lines.map((line) => (
                        <Table.Row key={line.id}>
                          <Table.Cell className="p-2">
                            <TextInput
                              type="text"
                              id="invoiceNo"
                              name="invoiceNo"
                              onChange={handleChange}
                              placeholder="Invoice No."
                            />
                          </Table.Cell>
                          <Table.Cell className="p-2">
                            <TextInput
                              type="text"
                              id="purchaseType"
                              name="purchaseType"
                              onChange={handleChange}
                              placeholder="Purchase Type"
                            />
                          </Table.Cell>
                          <Table.Cell className="p-2">
                            <TextInput
                              type="text"
                              id="vatComputation"
                              name="vatComputation"
                              onChange={handleChange}
                              placeholder="VAT Computation"
                            />
                          </Table.Cell>
                          <Table.Cell className="p-2">
                            <TextInput
                              type="text"
                              id="inventoryAccount"
                              name="inventoryAccount"
                              onChange={handleChange}
                              placeholder="Inventory Account"
                            />
                          </Table.Cell>
                          <Table.Cell className="p-2">
                            <TextInput
                              type="text"
                              id="grossAmount"
                              name="grossAmount"
                              onChange={handleChange}
                              placeholder="Gross Amount"
                            />
                          </Table.Cell>
                          <Table.Cell className="p-2">
                            <TextInput
                              type="text"
                              id="withholdingTax"
                              name="withholdingTax"
                              onChange={handleChange}
                              placeholder="Withholding Tax"
                            />
                          </Table.Cell>
                          <Table.Cell className="p-2">
                            <TextInput
                              type="text"
                              id="ap"
                              name="ap"
                              onChange={handleChange}
                              placeholder="A/P"
                            />
                          </Table.Cell>
                          <Table.Cell className="p-2">
                            <TextInput
                              type="text"
                              id="expenseAccountTitle"
                              name="expenseAccountTitle"
                              onChange={handleChange}
                              placeholder="Expense Account Title"
                            />
                          </Table.Cell>
                          <Table.Cell className="p-2">
                            <TextInput
                              type="text"
                              id="taxSource"
                              name="taxSource"
                              onChange={handleChange}
                              placeholder="Tax Source"
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <Button
                              color="failure"
                              onClick={() => deleteLine(line?.id)}
                            >
                              <Trash size={16} />
                            </Button>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </div>
              )}

              <div className="p-4 bg-blue-50 ">
                <Button color="blue" className="w-full" onClick={addLine}>
                  <Plus size={16} className="mr-2" /> Add Line
                </Button>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button color="red" onClick={handleCancel}>
                Cancel
              </Button>
              <Button color="success" type="submit">
                Save Disbursement
              </Button>
            </div>
          </form>
        </div>
      </>
    );
}