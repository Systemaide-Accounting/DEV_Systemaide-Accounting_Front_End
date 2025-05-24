# Systemaide Accounting System

A comprehensive accounting management system built with modern web technologies. This frontend application provides a robust interface for managing financial transactions, generating reports, and maintaining accounting master data.

## Overview

Systemaide Accounting is a complete solution for businesses to manage their financial operations. The system provides functionalities for transaction entry, financial reporting, chart of accounts management, and system administration with role-based access control.

## Core Features

### Transaction Management
- **Cash Disbursements**: Record and track all outgoing cash transactions
- **Cash Receipts**: Manage incoming cash and payments
- **Sales on Account**: Handle credit sales to customers with VAT calculations
- **Purchases on Account**: Track credit purchases from suppliers
- **General Journal**: Record miscellaneous journal entries

### Reporting
- **Journals**: Generate transaction-specific journals (disbursement, receipts, sales, purchases)
- **Ledgers**: View general and subsidiary ledger reports
- **Trial Balance**: Generate current period and year-to-date trial balances
- **Worksheets**: Create financial worksheets for statement preparation

### Library Management
- **Chart of Accounts**: Maintain hierarchical account structure
- **Agents Library**: Manage customers and suppliers records
- **Company Setup**: Configure company information
- **Location Setup**: Manage business locations

### System Utilities
- **User Management**: Control access with role-based permissions
- **Audit Trail**: Track system activities
- **Backup & Restore**: Ensure data safety
- **System Settings**: Configure system-wide settings

## Tech Stack

- **Frontend Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with Flowbite components
- **Routing**: React Router v7
- **Authentication**: JWT with encryption (crypto-js)
- **PDF Generation**: jsPDF with AutoTable
- **Excel Export**: XLSX
- **HTTP Client**: Axios
- **Icons**: Lucide React and React Icons
- **Notifications**: SweetAlert2

## Setup and Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/DEV_Systemaide-Accounting_Front_End.git
   cd DEV_Systemaide-Accounting_Front_End
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_SYSTEMAIDE_BE_API=your_backend_api_url
   VITE_BEARER_TOKEN=your_bearer_token
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. For production build:
   ```bash
   npm run build
   npm run serve
   ```

## Configuration

The application uses environment variables for configuration:

- `VITE_SYSTEMAIDE_BE_API`: URL of the backend API
- `VITE_BEARER_TOKEN`: Token for API authentication

## Security Features

- JWT authentication with token expiration
- Encrypted local storage
- Role-based access control
- API request authentication
- Session expiration checks
