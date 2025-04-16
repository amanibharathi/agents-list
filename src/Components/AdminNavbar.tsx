import { useDisclosure } from "@chakra-ui/react";
import { createContext } from "react";
import useManageCookies from "../utils/hooks/useSetCookiesOnSuccess";
// import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { REFRESH_API } from "../api-utils";
import AdminDesktopNavbar from "./AdminDesktopNavbar";
import makeGetRequest from "../api/makeGetRequest";

interface IcontextValue {
  check: boolean;
  openLogoutModal: () => void;
}
export const AdminNavContext = createContext<IcontextValue | null>(null);

const AdminNavbar = () => {
  const {
    // isOpen, onClose,
    onOpen: openLogoutModal,
  } = useDisclosure();
  const { handleClearCookiesOnSignOut, handleSetCookiesOnSuccess } =
    useManageCookies();
  const contextValue: IcontextValue = {
    check: true,
    openLogoutModal,
  };
  // const router = useNavigate();
  const { data } = useQuery([REFRESH_API], () => makeGetRequest(REFRESH_API), {
    onSuccess: (res) => {
      // todorefresh
      handleSetCookiesOnSuccess(res);
      // if (res?.data?.current_role_type !== "admin") {
      //   router("/");
      // }
    },
    onError: () => {
      // router(MAKE_ABSOLUTE_URL(ADMIN_LOGIN));
      handleClearCookiesOnSignOut();
    },
    retry: false,
  });
  return (
    <AdminNavContext.Provider value={contextValue}>
      {data && <AdminDesktopNavbar />}
      {/* <ConformLogoutModalAdmin onClose={onClose} isOpen={isOpen} /> */}
    </AdminNavContext.Provider>
  );
};
export default AdminNavbar;
