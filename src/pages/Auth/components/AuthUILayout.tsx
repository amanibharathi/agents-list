import {  Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const AuthUILayout = () => {
  return (
    <Flex width={"100%"}>
      <Flex
        width={{ base: "100%", lg: "100%" }}
        flexDirection={"column"}
        justifyContent={{ lg: "center" }}
        gap={"30px"}
        position="relative"
      >
        {/* <Box
          pt={{ base: "24px", lg: "40px" }}
          pl={{ base: "24px", lg: "50px" }}
          // position={{ lg: "absolute" }}
          top="0"
          left="0"
        >
          <AppImage src={ROALogo} alt="Realty of America Logo" />
        </Box> */}
        <Outlet />
      </Flex>
    </Flex>
  );
};
export default AuthUILayout;