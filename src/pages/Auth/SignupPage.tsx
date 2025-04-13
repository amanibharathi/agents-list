import { Box, Flex } from "@chakra-ui/react";
import SignupAndLoginHeaders from "./components/SignupAndLoginHeaders";
import AppInputRenderer from "../../AppComponents/AppForm/AppInputRenderer";
import { useForm } from "react-hook-form";
import AppButton from "../../AppComponents/AppButton";
import { signupInputFields } from "./auth.data";
import { useMutation } from "@tanstack/react-query";
import makePostRequest from "../../api/makePostRequest";
import {
  GET_STATES_META_API,
  POST_SIGNUP_API,
} from "../../api/endpoints/endpoints";
import useGetMetaFromApi from "../../utils/hooks/useGetMetaFromApi";
import AppText from "../../AppComponents/AppText";
import { FORM_STARTING_PAGE, LOGIN_LINK } from "../../navigation/navigation";
import AppLink from "../../AppComponents/AppLink";
import {
  convertToE164,
  setFormErrors,
  showToastError,
} from "../../utils/functions/commonFunctions";
import { useNavigate } from "react-router-dom";
import useHandleUserData from "../../utils/hooks/useHandleUserData";
import { useEffect } from "react";
import { getUserToken } from "../../utils/functions/tokenAndUserData";
import toast from "react-hot-toast";

interface ISignUpInSuccess {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  confirm_password: string;
  primary_state:
    | {
        label: string;
        value: string;
      }
    | string;
}

const Signup = () => {
  useEffect(() => {
    if (getUserToken()) naviagte(FORM_STARTING_PAGE);
  }, []);
  const formUtils = useForm();
  console.log("errors", formUtils?.formState?.errors);
  console.log("watch", formUtils?.watch());
  const naviagte = useNavigate();
  const { setTokenAndUserDataInCookiesAndZustand } = useHandleUserData();

  const { metaData, handleOnInputChange, metaDataIsLoading } =
    useGetMetaFromApi({
      endPoint: GET_STATES_META_API,
    });

  const { mutate, isPending } = useMutation({
    mutationFn: (body) => makePostRequest(POST_SIGNUP_API, body),
    onSuccess: (data: unknown) => {
      toast.success("Signup successful");

      setTokenAndUserDataInCookiesAndZustand({
        //@ts-expect-error ignore
        token: data?.data?.token,
        //@ts-expect-error ignore
        userData: data?.data,
      });
      naviagte(FORM_STARTING_PAGE);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error("Error:", error);
      showToastError(error?.response?.data);
      setFormErrors(error?.response?.data, formUtils?.setError);
    },
  });

  const _signupInput = signupInputFields({
    metaData,
    handleOnInputChange,
    metaDataIsLoading,
  });

  const onSuccess = (data: ISignUpInSuccess) => {
    if (data?.password !== data?.confirm_password) {
      formUtils?.setError("confirm_password", {
        message: "Password does not match",
      });
    }
    //@ts-expect-error modifying for submisison
    data.primary_state = data?.primary_state?.value;
    data.phone_number = convertToE164(data?.phone_number);
    //@ts-expect-error ignore
    mutate(data);
    console.log("FINAL", data);
  };

  return (
    <Flex width="100%" justifyContent="center" px="32px">
      <Flex width="420px" flexDirection="column" gap="30px">
        <SignupAndLoginHeaders
          title="Create an Account"
          desc="Your real estate success starts here. Create your account to start
            your ROA journey."
        />
        <Box>
          {/* @ts-expect-error ignore */}
          <form onSubmit={formUtils?.handleSubmit(onSuccess)}>
            <AppInputRenderer
              register={formUtils?.register}
              control={formUtils?.control}
              inputList={_signupInput}
              errors={formUtils?.formState?.errors}
              boxWrapperStyles={{ gap: "19px" }}
            />
            <AppButton
              isLoading={isPending}
              type="submit"
              sx={{ mt: "24px" }}
              variant={"authSubmitBtn"}
            >
              Get started
            </AppButton>
          </form>
          <AppText
            sx={{
              color: "#535862",
              fontSize: "14px",
              mt: "32px",
              textAlign: "center",
            }}
          >
            Already have an account?{" "}
            <AppLink to={LOGIN_LINK} className="auth-bottom-link-tag">
              Login
            </AppLink>{" "}
          </AppText>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Signup;
