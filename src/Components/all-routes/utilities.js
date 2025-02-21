// UTILITIES
import { AuditTrail } from "../../Pages/utility/utilities-folder/AuditTrail";
import { UsersAccount } from "../../Pages/utility/utilities-folder/UsersAccount";
import { SetupPrinterDefaults } from "../../Pages/utility/utilities-folder/SetupPrinterDefaults";
import { SystemSettings } from "../../Pages/utility/utilities-folder/SystemSettings";
import { ReportDesigner } from "../../Pages/utility/utilities-folder/ReportDesigner";

// BACKUPS
import {BackupDatabase} from "../../Pages/utility/backups/BackupDatabase";
import {SetupBackupLocation} from "../../Pages/utility/backups/SetupBackupLocation";

const UTILITIES_URL = "/utilities";

export const utilities = [
  {
    path: `${UTILITIES_URL}/audittrail`,
    element: AuditTrail,
    name: "Audit Trail",
  },
  {
    path: `${UTILITIES_URL}/usersaccount`,
    element: UsersAccount,
    name: "Users Account",
  },
  {
    path: `${UTILITIES_URL}/setupprinterdefaults`,
    element: SetupPrinterDefaults,
    name: "Setup Printer Defs.",
  },
  {
    path: `${UTILITIES_URL}/systemsettings`,
    element: SystemSettings,
    name: "System Settings",
  },
  {
    path: `${UTILITIES_URL}/reportdesigner`,
    element: ReportDesigner,
    name: "Report Designer",
  },
];

export const backups = [
  {
    path: `${UTILITIES_URL}/setupbackuplocation`,
    element: SetupBackupLocation,
    name: "Setup Backup Loc.",
  },
  {
    path: `${UTILITIES_URL}/backupdatabase`,
    element: BackupDatabase,
    name: "Backup Database",
  },
];