import { useState } from "react";
import {
  Button,
  Label,
  TextInput,
  Select,
  Table,
  Badge,
} from "flowbite-react";
import { ChevronDown, ChevronUp, Plus, Trash } from "lucide-react";

export function CashDisbursement() {
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
        <h2 className="text-xl font-semibold">Cash Disbursement</h2>

        <div className="mb-4 rounded bg-white dark:bg-gray-800 p-4 shadow">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="date">Date</Label>
              <TextInput id="date" type="date" />
            </div>

            <div>
              <Label htmlFor="month">Month</Label>
              <TextInput
                id="month"
                value={new Date().toLocaleString("default", { month: "long" })}
                readOnly
              />
            </div>

            <div>
              <Label htmlFor="year">Year</Label>
              <TextInput
                id="year"
                value={new Date().getFullYear().toString()}
                readOnly
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Select id="location">
                <option value="Location1">Location 1</option>
                <option value="Location2">Location 2</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="cvNo">CV No.</Label>
              <TextInput id="cvNo" placeholder="CV No." />
            </div>

            <div>
              <Label htmlFor="checkNo">Check No.</Label>
              <TextInput id="checkNo" placeholder="Check No." />
            </div>

            <div>
              <Label htmlFor="payeeName">Payee's Name</Label>
              <Select id="payeeName">
                <option value="Agent1">Agent 1</option>
                <option value="Agent2">Agent 2</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="addressTin">Address/TIN</Label>
              <TextInput id="addressTin" placeholder="Address/TIN" readOnly />
            </div>

            <div>
              <Label htmlFor="cashAccount">Cash Account</Label>
              <Select id="cashAccount">
                <option value="Account1">Account 1</option>
                <option value="Account2">Account 2</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="particular">Particular</Label>
              <TextInput id="particular" placeholder="Particular" />
            </div>
          </div>
        </div>

        <div className="border rounded-md">
          <div className="bg-blue-50 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-blue-700">
                Transaction Lines
              </h3>
              <Badge color="info">{lines.length > 1 ? `${lines.length} items` : `${lines.length} item` }</Badge>
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
                        <TextInput type="text" placeholder="Invoice No." />
                      </Table.Cell>
                      <Table.Cell className="p-2">
                        <TextInput type="text" placeholder="Purchase Type" />
                      </Table.Cell>
                      <Table.Cell className="p-2">
                        <TextInput type="text" placeholder="VAT Computation" />
                      </Table.Cell>
                      <Table.Cell className="p-2">
                        <TextInput type="text" placeholder="Inventory Account" />
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
                        <TextInput type="text" placeholder="Expense Account Title" />
                      </Table.Cell>
                      <Table.Cell className="p-2">
                        <TextInput type="text" placeholder="Tax Source" />
                      </Table.Cell>
                      <Table.Cell>
                        <Button
                          color="failure"
                          onClick={() => deleteLine(line.id)}
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
          <Button color="red">Cancel</Button>
          <Button color="success">Save Disbursement</Button>
        </div>
      </div>
    </>
  );
}
