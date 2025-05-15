import { useState } from "react";
import "../../../calendar-input.css";
import { CalendarIcon } from "lucide-react";
import { Button, Table, Label } from "flowbite-react";
import { HandleDateFormat } from "../../../Components/reusable-functions/DateFormatter";
import sweetalert2 from "sweetalert2";
import disbursementJournalReportDataJSON from "../../../sample-data/disbursementJournalReportData.json";
import { getDisbursementJournalReport } from "../../../services/systemaideService";

export function DisbursementJournal() {

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
      const response = await getDisbursementJournalReport(
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
			"disbursementReportRange",
			JSON.stringify(formData)
		);
	
		// Open the print view without passing dates in the URL
		const baseUrl = window.location.origin;
		const url = `${baseUrl}#/reports/print-disbursement-journal`;
	
		window.open(
			url,
			"_blank",
			"width=800,height=600,scrollbars=yes,resizable=yes"
		);
	};
	
	// Calculate total amount
	const totalAmount = reportData?.reduce((sum, item) => sum + item?.amount, 0);

	return (
    <>
      {/* Title Card */}
      <div className="w-full p-4 border rounded-lg bg-white mb-4 shadow">
        <h2 className="text-xl font-bold text-gray-900">
          Cash Disbursement Journal Report
        </h2>
      </div>

      {/* Content Card */}
      <div className="w-full border rounded-lg bg-white p-4">
        <div className="flex flex-col gap-6">
          {/* Date Range Selection */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="startDate" value="Start Date" />
              </div>
              <div className="relative calendar-input-container">
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
              <div className="relative calendar-input-container">
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
                      <Table.HeadCell>Agent</Table.HeadCell>
                      <Table.HeadCell>Particulars</Table.HeadCell>
                      <Table.HeadCell>Account Title</Table.HeadCell>
                      {/* <Table.HeadCell className="text-right">
                        Amount
                      </Table.HeadCell> */}
                    </Table.Head>
                    <Table.Body className="divide-y">
                      {reportData?.map((item) => (
                        <Table.Row key={item?.id} className="bg-white">
                          <Table.Cell>
                            <HandleDateFormat date={item?.date} />
                          </Table.Cell>
                          <Table.Cell>
                            {item?.payeeName?.registeredName}
                          </Table.Cell>
                          <Table.Cell>{item?.particular}</Table.Cell>
                          <Table.Cell>
                            {item?.cashAccount?.accountName}
                          </Table.Cell>
                          {/* <Table.Cell className="text-right">
                            ${item.amount.toFixed(2)}
                          </Table.Cell> */}
                        </Table.Row>
                      ))}
                      {/* <Table.Row className="bg-gray-50 font-bold">
                        <Table.Cell colSpan={4} className="text-right">
                          Total
                        </Table.Cell>
                        <Table.Cell className="text-right">
                          ${totalAmount.toFixed(2)}
                        </Table.Cell>
                      </Table.Row> */}
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
    </>
  );
}
