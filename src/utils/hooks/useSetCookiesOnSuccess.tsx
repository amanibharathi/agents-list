import { useAppStore } from "../../store-admin";
import { flatPermissionsArray } from "../../pages/Auth/AgentComponents/admincompenets/roles-and-permissions";
import {
  clearTokenAndUserData,
  setTokenAndUserData,
} from "../../pages/Auth/AgentComponents/admincompenets/tokenAndUserData";
//@ts-expect-error ignore
function useManageCookies() {
  const { setUserDataAndToken, clearUserDataAndToken, setUserRoles } =
    useAppStore();
  //@ts-expect-error ignore
  const handleSetCookiesOnSuccess = (res: any) => {
    const token = res?.data?.token;
    const userType = res?.data?.current_role_type;
    const userData = res?.data;
    const dataObj = { token, userData, userType };
    setUserRoles({
      agentRoles:
        res?.data?.user_roles?.[0]?.role?.role_type == "agent"
          ? flatPermissionsArray(res?.data?.user_roles?.[0]?.role_permissions)
          : flatPermissionsArray(res?.data?.user_roles?.[1]?.role_permissions),
      adminRoles:
        res?.data?.user_roles?.[0]?.role?.role_type == "admin"
          ? flatPermissionsArray(res?.data?.user_roles?.[0]?.role_permissions)
          : flatPermissionsArray(res?.data?.user_roles?.[1]?.role_permissions),
    });
    setTokenAndUserData(dataObj); // cookies
    setUserDataAndToken({ token, user_data: userData }); // cookies in store
  };
  const handleClearCookiesOnSignOut = () => {
    clearTokenAndUserData(); // clear cookies
    clearUserDataAndToken(); // clear cookies in store
  };
  return {
    handleSetCookiesOnSuccess,
    handleClearCookiesOnSignOut,
  };
}
export default useManageCookies;
