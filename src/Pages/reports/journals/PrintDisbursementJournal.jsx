import { Button, Table } from "flowbite-react";
import { formatInputDate } from "../../../Components/reusable-functions/formatInputDate";
import { useState, useEffect } from "react";

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

export function PrintDisbursementJournal () {
	const [reportData, setReportData] = useState([]);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	useEffect(() => {
		const stored = sessionStorage.getItem("disbursementReportRange");
		if (stored) {
			const { startDate, endDate } = JSON.parse(stored);
			setStartDate(startDate);
			setEndDate(endDate);
			sessionStorage.removeItem("disbursementReportRange"); // Optional: clean up after use
		} else {
			console.warn("No report range found in sessionStorage.");
		}
	}, []);

	useEffect(() => {
		fetchDisbursements()
			.then((data) => setReportData(data))
			.catch((err) => {
				console.error(err);
			});
	}, []);

	// API call to fetch disbursements
	const fetchDisbursements = async () => {
		// Replace with actual API call when ready
		try {
			return mockDisbursements; // Mock data
		} catch {
			throw new Error("Error fetching disbursements");
		}

		// try {
		// 	const response = await fetch("YOUR_API_ENDPOINT", {
		// 		method: "POST",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 			// Add authorization headers if needed
		// 		},
		// 		body: JSON.stringify({
		// 			startDate: start.toISOString().split("T")[0],
		// 			endDate: end.toISOString().split("T")[0],
		// 		}),
		// 	});

		// 	if (!response.ok) {
		// 		throw new Error("Failed to fetch disbursements");
		// 	}

		// 	const data = await response.json();
		// 	return data; // Expected format: [{ id, date, payee, description, checkNumber, amount }, ...]
		// } catch (error) {
		// 	console.error("Error fetching disbursements:", error);
		// 	setError("Failed to load disbursements. Please try again.");
		// 	return [];
		// }
	};

	const printReport = () => {
		document.title = `CashDisbursementJournal_${startDate}-${endDate}`;
    	window.print();
	};

	const start = new Date(startDate);
	const end = new Date(endDate);

	const totalAmount = reportData.reduce((sum, item) => sum + item.amount, 0);

	if (!startDate || !endDate) {
		return <div className="p-8 text-gray-500">No report range provided.</div>;
	}

	return (
    <div className="p-8 max-w mx-auto bg-white print:bg-white">
      <Button
        color="blue"
        onClick={printReport}
        className="w-full mb-2 print:hidden"
      >
        Print
      </Button>
      <h1 className="text-2xl font-bold mb-2 text-center">
        Cash Disbursement Journal
      </h1>
      <h2 className="text-base text-gray-600 mb-4 text-center">
        {formatInputDate(start)} to {formatInputDate(end)}
      </h2>
      <div className="text-sm text-gray-500 mb-6 text-center">
        Generated on: {formatInputDate(new Date())}
      </div>
      {reportData.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="bg-blue-500 text-white font-normal text-base p-2 text-left">
                Date
              </th>
              <th className="bg-blue-500 text-white font-normal text-base p-2 text-left">
                Payee
              </th>
              <th className="bg-blue-500 text-white font-normal text-base p-2 text-left">
                Description
              </th>
              <th className="bg-blue-500 text-white font-normal text-base p-2 text-left">
                Check No.
              </th>
              <th className="bg-blue-500 text-white font-normal text-base p-2 text-right">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reportData.map((item, index) => (
              <tr
                key={index + 1}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="font-thin p-2 border-b border-gray-200">
                  {formatInputDate(new Date(item.date))}
                </td>
                <td className="font-normal p-2 border-b border-gray-200">
                  {item.payee}
                </td>
                <td className="font-normal p-2 border-b border-gray-200">
                  {item.description}
                </td>
                <td className="font-normal p-2 border-b border-gray-200">
                  {item.checkNumber}
                </td>
                <td className="text-right font-normal p-2 border-b border-gray-200">
                  ${item.amount.toFixed(2)}
                </td>
              </tr>
            ))}
            <tr className="bg-gray-100">
              <td
                colSpan={4}
                className="text-base text-right p-2 font-semibold"
              >
                Total
              </td>
              <td className="text-right p-2 font-semibold">
                ${totalAmount.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};