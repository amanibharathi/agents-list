import { useMutation } from "react-query";
import toast from "react-hot-toast";

import { GET_EXPORT_DATA } from "../../api-utils";
import makePostRequest from "../../api/makePostRequest";

const useHandleExportData = () => {
  const { isLoading, mutate } = useMutation(
    //@ts-expect-error ignore
    (body) => makePostRequest(GET_EXPORT_DATA(), { ...body }),

    {
      onSuccess: () => {
        toast.success(
          "Data export initialized, once done the report will be sent to your ROA email id"
        );
      },
    }
  );
  const generateData = (obj: any) => {
   
    mutate({ ...obj });
  };

  return { isLoading, generateData };
};

export default useHandleExportData;
