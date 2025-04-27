import { Button, Label, Table } from "flowbite-react";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { HandleDateFormat } from "../../../Components/reusable-functions/DateFormatter";
import sweetalert2 from "sweetalert2";
import { getPurchasesJournalReport } from "../../../services/systemaideService";

export function PurchasesJournal() {

  const [reportData, setReportData] = useState([]);
  const [isReportGenerated, setIsReportGenerated] = useState(false);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
  });

  const handleDateChange = (e) => {
    const { name, value } = e.target;

    if (value) {
      // Validate the date format (YYYY-MM-DD)
      if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      } else {
        console.error("Invalid start date selected:", value);
        setFormData((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Generate report based on date range
  const generateReport = async (e) => {
    e.preventDefault();

    if (!formData?.startDate || !formData?.endDate) {
      // alert("Please select both start and end dates");
      sweetalert2.fire({
        icon: "error",
        title: "Error!",
        text: "Please select both start and end dates",
      });
      return;
    }

    try {
      const response = await getPurchasesJournalReport(
        JSON.stringify(formData)
      );
      if (!response?.success) console.log(response?.message);
      // setReportData(disbursementJournalReportDataJSON);
      setReportData(response?.data);
      setIsReportGenerated(true);
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  // Handle preview report button click
  const handlePreviewReport = () => {
    if (!formData?.startDate || !formData?.endDate) {
      // alert("Please select both start and end dates");
      sweetalert2.fire({
        icon: "error",
        title: "Error!",
        text: "Please select both start and end dates",
      });
      return;
    }
  
    // Save the date range to sessionStorage
    sessionStorage.setItem(
      "purchasesReportRange",
      JSON.stringify(formData)
    );
  
    // Open the print view without passing dates in the URL
    const baseUrl = window.location.origin;
    const url = `${baseUrl}#/reports/print-purchases-journal`;
  
    window.open(
      url,
      "_blank",
      "width=800,height=600,scrollbars=yes,resizable=yes"
    );
  };

  return (
    <div className="w-full border-2 rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-blue-50 p-3 border-b">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-blue-900">
            Purchases Journal Report
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex flex-col gap-6">
          {/* Date Range Selection */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="startDate" value="Start Date" />
              </div>
              <div className="relative">
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  className="block w-full border border-gray-300 rounded-lg p-2.5 text-sm"
                  value={formData?.startDate || ""}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={handleDateChange}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <CalendarIcon className="h-4 w-4 text-gray-500" />
                </div>
              </div>
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="endDate" value="End Date" />
              </div>
              <div className="relative">
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  className="block w-full border border-gray-300 rounded-lg p-2.5 text-sm"
                  value={formData?.endDate || ""}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={handleDateChange}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <CalendarIcon className="h-4 w-4 text-gray-500" />
                </div>
              </div>
            </div>

            <form onSubmit={generateReport}>
              <Button color="blue" type="submit" className="mt-2 sm:mt-0">
                Generate Report
              </Button>
            </form>
          </div>

          {/* Report Display */}
          {isReportGenerated && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-lg font-medium text-blue-900">
                  Report Period:{" "}
                  {formData?.startDate && (
                    <HandleDateFormat date={formData?.startDate} />
                  )}{" "}
                  to{" "}
                  {formData?.endDate && (
                    <HandleDateFormat date={formData?.endDate} />
                  )}
                </h3>

                <div className="flex gap-2">
                  <Button
                    color="light"
                    className="flex items-center gap-2 border border-blue-500 text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onClick={handlePreviewReport}
                  >
                    Preview Report
                  </Button>
                </div>
              </div>

              {reportData?.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table striped>
                    <Table.Head>
                      <Table.HeadCell>Date</Table.HeadCell>
                      <Table.HeadCell>Invoice No.</Table.HeadCell>
                      <Table.HeadCell>Supplier's Name</Table.HeadCell>
                      <Table.HeadCell>Particulars</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                      {reportData?.map((item) => (
                        <Table.Row key={item?.id} className="bg-white">
                          <Table.Cell>
                            <HandleDateFormat date={item?.date} />
                          </Table.Cell>
                          <Table.Cell>{item?.invoiceNo}</Table.Cell>
                          <Table.Cell>{item?.supplierName?.registeredName}</Table.Cell>
                          <Table.Cell>{item?.particular}</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </div>
              ) : (
                <div className="text-center p-8 border rounded-md bg-gray-50">
                  <p className="text-gray-500">
                    No purchases found for the selected date range.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
