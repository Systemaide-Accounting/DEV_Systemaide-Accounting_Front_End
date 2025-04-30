import { useEffect, useState } from "react";
import { getGeneralJournalReport } from "../../../services/systemaideService";
import { HandleDateFormat } from "../../../Components/reusable-functions/DateFormatter";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";

export function PrintGeneralJournal() {
    const [reportData, setReportData] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Download as PDF
    const downloadPDF = () => {
        const input = document.querySelector('.print-content');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            
            // Calculate margins to match print area
            const marginLeft = 15; // mm
            const marginTop = 10; // mm
            const width = 180; // mm (A4 width - margins)
            
            pdf.addImage(imgData, 'PNG', marginLeft, marginTop, width, 0);
            pdf.save(`GeneralJournal_${startDate}-${endDate}.pdf`);
        });
    };

    // Download as Excel
    const downloadExcel = () => {
        // Create worksheet
        const worksheet = XLSX.utils.json_to_sheet([]);
        
        // Add title and date range
        worksheet['A1'] = { t: 's', v: 'General Journal', s: {
            font: { bold: true, sz: 14 },
            alignment: { horizontal: 'center' }
        } };
        worksheet['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 2 } }];
        
        // Format dates for display
        const formatDate = (date) => {
            const d = new Date(date);
            return d.toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
        };
        
        worksheet['A2'] = { t: 's', v: `${formatDate(startDate)} to ${formatDate(endDate)}`, s: {
            font: { sz: 11 },
            alignment: { horizontal: 'center' }
        } };
        worksheet['!merges'] = worksheet['!merges'].concat([{ s: { r: 1, c: 0 }, e: { r: 1, c: 2 } }]);
        
        worksheet['A3'] = { t: 's', v: `Generated on: ${formatDate(new Date())}`, s: {
            font: { sz: 10 },
            alignment: { horizontal: 'center' }
        } };
        worksheet['!merges'] = worksheet['!merges'].concat([{ s: { r: 2, c: 0 }, e: { r: 2, c: 2 } }]);
        
        // Add data starting from row 5
        const data = reportData.map(item => ({
            Date: formatDate(item.date),
            'Reference No.': item.jvNo,
            Particulars: item.particular
        }));
        
        // Add data to worksheet
        const wsData = XLSX.utils.json_to_sheet(data, { origin: 'A5' });
        Object.assign(worksheet, wsData);
        
        // Add formatting
        worksheet['!cols'] = [
            { wch: 15 }, // Date column width
            { wch: 20 }, // Reference No. column width
            { wch: 30 }  // Particulars column width
        ];
        
        // Add header styles
        const range = XLSX.utils.decode_range(worksheet['!ref']);
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const address = XLSX.utils.encode_cell({ r: 4, c: C });
            worksheet[address].s = {
                font: { bold: true },
                fill: { fgColor: { rgb: "3B82F6" } },
                alignment: {
                    horizontal: "center",
                    vertical: "middle",
                    wrapText: true
                },
                border: {
                    top: { style: "thin" },
                    bottom: { style: "thin" },
                    left: { style: "thin" },
                    right: { style: "thin" }
                }
            };
        }
        
        // Add cell borders and text wrapping
        for (let R = 5; R <= range.e.r; ++R) {
            for (let C = range.s.c; C <= range.e.c; ++C) {
                const address = XLSX.utils.encode_cell({ r: R, c: C });
                if (worksheet[address]) {
                    worksheet[address].s = {
                        border: {
                            top: { style: "thin" },
                            bottom: { style: "thin" },
                            left: { style: "thin" },
                            right: { style: "thin" }
                        },
                        alignment: {
                            horizontal: "left",
                            vertical: "top",
                            wrapText: true
                        }
                    };
                }
            }
        }
        
        // Create workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "General Journal");
        
        // Save file
        XLSX.writeFile(workbook, `GeneralJournal_${startDate}-${endDate}.xlsx`);
    };

    useEffect(() => {
        const stored = sessionStorage.getItem("generalReportRange");
        if (stored) {
            const { startDate, endDate } = JSON.parse(stored);
            setStartDate(startDate);
            setEndDate(endDate);
            sessionStorage.removeItem("generalReportRange"); // Optional: clean up after use
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
            const response = await getGeneralJournalReport(
              JSON.stringify({
                startDate: startDate,
                endDate: endDate,
              })
            );
            if (!response?.success) console.log(response?.message);
            console.log("reportData:", response?.data);
            return response?.data; 
        } catch {
            throw new Error("Error fetching disbursements");
        }
    };

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (!startDate || !endDate) {
      return <div className="p-8 text-gray-500">No report range provided.</div>;
    }

    return (
      <>
        <div className="max-w-4xl mx-auto px-6 mt-6 print:hidden">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center gap-3 px-4 py-3 rounded-lg transition-all duration-200"
            >
              Download
              <span className="text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                {/* <button
                  onClick={() => {
                    printReport();
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors duration-200"
                >
                  Print
                </button> */}
                <button
                  onClick={() => {
                    downloadPDF();
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors duration-200"
                >
                  PDF
                </button>
                <button
                  onClick={() => {
                    downloadExcel();
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors duration-200"
                >
                  Excel
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="print-content p-8 max-w mx-auto bg-white print:bg-white">
          <h1 className="text-2xl font-bold mb-2 text-center">General Journal</h1>
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
                    Reference No.
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
                      {item?.jvNo}
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
      </>
    );
}