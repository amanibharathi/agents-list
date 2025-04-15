//import AppImage from '@/app/components/elements/AppImage'
import RocLogoFull from "../assets/Images/Icons/logo.svg";
import { Box, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import AppImage from "../AppComponents/AppImage";

const LoginWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      bg="#F6F6F6"
      minH={"100vh"}
    >
      <Box p={"40px"} bg={"white"} width={"100%"} maxW={"458px"}>
        <Flex mb="20px" justifyContent={"center"}>
          <AppImage src={RocLogoFull} alt="roc-logo" width={95} />
        </Flex>
        <Box pos={"relative"} p="2px">
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

export default LoginWrapper;
