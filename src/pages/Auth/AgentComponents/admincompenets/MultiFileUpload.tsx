import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { BiCloudUpload } from "react-icons/bi";
import { FileUploader } from "react-drag-drop-files";
import toast from "react-hot-toast";

import { GoXCircle } from "react-icons/go";
import useUploadFiles from "../../../../utils/hooks/useUploadFiles";
import AppText from "../../../../AppComponents/AppText-agent";
import { DownloadGreen } from "./DownloadGreen";
import { DeleteRed } from "./DeleteRed";
import { DocumentFile } from "./DocumentFile";
import {
  downloadFile,
  getFileName,
} from "../../../../utils/functions/commonFunctions";

interface IAdminFileUpload {
  fileTypes?: string | string[];
  disabled?: boolean;
  imageState?: any[];
  handleRemoveImage?: any;
  maxW?: string;
  placeholder?: string;
  fileTypeKey?: string;
  uploadKey?: string;
  setImageState?: any;
  handleUpload?: any;
  isError?: any;
  formMessage?: string;
  name?: string;
  customUiBody?: any;
  customUploadUiList?: any;
  customEndPoint?: any;
  customType?: any;
  setValue?: any;
  isDownloadable?: boolean;
  setUploadError?: any;
  isCreate?: boolean;
  isDelete?: boolean;
}

const MultiFileUpload = ({
  fileTypes,
  disabled = false,
  imageState = [],
  maxW,
  placeholder = "upload files",
  uploadKey,
  fileTypeKey = "file",
  setImageState,
  isError,
  formMessage = "This field cannot be empty",
  name,
  customUiBody,
  customEndPoint,
  isDownloadable = false,
  setUploadError,
  isCreate = false,
  isDelete = false,
}: IAdminFileUpload) => {
  const { fileMutate, fileIsLoading } = useUploadFiles({
    customEndPoint: customEndPoint,
    key: uploadKey,
    fileTypeKey: fileTypeKey,
    onSuccess(res) {
      const prevDoc = imageState;
      setUploadError && setUploadError(false);
      if (prevDoc?.length > 0) {
        //@ts-expect-error ignore
        setImageState([...prevDoc, res?.data]);
      } else {
        setImageState([res?.data]);
      }
    },
  });

  const handleChangeInComponent = (file: any) => {
    // const fileSize = Math.round(file?.size / 1024)
    // if (fileSize > 5120) {
    //   toast.error('File size exceeds 5MB')
    // } else {
    //   const formData = new FormData()
    //   formData.append('files', file)
    //   //@ts-expect-error ignore
    //   fileMutate(formData)
    // }
    // Convert the object to an array
    const uploadedFiles = Object.values(file);

    const validFiles = uploadedFiles.filter((file: any) => {
      const fileSize = Math.round(file?.size / 1024);
      if (fileSize > 5120) {
        toast.error(`${file.name} exceeds 5MB`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    const formData = new FormData();
    validFiles.forEach((i: any) => formData.append("files", i));

    //@ts-expect-error ignore
    fileMutate(formData);
  };

  const handleRemoveInComponent = (file: any) => {
    const filteredImg = imageState
      ?.flat()
      ?.filter((f: any) => f?.id !== file?.id);
    setImageState(filteredImg);
  };

  return (
    <Flex
      className="app-file-upload"
      w="100%"
      maxW={`${maxW} !important`}
      flexFlow={"column"}
    >
      <Box position={"relative"}>
        {disabled ? (
          <Box
            zIndex={9}
            pos={"absolute"}
            top={"0px"}
            bg={"white"}
            opacity={"30%"}
            left={"0px"}
            bottom={"0px"}
            width={"100%"}
          ></Box>
        ) : null}
        {!disabled ? (
          <FileUploader
            multiple
            disabled={disabled}
            handleChange={handleChangeInComponent}
            name={name || "file"}
            types={fileTypes}
            label={placeholder}
          >
            {customUiBody ? (
              customUiBody(fileIsLoading)
            ) : (
              <Flex
                flexFlow={"column"}
                p="25px"
                w={"100%"}
                flexWrap={"wrap"}
                border={isError ? "2px dashed #FC8181" : "1px dashed #D9D9D9"}
              >
                {fileIsLoading ? (
                  <Flex
                    justifyContent={"center"}
                    alignItems={"center"}
                    margin={"auto"}
                    w={"150px"}
                  >
                    <Spinner />
                  </Flex>
                ) : (
                  <Flex
                    gap={"15px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    color={isError ? "#FC8181" : "#787878"}
                  >
                    <BiCloudUpload fontSize={"40px"} />
                    <Text
                      textAlign={"center"}
                      fontSize={"16px"}
                      fontWeight={500}
                      textTransform={"capitalize"}
                    >
                      {placeholder}
                    </Text>
                  </Flex>
                )}
              </Flex>
            )}
            {isError && (
              <Text
                color={"#e53e3e"}
                mt={"1px"}
                fontSize={"11px"}
                pos={"absolute"}
              >
                {isError?.message || formMessage}
              </Text>
            )}
          </FileUploader>
        ) : null}
      </Box>

      {isCreate && !!imageState?.length ? (
        <AppText className="!text-[#444444] font-semibold mt-[20px] mb-[10px]">
          Registration Documents
        </AppText>
      ) : null}

      {!!imageState?.length && (
        <Flex mt={"10px"} flexWrap={"wrap"} gap={"10px"}>
          {!!imageState?.length &&
            imageState?.flat()?.map((each: any) => (
              <div
                key={each?.id}
                className="flex p-[15px] justify-between items-center w-[700px] h-[64px] border-[1px] border-[#F0F0F0] rounded-[8px]"
              >
                <Flex gap={"10px"}>
                  <DocumentFile />
                  <a
                    className="text-[#10295A]"
                    target="_blank"
                    href={each?.file}
                  >
                    {getFileName(each?.file_name || "File", true)}
                  </a>
                </Flex>
                <Flex gap={"10px"}>
                  {isDownloadable ? (
                    <Box
                      className="cursor-pointer"
                      onClick={() => downloadFile(each?.file, each?.file_name)}
                    >
                      <DownloadGreen />
                    </Box>
                  ) : null}
                  <Box
                    className="cursor-pointer"
                    onClick={() => handleRemoveInComponent(each)}
                  >
                    {isDelete ? <DeleteRed /> : <GoXCircle fontSize={"20px"} />}
                  </Box>
                </Flex>
              </div>
            ))}
          <div></div>
        </Flex>
      )}
    </Flex>
  );
};

export default MultiFileUpload;
