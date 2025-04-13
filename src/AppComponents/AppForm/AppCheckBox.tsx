/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import {
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { AppCheckboxProps } from "./types/types";
import AppText from "../AppText";

const AppCheckbox: React.FC<AppCheckboxProps> = ({
  name,
  control,
  isRequired,
  isInvalid,
  error,
  size = "lg",
  isDisabled = false,
  readonly = false,
  formControlStyles,
  formControlClassName = "",
  errorClassName = "",
  checkboxStyles,
  options = [],
  checkboxOptionsLableStyles,
  ...restProps
}) => {
  const getErrorMsgFromObj = (errObj: unknown) => {
    //@ts-expect-error ignore
    return name?.split(".")?.reduce((acc, key) => acc?.[key], errObj);
  };

  const errorMsg = getErrorMsgFromObj(error);
  return (
    <div>
      <FormControl
        sx={{ ...formControlStyles }}
        className={`app-checkbox ${formControlClassName}`}
        isInvalid={!!errorMsg}
      >
        <Controller
          name={name}
          control={control}
          {...restProps}
          render={({ field: { onChange, value } }) => (
            <CheckboxGroup
              defaultValue={value}
              onChange={onChange}
              isDisabled={isDisabled}
              value={value}
            >
              <Flex
                flexDirection="column"
                gap="20px"
                sx={{ ...checkboxStyles }}
              >
                {options?.map((each: any) => {
                  return (
                    <Checkbox
                      key={each?.value}
                      value={each?.value}
                      readOnly={readonly}
                      size={size}
                      isRequired={isRequired}
                      isInvalid={isInvalid}
                      colorScheme="green"
                      gap="12px"
                      // {...restProps}
                    >
                      <AppText
                        fontSize="16px"
                        sx={{ ...checkboxOptionsLableStyles }}
                      >
                        {each.label}
                      </AppText>
                    </Checkbox>
                  );
                })}
              </Flex>
            </CheckboxGroup>
          )}
        />
        {!!errorMsg && (
          <FormErrorMessage
            mt="1px"
            fontSize="11px"
            pos="absolute"
            className={errorClassName}
          >
            {/* @ts-expect-error ignore */}
            {errorMsg?.message || "This field is required"}
          </FormErrorMessage>
        )}
      </FormControl>
    </div>
  );
};

AppCheckbox.displayName = "AppCheckbox";

export default AppCheckbox;
