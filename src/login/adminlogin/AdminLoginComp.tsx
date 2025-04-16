import makePostRequest from "../../api/makePostRequest";
import { Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { POST_LOGIN_API } from "../../api-utils";
import AppButton from "../../AppComponents/AppButton-agent";
import AppText from "../../AppComponents/AppText-agent";
import useManageCookies from "../../utils/hooks/useSetCookiesOnSuccess";
import { getErrorMsg } from "../../utils/functions/commonFunctions";
import { ADMIN_DASHBOARD } from "../../pages/Auth/AgentComponents/navigation/urls";
import InputRenderer from "./InputRenderer";
import { useMutation } from "react-query";

const AdminLoginComp = ({
  // comp,
  setComp,
}: {
  // comp: unknown
  setComp: unknown;
}) => {
  const { handleSetCookiesOnSuccess } = useManageCookies();
  const navigate = useNavigate();
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      phone: "",
    },
  });

  const { isLoading, mutate, error } = useMutation(
    (body: any) => makePostRequest(POST_LOGIN_API, body),
    {
      onSuccess: (res) => {
        handleSetCookiesOnSuccess(res);
        navigate(ADMIN_DASHBOARD);
      },
    }
  );

  const inputList = [
    {
      label: "Email address",
      name: "email",
      placeholder: "your@email.com",
      otherRegProps: {
        pattern: {
          pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,20})+$/,
          message: "Invalid email address",
        },
      },
    },
    {
      label: "Password",
      name: "password",
      placeholder: "your password",
      isPassword: true,
    },
  ];

  const handleFormSubmit = (val: unknown) => {
    const dataToSubmit = {
      //@ts-expect-error ignore
      ...val,
      login_type: "admin",
    };
    mutate(dataToSubmit);
  };

  const onSuccess = (val: unknown) => handleFormSubmit(val);
  const onError = (err: unknown) => console.error("Error occured", err);

  return (
    <div>
      <form onSubmit={handleSubmit(onSuccess, onError)}>
        <AppText
          className="text-center font-[500] text-[18px] mb-[29px]"
          text="Login to your account"
        />
        <Flex gap={"14px"} flexFlow={"column"}>
          {inputList?.map((i) => (
            <InputRenderer
              className="w-full max-w-[510px]"
              wrapperClassName="flex flex-col gap-[4px] text-[14px]"
              labelClassName="font-[500]"
              inputObj={i}
              key={i?.name}
              register={register}
              control={control}
              errors={errors}
            />
          ))}
        </Flex>
        <AppText
          //@ts-expect-error ignore
          onClick={() => setComp("forgot-password")}
          className="!text-[#206BC4] cursor-pointer text-center text-[14px] mt-[10px]"
          text="Forgot Password?"
        />
        <Flex>
          <AppButton
            isLoading={isLoading}
            className="w-full mt-[30px]"
            //@ts-expect-error ignore
            type="submit"
          >
            Sign in
          </AppButton>
        </Flex>
        <AppText
          className="err-text mt-[20px]"
          //@ts-expect-error ignore
          text={getErrorMsg(error)}
        />
      </form>
    </div>
  );
};

export default AdminLoginComp;
