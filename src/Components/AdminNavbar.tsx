import { useDisclosure } from "@chakra-ui/react";
import { createContext, useEffect } from "react";
import useManageCookies from "../utils/hooks/useSetCookiesOnSuccess";
import { useNavigate } from "react-router-dom";
import makePostRequest from "../api/makePostRequest";
import { useMutation } from "react-query";
import { REFRESH_API } from "../api-utils";
import AdminDesktopNavbar from "./AdminDesktopNavbar";

interface IcontextValue {
  check: boolean;
  openLogoutModal: () => void;
}
export const AdminNavContext = createContext<IcontextValue | null>(null);

const AdminNavbar = () => {
  const { isOpen, onClose, onOpen: openLogoutModal } = useDisclosure();
  const { handleClearCookiesOnSignOut, handleSetCookiesOnSuccess } =
    useManageCookies();
  const contextValue: IcontextValue = {
    check: true,
    openLogoutModal,
  };
  const router = useNavigate();
  const { mutate, data } = useMutation(
    (body) => makePostRequest(REFRESH_API, body),
    {
      onSuccess: (res) => {
        // todorefresh
        handleSetCookiesOnSuccess(res);
        if (res?.data?.current_role_type !== "admin") {
          router("/");
        }
      },
      onError: () => {
        // router(MAKE_ABSOLUTE_URL(ADMIN_LOGIN));
        handleClearCookiesOnSignOut();
      },
      retry: false,
    }
  );
  useEffect(() => {
    //@ts-ignore
    mutate({ type: "admin" });
  }, []);
  return (
    <AdminNavContext.Provider value={contextValue}>
      {data && <AdminDesktopNavbar />}
      {/* <ConformLogoutModalAdmin onClose={onClose} isOpen={isOpen} /> */}
    </AdminNavContext.Provider>
  );
};
export default AdminNavbar;
