import { Outlet } from "react-router-dom";
import { Dashboard } from "./Dashboard";

export function Layout() {
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