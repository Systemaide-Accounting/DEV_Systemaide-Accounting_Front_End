import { Receipt, FileText, BookOpen, Settings, Shield } from "lucide-react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { userAllowedViewSystemConfig } from "../constants/UserConstants";

export function HomeCards() {
  const { user } = useContext(AuthContext);

  const shortcutCards = [
    {
      id: "transactions",
      title: "Transactions",
      icon: <Receipt className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
      color: "blue",
      description: "Manage all financial transactions including cash receipts, disbursements, and sales on account. Record and track every financial movement in your business.",
      features: [
        {
          description: "Record cash disbursements",
          path: "/transaction/cashdisbursement"
        },
        {
          description: "Record cash receipts",
          path: "/transaction/cashreceipts"
        },
        {
          description: "Manage credit sales",
          path: "/transaction/salesonaccount"
        },
        {
          description: "Manage credit purchases",
          path: "/transaction/purchasesonaccount"
        },
        {
          description: "View transaction history",
          path: "/transaction/generaljournal"
        }
      ],
      section: "transactions"
    },
    {
      id: "reports",
      title: "Reports",
      icon: <FileText className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
      color: "purple",
      description: "Access comprehensive financial reports including journals, ledgers, and trial balances. Generate detailed financial statements and analysis for better decision-making.",
      features: [
        {
          description: "Journals",
          type: "header"
        },
        {
          description: "View disbursement journals",
          path: "/reports/disbursementjournal"
        },
        {
          description: "View cash receipts journals",
          path: "/reports/cashreceiptsjournal"
        },
        {
          description: "View sales journals",
          path: "/reports/salesjournal"
        },
        {
          description: "View purchases journals",
          path: "/reports/purchasesjournal"
        },
        {
          description: "Ledgers",
          type: "header"
        },
        {
          description: "View subsidiary ledger reports",
          path: "/reports/subsidiaryledger"
        },
        {
          description: "View general ledger reports",
          path: "/reports/generalledger"
        },
        {
          description: "Trial Balance",
          type: "header"
        },
        {
          description: "View current period change reports",
          path: "/reports/currentchange"
        },
        {
          description: "View year-to-date reports",
          path: "/reports/yrtodate"
        },
        {
          description: "Worksheet",
          type: "header"
        },
        {
          description: "Export worksheet reports",
          path: "/reports/worksheet"
        }
      ],
      section: "reports"
    },
    {
      id: "library",
      title: "Library",
      icon: <BookOpen className="w-10 h-10 text-green-600 dark:text-green-400" />,
      color: "green",
      description: "Maintain your master data including chart of accounts, locations, customers, and suppliers. Keep your business information organized and up-to-date.",
      features: [
        {
          description: "Agents Library",
          path: "/libraries/agentslibrary"
        },
        {
          description: "Chart of Account",
          path: "/libraries/chartofaccount"
        },
        {
          description: "Setup Company",
          path: "/libraries/setupcompany"
        },
        {
          description: "Setup Location",
          path: "/libraries/setuplocation"
        }
      ],
      section: "library"
    },
    {
      id: "utilities",
      title: "Utilities",
      icon: <Settings className="w-10 h-10 text-orange-600 dark:text-orange-400" />,
      color: "orange",
      description: "Access system utilities for backup, restore, and maintenance. Ensure your data is safe and your system runs smoothly.",
      features: [
        {
          description: "Utilities",
          type: "header"
        },
        {
          description: "Audit Trail",
          path: "/utilities/audittrail"
        },
        {
          description: "Users Account",
          path: "/utilities/usersaccount"
        },
        {
          description: "Setup Printer Defs.",
          path: "/utilities/setupprinterdefaults"
        },
        {
          description: "System Settings",
          path: "/utilities/systemsettings"
        },
        {
          description: "Report Designer",
          path: "/utilities/reportdesigner"
        },
        {
          description: "Backup",
          type: "header"
        },
        {
          description: "Setup Backup Loc.",
          path: "/utilities/setupbackuplocation"
        },
        {
          description: "Backup Database",
          path: "/utilities/backupdatabase"
        }
      ],
      section: "utilities"
    },
    {
      id: "system",
      title: "System",
      icon: <Shield className="w-10 h-10 text-red-600 dark:text-red-400" />,
      color: "red",
      description: "Configure system settings, manage users, roles, and permissions. Control access and maintain system security.",
      features: [
        {
          description: "Manage users",
          path: "/system-config"
        },
        {
          description: "Configure roles",
          path: "/system-config"
        },
        {
          description: "Set permissions",
          path: "/system-config"
        },
        {
          description: "Monitor activity",
          path: "/system-config"
        },
        {
          description: "Manage security",
          path: "/system-config"
        }
      ],
      section: "system"
    },
  ];

  // Filter cards based on user permissions
  const filteredCards = userAllowedViewSystemConfig(user?.permissions) 
    ? shortcutCards 
    : shortcutCards.filter(card => card.id !== 'system');

  return filteredCards;
}