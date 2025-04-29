import { GeneralJournalDataTable } from "../../Components/general-journal-components/GeneralJournalDataTable";

export function GeneralJournal() {
  return (
    <>
      {/* Header */}
      {/* <h2 className="text-xl font-semibold">General Journal</h2> */}
      <div className="border-2 border-gray-200 rounded-lg dark:border-gray-700">
        {/* <h2 className="text-xl font-semibold">General Journal</h2> */}

        {/* General Journal Table */}
        <GeneralJournalDataTable />
      </div>
    </>
  );
}
