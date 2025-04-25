import swal2 from "sweetalert2";
import { Outlet } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { useEffect } from "react";
import { checkUserExpiration } from "../hooks/checkUserExpiration";

export function PrivateRoute() {
  useEffect(() => {
    const checkAuthentication = async () => {
      await checkUserExpiration();
    };
    checkAuthentication();
    
    const successfulLoginAlertShown = localStorage.getItem("successfulLoginAlertShown");
    if (!successfulLoginAlertShown) {
      swal2.fire({
        title: "Successfully logged in",
        text: "Redirecting to home page",
        icon: "success",
        customClass: {
          popup: 'rounded-xl shadow-lg',
          title: 'text-xl font-light font-poppins',
          text: 'text-sm font-light font-poppins',
          icon: 'border-2'
        }
      });
      localStorage.setItem("successfulLoginAlertShown", true);
    }
  }, []);
  
  return (
    <>
      <Dashboard>
        <Outlet />
      </Dashboard>
    </>
  );
}