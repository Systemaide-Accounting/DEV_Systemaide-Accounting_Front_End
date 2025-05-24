# Systemaide Accounting System - User Stories & Functional Documentation

This document provides a detailed walkthrough of the Systemaide Accounting System's frontend functionality, based on the codebase analysis. It's organized by major functional areas of the application, breaking down the specific features and user workflows.

## Table of Contents

1. [System Overview](#system-overview)
2. [Authentication & User Management](#authentication--user-management)
3. [Dashboard & Navigation](#dashboard--navigation)
4. [Transaction Management](#transaction-management)
   - [Cash Disbursement](#cash-disbursement)
   - [Cash Receipts](#cash-receipts)
   - [Sales on Account](#sales-on-account)
   - [Purchases on Account](#purchases-on-account)
   - [General Journal](#general-journal)
5. [Reports Generation](#reports-generation)
   - [Journals](#journals)
   - [Ledgers](#ledgers)
   - [Trial Balance](#trial-balance)
   - [Worksheets](#worksheets)
6. [Library Management](#library-management)
   - [Chart of Accounts](#chart-of-accounts)
   - [Agents Library](#agents-library)
   - [Setup Company](#setup-company)
   - [Setup Location](#setup-location)
7. [System Utilities](#system-utilities)
   - [Audit Trail](#audit-trail)
   - [User Accounts](#user-accounts)
   - [Backup & Restore](#backup--restore)
   - [System Configuration](#system-configuration)

---

## System Overview

Systemaide Accounting is a comprehensive MERN Stack (MongoDB, Express, React, Node.js) accounting application designed to manage financial transactions, reporting, and accounting operations for businesses. The system provides functionalities for transaction entry, financial reporting, chart of accounts management, and system administration.

### Architecture

- **Frontend**: React with Vite for fast development
- **Styling**: Tailwind CSS and Flowbite for UI components
- **Routing**: React Router using HashRouter for navigation
- **State Management**: Context API for managing authentication and application state
- **API Communication**: Axios for REST API calls to the backend

### Key Features

- User authentication and role-based access control
- Transaction entry and management
- Financial reporting (journals, ledgers, trial balances)
- Chart of accounts management
- Location and company configuration
- System utilities for backups and user management

---

## Authentication & User Management

### Login/Signup Flow

The application starts with authentication through the LoginSignUp component:

```
As a user, I want to authenticate into the system so I can access my accounting data.
```

**Implementation Details:**
- The user navigates to the root path `/` which renders the `LoginSignUp` component
- `LoginForm` component handles user credentials and authentication
- Authentication state is managed via the `AuthContext` 
- JWT tokens are used for maintaining session state
- The `useGetAuth` hook retrieves the authenticated user details
- The `checkUserExpiration` function verifies token validity

**Protected Routes:**
- The `PrivateRoute` component in `src/Components/PrivateRoute.jsx` ensures authenticated access
- Users without valid credentials are redirected to the login page
- Permission-based access control allows/restricts access to specific features

---

## Dashboard & Navigation

### Home Dashboard

```
As a user, I want to see a dashboard after login that gives me quick access to all system functionalities.
```

**Implementation Details:**
- The `Home` component serves as the main dashboard
- `HomeCards` component (src/Components/HomeCards.jsx) displays main application areas:
  - Transactions
  - Reports
  - Library
  - Utilities
- Each card provides navigation to its respective module

### Navigation Structure

```
As a user, I want a consistent navigation structure so I can easily move between different sections of the application.
```

**Implementation Details:**
- The `Navbar` component provides global navigation
- `SubMenu` component handles section-specific navigation
- Each main section has its own navigation component:
  - `Transaction` for transaction-related pages
  - `Reports` for reporting pages
  - `Library` for master data pages
  - `Utilities` for system utilities

---

## Transaction Management

The system supports multiple types of financial transactions, each with its own workflow and data entry form.

### Cash Disbursement

```
As an accountant, I want to record cash disbursements so I can track money leaving the business.
```

**Implementation Details:**
- `CashDisbursementFormPage` handles the creation and editing of disbursements
- Transactions are listed in `CashDisbursementDataTable`
- Each transaction records:
  - Date, month, and year
  - Location information
  - Check/voucher number
  - Payee information
  - Transaction particulars
  - Multiple transaction lines with different accounts and amounts
- The form supports withholding tax calculations and various expense categories
- Users can print disbursement journals via `PrintDisbursementJournal`

### Cash Receipts

```
As an accountant, I want to record cash receipts so I can track money entering the business.
```

**Implementation Details:**
- `CashReceiptFormPage` handles the creation and editing of receipts
- Transactions are listed in `CashReceiptDataTable`
- Each transaction records:
  - Date, month, and year
  - Location information
  - Official receipt number
  - Payor information
  - Transaction particulars
  - Receipt details including accounts and amounts
- Users can print receipts journals via `PrintReceiptsJournal`

### Sales on Account

```
As an accountant, I want to record sales on account so I can track credit sales to customers.
```

**Implementation Details:**
- `SalesOnAccountFormPage` manages the entry of credit sales
- Transactions are listed in `SalesAccntDataTable`
- Each transaction records:
  - Date, month, and year
  - Location information
  - Invoice number
  - Customer information (name, address, TIN)
  - Sales details with different types of sales
  - VAT and withholding tax information
- The form handles VAT calculations and withholding tax with appropriate ATC codes
- Users can print sales journals via `PrintSalesJournal`

### Purchases on Account

```
As an accountant, I want to record purchases on account so I can track credit purchases from suppliers.
```

**Implementation Details:**
- `PurchasesAccntFormPage` manages the entry of credit purchases
- Transactions are listed in `PurchasesAccntDataTable`
- Each transaction records:
  - Date, month, and year
  - Location information
  - Purchase voucher number
  - Invoice/credit memo number
  - Supplier information (name, address, TIN)
  - Purchase details with different purchase types
  - Input VAT and withholding tax information
- Users can print purchases journals via `PrintPurchasesJournal`

### General Journal

```
As an accountant, I want to record general journal entries so I can handle transactions that don't fit other categories.
```

**Implementation Details:**
- `GeneralJournalFormPage` handles miscellaneous accounting entries
- Transactions are listed in `GeneralJournalDataTable`
- Each transaction records:
  - Date, month, and year
  - Location information
  - Journal voucher number
  - Particulars
  - Multiple debit and credit entries
- Users can print general journals via `PrintGeneralJournal`

---

## Reports Generation

The system provides various financial reports to analyze and monitor business performance.

### Journals

```
As an accountant, I want to generate journal reports so I can review transaction history by type.
```

**Implementation Details:**
- Journal reports are available for:
  - Cash Disbursement (`DisbursementJournal`)
  - Cash Receipts (`CashReceiptsJournal`)
  - Sales (`SalesJournal`)
  - Purchases (`PurchasesJournal`)
  - General Journal (`GeneralJournalReports`)
- Each report supports:
  - Date range filtering
  - Previewing reports in-app
  - Printing reports to physical printer
  - Exporting to Excel via XLSX format

### Ledgers

```
As an accountant, I want to generate ledger reports so I can view account activity and balances.
```

**Implementation Details:**
- Two types of ledger reports:
  - General Ledger (`GeneralLedger`) for main accounts
  - Subsidiary Ledger (`SubsidiaryLedger`) for detailed account activity
- Reports can be filtered by date range and account
- Support for exporting to Excel

### Trial Balance

```
As an accountant, I want to generate trial balance reports so I can verify that debits equal credits.
```

**Implementation Details:**
- Two types of trial balance reports:
  - Current Net Change (`CurrentNetChange`) for current period
  - Year to Date (`YearToDate`) for cumulative balances
- Reports show debit and credit totals for all accounts
- Verification that debits equal credits

### Worksheets

```
As an accountant, I want to generate worksheets so I can prepare financial statements.
```

**Implementation Details:**
- The `Worksheet` component generates accounting worksheets
- Support for adjusting entries
- Calculation of adjusted balances
- Preparation for income statement and balance sheet

---

## Library Management

The system maintains master data used throughout the application.

### Chart of Accounts

```
As an accountant, I want to manage the chart of accounts so I can organize financial transactions.
```

**Implementation Details:**
- The `ChartOfAccount` page manages the account structure
- Three key components:
  - `MainAccnt` for managing main account classifications
  - `SubAccnt` for managing sub-accounts
  - `CombinedAccnts` for a hierarchical view of all accounts
- Accounts are organized in a hierarchical structure
- Each account has:
  - Account code
  - Account name
  - Account level (parent/child relationship)
- Functions for adding, editing, and deleting accounts

### Agents Library

```
As a user, I want to manage customer and supplier records so I can quickly reference them in transactions.
```

**Implementation Details:**
- The `AgentsLibrary` page manages business partners
- `AgentsDataTable` displays the list of agents
- `AgentModalForm` handles adding and editing agents
- Each agent record contains:
  - Name
  - Address
  - Contact information
  - Tax identification number (TIN)
  - Agent type (customer, supplier, etc.)

### Setup Company

```
As an administrator, I want to set up company information so it appears on reports and documents.
```

**Implementation Details:**
- The `SetupCompany` page manages company details
- Information includes:
  - Company name
  - Address
  - Tax identification
  - Contact information
  - Logo
  - Business registration details

### Setup Location

```
As an administrator, I want to manage business locations so I can track transactions by site.
```

**Implementation Details:**
- The `SetupLocation` page manages business locations
- `SetupLocationComponents` handle location CRUD operations
- Each location has:
  - Location name
  - Address
  - Contact information
  - Active status

---

## System Utilities

The system provides utilities for administration and maintenance.

### Audit Trail

```
As an administrator, I want to view an audit trail so I can monitor system activity.
```

**Implementation Details:**
- The `AuditTrail` page displays user activities
- Records include:
  - User information
  - Action performed
  - Timestamp
  - IP address
  - Affected data

### User Accounts

```
As an administrator, I want to manage user accounts so I can control system access.
```

**Implementation Details:**
- The `UsersAccount` page manages system users
- Functions for:
  - Creating new users
  - Editing user details
  - Assigning roles and permissions
  - Activating/deactivating accounts
- Role-based access control with defined permissions

### Backup & Restore

```
As an administrator, I want to back up the database so I can prevent data loss.
```

**Implementation Details:**
- The `BackupDatabase` page handles database backups
- `SetupBackupLocation` configures where backups are stored
- Features include:
  - Manual backup creation
  - Backup scheduling
  - Restoration from backup
  - Backup history tracking

### System Configuration

```
As an administrator, I want to configure system settings so I can customize the application.
```

**Implementation Details:**
- The `SystemConfiguration` page handles global settings
- Only accessible to users with specific permissions
- Settings include:
  - Fiscal year configuration
  - Number formatting preferences
  - Default accounts
  - System behavior options

---

## Technical Details

### API Communication

The system communicates with the backend through the `systemaideService.js` module, which provides functions for:

- Authentication (`authService.js`)
- Transaction management
- Report generation
- Master data management
- System utilities

### Data Security

- JWT authentication with token expiration
- Role-based access control
- Input validation
- Secure storage of sensitive data

### Error Handling

- Sweet Alert 2 for user-friendly error messages
- Console logging for development debugging
- Graceful error recovery

### UI/UX Design

- Responsive design using Tailwind CSS
- Modal forms for data entry
- Data tables with sorting, filtering, and pagination
- Date pickers for report date ranges
- Printable report views

---

## Conclusion

The Systemaide Accounting System provides a comprehensive solution for business accounting needs, with features covering transaction entry, financial reporting, and system administration. The modular architecture allows for easy maintenance and extension of functionality.
