// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { useMutation } from "react-query";

import toast from "react-hot-toast";

import makePostRequest from "../../api/makePostRequest";
import { POST_FILE } from "../../api-utils";
import { getFileUploadErrorMsg } from "../functions/commonFunctions";
import makePatchRequest from "../../api/makePatchRequest";

const useUploadFiles = ({
  key,
  fileTypeKey,
  onSuccess,
  onError,
  customEndPoint,
  isForm = false,
}: {
  key?: string;
  fileTypeKey?: string;
  onSuccess?: (res: any) => void;
  onError?: (err: any) => void;
  customEndPoint?: string;
  isForm?: boolean;
}) => {
  //@ts-expect-error ignore
  const API = customEndPoint ? customEndPoint : POST_FILE(key, fileTypeKey);
  const {
    isLoading: fileIsLoading,
    // isError,
    // error,
    mutate: fileMutate,
  } = useMutation(
    (body) =>
      isForm ? makePatchRequest(API, body) : makePostRequest(API, body),

    {
      onSuccess: (res) => {
        console.log(res);
        onSuccess && onSuccess(res);
      },
      onError: (err) => {
        
        const errMsg = getFileUploadErrorMsg(err);
        if (typeof errMsg === "string") {
          toast.error(errMsg);
        } else {
          toast.error("Failed to upload");
        }
        onError && onError(err);
      },
    }
  );

  return { fileMutate, fileIsLoading };
};

export default useUploadFiles;
