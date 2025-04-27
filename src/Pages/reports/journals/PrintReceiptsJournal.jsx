import { Button } from "flowbite-react";
import { HandleDateFormat } from "../../../Components/reusable-functions/DateFormatter";
import { useEffect, useState } from "react";
import { getReceiptsJournalReport } from "../../../services/systemaideService";

export function PrintReceiptsJournal() {

    const [reportData, setReportData] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        const stored = sessionStorage.getItem("receiptsReportRange");
        if (stored) {
            const { startDate, endDate } = JSON.parse(stored);
            setStartDate(startDate);
            setEndDate(endDate);
            sessionStorage.removeItem("receiptsReportRange"); // Optional: clean up after use
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

    // API call to fetch disbursements
    const fetchReportData = async () => {
        // Replace with actual API call when ready
        try {
            const response = await getReceiptsJournalReport(
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
      document.title = `CashReceiptsJournal_${startDate}-${endDate}`;
      window.print();
    };

    const start = new Date(startDate);
    const end = new Date(endDate);

    const totalAmount = reportData?.reduce((sum, item) => sum + parseFloat(item?.cashAmount || 0), 0);

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
          Cash Receipts Journal
        </h1>
        <h2 className="text-base text-gray-600 mb-4 text-center">
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
                  Payor's Name
                </th>
                <th className="bg-blue-500 text-white font-normal text-base p-2 text-left">
                  Particulars
                </th>
                <th className="bg-blue-500 text-white font-normal text-base p-2 text-left">
                  Account Title
                </th>
                <th className="bg-blue-500 text-white font-normal text-base p-2 text-right">
                  Amount
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
                    {item?.payorName}
                  </td>
                  <td className="font-normal p-2 border-b border-gray-200">
                    {item?.particular}
                  </td>
                  <td className="font-normal p-2 border-b border-gray-200">
                    {item?.cashAccount?.accountName}
                  </td>
                  <td className="text-right font-normal p-2 border-b border-gray-200">
                    {parseFloat(item?.cashAmount || 0)?.toFixed(2)}
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
                  {totalAmount?.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    );
};