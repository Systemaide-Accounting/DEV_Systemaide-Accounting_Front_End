import { AgentsDataTable } from "../../Components/agents-library-components/AgentsDataTable";

export function AgentsLibrary() {
  return (
    <>
      {/* Header */}
      <h1 className="text-xl font-semibold mb-4">Agents Library</h1>
      {/* Agents Library Section */}
      {/* <div className="border rounded-lg dark:border-gray-700"> */}
        {/* <h1 className="text-2xl font-bold mb-2">Agents Library</h1> */}

        {/* Agents Table */}
        <AgentsDataTable />
      {/* </div> */}
    </>
  );
}
