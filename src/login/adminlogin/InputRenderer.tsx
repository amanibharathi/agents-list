//import CkInput from '@/app/components/chakraOverwrites/CkInput'
//import CkSelect from '@/app/components/chakraOverwrites/CkSelect'
//import AppText from '@/app/components/elements/AppText'
//import { splitByDotGetMany } from '@/app/utils/functions/otherFunctions'
import CkInput from "../../pages/Auth/AgentComponents/admincompenets/CkInput";
import CkSelect from "../../pages/Auth/AgentComponents/admincompenets/CkSelect";
import AppText from "../../AppComponents/AppText-agent";
import { splitByDotGetMany } from "../../utils/functions/commonFunctions";

interface InputRendererProps {
  inputObj: {
    name: string;
    type?: string;
    placeholder?: string;
    label?: string;
    otherRegProps?: unknown;
    isMulti?: boolean;
    options?: unknown;
    required?: boolean;
  };
  control: unknown;
  register: unknown;
  wrapperClassName?: string;
  labelClassName?: string;
  className?: string;
  formControlClassName?: string;
  errors?: unknown;
  classNamePrefix?: string;
}

//@ts-expect-error ignore
const InputRenderer = ({
  inputObj,
  control,
  register,
  wrapperClassName = "",
  formControlClassName = "",
  labelClassName = "",
  className = "",
  errors = {},
  classNamePrefix = "",
}: InputRendererProps) => {
  const { type, name, required, otherRegProps, ...rest } = inputObj;
  //@ts-expect-error ignore
  const customizeReg = register(name, {
    required: required ?? true,
    //@ts-expect-error ignore
    ...otherRegProps,
  });
  const getInputField = () => {
    if (type == "select")
      return (
        <CkSelect
          name={name}
          control={control}
          {...customizeReg}
          //@ts-expect-error ignore
          options={inputObj?.options}
          {...rest}
          className={`${className}`}
          //@ts-expect-error ignore
          isError={errors?.[name]}
          classNamePrefix={classNamePrefix}
        />
      );

    if (type == "number")
      return (
        <CkInput
          formControlClassName={`w-full max-w-[510px] ${formControlClassName}`}
          placeholder={inputObj?.placeholder}
          type={type}
          {...customizeReg}
          {...rest}
          className={`${className}`}
          // isError={errors?.[name]}
          //@ts-expect-error ignore
          isError={errors?.[name]}
        />
      );
    if (type == "tel")
      return (
        <CkInput
          prefix="+1"
          maxLength={10}
          formControlClassName={`w-full max-w-[510px] ${formControlClassName}`}
          placeholder={inputObj?.placeholder}
          type={type}
          {...customizeReg}
          {...rest}
          className={`${className}`}
          // isError={errors?.[name]}
          isError={splitByDotGetMany(name, errors)}
        />
      );
    if (name == "call_duration")
      return (
        <CkInput
          isError={splitByDotGetMany(name, errors)}
          formControlClassName={`w-full max-w-[510px] ${formControlClassName}`}
          // placeholder={inputObj?.placeholder}
          type={type || "text"}
          {...customizeReg}
          {...rest}
          className={`${className}`}
          onChange={(e: any) => {
            const regex = /^-?\d*(\.\d{0,1})?$/;
            if (regex.test(e.target.value)) {
              e.target.value = e.target.value;
            } else {
              e.target.value = e.target.value.slice(0, -1);
            }
          }}
        />
      );

    return (
      <CkInput
        isError={splitByDotGetMany(name, errors)}
        formControlClassName={`w-full max-w-[510px] ${formControlClassName}`}
        // placeholder={inputObj?.placeholder}
        type={type || "text"}
        {...customizeReg}
        {...rest}
        className={`${className}`}
      />
    );
  };

  return (
    <div className={`${wrapperClassName}`}>
      {inputObj?.label ? (
        <label className={`${labelClassName}`}>
          {inputObj?.label}
          {required ?? (
            <AppText className="!text-[#ED1F28]" type="span">
              *
            </AppText>
          )}
        </label>
      ) : null}
      {getInputField()}
    </div>
  );
};

export default InputRenderer;
