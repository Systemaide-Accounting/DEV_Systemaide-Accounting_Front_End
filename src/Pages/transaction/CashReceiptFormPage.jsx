import { Badge, Button, Label, Select, Table, TextInput } from "flowbite-react";
import { ChevronDown, ChevronUp, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCashReceiptTransaction, getAllAccounts, getAllLocations, getCashReceiptTransactionById, updateCashReceiptTransaction } from "../../services/systemaideService";
import { formatInputDate } from "../../Components/reusable-functions/formatInputDate";
import { safeJsonParse } from "../../Components/reusable-functions/safeJsonParse";
import swal2 from "sweetalert2";

export function CashReceiptFormPage() {
  const navigate = useNavigate();
  const params = useParams();
   const [locationsSelectOptions, setLocationsSelectOptions] = useState([]);
  const [accountsSelectOptions, setAccountsSelectOptions] = useState([]);
  const [isFirstOptionDisabled, setIsFirstOptionDisabled] = useState(false);
  const [transactionData, setTransactionData] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    month: new Date().toLocaleString("default", { month: "long" }),
    year: new Date().getFullYear(),
    location: "",
    orNo: "",
    payorName: "",
    address: "",
    tin: "",
    cashAccount: "",
    cashAmount: "",
    particular: "",
    transactionLines: "",
  });
  const [lines, setLines] = useState([
    {
      id: Date.now(),
      invoiceNo: "",
      salesType: "",
      salesCredit: "",
      outputCredit: "",
      arCredit: "",
      withholdingTax: "",
      atc: "",
      sundryAccountTitle: "",
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

    // Handle changes for the main form data
    if (!e.target.dataset.lineId) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      // Handle changes for the transaction lines
      const lineId = parseInt(e.target.dataset.lineId);
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
      salesType: "",
      salesCredit: "",
      outputCredit: "",
      arCredit: "",
      withholdingTax: "",
      atc: "",
      sundryAccountTitle: "",
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

    // Create a new object with the updated transactionLines
    const updatedFormData = {
      ...formData,
      transactionLines: JSON.stringify(formData?.transactionLines),
    };

    try {
      let response = null;
      if (transactionData) {
        response = await updateCashReceiptTransaction(
          transactionData?._id,
          JSON.stringify(updatedFormData)
        );
      } else {
        response = await createCashReceiptTransaction(
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
      const response = await getCashReceiptTransactionById(id);
      if(response?.success) {
        setTransactionData(response?.data);
      } else {
        console.log(response?.message);
      }
    } catch (error) {
      console.error("Error fetching Transaction:", error);
    } 
  };

  useEffect(() => {
    fetchAllLocations();
    fetchAllAccounts();

    if(params?.id) {
      fetchTransactionById(params?.id);
    } else {
      setTransactionData(null);
    }
  }, [params?.id]);

  useEffect(() => {
      if (transactionData) {
        setFormData({
          date: formatInputDate(transactionData?.date),
          month: transactionData?.month,
          year: transactionData?.year,
          location: transactionData?.location?._id,
          orNo: transactionData?.orNo,
          payorName: transactionData?.payorName,
          address: transactionData?.address,
          tin: transactionData?.tin,
          cashAccount: transactionData?.cashAccount?._id,
          cashAmount: transactionData?.cashAmount,
          particular: transactionData?.particular,
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
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <h2 className="text-xl font-semibold">Cash Receipt Journal</h2>

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
                  value={formData?.date}
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
                  value={formData?.month}
                  readOnly={transactionData?.month ? false : true}
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
                  value={formData?.year}
                  readOnly={transactionData?.year ? false : true}
                  required
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Select
                  id="location"
                  name="location"
                  onFocus={handleSelectFocus}
                  onChange={handleChange}
                  value={formData?.location}
                  defaultValue={formData?.location}
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
                <Label htmlFor="orNo">OR No.</Label>
                <TextInput
                  id="orNo"
                  type="text"
                  name="orNo"
                  value={formData?.orNo}
                  onChange={handleChange}
                  placeholder="OR No."
                  required
                />
              </div>

              <div>
                <Label htmlFor="payorName">Payor&apos;s Name</Label>
                <TextInput
                  id="payorName"
                  type="text"
                  name="payorName"
                  value={formData?.payorName}
                  onChange={handleChange}
                  placeholder="Payor's Name"
                  required
                />
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
                  required
                />
              </div>

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
                <Label htmlFor="cashAmount">Cash (Debit)</Label>
                <TextInput
                  id="cashAmount"
                  type="text"
                  name="cashAmount"
                  onChange={handleChange}
                  value={formData?.cashAmount}
                  placeholder="Cash (Debit)"
                  required
                />
              </div>

              <div>
                <Label htmlFor="particular">Particular</Label>
                <TextInput
                  id="particular"
                  type="text"
                  name="particular"
                  onChange={handleChange}
                  value={formData?.particular}
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
                      Sales Type
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-blue-300 whitespace-nowrap overflow-hidden truncate">
                      Sales (Credit)
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-blue-300 whitespace-nowrap overflow-hidden truncate">
                      Output (Credit)
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-blue-300 whitespace-nowrap overflow-hidden truncate">
                      A/R (Credit)
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-blue-300 whitespace-nowrap overflow-hidden truncate">
                      Withholding Tax
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-blue-300 whitespace-nowrap overflow-hidden truncate">
                      ATC
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
                      <Table.Row key={line.id}>
                        <Table.Cell className="p-2">
                          <TextInput
                            type="text"
                            id="invoiceNo"
                            name="invoiceNo"
                            data-line-id={line.id}
                            onChange={handleChange}
                            placeholder="Invoice No."
                            value={line.invoiceNo}
                          />
                        </Table.Cell>
                        <Table.Cell className="p-2">
                          <TextInput
                            type="text"
                            id="salesType"
                            name="salesType"
                            data-line-id={line.id}
                            onChange={handleChange}
                            placeholder="Sales Type"
                            value={line.salesType}
                          />
                        </Table.Cell>
                        <Table.Cell className="p-2">
                          <TextInput
                            type="text"
                            id="salesCredit"
                            name="salesCredit"
                            data-line-id={line.id}
                            onChange={handleChange}
                            placeholder="Sales (Credit)"
                            value={line.salesCredit}
                          />
                        </Table.Cell>
                        <Table.Cell className="p-2">
                          <TextInput
                            type="text"
                            id="outputCredit"
                            name="outputCredit"
                            data-line-id={line.id}
                            onChange={handleChange}
                            placeholder="Output (Credit)"
                            value={line.outputCredit}
                          />
                        </Table.Cell>
                        <Table.Cell className="p-2">
                          <TextInput
                            type="text"
                            id="arCredit"
                            name="arCredit"
                            data-line-id={line.id}
                            onChange={handleChange}
                            placeholder="A/R (Credit)"
                            value={line.arCredit}
                          />
                        </Table.Cell>
                        <Table.Cell className="p-2">
                          <TextInput
                            type="text"
                            id="withholdingTax"
                            name="withholdingTax"
                            data-line-id={line.id}
                            onChange={handleChange}
                            placeholder="Withholding Tax"
                            value={line.withholdingTax}
                          />
                        </Table.Cell>
                        <Table.Cell className="p-2">
                          <TextInput
                            type="text"
                            id="atc"
                            name="atc"
                            data-line-id={line.id}
                            onChange={handleChange}
                            placeholder="ATC"
                            value={line.atc}
                          />
                        </Table.Cell>
                        <Table.Cell className="p-2">
                          <TextInput
                            type="text"
                            id="sundryAccountTitle"
                            name="sundryAccountTitle"
                            data-line-id={line.id}
                            onChange={handleChange}
                            placeholder="Sundry Account Title"
                            value={line.sundryAccountTitle}
                          />
                        </Table.Cell>
                        <Table.Cell className="p-2">
                          <TextInput
                            type="text"
                            id="debit"
                            name="debit"
                            data-line-id={line.id}
                            onChange={handleChange}
                            placeholder="Debit"
                            value={line.debit}
                          />
                        </Table.Cell>
                        <Table.Cell className="p-2">
                          <TextInput
                            type="text"
                            id="credit"
                            name="credit"
                            data-line-id={line.id}
                            onChange={handleChange}
                            placeholder="Credit"
                            value={line.credit}
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
              Save Receipt
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
