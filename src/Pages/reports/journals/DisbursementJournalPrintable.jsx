import React from "react";
import { formatInputDate } from "../../../Components/reusable-functions/formatInputDate";

const DisbursementJournalPrintable = ({
  startDate,
  endDate,
  reportData,
  totalAmount,
}) => {
  // This component will be the template for what gets printed
  return (
    <div className="p-8 max-w-4xl mx-auto bg-white">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Cash Disbursement Journal</h1>
        <h2 className="text-base text-gray-600 mb-4">
          {formatInputDate(startDate)} to {formatInputDate(endDate)}
        </h2>
        <div className="text-sm text-gray-500 mb-6">
          Generated on: {formatInputDate(new Date())}
        </div>
      </div>

      <div className="overflow-x-auto">
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
      </div>

      <div className="text-right text-xs text-gray-500 mb-6">Page 1 of 1</div>
    </div>
  );
};

// Helper function to open the printable report in a new window
export const openPrintableReport = (
  startDate,
  endDate,
  reportData,
  totalAmount
) => {
  const printWindow = window.open("", "_blank");

  // Add necessary styles for printing
  const printStyles = `
    @media print {
      body { margin: 0.5cm; }
      button { display: none; }
    }
    body { font-family: Arial, sans-serif; }
    .print-button {
      padding: 10px 20px;
      background-color: #3b82f6;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 20px;
    }
  `;

  // Create the HTML content as a string using the component's structure
  printWindow.document.write(`
    <html>
      <head>
        <title>Cash Disbursement Journal</title>
        <style>${printStyles}</style>
      </head>
      <body>
        <div style="padding: 30px; max-width: 1000px; margin: 0 auto;">
          <h1 style="font-size: 24px; margin-bottom: 10px;">Cash Disbursement Journal</h1>
          <h2 style="font-size: 16px; margin-bottom: 20px; color: #666;">
            ${formatInputDate(startDate)} to ${formatInputDate(endDate)}
          </h2>
          <div style="font-size: 12px; color: #888; margin-bottom: 20px;">
            Generated on: ${formatInputDate(new Date())}
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <thead>
              <tr style="background-color: #3b82f6; color: white;">
                <th style="text-align: left; padding: 8px;">Date</th>
                <th style="text-align: left; padding: 8px;">Payee</th>
                <th style="text-align: left; padding: 8px;">Description</th>
                <th style="text-align: left; padding: 8px;">Check #</th>
                <th style="text-align: right; padding: 8px;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${reportData
                .map(
                  (item, index) => `
                <tr style="background-color: ${
                  index % 2 === 0 ? "white" : "#f9fafb"
                }">
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${formatInputDate(
                    new Date(item.date)
                  )}</td>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${
                    item.payee
                  }</td>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${
                    item.description
                  }</td>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${
                    item.checkNumber
                  }</td>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">$${item.amount.toFixed(
                    2
                  )}</td>
                </tr>
              `
                )
                .join("")}
              <tr style="font-weight: bold; background-color: #eee;">
                <td colspan="4" style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Total</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">$${totalAmount.toFixed(
                  2
                )}</td>
              </tr>
            </tbody>
          </table>
          
          <div style="text-align: right; font-size: 12px; color: #888;">Page 1 of 1</div>
          
          <button class="print-button" onclick="window.print();window.close();">Print</button>
        </div>
      </body>
    </html>
  `);

  printWindow.document.close();

  // Focus the window and trigger print after it loads
  printWindow.onload = () => {
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };
};

export default DisbursementJournalPrintable;
