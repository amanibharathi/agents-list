import { QueryObserverResult, useMutation } from "react-query";
import makePostRequest from "../../api/makePostRequest";
import toast from "react-hot-toast";
import { showToastError } from "../functions/commonFunctions";

const useMutateShortHand = ({
  endpoint,
  refetch,
  customOnSuccess,
}: {
  customOnSuccess?: () => void;
  endpoint: string;
  refetch?: () => Promise<QueryObserverResult<unknown, unknown>>;
}) => {
  const { mutate, isLoading } = useMutation(
    (body) => makePostRequest(endpoint, body),
    {
      onSuccess: () => {
        if (refetch) refetch();
        if (customOnSuccess) customOnSuccess();
        toast.success("Updated Successfully");
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        console.error("Error:", error);
        showToastError(error?.response?.data);
      },
    }
  );
  return { mutate, isLoading };
};

export default useMutateShortHand;
