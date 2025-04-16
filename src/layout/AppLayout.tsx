import { Outlet } from "react-router-dom";
import AdminNavbar from "../Components/AdminNavbar";

const AppLayout = () => {
  return (
    <div>
      <div className="pb-[90px]">
        <AdminNavbar />
      </div>
      <Outlet />
    </div>
  );
};

export default AppLayout;
//
