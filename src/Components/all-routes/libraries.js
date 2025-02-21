import { ChartOfAccount } from "../../Pages/libraries/ChartOfAccount";
import { AgentsLibrary } from "../../Pages/libraries/AgentsLibrary";
import { SetupCompany } from "../../Pages/libraries/SetupCompany";
import { SetupLocation } from "../../Pages/libraries/SetupLocation";

const LIBRARY_URL = "/libraries";

export const libraries = [
  {
    path: `${LIBRARY_URL}/agentslibrary`,
    element: AgentsLibrary,
    name: "Agents Library",
  },
  {
    path: `${LIBRARY_URL}/chartofaccount`,
    element: ChartOfAccount,
    name: "Chart of Accounts",
  },
  {
    path: `${LIBRARY_URL}/setupcompany`,
    element: SetupCompany,
    name: "Setup Company",
  },
  {
    path: `${LIBRARY_URL}/setuplocation`,
    element: SetupLocation,
    name: "Setup Location",
  },
];