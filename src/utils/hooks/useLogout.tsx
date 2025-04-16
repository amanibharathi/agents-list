import { useMutation } from "react-query";
import { POST_LOGOUT_API } from "../../api/endpoints/endpoints";
import makePostRequest from "../../api/makePostRequest";
import { showToastError } from "../functions/commonFunctions";
import toast from "react-hot-toast";
import { clearTokenAndUserData } from "../functions/tokenAndUserData";

const useLogout = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (body) => makePostRequest(POST_LOGOUT_API, body),
    onSuccess: () => {
      clearTokenAndUserData();
      toast.success("Logged out");
      window.location.href = "/login";
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error("Error:", error);
      showToastError(error?.response?.data);
    },
  });

  return { isPending, mutate };
};

export default useLogout;
