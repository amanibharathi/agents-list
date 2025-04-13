"use client";
import {
  Box,
  FormControl,
  FormErrorMessage,
  InputGroup,
  InputLeftAddon,
  Textarea,
} from "@chakra-ui/react";
import { forwardRef } from "react";
import { AppInputProps } from "./types/types";

const AppTextArea = forwardRef<HTMLInputElement, AppInputProps>(
  (
    {
      readonly = false,
      name,
      value,
      defaultValue,
      onChange,
      onKeyDown,
      id,
      isRequired,
      isDisabled,
      variant,
      size,
      isInvalid,
      onKeyPress,
      accept,
      min,
      error,
      placeholder = "",
      formControlClassName = "",
      onKeyDownCapture,
      prefixContent,
      suffixContent,
      prefixClassName,
      suffixClassName,
      inputInputGroupClassName,
      customPrefix,
      customprefixClassName,
      inputControlClassName = "",
      errorClassName = "",
      formControlStyles,
      ...restProps
    },
    ref
  ) => {
    const getErrorMsgFromObj = (errObj: unknown) => {
      //@ts-expect-error ignore
      return name?.split(".")?.reduce((acc, key) => acc?.[key], errObj);
    };

    const errorMsg = getErrorMsgFromObj(error);

    // console.log("errorserrors", errorMsg);

    return (
      <FormControl
        sx={{ ...formControlStyles }}
        className={`app-input ${formControlClassName}`}
        isInvalid={!!errorMsg}
      >
        <InputGroup className={` ${inputInputGroupClassName}`}>
          {prefixContent && (
            <InputLeftAddon className={prefixClassName} height="auto">
              {prefixContent}
            </InputLeftAddon>
          )}
          {customPrefix && (
            <Box className={customprefixClassName} height="auto">
              {customPrefix}
            </Box>
          )}
          <Textarea
            border={"1px solid #D5D7DA"}
            //@ts-expect-error //ignore
            onWheel={(e) => e.target.blur()}
            bg="white"
            min={min}
            step="any"
            readOnly={readonly}
            id={id}
            ref={ref}
            placeholder={placeholder}
            name={name}
            value={value}
            defaultValue={defaultValue}
            //@ts-expect-error ignore
            onChange={onChange}
            //@ts-expect-error ignore
            onKeyDown={onKeyDown}
            required={isRequired}
            variant={variant}
            isDisabled={isDisabled}
            size={size}
            isInvalid={isInvalid}
            errorBorderColor="red.300"
            //@ts-expect-error ignore
            onKeyPress={onKeyPress}
            accept={accept}
            //@ts-expect-error ignore
            onKeyUpCapture={onKeyDownCapture}
            className={inputControlClassName}
            {...restProps}
          />
          {suffixContent && (
            <Box className={suffixClassName} height="auto">
              {suffixContent}
            </Box>
          )}
        </InputGroup>

        {!!errorMsg && (
          <FormErrorMessage
            mt="1px"
            fontSize="11px"
            pos="absolute"
            className={errorClassName}
          >
            {/* @ts-expect-error ignore */}
            {errorMsg?.message || "This field is required "}
          </FormErrorMessage>
        )}
      </FormControl>
    );
  }
);

AppTextArea.displayName = "AppTextArea";

export default AppTextArea;
