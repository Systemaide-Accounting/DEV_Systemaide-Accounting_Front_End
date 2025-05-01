import { Button, Label, TextInput, Select, Table, Badge, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Plus, Trash } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCashDisbursementTransaction,
  getCashDisbursementTransactionById,
  updateCashDisbursementTransaction,
  getAllAccounts,
  getAllAgents,
  getAllLocations,
} from "../../services/systemaideService";
import swal2 from "sweetalert2";
import { formatInputDate } from "../../Components/reusable-functions/formatInputDate";
import { safeJsonParse } from "../../Components/reusable-functions/safeJsonParse";

export function CashDisbursementFormPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [locationsSelectOptions, setLocationsSelectOptions] = useState([]);
  const [agentsSelectOptions, setAgentsSelectOptions] = useState([]);
  const [accountsSelectOptions, setAccountsSelectOptions] = useState([]);
  const [isFirstOptionDisabled, setIsFirstOptionDisabled] = useState(false);
  const [transactionData, setTransactionData] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    // month: new Date().toLocaleString("default", { month: "long" }),
    // year: new Date().getFullYear(),
    location: "",
    cvNo: "",
    checkNo: "",
    payeeName: "",
    address: "",
    tin: "",
    cashAccount: "",
    particular: "",
    cashCredit: "",
    totalDebit: 0,
    totalCredit: 0,
    // transactions: [], // Initialize transactions as an empty array
    transactionLines: "",
  });
  const [lines, setLines] = useState([
    {
      id: Date.now(),
      invoiceNo: "",
      purchaseType: "",
      purchaseDebit: "",
      inputDebit: "",
      ap: "",
      withholdingTax: "",
      atc: "",
      expenseAccountTitle: "",
      vatType: "",
      expenseDebit: "",
      sundryAccount: "",
      debit: "",
      credit: "",
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
    const { name, value, type, dataset } = e.target;

    // Handle changes for the main form data
    if (!dataset.lineId) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      // If the payeeName field changes, update address and TIN based on selected agent
      if (name === "payeeName") {
        const selectedAgent = agentsSelectOptions.find(
          (agent) => agent?._id === value
        );
        if (selectedAgent) {
          // Update address and TIN fields
          setFormData((prev) => ({
            ...prev,
            address: selectedAgent?.agentAddress
              ? (() => {
                  const parsedAddress = safeJsonParse(
                    selectedAgent?.agentAddress
                  );
                  if (parsedAddress?.brgy || parsedAddress?.city) {
                    return (parsedAddress?.brgy || "") + ", " + (parsedAddress?.city || "");
                  } else {
                    return selectedAgent?.agentAddress;
                  }
                })()
              : "",
            tin: selectedAgent?.tin || "",
          }));
        }
      }
    } else {
      // Handle changes for the transaction lines
      const lineId = parseInt(dataset.lineId);
      const updatedLines = lines.map((line) => {
        if (line.id === lineId) {
          return {
            ...line,
            [name]: value,
          };
        }
        return line;
      });
      setLines(updatedLines);

      // Update the transactions array in formData
      setFormData((prevFormData) => ({
        ...prevFormData,
        transactionLines: updatedLines,
      }));
    }
  };

  const handleSelectFocus = () => {
    setIsFirstOptionDisabled(true);
  };

  const addLine = () => {
    const newLine = {
      id: Date.now(),
      invoiceNo: "",
      purchaseType: "",
      purchaseDebit: "",
      inputDebit: "",
      ap: "",
      withholdingTax: "",
      atc: "",
      expenseAccountTitle: "",
      vatType: "",
      expenseDebit: "",
      sundryAccount: "",
      debit: "",
      credit: "",
    };
    setLines([...lines, newLine]);
  };

  const deleteLine = (id) => {
    setLines(lines.filter((line) => line.id !== id));
    // Update the transactionLines array in formData after deleting a line
    setFormData((prevFormData) => ({
      ...prevFormData,
      transactionLines: lines.filter((line) => line.id !== id),
    }));
  };

  const toggleLinesCollapse = () => {
    setIsLinesCollapsed(!isLinesCollapsed);
  };

  const handleCancel = async () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedFormData = null;
    // Create a new object with the updated transactionLines
    if (formData?.transactionLines &&
      Array.isArray(formData.transactionLines) &&
      formData.transactionLines.length > 0) {
      updatedFormData = {
        ...formData,
        transactionLines: JSON.stringify(formData?.transactionLines),
      };
    } else {
      updatedFormData = {
        ...formData,
        transactionLines: "",
      };
    }
    
    try {
      let response = null;
      if (transactionData) {
        response = await updateCashDisbursementTransaction(
          transactionData?._id,
          JSON.stringify(updatedFormData)
        );
      } else {
        response = await createCashDisbursementTransaction(
          JSON.stringify(updatedFormData)
        );
      }
      if (response?.success) {
        await swal2.fire({
          icon: "success",
          title: "Success",
          text: "Transaction saved successfully!",
        });
        navigate(-1);
      } else {
        await swal2.fire({
          icon: "error",
          title: "Error",
          text: "Failed to save transaction!",
        });
      }
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  const fetchTransactionById = async (id) => {
    try {
      const response = await getCashDisbursementTransactionById(id);
      if(response?.success) {
        setTransactionData(response?.data);
      } else {
        await swal2
          .fire({
            icon: "error",
            title: "Error",
            text: "Failed to fetch transaction!",
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            confirmButtonText: "Go Back",
          })
          .then(() => {
            navigate(-1);
          });
      }
    } catch (error) {
      console.error("Error fetching Transaction:", error);
    } 
  };

  useEffect(() => {
    fetchAllLocations();
    fetchAllAgents();
    fetchAllAccounts();

    if(params?.id) {
      fetchTransactionById(params?.id);
    } else {
      setTransactionData(null);
    }
  }, []);

  useEffect(() => {
    if (transactionData) {
      setFormData({
        date: formatInputDate(transactionData?.date),
        // month: transactionData?.month,
        // year: transactionData?.year,
        location: transactionData?.location?._id,
        cvNo: transactionData?.cvNo,
        checkNo: transactionData?.checkNo,
        payeeName: transactionData?.payeeName?._id,
        // addressTIN: transactionData?.addressTIN,
        address: transactionData?.address,
        tin: transactionData?.tin,
        cashAccount: transactionData?.cashAccount?._id,
        particular: transactionData?.particular,
        cashCredit: transactionData?.cashCredit,
        totalDebit: transactionData?.totalDebit,
        totalCredit: transactionData?.totalCredit,
        transactionLines: transactionData?.transactionLines || [],
      });
      // Set the lines state with the transactions from transactionData
      setLines(
        transactionData?.transactionLines &&
          safeJsonParse(transactionData?.transactionLines).length > 0
          ? safeJsonParse(transactionData?.transactionLines)
          : []
      );
    }
  }, [transactionData]);

  return (
    <>
      {/* Title Card */}
      <div className="w-full p-4 border rounded-lg bg-white mb-4 shadow">
        <h2 className="text-xl font-bold text-gray-900">
          Cash Disbursement Journal
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4 border rounded-lg bg-white dark:bg-gray-800 p-4 shadow">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="date">Date</Label>
              <TextInput
                id="date"
                name="date"
                type="date"
                onChange={handleChange}
                value={formData?.date || new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            {/* <div>
              <Label htmlFor="month">Month</Label>
              <TextInput
                id="month"
                name="month"
                type="text"
                onChange={handleChange}
                value={formData?.month}
                readOnly={transactionData?.month ? false : true}
                required
              />
            </div> */}

            {/* <div>
              <Label htmlFor="year">Year</Label>
              <TextInput
                id="year"
                name="year"
                type="text"
                onChange={handleChange}
                value={formData?.year}
                readOnly={transactionData?.year ? false : true}
                required
              />
            </div> */}

            <div>
              <Label htmlFor="location">Location</Label>
              <Select
                id="location"
                name="location"
                onFocus={handleSelectFocus}
                onChange={handleChange}
                value={formData?.location}
                // defaultValue={formData?.location}
                required
              >
                <option
                  className="uppercase"
                  value=""
                  disabled={isFirstOptionDisabled}
                >
                  Select location
                </option>
                {locationsSelectOptions.map((location, index) => (
                  <option key={index + 1} value={location?._id}>
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
                value={formData?.cvNo}
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
                value={formData?.checkNo}
                onChange={handleChange}
                placeholder="Check No."
                required
              />
            </div>
          </div>

          <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="payeeName">Payee's Name</Label>
              <Select
                id="payeeName"
                name="payeeName"
                onFocus={handleSelectFocus}
                onChange={handleChange}
                value={formData?.payeeName}
                required
              >
                <option
                  className="uppercase"
                  value=""
                  disabled={isFirstOptionDisabled}
                >
                  Select Payee
                </option>
                {agentsSelectOptions.map((agent, index) => (
                  <option key={index + 1} value={agent?._id}>
                    {agent?.registeredName.toUpperCase()}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <TextInput
                id="address"
                type="text"
                name="address"
                onChange={handleChange}
                value={formData?.address}
                placeholder="Address"
                readOnly
                required
              />
            </div>

            <div>
              <Label htmlFor="tin">TIN</Label>
              <TextInput
                id="tin"
                type="text"
                name="tin"
                onChange={handleChange}
                value={formData?.tin}
                placeholder="TIN"
                readOnly
                required
              />
            </div>
          </div>

          {/* horizontal line */}
          <div className="border-t border-gray-300 my-6"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="cashAccount">Cash Account</Label>
              <Select
                id="cashAccount"
                name="cashAccount"
                onFocus={handleSelectFocus}
                onChange={handleChange}
                value={formData?.cashAccount}
                required
              >
                <option
                  className="uppercase"
                  value=""
                  disabled={isFirstOptionDisabled}
                >
                  Select account
                </option>
                {accountsSelectOptions.map((account, index) => (
                  <option key={index + 1} value={account?._id}>
                    {account?.accountName?.toUpperCase()}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label htmlFor="cashCredit">Cash (Credit)</Label>
              <TextInput
                id="cashCredit"
                type="number"
                name="cashCredit"
                onChange={handleChange}
                value={formData?.cashCredit}
                placeholder="Cash Credit"
                // required
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6">
            <div>
              <Label htmlFor="particular">Particular</Label>
              {/* <TextInput
                id="particular"
                type="text"
                name="particular"
                onChange={handleChange}
                value={formData?.particular}
                placeholder="Particular"
                required
              /> */}
              <Textarea
                id="particular"
                name="particular"
                onChange={handleChange}
                value={formData?.particular}
                placeholder="Particular"
                required
                rows={2}
                // className="resize-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="p-4 mb-4 bg-green-100 border rounded-lg shadow">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="totalDebit">Total Debit</Label>
                <TextInput
                  id="totalDebit"
                  name="totalDebit"
                  type="number"
                  onChange={handleChange}
                  min={0}
                  value={formData?.totalDebit || "0.0"}
                  required
                />
              </div>

              <div>
                <Label htmlFor="totalCredit">Total Credit</Label>
                <TextInput
                  id="totalCredit"
                  name="totalCredit"
                  type="number"
                  onChange={handleChange}
                  min={0}
                  value={formData?.totalCredit || "0.0"}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg shadow">
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
                    Purchase (Debit)
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-blue-300 whitespace-nowrap overflow-hidden truncate">
                    Input (Debit)
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-blue-300 whitespace-nowrap overflow-hidden truncate">
                    A/P (Debit)
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-blue-300 whitespace-nowrap overflow-hidden truncate">
                    Withholding Tax (Credit)
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-blue-300 whitespace-nowrap overflow-hidden truncate">
                    ATC
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-blue-300 whitespace-nowrap overflow-hidden truncate">
                    Expense Account Title
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-blue-300 whitespace-nowrap overflow-hidden truncate">
                    Vat Type
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-blue-300 whitespace-nowrap overflow-hidden truncate">
                    Expense (Debit)
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-blue-300 whitespace-nowrap overflow-hidden truncate">
                    Sundry Account Title
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-blue-300 whitespace-nowrap overflow-hidden truncate">
                    Debit
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-blue-300 whitespace-nowrap overflow-hidden truncate">
                    Credit
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-blue-300 whitespace-nowrap overflow-hidden truncate">
                    Action
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {lines.map((line) => (
                    <Table.Row key={line?.id}>
                      <Table.Cell className="p-2">
                        <TextInput
                          type="text"
                          id="invoiceNo"
                          name="invoiceNo"
                          data-line-id={line?.id}
                          onChange={handleChange}
                          placeholder="Invoice No."
                          value={line?.invoiceNo}
                        />
                      </Table.Cell>
                      <Table.Cell className="p-2">
                        <TextInput
                          type="text"
                          id="purchaseType"
                          name="purchaseType"
                          data-line-id={line?.id}
                          onChange={handleChange}
                          placeholder="Purchase Type"
                          value={line?.purchaseType}
                        />
                      </Table.Cell>
                      <Table.Cell className="p-2">
                        <TextInput
                          type="text"
                          id="purchaseDebit"
                          name="purchaseDebit"
                          data-line-id={line?.id}
                          onChange={handleChange}
                          placeholder="Purchase (Debit)"
                          value={line?.purchaseDebit}
                        />
                      </Table.Cell>
                      <Table.Cell className="p-2">
                        <TextInput
                          type="text"
                          id="inputDebit"
                          name="inputDebit"
                          data-line-id={line?.id}
                          onChange={handleChange}
                          placeholder="Input (Debit)"
                          value={line?.inputDebit}
                        />
                      </Table.Cell>
                      <Table.Cell className="p-2">
                        <TextInput
                          type="text"
                          id="ap"
                          name="ap"
                          data-line-id={line?.id}
                          onChange={handleChange}
                          placeholder="A/P"
                          value={line?.ap}
                        />
                      </Table.Cell>
                      <Table.Cell className="p-2">
                        <TextInput
                          type="text"
                          id="withholdingTax"
                          name="withholdingTax"
                          data-line-id={line?.id}
                          onChange={handleChange}
                          placeholder="Withholding Tax (Credit)"
                          value={line?.withholdingTax}
                        />
                      </Table.Cell>
                      <Table.Cell className="p-2">
                        <TextInput
                          type="text"
                          id="atc"
                          name="atc"
                          data-line-id={line?.id}
                          onChange={handleChange}
                          placeholder="ATC"
                          value={line?.atc}
                        />
                      </Table.Cell>
                      <Table.Cell className="p-2">
                        <TextInput
                          type="text"
                          id="expenseAccountTitle"
                          name="expenseAccountTitle"
                          data-line-id={line?.id}
                          onChange={handleChange}
                          placeholder="Expense Account Title"
                          value={line?.expenseAccountTitle}
                        />
                      </Table.Cell>
                      <Table.Cell className="p-2">
                        <TextInput
                          type="text"
                          id="vatType"
                          name="vatType"
                          data-line-id={line?.id}
                          onChange={handleChange}
                          placeholder="Vat Type"
                          value={line?.vatType}
                        />
                      </Table.Cell>
                      <Table.Cell className="p-2">
                        <TextInput
                          type="text"
                          id="expenseDebit"
                          name="expenseDebit"
                          data-line-id={line?.id}
                          onChange={handleChange}
                          placeholder="Expense (Debit)"
                          value={line?.expenseDebit}
                        />
                      </Table.Cell>
                      <Table.Cell className="p-2">
                        <TextInput
                          type="text"
                          id="sundryAccount"
                          name="sundryAccount"
                          data-line-id={line?.id}
                          onChange={handleChange}
                          placeholder="Sundry Account Title"
                          value={line?.sundryAccount}
                        />
                      </Table.Cell>
                      <Table.Cell className="p-2">
                        <TextInput
                          type="text"
                          id="debit"
                          name="debit"
                          data-line-id={line?.id}
                          onChange={handleChange}
                          placeholder="Debit"
                          value={line?.debit}
                        />
                      </Table.Cell>
                      <Table.Cell className="p-2">
                        <TextInput
                          type="text"
                          id="credit"
                          name="credit"
                          data-line-id={line?.id}
                          onChange={handleChange}
                          placeholder="Credit"
                          value={line?.credit}
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

          <div className="p-4 flex justify-end gap-3">
            <Button color="red" onClick={handleCancel}>
              Cancel
            </Button>
            <Button color="success" type="submit">
              Save Disbursement
            </Button>
          </div>
        </div>

        {/* <div className="p-4 flex justify-end gap-3">
          <Button color="red" onClick={handleCancel}>
            Cancel
          </Button>
          <Button color="success" type="submit">
            Save Disbursement
          </Button>
        </div> */}
      </form>
    </>
  );
}