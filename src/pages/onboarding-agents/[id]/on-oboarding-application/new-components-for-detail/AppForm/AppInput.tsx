"use client";
import {
  Box,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useState, forwardRef, useRef } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AppInputProps } from "./types/types";

const formatPhoneNumber = (value: string) => {
  // Remove all non-digit characters
  let digits = value.replace(/\D/g, "");

  // Limit to 10 digits
  if (digits.length > 10) {
    digits = digits.slice(0, 10);
  }

  // Apply formatting (123) 456-7890
  if (digits.length > 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  } else if (digits.length > 3) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  } else if (digits.length > 0) {
    return `(${digits}`;
  }

  return "";
};

const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  (
    {
      readonly = false,
      name,
      value,
      defaultValue,
      onChange,
      onInput,
      type,
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
      isPassword = false,
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
    const [showPassword, setShowPassword] = useState(true);
    const handlePasswordToggle = () => setShowPassword(!showPassword);
    const isBackspacePressed = useRef(false);

    const getErrorMsgFromObj = (errObj: unknown) => {
      //@ts-expect-error ignore
      return name?.split(".")?.reduce((acc, key) => acc?.[key], errObj);
    };

    const errorMsg = getErrorMsgFromObj(error);

    // Handle phone number formatting
    const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
      if (isBackspacePressed.current) {
        return;
      }
      if (type === "tel") {
        const formattedValue = formatPhoneNumber(event.currentTarget.value);
        event.currentTarget.value = formattedValue;
      }
      if (onInput) {
        onInput(event);
      }
    };

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
          <Input
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
            onChange={onChange}
            onInput={handleInput} // Apply formatting
            type={isPassword ? (showPassword ? "password" : "text") : type}
            required={isRequired}
            variant={variant}
            isDisabled={isDisabled}
            size={size}
            isInvalid={isInvalid}
            errorBorderColor="red.300"
            onKeyPress={onKeyPress}
            accept={accept}
            onKeyDownCapture={(e) => {
              isBackspacePressed.current = e.key === "Backspace";
              if (onKeyDownCapture) onKeyDownCapture(e);
            }}
            className={inputControlClassName}
            {...restProps}
          />
          {suffixContent && (
            <Box className={suffixClassName} height="auto">
              {suffixContent}
            </Box>
          )}
        </InputGroup>

        {isPassword && (
          <Box
            onClick={handlePasswordToggle}
            sx={{
              position: "absolute",
              right: 13,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 5,
              cursor: "pointer",
            }}
          >
            {showPassword ? (
              <FaRegEye color="#86888A" />
            ) : (
              <FaRegEyeSlash color="#86888A" />
            )}
          </Box>
        )}
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

AppInput.displayName = "AppInput";

export default AppInput;
