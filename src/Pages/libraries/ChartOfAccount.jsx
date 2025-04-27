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
      {/* Header */}
      <h1 className="text-xl font-semibold">Chart Of Accounts</h1>

      {/* Chart Of Accounts Section */}
      <div className="rounded-lg dark:border-gray-700">
        {/* <h1 className="text-2xl mb-4">Chart Of Accounts</h1> */}

        <div className="grid grid-cols-1 gap-4">
          <CombinedAccnts />
        </div>

        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <MainAccnt />
          {selectedAccount && <SubAccnt />}
        </div> */}
      </div>
    </ChartOfAccntContext.Provider>
  );
}