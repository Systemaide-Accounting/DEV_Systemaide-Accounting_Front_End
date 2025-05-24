// import "./App.css";
import "./index.css";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { PrivateRoute } from "./Components/PrivateRoute";
import AuthContext from "./context/AuthContext";
import useGetAuth from "./hooks/useGetAuth";
import { checkUserExpiration } from "./hooks/checkUserExpiration";
import { LoginSignUp } from "./Pages/LoginSignUp";
import { Home } from "./Pages/Home";
// AUTHENTICATION SERVICES
import { userAllowedViewSystemConfig } from "./constants/UserConstants";
// IMPORT PRINTABLES
import { PrintDisbursementJournal } from "./Pages/reports/journals/PrintDisbursementJournal";
import { PrintReceiptsJournal } from "./Pages/reports/journals/PrintReceiptsJournal";
import { PrintSalesJournal } from "./Pages/reports/journals/PrintSalesJournal";
import { PrintPurchasesJournal } from "./Pages/reports/journals/PrintPurchasesJournal";
import { PrintGeneralJournal } from "./Pages/reports/journals/PrintGeneralJournal";
// IMPORT PAGES ROUTES
import { transactions } from "./Components/all-routes/transactions";
import { CashDisbursementFormPage } from "./Pages/transaction/CashDisbursementFormPage";
import { CashReceiptFormPage } from "./Pages/transaction/CashReceiptFormPage";
import { SalesOnAccountFormPage } from "./Pages/transaction/SalesOnAccountFormPage";
import { GeneralJournalFormPage } from "./Pages/transaction/GeneralJournalFormPage";
import { PurchasesAccntFormPage } from "./Pages/transaction/PurchasesAccntFormPage";
import {
  journals,
  ledgers,
  triBalances,
  worksheets,
} from "./Components/all-routes/reports";
import { libraries } from "./Components/all-routes/libraries";
import { utilities, backups } from "./Components/all-routes/utilities";
import { SystemConfiguration } from "./Pages/SystemConfiguration";
import { useEffect } from "react";


function App() {
  const user = useGetAuth();

  const checkAuthentication = async () => {
    await checkUserExpiration();
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  // comment something
  // another comment to test

  return (
    <>
      <Router>
        <AuthContext.Provider value={{ user }}>
          <Routes>
            <Route path="/" element={<LoginSignUp />} />

            {/* All Printable Pages */}
            <Route
              path="/reports/print-disbursement-journal"
              element={<PrintDisbursementJournal />}
            />
            <Route
              path="/reports/print-receipts-journal"
              element={<PrintReceiptsJournal />}
            />
            <Route
              path="/reports/print-sales-journal"
              element={<PrintSalesJournal />}
            />
            <Route
              path="/reports/print-purchases-journal"
              element={<PrintPurchasesJournal />}
            />
            <Route
              path="/reports/print-general-journal"
              element={<PrintGeneralJournal />}
            />

            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
              {/* All pages under TRANSACTION section */}
              {transactions.map((page, index) => {
                return (
                  <>
                    <Route
                      key={index}
                      path={page.path}
                      element={<page.element />}
                    />
                  </>
                );
              })}
              <Route
                path="/transaction/cashdisbursement/form/:id?"
                element={<CashDisbursementFormPage />}
              />
              <Route
                path="/transaction/cashreceipts/form/:id?"
                element={<CashReceiptFormPage />}
              />
              <Route
                path="/transaction/salesonaccount/form/:id?"
                element={<SalesOnAccountFormPage />}
              />
              <Route
                path="/transaction/generaljournal/form/:id?"
                element={<GeneralJournalFormPage />}
              />
              <Route
                path="/transaction/purchasesonaccount/form/:id?"
                element={<PurchasesAccntFormPage />}
              />

              {/* All pages under REPORTS section */}
              {/* This is the Journals */}
              {journals.map((page, index) => {
                return (
                  <>
                    <Route
                      key={index}
                      path={page.path}
                      element={<page.element />}
                    />
                    ;
                  </>
                );
              })}
              {/* This is the Ledgers */}
              {ledgers.map((page, index) => {
                return (
                  <>
                    <Route
                      key={index}
                      path={page.path}
                      element={<page.element />}
                    />
                    ;
                  </>
                );
              })}
              {/* This is the Tri Balances */}
              {triBalances.map((page, index) => {
                return (
                  <>
                    <Route
                      key={index}
                      path={page.path}
                      element={<page.element />}
                    />
                    ;
                  </>
                );
              })}
              {/* This is the Worksheets */}
              {worksheets.map((page, index) => {
                return (
                  <>
                    <Route
                      key={index}
                      path={page.path}
                      element={<page.element />}
                    />
                    ;
                  </>
                );
              })}
              {/* All pages under LIBRARY section */}
              {libraries.map((page, index) => {
                return (
                  <>
                    <Route
                      key={index}
                      path={page.path}
                      element={<page.element />}
                    />
                    ;
                  </>
                );
              })}
              {/* All pages under UTILITIES section */}
              {/* This is the Utilities */}
              {utilities.map((page, index) => {
                return (
                  <>
                    <Route
                      key={index}
                      path={page.path}
                      element={<page.element />}
                    />
                    ;
                  </>
                );
              })}
              {/* This is the Backups */}
              {backups.map((page, index) => {
                return (
                  <>
                    <Route
                      key={index}
                      path={page.path}
                      element={<page.element />}
                    />
                    ;
                  </>
                );
              })}
              {userAllowedViewSystemConfig(user?.permissions) && (
                <Route
                  path="/system-config"
                  element={<SystemConfiguration />}
                />
              )}
            </Route>
          </Routes>
        </AuthContext.Provider>
      </Router>
    </>
  );
}

export default App;
