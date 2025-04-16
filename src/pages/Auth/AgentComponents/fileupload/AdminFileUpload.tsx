import { Box, Flex, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import FilePreview from "./FilePreview";
import { BiCloudUpload } from "react-icons/bi";
import { FileUploader } from "react-drag-drop-files";

import useUploadFiles from "../../../../utils/hooks/useUploadFiles";
import CropModal from "../admincompenets/CropModal";
import useCropImage from "../admincompenets/useCropImage";

interface IAdminFileUpload {
  handleChange?: any;
  fileTypes?: string | string[];
  disabled?: boolean;
  imageState: any;
  handleRemoveImage?: any;
  maxW?: string;
  placeholder?: string;
  fileTypeKey?: string;
  uploadKey: string;
  setImageState?: any;
  handleUpload?: any;
  isError?: any;
  formMessage?: string;
  name?: string;
  customUiBody?: any;
  customUploadUiList?: any;
  customEndPoint?: any;
  isAgentFile?: any;
  customType?: any;
  onSuccess?: any;
  required?: boolean;
  isToolsImage?: boolean;
  isCms?: boolean;
  customClassName?: string;
  isForm?: boolean;
  isCropAble?: boolean;
  dimension?: number;
  forceUiList?: boolean;
  forceLabel?: any;
  multiFiles?: boolean;
}

const AdminFileUpload = ({
  // handleChange,
  customClassName = "",
  fileTypes,
  disabled = false,
  imageState = [],
  handleRemoveImage,
  maxW,
  placeholder = "upload files",
  uploadKey,
  fileTypeKey = "file",
  setImageState,
  handleUpload,
  isError,
  formMessage = "This field cannot be empty",
  name,
  customUiBody,
  customUploadUiList,
  customEndPoint,
  isAgentFile = false,
  customType = "",
  required = false,
  onSuccess,
  isToolsImage = false,
  isCms = false,
  isForm = false,
  isCropAble = false,
  dimension,
  forceUiList = false,
  forceLabel,
  multiFiles = false,
}: IAdminFileUpload) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [fileName, setFileName] = useState(null);
  const { fileMutate, fileIsLoading } = useUploadFiles({
    customEndPoint: customEndPoint,
    key: uploadKey,
    fileTypeKey: fileTypeKey,
    onSuccess(res) {
      onClose();
      setImageState([res?.data]);
      setFileName(res?.data?.file?.split("/")?.pop());
      onSuccess && onSuccess();
    },
    isForm: isForm,
  });

  const appendAndMutate = (file: Blob) => {
    const formData = new FormData();
    formData.append(
      isToolsImage || isCms
        ? "image"
        : isForm
        ? "contact_form_image"
        : multiFiles
        ? "files"
        : "file",
      file
    );

    // customType is for addition data that has to send along with file data
    if (customType) {
      Object.keys(customType)?.map((each: any) => {
        formData.append(each, customType[each]);
      });
    }
    //@ts-expect-error ignore
    fileMutate(formData);
  };

  const {
    onDownloadCropClick,
    onImageLoad,
    onSelectFile,
    imgSrc,
    imgRef,
    crop,
    setCrop,
    setCompletedCrop,
    aspect,
    previewCanvasRef,
    completedCrop,
    downloadAnchorTag,
  } = useCropImage({ onSave: appendAndMutate, dimension: dimension });

  const handleChangeInComponent = (file: any) => {
    if (isCropAble) {
      onSelectFile(file);
      onOpen();
      //custom file upload
    } else if (handleUpload) {
      handleUpload(file);
    } else {
      appendAndMutate(file);
    }
  };

  const handleRemoveInComponent = (file: any) => {
    if (handleRemoveImage) {
      handleRemoveImage(file);
    } else {
      const filteredImg = imageState?.filter((f: any) => f?.id !== file?.id);
      setImageState(filteredImg);
    }
  };

  return (
    <Flex
      className={`app-file-upload ${customClassName}`}
      w="100%"
      maxW={`${maxW} !important`}
      flexFlow={"column"}
      // p="10px"
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
            disabled={disabled}
            handleChange={handleChangeInComponent}
            name={name || "file"}
            types={fileTypes}
            label={placeholder}
            required={required}
          >
            {customUiBody ? (
              customUiBody(fileIsLoading)
            ) : (
              <Flex
                flexFlow={"column"}
                p="25px"
                w={"100%"}
                //   minH={noImageIcon ? null : '104px'}
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
                      {forceLabel ? forceLabel : fileName ?? placeholder}
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
      {(!imageState?.length && !isAgentFile) || forceUiList ? (
        <>
          {customUploadUiList ? (
            customUploadUiList(imageState)
          ) : (
            <Flex mt={isCms ? "" : imageState?.[0] ? "52px" : ""}>
              {imageState?.map((m: any) => (
                <FilePreview
                  key={m?.file}
                  obj={m}
                  src={m?.file || m?.image}
                  handleRemove={handleRemoveInComponent}
                  isFile={fileTypeKey == "file"}
                />
              ))}
            </Flex>
          )}
        </>
      ) : null}{" "}
      <CropModal
        isOpen={isOpen}
        onClose={onClose}
        imgRef={imgRef}
        imgSrc={imgSrc}
        onImageLoad={onImageLoad}
        crop={crop}
        setCrop={setCrop}
        setCompletedCrop={setCompletedCrop}
        aspect={aspect}
        onDownloadCropClick={onDownloadCropClick}
        previewCanvasRef={previewCanvasRef}
        completedCrop={completedCrop}
        isLoading={fileIsLoading}
      />
      {downloadAnchorTag}
    </Flex>
  );
};

export default AdminFileUpload;
