// import "./App.css";
import "./index.css"
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { Layout } from "./Components/Layout";
import { LoginSignUp } from "./Pages/LoginSignUp";
import { Home } from "./Pages/Home";
// AUTHENTICATION SERVICES
import { signIn } from "./services/authService";
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
import { useEffect, useState } from "react";

function App() {
//  const [apiBaseUrl, setApiBaseUrl] = useState("");

//   const handleSignIn = async () => {
//     try {
//       const result = await signIn();
//       setApiBaseUrl(result);
//     } catch (error) {
//       console.error("Error signing in:", error);
//     }
//   };

//   useEffect(() => {
//     handleSignIn();
//   }, []);
//   console.log(apiBaseUrl);
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginSignUp />} />
          <Route element={<Layout />}>
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
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

// to overwrite main branch 