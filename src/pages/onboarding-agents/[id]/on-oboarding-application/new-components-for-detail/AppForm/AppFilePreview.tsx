/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex } from "@chakra-ui/react";
import { LuFile } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import AppText from "../AppText";
import AppProgressCircle from "../AppProgressCircle";

const AppFilePreview = ({
  obj,
  handleRemove,
  progress,
  fileData,
  sx,
}: {
  obj: any;
  handleRemove: any;
  progress: any;
  fileData: any;
  sx?: any;
}) => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      p="16px"
      border="1px solid #C6C6C6"
      borderRadius="12px"
      sx={sx}
    >
      <Flex gap="8px">
        <LuFile color="#A4A7AE" fontWeight="600" fontSize="18px" />
        <Flex flexDirection="column">
          <AppText
            fontSize="14px"
            color="#414651"
            lineHeight="16px"
            fontWeight="600"
          >
            {fileData?.fileName || fileData?.file_name}
          </AppText>
          <AppText fontSize="14px" color="#535862">
            {fileData?.fileSize ? `${fileData?.fileSize} KB –` : ""}
            {progress < 100 ? `${progress}% uploaded` : "100% uploaded"}
          </AppText>
        </Flex>
      </Flex>
      <Flex
        boxSize="24px"
        cursor="pointer"
        onClick={() => handleRemove(obj)}
        sx={{
          ml: "10px",
        }}
      >
        {progress < 100 ? (
          <AppProgressCircle value={progress} />
        ) : (
          <IoClose color="#DB1264" fontSize="20px" />
        )}
      </Flex>
    </Flex>
  );
};

export default AppFilePreview;
