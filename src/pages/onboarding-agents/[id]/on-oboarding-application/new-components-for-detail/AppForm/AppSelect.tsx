/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck ignore
import { CreatableSelect, Select } from "chakra-react-select";
import { Controller } from "react-hook-form";
import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import { AppSelectProps } from "./types/types";

interface IAppSelectProps extends AppSelectProps {
  isCreateable?: boolean;
}

const AppSelect: React.FC<IAppSelectProps> = ({
  name,
  value,
  control,
  onChange,
  onInputChange,
  onFocus,
  onCreateOption,
  isRequired,
  readonly = false,
  isDisabled,
  variant,
  size = "",
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
  isMulti = false,
  zIndex = true,
  menuMaxHeight = false,
  isClearable = false,
  isCreateable = false,
  ...restProps
}) => {
  const getErrorMsgFromObj = (errObj: unknown) => {
    //@ts-expect-error ignore
    return name?.split(".")?.reduce((acc, key) => acc?.[key], errObj);
  };

  const errorMsg = getErrorMsgFromObj(error);

  const getValue = (val: any) => {
    if (value?.id || value?.label || value?.identity) return value;
    else if (val?.id && val?.identity)
      return {
        label: val?.identity,
        value: val?.id,
      };
    else if (typeof val == "string")
      return {
        label: val?.replaceAll("_", " ") ?? "",
        value: val ?? "",
      };
    else if (val) return val;
    else return null;
  };

  const getOptions = () => {
    if (dontAlterOptions) return options;
    return options?.map((m) => ({
      ...m,
      label: m?.identity || m?.label,
      value: m?.id || m?.value,
    }));
  };

  if (control) {
    return (
      <Controller
        name={name}
        control={control}
        {...restProps}
        render={({ field: { value: _val, onChange } }) => {
          return (
            <FormControl
              sx={{ ...formControlStyles }}
              className={`app-select ${formControlClassName}`}
              isInvalid={!!errorMsg}
            >
              {isCreateable ? (
                <CreatableSelect
                  chakraStyles={{
                    dropdownIndicator: (base) => ({
                      ...base,
                      background: "white",
                    }),
                    clearIndicator: (provided) => ({
                      ...provided,
                      fontSize: "9px",
                    }),
                    menuList: (provided) => ({
                      ...provided,
                      maxHeight: menuMaxHeight
                        ? menuMaxHeight
                        : provided?.maxHeight,
                      overflowY: "auto",
                    }),
                    control: (provided) => ({
                      ...provided,
                      height: "44px",
                      border: "1px solid #D5D7DA",
                      bg: "#fff",
                    }),
                  }}
                  variant={variant}
                  defaultValue={getValue(_val)}
                  isRequired={isRequired}
                  name={name}
                  {...restProps}
                  options={getOptions()}
                  isMulti={isMulti}
                  placeholder={placeholder ?? "Select"}
                  className={`${
                    zIndex ? "z-[9]" : ""
                  } outline-none ${selectControlClassName}`}
                  required={isRequired}
                  onChange={onChange}
                  isDisabled={isDisabled}
                  isInvalid={isInvalid}
                  onInputChange={onInputChange}
                  onFocus={onFocus}
                  errorBorderColor="red.300"
                  isLoading={isLoading}
                  isReadOnly={readonly}
                  isClearable={isClearable}
                  value={getValue(_val)}
                  classNamePrefix={selectPrefixClassName}
                  selectedOptionColorScheme="green"
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                  on
                  onCreateOption={onCreateOption}
                />
              ) : (
                <Select
                  chakraStyles={{
                    dropdownIndicator: (base) => ({
                      ...base,
                      background: "white",
                    }),
                    clearIndicator: (provided) => ({
                      ...provided,
                      fontSize: "9px",
                    }),
                    menuList: (provided) => ({
                      ...provided,
                      maxHeight: menuMaxHeight
                        ? menuMaxHeight
                        : provided?.maxHeight,
                      overflowY: "auto",
                    }),
                    control: (provided) => ({
                      ...provided,
                      height: "44px",
                      border: "1px solid #D5D7DA",
                      bg: "#fff",
                    }),
                  }}
                  variant={variant}
                  defaultValue={getValue(_val)}
                  isRequired={isRequired}
                  name={name}
                  {...restProps}
                  options={getOptions()}
                  isMulti={isMulti}
                  placeholder={placeholder ?? "Select"}
                  className={`${
                    zIndex ? "z-[9]" : ""
                  } outline-none ${selectControlClassName}`}
                  required={isRequired}
                  onChange={onChange}
                  isDisabled={isDisabled}
                  isInvalid={isInvalid}
                  onInputChange={onInputChange}
                  onFocus={onFocus}
                  errorBorderColor="red.300"
                  isLoading={isLoading}
                  isReadOnly={readonly}
                  isClearable={isClearable}
                  value={getValue(_val)}
                  classNamePrefix={selectPrefixClassName}
                  selectedOptionColorScheme="green"
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                />
              )}
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
          );
        }}
      />
    );
  }

  return (
    <Select
      isReadOnly={readonly}
      onChange={onChange}
      options={getOptions()}
      isMulti={isMulti}
      placeholder={placeholder ?? "Select"}
      value={value}
      onInputChange={onInputChange}
      size={size}
      isLoading={isLoading}
      classNamePrefix={selectPrefixClassName}
      chakraStyles={{
        control: (provided) => ({
          ...provided,
          height: "44px",
        }),
      }}
      menuPortalTarget={document.body}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
    />
  );
};

export default AppSelect;
