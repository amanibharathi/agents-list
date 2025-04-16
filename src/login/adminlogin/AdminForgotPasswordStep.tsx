import makePostRequest from "../../api/makePostRequest";
import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import InputRenderer from "./InputRenderer";
import { GET_FORGOT_PASSWORD_LINK } from "../../api-utils";
import AppButton from "../../AppComponents/AppButton-agent";
import AppText from "../../AppComponents/AppText-agent";

const AdminForgotPasswordStep = () => {
  const [isLinkSent, setIsLinkSent] = useState(false);

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { isLoading, mutate, error } = useMutation({
    mutationFn: (body: any) => makePostRequest(GET_FORGOT_PASSWORD_LINK, body),

    onSuccess: () => {
      setIsLinkSent(true);
    },
    onError: () => {
      setIsLinkSent(false);
    },
  });

  const inputList = [
    {
      label: "Please enter your email to get a link to reset password",
      name: "email",
      placeholder: "Enter e-mail id",
      otherRegProps: {
        pattern: {
          pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,20})+$/,
          message: "Invalid email address",
        },
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

  const errMsg =
    //@ts-expect-error ignore
    error?.response?.data?.data?.email ?? error?.response?.data?.data;

  return (
    <div>
      {!isLinkSent ? (
        <form onSubmit={handleSubmit(onSuccess, onError)}>
          <AppText
            className="text-center font-[500] text-[18px] mb-[29px]"
            text="Forgot Password"
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
              //@ts-expect-error ignore
              type="submit"
            >
              Reset Password
            </AppButton>
          </Flex>
          <AppText
            className="err-text mt-[20px]"
            //@ts-expect-error ignore
            text={errMsg}
          />
        </form>
      ) : (
        <Box>
          <AppText
            className="text-center font-[500] text-[18px] mb-[20px]"
            text="Forgot Password"
          />
          <AppText
            text={
              "You would have received an e-mail with the reset link. Please check your inbox."
            }
            className="text-[10px] md:text-[14px] text-center text-[#1D273B] mb-[6px] md:mb-[8px]"
          />
        </Box>
      )}
    </div>
  );
};

export default AdminForgotPasswordStep;
