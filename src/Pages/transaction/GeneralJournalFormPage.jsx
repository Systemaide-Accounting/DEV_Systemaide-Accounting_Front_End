import { Badge, Button, Label, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createGeneralJournalTransaction, getGeneralJournalTransactionById, updateGeneralJournalTransaction } from "../../services/systemaideService";
import { ChevronDown, ChevronUp, Plus, Trash } from "lucide-react";
import swal2 from "sweetalert2";
import { safeJsonParse } from "../../Components/reusable-functions/safeJsonParse";
import { formatInputDate } from "../../Components/reusable-functions/formatInputDate";

export function GeneralJournalFormPage() {

    const navigate = useNavigate();
    const params = useParams();
    const [transactionData, setTransactionData] = useState(null);
    const [formData, setFormData] = useState({
      date: "",
      month: new Date().toLocaleString("default", { month: "long" }),
      year: new Date().getFullYear(),
      jvNo: "",
      particular: "",
      transactionLines: "",
    });
    const [lines, setLines] = useState([
      {
        id: Date.now(),
        accountCode: "",
        accountTitle: "",
        debit: "",
        credit: "",
        location: "",
      },
    ]);
    const [isLinesCollapsed, setIsLinesCollapsed] = useState(false);

    const handleChange = async (e) => {
      const { name, value, type, dataset } = e.target;

      // Handle changes for the main form data
      if (!dataset.lineId) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
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

    const addLine = () => {
      const newLine = {
        id: Date.now(),
        accountCode: "",
        accountTitle: "",
        debit: "",
        credit: "",
        location: "",
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
            response = await updateGeneralJournalTransaction(
              transactionData?._id,
              JSON.stringify(updatedFormData)
            );
            } else {
            response = await createGeneralJournalTransaction(
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
            const response = await getGeneralJournalTransactionById(id);
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
      if (params?.id) {
        fetchTransactionById(params?.id);
      } else {
        setTransactionData(null);
      }
    }, []);
    
    useEffect(() => {
        if (transactionData) {
            setFormData({
                date: formatInputDate(transactionData?.date),
                month: transactionData?.month,
                year: transactionData?.year,
                jvNo: transactionData?.jvNo,
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
      {/* Header */}
      <h2 className="text-xl font-semibold">General Journal</h2>
      <div className="border-2 border-gray-200 rounded-lg dark:border-gray-700">
        {/* <h2 className="text-xl font-semibold">General Journal</h2> */}

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
                <Label htmlFor="jvNo">JV No.</Label>
                <TextInput
                  id="jvNo"
                  type="text"
                  name="jvNo"
                  value={formData?.jvNo}
                  onChange={handleChange}
                  placeholder="JV No."
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
                      Account Code
                    </Table.HeadCell>
                    <Table.HeadCell className=" bg-blue-300 whitespace-nowrap overflow-hidden truncate">
                      Account Title
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-blue-300 whitespace-nowrap overflow-hidden truncate">
                      Debit
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-blue-300 whitespace-nowrap overflow-hidden truncate">
                      Credit
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-blue-300 whitespace-nowrap overflow-hidden truncate">
                      Location
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
                            id="accountCode"
                            name="accountCode"
                            data-line-id={line.id}
                            onChange={handleChange}
                            placeholder="Account Code"
                            value={line.accountCode}
                          />
                        </Table.Cell>
                        <Table.Cell className="p-2">
                          <TextInput
                            type="text"
                            id="accountTitle"
                            name="accountTitle"
                            data-line-id={line.id}
                            onChange={handleChange}
                            placeholder="Account Title"
                            value={line.accountTitle}
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
                        <Table.Cell className="p-2">
                          <TextInput
                            type="text"
                            id="location"
                            name="location"
                            data-line-id={line.id}
                            onChange={handleChange}
                            placeholder="Location"
                            value={line.location}
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

          <div className="p-4 flex justify-end gap-3">
            <Button color="red" onClick={handleCancel}>
              Cancel
            </Button>
            <Button color="success" type="submit">
              Save General
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}