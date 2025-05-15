import { GeneralJournalDataTable } from "../../Components/general-journal-components/GeneralJournalDataTable";

export function GeneralJournal() {
  return (
    <>
      {/* Title Card */}
      <div className="w-full p-4 border rounded-lg bg-white mb-4 shadow">
        <h2 className="text-xl font-bold text-gray-900">General Journal</h2>
      </div>

      <div className="border rounded-lg dark:border-gray-700">
        {/* General Journal Table */}
        <GeneralJournalDataTable />
      </div>
    </>
  );
}
