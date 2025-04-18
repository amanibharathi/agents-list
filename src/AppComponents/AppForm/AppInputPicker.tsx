// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { Box } from "@chakra-ui/react";
import AppInput from "./AppInput";
import { AppInputPickerProps } from "./types/types";
import AppText from "../AppText";
import AppSelect from "./AppSelect";
import AppRadio from "./AppRadio";
import AppCheckbox from "./AppCheckBox";
import AppTextArea from "./AppTextArea";
import AppFileUpload from "./AppFileUpload";
import AppCustomSelect from "./AppCustomSelect";
import AppCustomMultiSelect from "./AppCustomMultiSelect";
import BoxSelect from "../../pages/Form/custom-agent-tools/BoxSelect";

const AppInputPicker: React.FC<AppInputPickerProps> = ({
  inputObj,
  labelClassName = "",
  labelWrapperClassName = "",
  control,
  register,
  noStarSymbol = false,
  labelWrapperStyles = {},
  labelStyles = {},
  errors = {},
  bottomDesc,
}) => {
  const { type } = inputObj;
  const customizedRegister = register(inputObj.name, {
    required: inputObj.required ?? true,
    ...inputObj.otherRegProps,
  });

  const isNotRequired = inputObj.required == false;

  const getInput = () => {
    if (type === "password") {
      return (
        <AppInput
          placeholder={inputObj?.placeholder}
          {...customizedRegister}
          {...inputObj?.inputOptions}
          isPassword
          error={errors}
        />
      );
    }

    if (type === "select") {
      return (
        //@ts-expect-error ignore
        <AppSelect
          placeholder={inputObj?.placeholder}
          options={inputObj?.options}
          control={control}
          {...customizedRegister}
          {...inputObj?.inputOptions}
          error={errors}
        />
      );
    }

    if (type === "multi-select") {
      return (
        //@ts-expect-error ignore
        <AppSelect
          placeholder={inputObj?.placeholder}
          options={inputObj?.options}
          control={control}
          {...customizedRegister}
          {...inputObj?.inputOptions}
          error={errors}
          isCreateable={inputObj?.inputOptions?.isCreatable}
          isMulti
        />
      );
    }

    if (type === "radio") {
      return (
        //@ts-expect-error ignore
        <AppRadio
          control={control}
          placeholder={inputObj?.placeholder}
          options={inputObj?.options}
          {...customizedRegister}
          {...inputObj?.inputOptions}
          error={errors}
        />
      );
    }

    if (type === "checkbox") {
      return (
        //@ts-expect-error ignore
        <AppCheckbox
          placeholder={inputObj?.placeholder}
          options={inputObj?.options}
          control={control}
          {...customizedRegister}
          {...inputObj?.inputOptions}
          error={errors}
        />
      );
    }

    if (type === "textarea") {
      return (
        <AppTextArea
          placeholder={inputObj?.placeholder}
          {...customizedRegister}
          {...inputObj?.inputOptions}
          error={errors}
        />
      );
    }

    if (type === "file") {
      return (
        //@ts-expect-error ignore
        <AppFileUpload
          placeholder={inputObj?.placeholder}
          error={errors}
          imageState={inputObj?.imageState}
          setImageState={inputObj?.setImageState}
          {...inputObj?.inputOptions}
          {...customizedRegister}
        />
      );
    }

    if (type === "custom-select") {
      return (
        //@ts-expect-error ignore
        <AppCustomSelect
          placeholder={inputObj?.placeholder}
          options={inputObj?.options}
          control={control}
          {...customizedRegister}
          {...inputObj?.inputOptions}
          error={errors}
        />
      );
    }

    if (type === "custom-multi-select") {
      return (
        //@ts-expect-error ignore
        <AppCustomMultiSelect
          placeholder={inputObj?.placeholder}
          options={inputObj?.options}
          control={control}
          {...customizedRegister}
          {...inputObj?.inputOptions}
          error={errors}
        />
      );
    }

    if (type == "tel")
      return (
        <AppInput
          type="tel"
          placeholder={inputObj?.placeholder}
          {...customizedRegister}
          error={errors}
          {...inputObj?.inputOptions}
          // onChange
        />
      );

    if (type == "box-select") {
      return <BoxSelect inputObj={inputObj} />;
    }

    if (type == "custom-comp") return inputObj?.comp;

    return (
      <AppInput
        type={type ?? "text"}
        placeholder={inputObj?.placeholder}
        {...customizedRegister}
        error={errors}
        {...inputObj?.inputOptions}
      />
    );
  };

  return (
    <Box sx={{ ...labelWrapperStyles }} className={labelWrapperClassName}>
      {inputObj?.label && (
        <Box
          as="label"
          sx={{
            display: "inline-block",
            fontSize: { base: "14px", md: "14px" },
            color: "labelColor",
            mb: "6px",
            fontWeight: 500,
            ...labelStyles,
          }}
          className={labelClassName}
        >
          {inputObj?.label}
          {!noStarSymbol && !isNotRequired && (
            <Box as="span" sx={{ color: "#DB1264", ml: "3px" }}>
              *
            </Box>
          )}
        </Box>
      )}
      {getInput()}
      {bottomDesc && (
        <AppText
          sx={{
            color: "#535862",
            fontSize: "14px",
            lineHeight: "20px",
            mt: "5px",
            ...(inputObj?.bottomDescStyles || {}),
          }}
        >
          {bottomDesc}
        </AppText>
      )}
    </Box>
  );
};

export default AppInputPicker;
