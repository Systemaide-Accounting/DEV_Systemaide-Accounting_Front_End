import { AgentsDataTable } from "../../Components/agents-library-components/AgentsDataTable";

export function AgentsLibrary() {
  return (
    <>
      {/* Title Card */}
      <div className="w-full p-4 border rounded-lg bg-white mb-4 shadow">
        <h2 className="text-xl font-bold text-gray-900">Agents Library</h2>
      </div>

      {/* Content Card */}
      <div className="border rounded-lg dark:border-gray-700 shadow">
        {/* Agents Table */}
        <AgentsDataTable type={""} />
      </div>
    </>
  );
}
