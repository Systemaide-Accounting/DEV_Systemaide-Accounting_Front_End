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