import { useState } from "react";
import { formatInputDate } from "../../../Components/reusable-functions/formatInputDate";
import {
  CalendarIcon,
  FileText,
  FileDown,
  Eye,
  Printer,
  ChevronDown,
} from "lucide-react";
import {
  Button,
  Table,
  Modal,
  Dropdown,
  Label,
  Datepicker,
} from "flowbite-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { HandleDateFormat } from "../../../Components/reusable-functions/DateFormatter";
// Mock data for demonstration
const mockDisbursements = [
  {
    id: 1,
    date: "2025-04-01",
    payee: "Office Supplies Co.",
    description: "Monthly office supplies",
    checkNumber: "10045",
    amount: 245.67,
  },
  {
    id: 2,
    date: "2025-04-03",
    payee: "City Utilities",
    description: "Electricity bill",
    checkNumber: "10046",
    amount: 378.9,
  },
  {
    id: 3,
    date: "2025-04-05",
    payee: "ABC Insurance",
    description: "Quarterly insurance premium",
    checkNumber: "10047",
    amount: 1250.0,
  },
  {
    id: 4,
    date: "2025-04-10",
    payee: "Rent Properties LLC",
    description: "Office rent",
    checkNumber: "10048",
    amount: 2200.0,
  },
  {
    id: 5,
    date: "2025-04-15",
    payee: "Internet Provider",
    description: "Monthly internet service",
    checkNumber: "10049",
    amount: 89.99,
  },
  {
    id: 6,
    date: "2025-04-18",
    payee: "Marketing Agency",
    description: "Social media campaign",
    checkNumber: "10050",
    amount: 750.0,
  },
  {
    id: 7,
    date: "2025-04-22",
    payee: "Office Cleaning",
    description: "Bi-weekly cleaning service",
    checkNumber: "10051",
    amount: 175.0,
  },
  {
    id: 8,
    date: "2025-04-25",
    payee: "Employee Reimbursement",
    description: "Travel expenses",
    checkNumber: "10052",
    amount: 328.45,
  },
  {
    id: 9,
    date: "2025-04-28",
    payee: "Software Subscription",
    description: "Accounting software",
    checkNumber: "10053",
    amount: 49.99,
  },
  {
    id: 10,
    date: "2025-04-30",
    payee: "Maintenance Service",
    description: "HVAC repair",
    checkNumber: "10054",
    amount: 425.0,
  },
];

