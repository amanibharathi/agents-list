import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { forwardRef } from "react";
import { AppRadioProps } from "./types/types";
import AppText from "../AppText";
import { Controller } from "react-hook-form";

const AppRadio = forwardRef<HTMLInputElement, AppRadioProps>(
  ({
    name,
    // value,
    defaultValue,
    // isRequired,
    // isDisabled,
    isReadOnly,
    size = "md",
    // isInvalid,
    error,
    options = [],
    // formControlClassName = "",
    inputControlClassName = "",
    errorClassName = "",
    // formControlStyles,
    // radioStyles,
    radioOptionsWrapperStyles,
    formControlClassName,
    control,
    ...restProps
  }) =>
    // ref
    {
      const getErrorMsgFromObj = (errObj: unknown) => {
        //@ts-expect-error ignore
        return name?.split(".")?.reduce((acc, key) => acc?.[key], errObj);
      };

      const errorMsg = getErrorMsgFromObj(error);

      return (
        <FormControl className={formControlClassName} isInvalid={!!errorMsg}>
          <Controller
            control={control}
            name={name}
            {...restProps}
            render={({ field: { onChange, value } }) => (
              <RadioGroup
                onChange={(event) => {
                  onChange(event);
                  if (restProps?.onChange) {
                    restProps.onChange(event);
                  }
                }}
                value={value}
                defaultValue={defaultValue}
                // ref={ref}
                sx={{ pointerEvents: isReadOnly ? "none" : "auto" }}
              >
                <Flex
                  gap="20px"
                  alignItems="center"
                  sx={{
                    color: "black",
                    ...radioOptionsWrapperStyles,
                  }}
                >
                  {options?.map((option) => (
                    <Radio
                      key={option?.value}
                      value={option?.value?.toString()}
                      size={size}
                      className={inputControlClassName}
                      colorScheme="green"
                      outline="2px solid #38A169"
                      // sx={{ alignItems: "baseline" }}
                      sx={{ pointerEvents: "none" }}
                    >
                      <Box>
                        <AppText fontSize="16px">{option?.label}</AppText>
                        {option?.desc && (
                          <AppText sx={{ mt: "17px" }} fontSize="16px">
                            {option?.desc}
                          </AppText>
                        )}
                      </Box>
                    </Radio>
                  ))}
                </Flex>
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
              </RadioGroup>
            )}
          />
        </FormControl>
      );
    }
);

AppRadio.displayName = "AppRadio";

export default AppRadio;
