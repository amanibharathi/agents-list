import { Flex } from "@chakra-ui/react";
import { AdminNavContext } from "./AdminNavbar";
import AppButton from "../AppComponents/AppButton-agent";
import { useContext } from "react";

const AdminNotificationAndLogout = () => {
  //@ts-expect-error ignore
  const { openLogoutModal } = useContext(AdminNavContext);
  return (
    <Flex alignItems={"center"} justifyContent={"center"} gap={"30px"}>
      <AppButton onClick={openLogoutModal}>Log out</AppButton>
    </Flex>
  );
};

export default AdminNotificationAndLogout;
