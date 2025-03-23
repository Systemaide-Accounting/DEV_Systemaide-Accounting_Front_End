import { AgentsDataTable } from "../../Components/agents-library-components/AgentsDataTable";

export function AgentsLibrary() {
  return (
    <>
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <h1 className="text-2xl font-bold mb-2">Agents Library</h1>

        {/* Agents Table */}
        <AgentsDataTable />
      </div>
    </>
  );
}
