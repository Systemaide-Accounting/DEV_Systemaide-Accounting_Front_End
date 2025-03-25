import { Button, Card, Select, Table, TextInput } from "flowbite-react";
// import { CardContent } from "flowbite-react";
import { ChevronDown, ChevronUp, Plus, Trash } from "lucide-react";
import { useState } from "react";

export function CashDisbursement() {

  const [lines, setLines] = useState([{ id: 1, invoiceNo: '', purchaseType: '', vatComputation: '', inventoryAccount: '', grossAmount: '', withholdingTax: '', ap: '', expenseAccountTitle: '', taxSource: '' }]);
  const [isLinesCollapsed, setIsLinesCollapsed] = useState(false);

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

  return (
    <>
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <h1 className="text-2xl font-bold mb-2">Cash Disbursement</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <TextInput type="date" placeholder="Date" />
          <TextInput
            placeholder="Month"
            value={new Date().toLocaleString("default", { month: "long" })}
            readOnly
          />
          <TextInput
            placeholder="Year"
            value={new Date().getFullYear()}
            readOnly
          />
          <Select>
            {/* <SelectTrigger>Location <ChevronDown /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Location1">Location 1</SelectItem>
                                <SelectItem value="Location2">Location 2</SelectItem>
                            </SelectContent> */}
          </Select>
          <TextInput placeholder="CV No." />
          <TextInput placeholder="Check No." />
          <Select>
            {/* <SelectTrigger>Payee's Name <ChevronDown /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Agent1">Agent 1</SelectItem>
                                <SelectItem value="Agent2">Agent 2</SelectItem>
                            </SelectContent> */}
          </Select>
          <TextInput placeholder="Address/TIN" readOnly />
          <Select>
            {/* <SelectTrigger>Cash Account <ChevronDown /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Account1">Account 1</SelectItem>
                                <SelectItem value="Account2">Account 2</SelectItem>
                            </SelectContent> */}
          </Select>
          <TextInput placeholder="Particular" />
        </div>

        <div className="overflow-x-auto" style={{ minHeight: "200px" }}>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-blue-500">Lines</h3>
            <Button className="text-[#6096B4] bg-blue-300 hover:bg-blue-500" onClick={toggleLinesCollapse}>
                {isLinesCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
            </Button>
          </div>
          {!isLinesCollapsed && (
            <Table hoverable striped>
              <Table.Head>
                <Table.HeadCell className="bg-blue-400 whitespace-nowrap overflow-hidden truncate">
                  Invoice No.
                </Table.HeadCell>
                <Table.HeadCell className="bg-blue-400 whitespace-nowrap overflow-hidden truncate">
                  Purchase Type
                </Table.HeadCell>
                <Table.HeadCell className="bg-blue-400 whitespace-nowrap overflow-hidden truncate">
                  VAT Computation
                </Table.HeadCell>
                <Table.HeadCell className="bg-blue-400 whitespace-nowrap overflow-hidden truncate">
                  Inventory Account
                </Table.HeadCell>
                <Table.HeadCell className="bg-blue-400 whitespace-nowrap overflow-hidden truncate">
                  Gross Amount
                </Table.HeadCell>
                <Table.HeadCell className="bg-blue-400 whitespace-nowrap overflow-hidden truncate">
                  Withholding Tax
                </Table.HeadCell>
                <Table.HeadCell className="bg-blue-400 whitespace-nowrap overflow-hidden truncate">
                  A/P
                </Table.HeadCell>
                <Table.HeadCell className="bg-blue-400 whitespace-nowrap overflow-hidden truncate">
                  Expense Account Title
                </Table.HeadCell>
                <Table.HeadCell className="bg-blue-400 whitespace-nowrap overflow-hidden truncate">
                  Tax Source
                </Table.HeadCell>
                <Table.HeadCell className="bg-blue-400 whitespace-nowrap overflow-hidden truncate">
                  Action
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {lines.map((line) => (
                  <Table.Row
                    key={line?.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="p-2">
                      <TextInput type="text" placeholder="Invoice No." />
                    </Table.Cell>
                    <Table.Cell className="p-2">
                      <TextInput type="text" placeholder="Purchase Type" />
                    </Table.Cell>
                    <Table.Cell className="p-2">
                      <TextInput type="text" placeholder="VAT Computation" />
                    </Table.Cell>
                    <Table.Cell className="p-2">
                      <TextInput
                        type="text"
                        placeholder="Inventory Account"
                      />
                    </Table.Cell>
                    <Table.Cell className="p-2">
                      <TextInput type="text" placeholder="Gross Amount" />
                    </Table.Cell>
                    <Table.Cell className="p-2">
                      <TextInput type="text" placeholder="Withholding Tax" />
                    </Table.Cell>
                    <Table.Cell className="p-2">
                      <TextInput type="text" placeholder="A/P" />
                    </Table.Cell>
                    <Table.Cell className="p-2">
                      <TextInput
                        type="text"
                        placeholder="Expense Account Title"
                      />
                    </Table.Cell>
                    <Table.Cell className="p-2">
                      <TextInput type="text" placeholder="Tax Source" />
                    </Table.Cell>
                    <Table.Cell className="p-2 flex items-center justify-center">
                      <Button
                        // size="xs"
                        color="failure"
                        onClick={() => deleteLine(line?.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
          <Button
            className="mt-2 text-[#6096B4] bg-[#BDCDD6] hover:bg-[#93BFCF]"
            onClick={addLine}
          >
            <Plus size={16} /> Add Line
          </Button>
        </div>
      </div>
    </>
  );
}
