/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck ignore
import { Select } from "chakra-react-select";
import {
  Box,
  Flex,
  Text,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { IoCheckmark } from "react-icons/io5";
import { CiCircleQuestion } from "react-icons/ci";
import { Controller } from "react-hook-form";
import { AppSelectProps } from "./types/types";
import React from "react";

const DropdownIndicator = (props: any) => {
  return (
    <Box {...props.innerProps} px="8px">
      <CiCircleQuestion size="20px" color="gray" />
    </Box>
  );
};

const CustomOption = (props: any) => {
  const { data, isSelected, innerRef, innerProps } = props;
  return (
    <Box
      ref={innerRef}
      {...innerProps}
      p="15px 25px"
      _hover={{ bg: "gray.100" }}
      bg={isSelected ? "#FAFAFA" : "white"}
      borderRadius="6px"
      mx="6px"
    >
      <Flex alignItems="center" justifyContent="space-between" gap="30px">
        <Flex alignItems="center">
          <Text color="#1A1C1E" fontWeight="500">
            {data.label}
          </Text>
        </Flex>
        {isSelected && <IoCheckmark color="#1A9175" size="24px" />}
      </Flex>
    </Box>
  );
};

const AppCustomMultiSelect: React.FC<AppSelectProps> = ({
  name,
  value,
  control,
  onInputChange,
  onFocus,
  isRequired,
  readonly = false,
  isDisabled,
  isInvalid,
  error,
  isLoading = false,
  placeholder = "Select an option",
  formControlClassName = "",
  selectControlClassName = "",
  selectPrefixClassName = "",
  errorClassName = "",
  formControlStyles,
  options = [],
  dontAlterOptions,
  zIndex = true,
  menuMaxHeight = false,
  isClearable = false,
  CustomOptionFromProps,
  ...restProps
}) => {
  const getErrorMsgFromObj = (errObj: unknown) => {
    //@ts-expect-error ignore
    return name?.split(".")?.reduce((acc, key) => acc?.[key], errObj);
  };
  const errorMsg = getErrorMsgFromObj(error);

  const getValue = (val: any) => {
    if (value?.id || value?.label || value?.identity) return value;
    else if (val) return val;
    else return null;
  };

  const getOptions = () => {
    if (dontAlterOptions) return options;
    return options?.map((m) => ({
      label: m?.identity || m?.label,
      value: m?.id || m?.value,
      ...m,
    }));
  };

  const optionComponent = CustomOptionFromProps || CustomOption;

  return (
    <Box w="100%">
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field: { value: _val, onChange } }) => (
            <FormControl
              sx={{ ...formControlStyles }}
              className={`app-select ${formControlClassName}`}
              isInvalid={!!errorMsg}
            >
              <Select
                options={getOptions()}
                placeholder={placeholder ?? "Select"}
                value={getValue(_val)}
                defaultValue={getValue(_val)}
                components={{
                  Option: optionComponent,
                  DropdownIndicator,
                }}
                {...restProps}
                onChange={onChange}
                isRequired={isRequired}
                isDisabled={isDisabled}
                isInvalid={isInvalid}
                isMulti={true}
                onInputChange={onInputChange}
                onFocus={onFocus}
                errorBorderColor="red.300"
                isLoading={isLoading}
                isReadOnly={readonly}
                isClearable={isClearable}
                required={isRequired}
                classNamePrefix={selectPrefixClassName}
                className={`${
                  zIndex ? "z-[9]" : ""
                } outline-none ${selectControlClassName}`}
                chakraStyles={{
                  control: (provided) => ({
                    ...provided,
                    height: "44px",
                    border: "1px solid #D5D7DA",
                    bg: "#fff",
                  }),
                  menuList: (provided) => ({
                    ...provided,
                    maxHeight: menuMaxHeight
                      ? menuMaxHeight
                      : provided?.maxHeight,
                    overflowY: "auto",
                  }),
                }}
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
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
          )}
        />
      ) : (
        <Select
          options={getOptions()}
          placeholder={placeholder ?? "Select"}
          components={{
            Option: optionComponent,
            DropdownIndicator,
          }}
          isRequired={isRequired}
          isDisabled={isDisabled}
          isClearable={isClearable}
          isLoading={isLoading}
          isMulti={true}
          chakraStyles={{
            control: (provided) => ({
              ...provided,
              height: "44px",
              border: "1px solid #D5D7DA",
              bg: "#fff",
            }),
          }}
          menuPortalTarget={document.body}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          {...restProps}
        />
      )}
    </Box>
  );
};

export default AppCustomMultiSelect;
