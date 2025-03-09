// import "./App.css";
import "./index.css"
import { Navigate, Route, HashRouter as Router, Routes } from "react-router-dom";
import { PrivateRoute } from "./Components/PrivateRoute";
import AuthContext from "./context/AuthContext";
import useGetAuth from "./hooks/useGetAuth";
import { checkUserExpiration } from "./hooks/checkUserExpiration";
import { LoginSignUp } from "./Pages/LoginSignUp";
import { Home } from "./Pages/Home";
// AUTHENTICATION SERVICES

// IMPORT PAGES ROUTES
import { transactions } from "./Components/all-routes/transactions";
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
  
  return (
    <>
      <Router>
        <AuthContext.Provider value={user}>
          <Routes>
            <Route path="/" element={<LoginSignUp />} />
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
              <Route path="/system-config" element={<SystemConfiguration />} />
            </Route>
          </Routes>
        </AuthContext.Provider>
      </Router>
    </>
  );
}

export default App;