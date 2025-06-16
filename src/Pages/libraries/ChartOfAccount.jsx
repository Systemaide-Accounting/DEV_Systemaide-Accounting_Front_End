import { useState } from "react";
import { MainAccnt } from "../../Components/chart-of-accnt-components/MainAccnt";
import { SubAccnt } from "../../Components/chart-of-accnt-components/SubAccnt";
import ChartOfAccntContext from "../../context/ChartOfAccntContext";
import { CombinedAccnts } from "../../Components/chart-of-accnt-components/CombinedAccnts";

export function ChartOfAccount() {
  const [selectedAccount, setSelectedAccount] = useState(null);

  return (
    <ChartOfAccntContext.Provider
      value={{ selectedAccount, setSelectedAccount }}
    >
      {/* Title Card */}
      <div className="w-full p-4 border rounded-lg bg-white mb-4 shadow">
        <h2 className="text-xl font-bold text-gray-900">Chart Of Accounts</h2>
      </div>

      {/* Content Card */}
      <div className="border rounded-lg dark:border-gray-700 shadow">
        {/* Chart of Accounts Table */}
        <CombinedAccnts />
      </div>
    </ChartOfAccntContext.Provider>
  );
}