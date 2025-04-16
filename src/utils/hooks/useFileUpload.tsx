/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";
import axios from "axios";

const useUploadFiles = ({
  onSuccess,
  onError,
  customEndPoint,
}: {
  onSuccess?: (res: any) => void;
  onError?: (err: any) => void;
  customEndPoint?: string;
}) => {
  const API =
    customEndPoint ||
    "https://api-v2-staging.thelovehopecompany.com/api/user/session/workbook-and-response/upload/";

  const mutation = useMutation({
    mutationFn: (body) => {
      return axios.post(API, body, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            //@ts-expect-error ignore
            (progressEvent.loaded * 100) / progressEvent.total
          );
          //@ts-expect-error ignore
          body.progressCallback(percentCompleted);
        },
      });
    },
    onSuccess: (res) => {
      if (onSuccess) onSuccess(res);
    },
    onError: (err) => {
      if (onError) onError(err);
    },
  });

  return {
    fileMutate: mutation.mutate,
    fileIsLoading: mutation.isPending,
  };
};

export default useUploadFiles;
