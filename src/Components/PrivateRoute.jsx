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
      });
      localStorage.setItem("successfulLoginAlertShown", true);
    }
  }, []);
  
  return (
    <>
      {/* <Header /> */}
      <Dashboard />
      <div className="lg:ml-72 mt-[64px] lg:mt-[56px]">
        <Outlet />
      </div>
    </>
  );
}