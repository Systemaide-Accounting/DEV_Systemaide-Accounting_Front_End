import { useEffect, useState } from "react";
import { getPurchasesJournalReport } from "../../../services/systemaideService";
import { Button } from "flowbite-react";
import { HandleDateFormat } from "../../../Components/reusable-functions/DateFormatter";

export function PrintPurchasesJournal() {

    const [reportData, setReportData] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        const stored = sessionStorage.getItem("purchasesReportRange");
        if (stored) {
            const { startDate, endDate } = JSON.parse(stored);
            setStartDate(startDate);
            setEndDate(endDate);
            sessionStorage.removeItem("purchasesReportRange"); // Optional: clean up after use
        } else {
            console.warn("No report range found in sessionStorage.");
        }
    }, []);

    useEffect(() => {
      fetchReportData()
        .then((data) => setReportData(data))
        .catch((err) => {
          console.error(err);
        });
    }, [startDate, endDate]);

    useEffect(() => {
      // Add print styles to document head
      const style = document.createElement("style");
      style.innerHTML = `
			@media print {
			@page { size: auto; margin: 10mm; }
			body { -webkit-print-color-adjust: exact !important; color-adjust: exact !important; }
			th { background-color: #3b82f6 !important; color: white !important; }
			tr:nth-child(even) { background-color: #f9fafb !important; }
			}
		`;
      document.head.appendChild(style);

      return () => document.head.removeChild(style);
    }, []);

    // API call to fetch disbursements
    const fetchReportData = async () => {
        // Replace with actual API call when ready
        try {
            const response = await getPurchasesJournalReport(
                JSON.stringify({
                    startDate: startDate,
                    endDate: endDate,
                })
            );
            if (!response?.success) console.log(response?.message);
            console.log("reportData:", response?.data);
            return response?.data; 
            // return disbursementJournalReportDataJSON; // Mock data
        } catch {
            throw new Error("Error fetching disbursements");
        }
    };

    const printReport = () => {
        document.title = `SalesJournal_${startDate}-${endDate}`;
        window.print();
    };

    const start = new Date(startDate);
	const end = new Date(endDate);

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
        <h1 className="text-2xl font-bold mb-2 text-center">Purchases Journal</h1>
        <h2 className="text-base text-gray-600 mb-4 text-center">
          {/* {formatInputDate(start)} to {formatInputDate(end)} */}
          <HandleDateFormat date={start} /> to <HandleDateFormat date={end} />
        </h2>
        <div className="text-sm text-gray-500 mb-6 text-center">
          Generated on: {<HandleDateFormat date={new Date()} />}
        </div>
        {reportData?.length === 0 ? (
          <div>Loading...</div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-blue-500 text-white font-normal text-base p-2 text-left">
                  Date
                </th>
                <th className="bg-blue-500 text-white font-normal text-base p-2 text-left">
                  Invoice No.
                </th>
                <th className="bg-blue-500 text-white font-normal text-base p-2 text-left">
                  Supplier's Name
                </th>
                <th className="bg-blue-500 text-white font-normal text-base p-2 text-left">
                  Particulars
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reportData?.map((item, index) => (
                <tr
                  key={index + 1}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="font-thin p-2 border-b border-gray-200">
                    <HandleDateFormat date={item?.date} />
                  </td>
                  <td className="font-normal p-2 border-b border-gray-200">
                    {item?.invoiceNo}
                  </td>
                  <td className="font-normal p-2 border-b border-gray-200">
                    {item?.supplierName?.registeredName}
                  </td>
                  <td className="font-normal p-2 border-b border-gray-200">
                    {item?.particular}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
};