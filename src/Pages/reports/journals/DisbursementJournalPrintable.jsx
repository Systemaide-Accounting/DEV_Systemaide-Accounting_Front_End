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

const PrintDisbursementJournal = () => {
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

	const start = new Date(startDate);
	const end = new Date(endDate);

	const totalAmount = reportData.reduce((sum, item) => sum + item.amount, 0);

	if (!startDate || !endDate) {
		return <div className="p-8 text-gray-500">No report range provided.</div>;
	}

	return (
		<div className="p-8 max-w-4xl mx-auto bg-white print:bg-white">
			<h1 className="text-2xl font-bold mb-2">Cash Disbursement Journal</h1>
			<h2 className="text-base text-gray-600 mb-4">
				{formatInputDate(start)} to {formatInputDate(end)}
			</h2>
			<div className="text-sm text-gray-500 mb-6">
				Generated on: {formatInputDate(new Date())}
			</div>
			{reportData.length === 0 ? (
				<div>Loading...</div>
			) : (
				<table className="w-full border-collapse mb-8">
					<thead>
						<tr className="bg-blue-500 text-white">
							<th className="text-left p-2 border-b">Date</th>
							<th className="text-left p-2 border-b">Payee</th>
							<th className="text-left p-2 border-b">Description</th>
							<th className="text-left p-2 border-b">Check #</th>
							<th className="text-right p-2 border-b">Amount</th>
						</tr>
					</thead>
					<tbody>
						{reportData.map((item, index) => (
							<tr
								key={item.id}
								className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
							>
								<td className="p-2 border-b">
									{formatInputDate(new Date(item.date))}
								</td>
								<td className="p-2 border-b">{item.payee}</td>
								<td className="p-2 border-b">{item.description}</td>
								<td className="p-2 border-b">{item.checkNumber}</td>
								<td className="p-2 border-b text-right">
									${item.amount.toFixed(2)}
								</td>
							</tr>
						))}
						<tr className="bg-gray-100 font-bold">
							<td colSpan={4} className="p-2 border-b text-right">
								Total
							</td>
							<td className="p-2 border-b text-right">
								${totalAmount.toFixed(2)}
							</td>
						</tr>
					</tbody>
				</table>
			)}
		</div>
	);
};

export default PrintDisbursementJournal;
