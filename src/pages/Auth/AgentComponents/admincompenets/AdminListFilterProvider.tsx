import { createContext, useState } from "react";
import { useForm } from "react-hook-form";
// import { useLocation } from "react-router-dom";

// import { useAppStore } from "../../../../store-admin";
// import { ADMIN_LOGIN_PAGE } from "./roles-and-permissions";
import { Outlet } from "react-router";

export const AdminListFilterContext = createContext({});

export const AdminListFilterProvider = () => {
  const agentsListFilterForm = useForm();
  const TeamListFilterForm = useForm();
  const appliedAgentsFilterForm = useForm();
  const AppliedTeamsFilterForm = useForm();
  const AppliedTeamsRosterFilterForm = useForm();
  const managingBrokerFilterForm = useForm();

  const [dateRange, setDateRange] = useState({});
  const [agentListData, setAgentListData] = useState([]);
  const [sponsors, setSponsors] = useState([]);

  // const location = useLocation(); // ✅ Equivalent to usePathname()
  // const pathname = location.pathname;

  // const { adminRoles } = useAppStore();
  // const isRolesFetched = adminRoles !== null;
  // const isAdminLoginPage = pathname === ADMIN_LOGIN_PAGE;

  return (
    <div>
      <AdminListFilterContext.Provider
        value={{
          agentsListFilterForm,
          TeamListFilterForm,
          appliedAgentsFilterForm,
          AppliedTeamsFilterForm,
          AppliedTeamsRosterFilterForm,
          managingBrokerFilterForm,
          dateRange,
          setDateRange,
          agentListData,
          setAgentListData,
          sponsors,
          setSponsors,
        }}
      >
        <Outlet />
      </AdminListFilterContext.Provider>
    </div>
  );
};
