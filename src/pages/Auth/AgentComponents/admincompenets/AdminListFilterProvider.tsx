import { createContext, ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom'; 

import { useAppStore } from '../../../../store-admin';
import AppLoader from './AppLoader';
import {
  ADMIN_LOGIN_PAGE,
  agentProtectedRoutes,
  isPermitted,
} from './roles-and-permissions';

export const AdminListFilterContext = createContext({});

export const AdminListFilterProvider = ({ children }: { children?: ReactNode }) => {
  const agentsListFilterForm = useForm();
  const TeamListFilterForm = useForm();
  const appliedAgentsFilterForm = useForm();
  const AppliedTeamsFilterForm = useForm();
  const AppliedTeamsRosterFilterForm = useForm();
  const managingBrokerFilterForm = useForm();

  const [dateRange, setDateRange] = useState<any>({});
  const [agentListData, setAgentListData] = useState([]);
  const [sponsors, setSponsors] = useState([]);

  const location = useLocation(); // ✅ Equivalent to usePathname()
  const pathname = location.pathname;

  const { adminRoles } = useAppStore();
  const isRolesFetched = adminRoles !== null;
  const isAdminLoginPage = pathname === ADMIN_LOGIN_PAGE;

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
        {isAdminLoginPage ? (
          children
        ) : isRolesFetched ? (
          isPermitted(pathname, children, adminRoles, [...agentProtectedRoutes])
        ) : (
          <AppLoader className="h-[80vh]" />
        )}
      </AdminListFilterContext.Provider>
    </div>
  );
};
