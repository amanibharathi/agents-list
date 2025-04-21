// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { Box, Flex } from "@chakra-ui/react";
import SignupAndLoginHeaders from "./components/SignupAndLoginHeaders";
import { useForm } from "react-hook-form";
import AppInputRenderer from "../../AppComponents/AppForm/AppInputRenderer";
import { loginInputFields } from "./auth.data";
import AppButton from "../../AppComponents/AppButton";
import { useMutation } from "react-query";
import makePostRequest from "../../api/makePostRequest";
import { POST_LOGIN_API } from "../../api/endpoints/endpoints";
import AppText from "../../AppComponents/AppText";
import AppLink from "../../AppComponents/AppLink";
import { FORM_STARTING_PAGE, SIGNUP_LINK } from "../../navigation/navigation";
import {
  setFormErrors,
  showToastError,
} from "../../utils/functions/commonFunctions";
import { useNavigate } from "react-router-dom";
import useHandleUserData from "../../utils/hooks/useHandleUserData";
import { useEffect } from "react";
import { getUserToken } from "../../utils/functions/tokenAndUserData";
import toast from "react-hot-toast";

const Login = () => {
  const formUtils = useForm();
  const _loginInput = loginInputFields();
  const naviagte = useNavigate();
  const { setTokenAndUserDataInCookiesAndZustand } = useHandleUserData();

  const { mutate, isPending } = useMutation({
    mutationFn: (body) => makePostRequest(POST_LOGIN_API, body),
    onSuccess: (data: unknown) => {
      toast.success("Login successful");
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

  const onSuccess = (data: {
    password: string;
    email: string;
    login_type: string;
  }) => {
    data.login_type = "agent";
    console.log("FINAL", data);
    //@ts-expect-error ignore
    mutate(data);
  };

  useEffect(() => {
    if (getUserToken()) naviagte(FORM_STARTING_PAGE);
  }, []);

  return (
    <Flex width="100%" justifyContent="center" px="32px" pt="50px">
      <Flex width="420px" flexDirection="column" gap="30px">
        <Box>
          <SignupAndLoginHeaders
            title=" Welcome Back!"
            desc="Sign in to continue your onboarding process."
          />
          <Box sx={{ mt: "32px" }}>
            {/* @ts-expect-error ignore */}
            <form onSubmit={formUtils?.handleSubmit(onSuccess)}>
              <AppInputRenderer
                register={formUtils?.register}
                control={formUtils?.control}
                inputList={_loginInput}
                errors={formUtils?.formState?.errors}
                boxWrapperStyles={{ gap: "20px" }}
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
          </Box>
          <AppText
            sx={{
              color: "#535862",
              fontSize: "14px",
              mt: "32px",
              textAlign: "center",
            }}
          >
            <AppLink to={"/"} className="auth-bottom-link-tag">
              Reset Password
            </AppLink>{" "}
            or{" "}
            <AppLink to={SIGNUP_LINK} className="auth-bottom-link-tag">
              Create an Account
            </AppLink>
          </AppText>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Login;
