import { IInputList } from "../../AppComponents/AppForm/types/types";

export const loginInputFields = (): IInputList[] => {
  return [
    {
      thisWrapperClassName: "",
      render: [
        {
          type: "text",
          name: "email",
          label: "Email",
          placeholder: "Enter your Email",
        },
      ],
    },
    {
      thisWrapperStyles: {
        display: "grid",
      },
      render: [
        {
          type: "password",
          name: "password",
          label: "Password",
          placeholder: "Enter your password",
        },
      ],
    },
  ];
};

export const signupInputFields = ({
  metaData,
  handleOnInputChange,
  metaDataIsLoading,
}: {
  metaData: unknown;
  handleOnInputChange: (val: string) => void;
  metaDataIsLoading: boolean;
}): IInputList[] => {
  return [
    {
      thisWrapperStyles: {
        gap: "15px",
        gridTemplateColumns: { base: "auto", md: "1fr 1fr" },
      },
      render: [
        {
          type: "text",
          name: "first_name",
          label: "First Name",
          placeholder: "First Name",
        },
        {
          type: "Last",
          name: "last_name",
          label: "Last Name",
          placeholder: "Last Name",
        },
      ],
    },
    {
      thisWrapperClassName: "",
      render: [
        {
          type: "text",
          name: "email",
          label: "Email",
          placeholder: "Enter your Email",
        },
      ],
    },
    {
      thisWrapperClassName: "",
      render: [
        {
          type: "tel",
          name: "phone_number",
          label: "Phone Number",
          placeholder: "Enter your Phone Number",
        },
      ],
    },
    {
      thisWrapperClassName: "",
      render: [
        {
          type: "select",
          name: "primary_state",
          label: "Primary State",
          placeholder: "Select your State",
          //@ts-expect-error ignore
          options: metaData?.data?.results,
          inputOptions: {
            isLoading: metaDataIsLoading,
            onInputChange: handleOnInputChange,
          },
        },
      ],
    },
    {
      thisWrapperStyles: {},
      render: [
        {
          type: "password",
          name: "password",
          label: "Password",
          placeholder: "Create a password",
          bottomDesc: "Must be at least 8 characters.",
          otherRegProps: {
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long.",
            },
            // pattern:
            //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            // message:
            //   "Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.",
          },
        },
      ],
    },
    {
      thisWrapperStyles: {},
      render: [
        {
          type: "password",
          name: "confirm_password",
          label: "Confirm Password",
          placeholder: "Confirm your password",
        },
      ],
    },
  ];
};
