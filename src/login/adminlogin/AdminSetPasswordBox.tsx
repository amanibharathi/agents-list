import { POST_RESET_PASSWORD } from "../../api-utils";
import AppButton from "../../AppComponents/AppButton-agent";
import AppText from "../../AppComponents/AppText-agent";
import makePostRequest from "../../api/makePostRequest";
import { Box, Flex } from "@chakra-ui/react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import InputRenderer from "./InputRenderer";
import LoginBottomLink from "../LoginForms/LoginBottomLink";
import {
  ADMIN_LOGIN,
  MAKE_ABSOLUTE_URL,
} from "../../pages/Auth/AgentComponents/navigation/urls";

const AdminSetPasswordBox = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const resetPassId = searchParams.get("id");
  const resetPassToken = searchParams.get("token");
  const navigate = useNavigate();

  const {
    register,
    control,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { isLoading, mutate, error } = useMutation({
    mutationFn: (body: any) =>
      makePostRequest(POST_RESET_PASSWORD(resetPassId, resetPassToken), body),
    onSuccess: () => {
      setIsSuccess(true);
    },
    onError: () => {
      setIsSuccess(false);
    },
  });

  const inputList = [
    {
      label: "Enter Password",
      name: "password",
      placeholder: "******",
      isPassword: true,
      otherRegProps: {
        minLength: {
          value: 8,
          message: "Password must be at least 8 characters long",
        },
      },
    },
    {
      label: "Re-enter Password",
      name: "confirm_password",
      placeholder: "******",
      isPassword: true,
      otherRegProps: {
        validate: (value: any) =>
          value === watch("password") || "Passwords do not match",
      },
    },
  ];

  const handleFormSubmit = (val: unknown) => {
    const dataToSubmit = {
      //@ts-expect-error ignore
      ...val,
    };
    mutate(dataToSubmit);
  };

  const onSuccess = (val: unknown) => handleFormSubmit(val);
  const onError = (err: unknown) => console.error("Error occured", err);

  return (
    <div>
      {!isSuccess ? (
        <form onSubmit={handleSubmit(onSuccess, onError)}>
          <AppText
            className="text-center font-[500] text-[18px] mb-[29px]"
            text="Reset Your Password"
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
          <Flex>
            <AppButton
              isLoading={isLoading}
              className="w-full mt-[30px]"
             
              type="submit"
            >
              Reset Password
            </AppButton>
          </Flex>
          <AppText
            className="err-text mt-[20px]"
            //@ts-expect-error ignore
            text={error?.response?.data?.data}
          />
        </form>
      ) : (
        <Box>
          <AppText
            className="text-center font-[500] text-[18px] mb-[20px]"
            text="Success!"
          />
          <AppText
            text={
              "Your password has been successfully reset. Click the link below to login with your new password:"
            }
            className="text-[10px] md:text-[14px] text-center text-[#1D273B] mb-[6px] md:mb-[8px]"
          />
          <div className="flex justify-center mt-[5px] md:mt-[10px] mb-[20px]">
            <LoginBottomLink
              text=""
              linkText="Click here to Login"
              onClick={() => navigate(MAKE_ABSOLUTE_URL(ADMIN_LOGIN))}
            />
          </div>
        </Box>
      )}
    </div>
  );
};

export default AdminSetPasswordBox;
