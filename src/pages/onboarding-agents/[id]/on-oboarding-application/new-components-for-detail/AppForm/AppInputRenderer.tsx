import { Control, FieldValues, UseFormRegister } from "react-hook-form";
import AppInputPicker from "./AppInputPicker";
import { IInputList, InputObj } from "./types/types";
import { Box, SystemStyleObject } from "@chakra-ui/react";

const AppInputRenderer = ({
  register,
  control,
  errors,
  boxWrapperClassName = "grid grid-cols-1 gap-[28px]",
  inputList,
  labelWrapperClassName = "",
  labelClassName = "",
  boxWrapperStyles = {},
}: {
  inputList: IInputList[];
  control?: Control<FieldValues>;
  register: UseFormRegister<FieldValues>;
  errors: unknown;
  labelClassName?: string;
  boxWrapperClassName?: string;
  labelWrapperClassName?: string;
  boxWrapperStyles?: SystemStyleObject | undefined;
}) => {
  const rendererComp = ({ i }: { i: InputObj }) => (
    <AppInputPicker
      labelWrapperClassName={`${
        i?.inputOptions?.labelWrapperClassName || labelWrapperClassName
      }`}
      labelWrapperStyles={i?.labelWrapperStyles}
      labelStyles={i?.labelStyles}
      labelClassName={labelClassName}
      inputObj={i}
      key={i?.name}
      register={register}
      control={control}
      errors={errors}
      bottomDesc={i?.bottomDesc}
    />
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column",
        gap: "10px",
        ...boxWrapperStyles,
      }}
      className={`${boxWrapperClassName}`}
    >
      {inputList?.map((m: IInputList, ind: number) => (
        <Box
          key={ind}
          sx={{ display: "grid", ...(m?.thisWrapperStyles ?? {}) }}
          className={`${m?.thisWrapperClassName}`}
        >
          {m?.render?.map((i: InputObj) => rendererComp({ i }))}
        </Box>
      ))}
    </Box>
  );
};

export default AppInputRenderer;
