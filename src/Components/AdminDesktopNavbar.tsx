import { Box, Flex } from "@chakra-ui/react";
import AppImage from "../AppComponents/AppImage";
import AdminNotificationAndLogout from "./AdminNotificationAndLogout";
import DarkBlueSubNav from "./DarkBlueSubNav";

const adminNavbarLinks = () =>
  [
    {
      link: "/admin/agents/agents-list/",
      text: "Active Agents",
    },
    {
      link: "/admin/agents/applied-agents-list/",
      text: "Applied Agents",
    },
  ]?.filter(Boolean);

const AdminDesktopNavbar = () => {
  //   const { adminRoles } = useAppStore();
  // const router = useRouter()

  return (
    <div
      className="fixed w-full bg-white z-[9]"
      style={{ boxShadow: "0px 1px 4px 0px #00000040" }}
    >
      <Flex flexFlow={"column"}>
        <Box className="w-full max-w-[1360px] mx-auto px-[10px]">
          <Flex justifyContent={"space-between"} py={"30px"}>
            <AppImage src={"/assets/logo.svg"} alt={"Roc logo"} width={95} />
            <Flex gap={"40px"}>
              {/* <Flex alignItems={"center"} gap="40px">
                {navData?.map((val, ind) => (
                  <NavbarLinks
                    key={ind}
                    link={val?.link}
                    text={val?.name}
                    dropDownData={val?.dropDownData}
                  />
                ))}
              </Flex> */}
              {/* <RoleSwitchButton
                onClick={() => reRouteHandle()}
                goToSubDomain="Agent"
              /> */}
              <AdminNotificationAndLogout />
            </Flex>
          </Flex>
        </Box>
        <DarkBlueSubNav navBarData={adminNavbarLinks()} />
      </Flex>
    </div>
  );
};

export default AdminDesktopNavbar;
