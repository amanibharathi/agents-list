import { Box, Flex, Text } from "@chakra-ui/react";
import { FileUploader } from "react-drag-drop-files";
import { FiUploadCloud } from "react-icons/fi";
import useUploadFiles from "../../utils/hooks/useFileUpload";
import AppFilePreview from "./AppFilePreview";
import React, { useState } from "react";
import { AppFileUploadProps, FileData } from "./types/types";

const AppFileUpload: React.FC<AppFileUploadProps> = ({
  name,
  placeholder,
  isRequired,
  isDisabled,
  customUiBody,
  fileTypes = ["JPG", "PNG", "PDF"],
  handleUpload,
  handleRemoveImage,
  imageState,
  setImageState,
  error,
  maxFileSize = "5mb",
  maxW = "",
  endPoint,
  customClassName = "",
  errorClassName = "",
  isMultiple = false,
}) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileData, setFileData] = useState({});
  const formattedFileTypes =
    //@ts-expect-error ignore
    fileTypes.slice(0, -1).join(", ") +
    (fileTypes.length > 1 ? ", or " : "") +
    fileTypes[fileTypes.length - 1];

  const { fileMutate, fileIsLoading } = useUploadFiles({
    onSuccess(res: { data: unknown }) {
      setImageState([res?.data]);
    },
    onError(err: unknown) {
      console.error("File upload failed:", err);
    },
    customEndPoint: endPoint,
  });

  const handleChange = async (file: File) => {
    if (handleUpload) {
      const data = await handleUpload(file, setUploadProgress);
      console.log(data);
      const filesData = data?.data?.map((file: FileData) => {
        return {
          fileName: file?.file_name,
          fileSize: file?.size,
        };
      });
      setFileData(filesData);
      setImageState(data?.data);
    } else {
      const formData = new FormData();
      formData.append("file", file);
      const fileName = file.name;
      const fileSize = (file.size / 1024).toFixed(2);
      setFileData({
        fileName,
        fileSize,
      });

      // Track upload progress
      //@ts-expect-error ignoring for now
      //TODO: To check if this works
      formData.progressCallback = (progress) => {
        setUploadProgress(progress);
      };

      //@ts-expect-error ignore
      fileMutate(formData);
    }
  };

  const handleRemove = (file: { file: string; id: string | number }) => {
    if (handleRemoveImage) {
      handleRemoveImage(file);
    } else {
      const filteredImg = imageState?.filter((f) => f?.id !== file?.id);
      setImageState(filteredImg);
    }
  };

  const getErrorMsgFromObj = (errObj: unknown) => {
    //@ts-expect-error ignore
    return name?.split(".")?.reduce((acc, key) => acc?.[key], errObj);
  };

  const errorMsg = getErrorMsgFromObj(error);
  const isError = !!errorMsg;

  // console.log("image state", imageState);
  console.log(fileData);

  return (
    <Flex
      className={`app-file-upload ${customClassName}`}
      w="100%"
      maxW={`${maxW} !important`}
      flexDirection={"column"}
      gap="20px"
    >
      <Box width="100%" position="relative">
        {isDisabled ? (
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
        ) : (
          <FileUploader
            disabled={isDisabled}
            handleChange={handleChange}
            name={name || "file"}
            types={fileTypes}
            label={placeholder}
            required={isRequired}
            multiple={isMultiple}
          >
            {customUiBody ? (
              customUiBody(fileIsLoading)
            ) : (
              <Flex
                flexFlow={"column"}
                p="16px 24px"
                w={"100%"}
                flexWrap={"wrap"}
                border={isError ? "2px dashed #FC8181" : "2px dashed #E9EAEB"}
                borderRadius="12px"
              >
                <Flex
                  gap={"12px"}
                  flexDirection="column"
                  justifyContent={"center"}
                  alignItems={"center"}
                  color={isError ? "#FC8181" : "#535862"}
                >
                  <Flex
                    boxSize="40px"
                    alignItems="center"
                    justifyContent="center"
                    border="1px solid #E9EAEB"
                    borderRadius="8px"
                  >
                    <FiUploadCloud fontSize={"16px"} fontWeight="700" />
                  </Flex>
                  <Flex flexDirection="column">
                    <Text
                      textAlign={"center"}
                      fontSize={"14px"}
                      fontWeight={400}
                    >
                      <span style={{ fontWeight: 600 }}>Click to upload</span>{" "}
                      or drag and drop
                    </Text>
                    <Text
                      textAlign={"center"}
                      fontSize={"12px"}
                      fontWeight={400}
                    >
                      {formattedFileTypes} {`(max. ${maxFileSize})`}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            )}
          </FileUploader>
        )}
        {isError && (
          <Text
            color="#e53e3e"
            mt="1px"
            fontSize="11px"
            pos="absolute"
            className={errorClassName}
          >
            {/* @ts-expect-error ignore */}
            {errorMsg?.message || "This field is required "}
          </Text>
        )}
      </Box>
      {imageState?.map(
        (m: { file: string; id: string | number }, index: number) => (
          <AppFilePreview
            key={m?.file}
            obj={m}
            handleRemove={handleRemove}
            progress={uploadProgress || 0}
            // @ts-expect-error ignore
            fileData={fileData[index]}
          />
        )
      )}
    </Flex>
  );
};

export default AppFileUpload;