export function DisbursementJournal() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reportData, setReportData] = useState([]);
  const [isReportGenerated, setIsReportGenerated] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  // Generate report based on date range
  const generateReport = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates");
      return;
    }

    // Filter data based on date range
    const filteredData = mockDisbursements.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    });

    setReportData(filteredData);
    setIsReportGenerated(true);
  };

  // Calculate total amount
  const totalAmount = reportData.reduce((sum, item) => sum + item.amount, 0);

  // Preview report
  const previewReport = () => {
    if (reportData.length === 0) {
      alert("No data to preview");
      return;
    }
    // setPreviewOpen(true);

    printReport();
  };

  // Download report as CSV
  const downloadCSV = () => {
    if (reportData.length === 0) {
      alert("No data to download");
      return;
    }

    // Create CSV content
    const headers = ["Date", "Payee", "Description", "Check Number", "Amount"];
    const csvContent = [
      headers.join(","),
      ...reportData.map((item) =>
        [
          item.date,
          `"${item.payee}"`, // Quotes to handle commas in text
          `"${item.description}"`,
          item.checkNumber,
          item.amount.toFixed(2),
        ].join(",")
      ),
    ].join("\n");

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `cash_disbursement_journal_${formatInputDate(
        startDate
      )}_to_${formatInputDate(endDate)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download report as PDF
  const downloadPDF = () => {
    if (reportData.length === 0) {
      alert("No data to download");
      return;
    }

    // Create PDF document
    const doc = new jsPDF();

    // Add title
    const title = "Cash Disbursement Journal";
    const dateRange = `${formatInputDate(startDate)} to ${formatInputDate(
      endDate
    )}`;

    doc.setFontSize(18);
    doc.text(title, 14, 22);

    doc.setFontSize(12);
    doc.text(dateRange, 14, 30);

    // Add current date
    doc.setFontSize(10);
    doc.text(`Generated on: ${formatInputDate(new Date())}`, 14, 38);

    // Format data for the table
    const tableData = reportData.map((item) => [
      formatInputDate(new Date(item.date)),
      item.payee,
      item.description,
      item.checkNumber,
      `$${item.amount.toFixed(2)}`,
    ]);

    // Add total row
    tableData.push(["", "", "", "Total:", `$${totalAmount.toFixed(2)}`]);

    // Use the autoTable function directly
    autoTable(doc, {
      head: [["Date", "Payee", "Description", "Check #", "Amount"]],
      body: tableData,
      startY: 45,
      headStyles: { fillColor: [59, 130, 246] }, // Blue color
      footStyles: {
        fillColor: [240, 240, 240],
        textColor: [0, 0, 0],
        fontStyle: "bold",
      },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      // Highlight the total row
      didParseCell: (data) => {
        if (data.row.index === tableData.length - 1) {
          data.cell.styles.fontStyle = "bold";
        }
      },
    });

    // Add page numbers
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.width - 30,
        doc.internal.pageSize.height - 10
      );
    }

    // Save the PDF
    doc.save(`cash_disbursement_journal_${formatInputDate(startDate)}_to_${formatInputDate(endDate)}.pdf`);
  };

  // Print the report
  const printReport = () => {
    if (reportData.length === 0) {
      alert("No data to print");
      return;
    }

    // Create a printable version
    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
      <html>
        <head>
          <title>Cash Disbursement Journal</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 30px; }
            h1 { font-size: 24px; margin-bottom: 10px; }
            h2 { font-size: 16px; margin-bottom: 20px; color: #666; }
            .timestamp { font-size: 12px; color: #888; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            th { background-color: #3b82f6; color: white; text-align: left; padding: 8px; }
            td { padding: 8px; border-bottom: 1px solid #ddd; }
            tr:nth-child(even) { background-color: #f2f2f2; }
            .total-row { font-weight: bold; background-color: #eee; }
            .amount { text-align: right; }
            .footer { font-size: 12px; color: #888; text-align: right; }
            @media print {
              body { margin: 0.5cm; }
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <h1>Cash Disbursement Journal</h1>
          <h2>${formatInputDate(startDate)} to ${formatInputDate(endDate)}</h2>
          <div class="timestamp">Generated on: ${formatInputDate(
            new Date()
          )}</div>
          
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Payee</th>
                <th>Description</th>
                <th>Check #</th>
                <th class="amount">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${reportData
                .map(
                  (item) => `
                <tr>
                  <td>${formatInputDate(new Date(item.date))}</td>
                  <td>${item.payee}</td>
                  <td>${item.description}</td>
                  <td>${item.checkNumber}</td>
                  <td class="amount">$${item.amount.toFixed(2)}</td>
                </tr>
              `
                )
                .join("")}
              <tr class="total-row">
                <td colspan="4" style="text-align: right;">Total</td>
                <td class="amount">$${totalAmount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          
          <div class="footer">Page 1 of 1</div>
          
          <button onclick="window.print();window.close();" style="padding: 10px 20px; margin-top: 20px;">Print</button>
        </body>
      </html>
    `);

    printWindow.document.close();

    // Automatically trigger print after the content loads
    printWindow.onload = () => {
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    };
  };

  return (
    <div className="w-full border rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-blue-50 p-5 border-b">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-blue-900">
            Cash Disbursement Journal Report
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex flex-col gap-6">
          {/* Date Range Selection */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="start-date" value="Start Date" />
              </div>
              <div className="relative">
                <input
                  id="start-date"
                  type="date"
                  className="block w-full border border-gray-300 rounded-lg p-2.5 text-sm"
                  value={startDate ? startDate.toISOString().split("T")[0] : ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value) {
                      setStartDate(new Date(value));
                    } else {
                      setStartDate(null);
                    }
                  }}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <CalendarIcon className="h-4 w-4 text-gray-500" />
                </div>
              </div>
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="end-date" value="End Date" />
              </div>
              <div className="relative">
                <input
                  id="end-date"
                  type="date"
                  className="block w-full border border-gray-300 rounded-lg p-2.5 text-sm"
                  value={endDate ? endDate.toISOString().split("T")[0] : ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value) {
                      setEndDate(new Date(value));
                    } else {
                      setEndDate(null);
                    }
                  }}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <CalendarIcon className="h-4 w-4 text-gray-500" />
                </div>
              </div>
            </div>

            <Button
              color="blue"
              onClick={generateReport}
              className="mt-2 sm:mt-0"
            >
              Generate Report
            </Button>
          </div>

          {/* Report Display */}
          {isReportGenerated && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-lg font-medium text-blue-900">
                  Report Period:{" "}
                  {startDate && <HandleDateFormat date={startDate} />} to{" "}
                  {endDate && <HandleDateFormat date={endDate} />}
                </h3>

                <div className="flex gap-2">
                  <Button
                    color="light"
                    onClick={previewReport}
                    className="flex items-center gap-2"
                  >
                    Preview Report
                  </Button>

                  <Dropdown
                    label="Download"
                    dismissOnClick={true}
                    renderTrigger={() => (
                      <Button color="light" className="flex items-center gap-2">
                        Download
                        <ChevronDown className="h-4 w-4 ml-1" />
                      </Button>
                    )}
                  >
                    <Dropdown.Item onClick={downloadCSV}>
                      Download as CSV
                    </Dropdown.Item>
                    <Dropdown.Item onClick={downloadPDF}>
                      Download as PDF
                    </Dropdown.Item>
                    <Dropdown.Item onClick={printReport}>
                      <div className="flex items-center">
                        <Printer className="h-4 w-4 mr-2" />
                        Print Report
                      </div>
                    </Dropdown.Item>
                  </Dropdown>
                </div>
              </div>

              {reportData.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table striped>
                    <Table.Head>
                      <Table.HeadCell>Date</Table.HeadCell>
                      <Table.HeadCell>Payee</Table.HeadCell>
                      <Table.HeadCell>Description</Table.HeadCell>
                      <Table.HeadCell>Check #</Table.HeadCell>
                      <Table.HeadCell className="text-right">
                        Amount
                      </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                      {reportData.map((item) => (
                        <Table.Row key={item.id} className="bg-white">
                          <Table.Cell>
                            <HandleDateFormat date={item.date} />
                          </Table.Cell>
                          <Table.Cell>{item.payee}</Table.Cell>
                          <Table.Cell>{item.description}</Table.Cell>
                          <Table.Cell>{item.checkNumber}</Table.Cell>
                          <Table.Cell className="text-right">
                            ${item.amount.toFixed(2)}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                      <Table.Row className="bg-gray-50 font-bold">
                        <Table.Cell colSpan={4} className="text-right">
                          Total
                        </Table.Cell>
                        <Table.Cell className="text-right">
                          ${totalAmount.toFixed(2)}
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </div>
              ) : (
                <div className="text-center p-8 border rounded-md bg-gray-50">
                  <p className="text-gray-500">
                    No disbursements found for the selected date range.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      <Modal
        show={previewOpen}
        onClose={() => setPreviewOpen(false)}
        size="5xl"
        dismissible
      >
        <Modal.Header>Report Preview</Modal.Header>
        <Modal.Body>
          <div className="py-4 space-y-6">
            {/* Report Header */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Cash Disbursement Journal</h2>
              <p className="text-sm text-gray-500">
                {startDate && formatInputDate(startDate)} to{" "}
                {endDate && formatInputDate(endDate)}
              </p>
              <p className="text-xs text-gray-500">
                Generated on: {formatInputDate(new Date())}
              </p>
            </div>

            {/* Report Table */}
            <div className="overflow-x-auto">
              <Table striped>
                <Table.Head className="bg-blue-500 text-white">
                  <Table.HeadCell className="!text-white">Date</Table.HeadCell>
                  <Table.HeadCell className="!text-white">Payee</Table.HeadCell>
                  <Table.HeadCell className="!text-white">
                    Description
                  </Table.HeadCell>
                  <Table.HeadCell className="!text-white">
                    Check #
                  </Table.HeadCell>
                  <Table.HeadCell className="!text-white text-right">
                    Amount
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {reportData.map((item, index) => (
                    <Table.Row
                      key={item.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <Table.Cell>
                        {formatInputDate(new Date(item.date))}
                      </Table.Cell>
                      <Table.Cell>{item.payee}</Table.Cell>
                      <Table.Cell>{item.description}</Table.Cell>
                      <Table.Cell>{item.checkNumber}</Table.Cell>
                      <Table.Cell className="text-right">
                        ${item.amount.toFixed(2)}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                  <Table.Row className="bg-gray-100 font-bold">
                    <Table.Cell colSpan={4} className="text-right">
                      Total
                    </Table.Cell>
                    <Table.Cell className="text-right">
                      ${totalAmount.toFixed(2)}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>

            {/* Page Footer */}
            <div className="text-right text-xs text-gray-500">Page 1 of 1</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex gap-2 justify-end w-full">
            <Button color="light" onClick={() => setPreviewOpen(false)}>
              Close
            </Button>
            <Dropdown
              label="Download"
              dismissOnClick={true}
              renderTrigger={() => (
                <Button color="blue" className="flex items-center gap-2">
                  <FileDown className="h-4 w-4" />
                  Download
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              )}
            >
              <Dropdown.Item onClick={downloadCSV}>
                Download as CSV
              </Dropdown.Item>
              <Dropdown.Item onClick={downloadPDF}>
                Download as PDF
              </Dropdown.Item>
              <Dropdown.Item onClick={printReport}>
                <div className="flex items-center">
                  <Printer className="h-4 w-4 mr-2" />
                  Print Report
                </div>
              </Dropdown.Item>
            </Dropdown>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
