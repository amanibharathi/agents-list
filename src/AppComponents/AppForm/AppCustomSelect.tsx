/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck ignore
import { Select } from "chakra-react-select";
import {
  Avatar,
  Box,
  Flex,
  Text,
  CloseButton,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { IoCheckmark } from "react-icons/io5";
import { CiCircleQuestion } from "react-icons/ci";
import { Controller } from "react-hook-form";
import { AppSelectProps } from "./types/types";

const DropdownIndicator = (props: any) => {
  return (
    <Box {...props.innerProps} px="8px">
      <CiCircleQuestion size="20px" color="gray" />
    </Box>
  );
};

const CustomSingleValue = ({
  data,
  onChange,
}: {
  data: any;
  clearValue: () => void;
  onChange: (value: any) => void;
}) => (
  <Flex flexDirection="column" gap="10px" className="figtree-font">
    <Text fontSize="14px" fontWeight="600">
      Your Selection
    </Text>
    <Flex
      p="16px"
      borderRadius="8px"
      justifyContent="space-between"
      w="100%"
      border="1px solid #1C489F"
    >
      <Flex width="100%" alignItems="center" gap="50px" p="16px 20px">
        <Flex width="250px" alignItems="center">
          {data?.image && <Avatar src={data?.image} boxSize="50px" mr={4} />}
          <Box>
            <Text color="#1A1C1E" fontWeight="bold">
              {data?.label
                ? data?.label
                : data?.first_name
                ? `${data?.first_name} ${data?.last_name}`
                : "aa"}
            </Text>
            {!!data?.licenseNo && (
              <Text fontSize="13px" color="#717171">
                {data?.licenseNo}
              </Text>
            )}
          </Box>
        </Flex>
        <Flex flexDirection="column">
          <Text>{data?.email}</Text>
          <Text fontSize="13px" color="#717171">
            {data?.location || data?.phone_number}
          </Text>
        </Flex>
      </Flex>
      <CloseButton
        onClick={() => {
          onChange(null);
        }}
        color="red.500"
      />
    </Flex>
  </Flex>
);

const CustomOption = (props: any) => {
  const { data, isSelected, innerRef, innerProps } = props;
  return (
    <Box
      ref={innerRef}
      {...innerProps}
      p="15px 25px"
      _hover={{ bg: "gray.100" }}
      bg={isSelected ? "#FAFAFA" : "white"}
      border={isSelected ? "1px solid #E2E8F0" : "1px solid transparent"}
    >
      <Flex alignItems="center" justifyContent="space-between" gap="30px">
        <Flex width="100%" alignItems="center" gap="50px">
          <Flex width="250px" alignItems="center">
            {data?.image && <Avatar src={data?.image} boxSize="50px" mr={4} />}
            <Box>
              <Text color="#1A1C1E" fontWeight="bold">
                {data?.label}
              </Text>
              <Text fontSize="13px" color="#717171">
                {data?.licenseNo}
              </Text>
            </Box>
          </Flex>
          <Flex flexDirection="column">
            <Text>{data?.email}</Text>
            <Text fontSize="13px" color="#717171">
              {data?.location}
            </Text>
          </Flex>
        </Flex>
        {isSelected && <IoCheckmark color="#1A9175" size="24px" />}
      </Flex>
    </Box>
  );
};

const AppCustomSelect: React.FC<AppSelectProps> = ({
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
  menuMaxHeight = false,
  isClearable = false,
  CustomOptionFromProps,
  customBottomContent,
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
              {_val ? (
                <CustomSingleValue data={_val} onChange={onChange} />
              ) : (
                <Select
                  options={getOptions()}
                  placeholder={placeholder ?? "Select"}
                  value={getValue(_val)}
                  defaultValue={getValue(_val)}
                  components={{
                    Option: optionComponent,
                    DropdownIndicator: DropdownIndicator,
                  }}
                  {...restProps}
                  onChange={(value) => {
                    onChange(value);
                  }}
                  isRequired={isRequired}
                  isDisabled={isDisabled}
                  isInvalid={isInvalid}
                  onInputChange={onInputChange}
                  onFocus={onFocus}
                  errorBorderColor="red.300"
                  isLoading={isLoading}
                  isReadOnly={readonly}
                  isClearable={isClearable}
                  required={isRequired}
                  classNamePrefix={selectPrefixClassName}
                  className={`outline-none ${selectControlClassName}`}
                  chakraStyles={{
                    control: (provided) => ({
                      ...provided,
                      height: "50px",
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
              )}

              {customBottomContent && !_val && customBottomContent}
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
          // onChange={setSelectedOption}
          isRequired={isRequired}
          isDisabled={isDisabled}
          isClearable={isClearable}
          isLoading={isLoading}
          chakraStyles={{
            control: (provided) => ({
              ...provided,
              height: "50px",
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

export default AppCustomSelect;
