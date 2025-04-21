// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ReactNode } from "react";

import { Checkbox, Text } from "@chakra-ui/react";

import Select from "react-select";

import CkInput from "./CkInput";
import CkSelect from "./CkSelect";
import { splitByDotGetMany } from "../../../../utils/functions/commonFunctions";
import AdminFileUpload from "../fileupload/AdminFileUpload";
import AdminLabelToolTip from "./AdminLabelToolTip";
import CkTextArea from "./CkTextArea";
import ReadOnlyDocsInputComponent from "./ReadOnlyDocsInputComponent";
import CustomRadio from "./CustomRadio";
import AppButton from "../../../../AppComponents/AppButton-agent";
import AppText from "../../../../AppComponents/AppText-agent";
import AppImage from "../../../../AppComponents/AppImage";
import MultiFileUpload from "./MultiFileUpload";
import SupportDocumentUpload from "../fileupload/SupportDocumentUpload";
import { CkCheckboxUsingController } from "./CkCheckboxUsingController";
import { useGetMemberMlsList } from "../../../../utils/hooks/useGetMemberList";

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
    bottomRightInfo?: ReactNode | string;
    bottomLeftInfo?: ReactNode | string;
    className?: string;
    minH?: string;
    onChange: any;
    value: any;
    imageState?: any;
    setImageState?: any;
    fileTypeKey?: string;
    uploadKey: string;
    fileTypes?: string | string[];
    suffix?: string;
    suffixClassName?: string;
    onInpuChange?: any;
    isLoading?: boolean;
    maxLength?: string | number;
    customPrefixClassName?: string;
    labelToolTip?: string | ReactNode;
    ref?: any;
    comp?: any;
    customEndPoint?: any;
    isAgentFile?: any;
    addressState?: any;
    casecadeDepend?: any;
    menuMaxHeight?: any;
    sublabel?: string;
    handleUpload?: (val: any) => void;
    customUploadUiList?: (val: any) => void;
    customClassName?: string;
    customUiBody?: any;
    isForm?: boolean;
    isCms?: boolean;
    // readOnly?: any
    isCropAble?: boolean;
    dimension?: number;
    forceUiList?: boolean;
    customType?: any;
    forceLabel?: any;
    multiFiles?: boolean;
    tags?: string;
    disabled?: boolean;
    wrapperClass?: string;
  };
  control: unknown;
  register: unknown;
  wrapperClassName?: string;
  labelClassName?: string;
  className?: string;
  formControlClassName?: string;
  errors?: unknown;
  noRegisterPrefix?: boolean;
  inputControlClassName?: string;
  watch?: unknown;
  setValue?: unknown;
  sublabelClassName?: string;
  selectPrefixClassName?: string;
  labelContainerClassName?: string;
}

//@ts-expect-error ignore
const AdminInputRenderer = ({
  inputObj,
  control,
  register,
  wrapperClassName = "",
  formControlClassName = "",
  labelClassName = "",
  className = "",
  errors = {},
  noRegisterPrefix = false,
  inputControlClassName = "",
  watch,
  setValue,
  sublabelClassName = "",
  selectPrefixClassName = "",
  labelContainerClassName = "",
  ...restProps
}: InputRendererProps) => {
  const [QuillEditor, setQuillEditor] = useState<any>(null);

  useEffect(() => {
    import("./QuillEditorRaw").then((mod) => {
      setQuillEditor(() => mod.default);
    });
  }, []);
  const { type, name, required, otherRegProps, ...rest } = inputObj;
  const {
    groupedOptions: groupedOptionMls,
    setSearchVal: setSearchValMls,
    setSelectedBoarded,
    loadMoreOptions,
    isFetchingNextPage,
  } = useGetMemberMlsList();
  const customizeReg =
    type !== "address" &&
    type !== "mls" &&
    type !== "license" &&
    type !== "custom-input"
      ? //@ts-expect-error ignore
        register(`${noRegisterPrefix ? name : `data.${name}`}`, {
          required: required ?? true,
          //@ts-expect-error ignore
          ...otherRegProps,
        })
      : "";
  const getInputField = () => {
    if (type == "skip") return <div className="hidden md:block"></div>;
    if (type == "checkbox" && inputObj?.options) {
      const { value }: any = inputObj?.otherRegProps;
      return (
        <>
          <div className={`flex flex-col gap-[10px] ${inputObj.className}`}>
            <CkCheckboxUsingController
              name={inputObj?.name}
              inputObj={inputObj}
              control={control}
              //@ts-expect-error ignore
              readOnly={inputObj?.readOnly}
              //@ts-expect-error ignore
              {...register(`data.${name}`)}
              value={value && value}
            />
            {/* <CkCheckBox
                checkBoxData={inputObj?.options?.map(
                  (each: any, index: any) => (
                    <CustomBoxComponent key={index} boxData={each} />
                  )
                )}
              /> */}
            {/* <CheckboxGroup
                control={control}
                watch={watch}
                //@ts-expect-error ignore
                {...register(`data.${name}`, {
                  required: true,
                  //@ts-expect-error ignore
                })}
              >
                {//@ts-expect-error ignore
                inputObj?.options?.map((each: any) => {
                  const watching = watch(`data.${name}`)
                  console.log('daatddd', watching)
                  return (
                    <Checkbox
                      key={each?.id}
                      name={`data.${name}`}
                      onChange={inputObj?.onChange}
                      isChecked={inputObj?.value}
                    >
                      <Text fontSize={'14px !important'}>{each?.identity}</Text>
                    </Checkbox>
                  )
                })}
              </CheckboxGroup> */}
          </div>
        </>
      );
    }
    if (type == "checkbox")
      return (
        <Checkbox
          name={name}
          onChange={inputObj?.onChange}
          isChecked={inputObj?.value}
          isRequired={inputObj?.required || false}
        >
          {inputObj?.placeholder == "onboard-agent" ? (
            <Text fontSize={"14px !important"}>{inputObj?.imageState}</Text>
          ) : (
            <Text fontSize={"14px !important"}>
              Is Featured {inputObj?.label}
            </Text>
          )}
        </Checkbox>
      );

    if (type == "switch")
      return (
        <Checkbox
          name={name}
          onChange={inputObj?.onChange}
          isChecked={inputObj?.value}
          isRequired={inputObj?.required || false}
        >
          {inputObj?.placeholder == "onboard-agent" ? (
            <Text fontSize={"14px !important"}>{inputObj?.imageState}</Text>
          ) : (
            <Text fontSize={"14px !important"}>
              Is Featured {inputObj?.label}
            </Text>
          )}
        </Checkbox>
      );
    if (type == "textEditor")
      return (
        <QuillEditor
          placeholder={inputObj?.placeholder || "Enter..."}
          control={control}
          className={`${className} ${inputObj?.className}`}
          {...customizeReg}
          name={name}
          minH={inputObj?.minH}
          onChange={inputObj?.onChange}
          value={inputObj?.value}
          //@ts-expect-error ignore
          isError={errors?.[name]}
          ref={inputObj?.ref}
        />
      );

    if (type == "select" || type == "emergency_contact_relationship") {
      return (
        <CkSelect
          name={name}
          control={control}
          {...customizeReg}
          //@ts-expect-error ignore
          options={inputObj?.options}
          {...rest}
          className={`w-[100%] max-w-[100%] ${className} ${inputObj?.className}`}
          //@ts-expect-error ignore
          // isError={errors?.[name]}
          isError={splitByDotGetMany(name, errors)}
          placeholder={inputObj?.placeholder || "Select"}
          onInputChange={inputObj?.onInpuChange}
          isLoading={inputObj?.isLoading}
          onChange={inputObj?.onChange}
          menuMaxHeight={inputObj?.menuMaxHeight}
          pre
          //@ts-expect-error ignore
          isClearable={!inputObj?.readOnly}
          selectPrefixClassName={selectPrefixClassName}
        />
      );
    }
    if (type == "multi-select")
      return (
        <CkSelect
          placeholder={inputObj?.placeholder || "Select"}
          isMulti
          name={name}
          control={control}
          {...customizeReg}
          //@ts-expect-error ignore
          options={inputObj?.options}
          {...rest}
          className={`w-[100%] max-w-[100%] ${inputObj?.className} ${className}`}
          //@ts-expect-error ignore
          isError={errors?.[name]}
          onInputChange={inputObj?.onInpuChange}
          isLoading={inputObj?.isLoading}
          // noOptionsMessage={() => inputObj?.noOptionsMessage}
          //@ts-expect-error ignore
          isClearable={!inputObj?.readOnly}
          selectPrefixClassName={selectPrefixClassName}
        />
      );

    if (type == "number")
      return (
        <CkInput
          formControlClassName={`w-full ${formControlClassName}`}
          placeholder={inputObj?.placeholder || "Enter"}
          type={type}
          {...customizeReg}
          {...rest}
          className={`w-[100%] max-w-[100%] ${className}`}
          // isError={errors?.[name]}
          //@ts-expect-error ignore
          isError={splitByDotGetMany(name, errors)}
        />
      );
    if (type == "roa-email")
      return (
        <CkInput
          formControlClassName={`w-full ${formControlClassName}`}
          placeholder={inputObj?.placeholder || "Enter"}
          suffix={inputObj?.suffix}
          suffixClassName={inputObj?.suffixClassName}
          type={type}
          {...customizeReg}
          {...rest}
          className={`w-[100%] max-w-[100%] ${className}`}
          // isError={errors?.[name]}
          //@ts-expect-error ignore
          isError={splitByDotGetMany(name, errors)}
        />
      );
    if (
      type == "tel" ||
      type == "emergency_contact_phone_number" ||
      type == "primary_phone_number" ||
      type == "alternate_phone_number"
    )
      return (
        <CkInput
          prefix="+1"
          maxLength={14}
          formControlClassName={`w-full ${formControlClassName} `}
          placeholder={inputObj?.placeholder || "Enter"}
          type={type}
          {...customizeReg}
          {...rest}
          className={`w-[100%] max-w-[100%] ${className} ${inputObj?.className}`}
          // isError={errors?.[name]}
          isError={splitByDotGetMany(name, errors)}
          onChange={(event: any) => {
            const unformattedValue = event.target.value.replace(/[()-]/g, ""); // Remove special characters
            const formattedParts = [
              unformattedValue.slice(0, 3),
              unformattedValue.slice(3, 6),
              unformattedValue.slice(6),
            ];
            const formattedValue = formattedParts
              .filter((part) => part !== "")
              .map((part, index) => (index === 0 ? `(${part})` : part)) // Add parentheses to the first part
              .join("-");

            // Update the formatted value immediately, even if the user hasn't finished typing
            event.target.value = formattedValue;
          }}
        />
      );

    if (type == "first_name" || type == "last_name")
      return (
        <CkInput
          maxLength={14}
          formControlClassName={`w-full ${formControlClassName} `}
          placeholder={inputObj?.placeholder || "Enter"}
          type={type}
          {...customizeReg}
          {...rest}
          className={`w-[100%] max-w-[100%] ${className} ${inputObj?.className}`}
          // isError={errors?.[name]}
          isError={splitByDotGetMany(name, errors)}
          onChange={(event: any) => {
            // Remove all non-alphabetic characters
            const formatedValue = event.target.value.replace(
              /[^a-zA-Z\s]/g,
              ""
            );
            event.target.value = formatedValue;
          }}
        />
      );

    if (type == "file")
      return (
        <AdminFileUpload
          handleChange={inputObj?.onChange}
          imageState={inputObj?.imageState}
          setImageState={inputObj?.setImageState}
          uploadKey={inputObj?.uploadKey}
          fileTypeKey={inputObj?.fileTypeKey}
          fileTypes={inputObj?.fileTypes}
          name={inputObj?.name}
          //@ts-expect-error ignore
          isError={errors?.[name]}
          customEndPoint={inputObj?.customEndPoint}
          isAgentFile={inputObj?.isAgentFile}
          required={inputObj?.required}
          placeholder={inputObj?.placeholder}
          handleUpload={inputObj?.handleUpload}
          customUploadUiList={inputObj?.customUploadUiList}
          customClassName={inputObj?.customClassName}
          customUiBody={inputObj?.customUiBody}
          isForm={inputObj?.isForm}
          isCms={inputObj?.isCms}
          isCropAble={inputObj?.isCropAble}
          dimension={inputObj?.dimension}
          forceUiList={inputObj?.forceUiList}
          customType={inputObj?.customType}
          forceLabel={inputObj?.forceLabel}
          multiFiles={inputObj?.multiFiles}
          disabled={inputObj?.disabled}
          // isError={false}
        />
      );

    if (type == "multi-file")
      return (
        <MultiFileUpload
          // handleChange={inputObj?.onChange}
          imageState={inputObj?.imageState}
          setImageState={inputObj?.setImageState}
          uploadKey={inputObj?.uploadKey}
          fileTypeKey={inputObj?.fileTypeKey}
          fileTypes={inputObj?.fileTypes}
          name={inputObj?.name}
          //@ts-expect-error ignore
          isError={errors?.[name]}
          customEndPoint={inputObj?.customEndPoint}
          // isError={false}
        />
      );
    if (type == "support-doc-file")
      return (
        <SupportDocumentUpload
          // handleChange={inputObj?.onChange}
          imageState={inputObj?.imageState}
          setImageState={inputObj?.setImageState}
          uploadKey={inputObj?.uploadKey}
          fileTypeKey={inputObj?.fileTypeKey}
          fileTypes={inputObj?.fileTypes}
          name={inputObj?.name}
          //@ts-expect-error ignore
          isError={errors?.[name]}
          customEndPoint={inputObj?.customEndPoint}
          inputObj={inputObj}
        />
      );
    if (type == "textarea")
      return (
        <CkTextArea
          isError={splitByDotGetMany(name, errors)}
          formControlClassName={`w-full ${formControlClassName}`}
          placeholder={inputObj?.placeholder || "Enter"}
          type={type || "text"}
          {...customizeReg}
          {...rest}
          className={`w-[100%] max-w-[100%] ${className} ${inputObj?.className}`}
          suffixClassName={inputObj?.suffixClassName}
          customPrefixClassName={inputObj?.customPrefixClassName}
          maxLength={inputObj?.maxLength}
        />
      );

    if (type == "readOnlyDocs")
      return <ReadOnlyDocsInputComponent fileUrl={inputObj?.value} />;

    if (type == "radio") {
      //@ts-expect-error ignore
      const value = inputObj?.otherRegProps?.value;
      return (
        <div className="mt-4 mb-5">
          <CustomRadio
            errors={splitByDotGetMany(name, errors)}
            register={customizeReg}
            defaultValue={value}
            //@ts-expect-error ignore
            readOnly={inputObj?.readOnly}
            options={
              //@ts-expect-error ignore
              inputObj?.options && inputObj?.options?.length !== 0
                ? inputObj?.options
                : [
                    { id: "1", label: "Yes" },
                    { id: "2", label: "No" },
                  ]
            }
          />
        </div>
      );
    }

    if (type == "custom-input") return inputObj?.comp;

    //  address, mls and license type only applicable for the form builder Forms

    if (type == "address") {
      const { value }: any = inputObj?.otherRegProps;
      return (
        <div className="grid grid-cols-1 gap-[40px]">
          <CkInput
            isError={splitByDotGetMany(`data.${name}.line1`, errors)}
            formControlClassName={`w-full ${formControlClassName}`}
            isRequired={true}
            formMessage="Enter a valid value"
            placeholder={"Address line 1"}
            type={type || "text"}
            //@ts-expect-error ignore
            {...register(`data.${name}.line1`, {
              required: true,
              value: value?.line1,
            })}
            // {...rest}
            className={`w-[100%] max-w-[100%] ${className} ${inputObj?.className}`}
            suffixClassName={inputObj?.suffixClassName}
            customPrefixClassName={inputObj?.customPrefixClassName}
            maxLength={inputObj?.maxLength}
            inputControlClassName={inputControlClassName}
            //@ts-expect-error ignore
            readonly={inputObj?.readOnly}
            // {...restProps}
          />
          <CkInput
            //@ts-expect-error ignore
            isError={splitByDotGetMany(`data.${name}.line2`, errors)}
            formControlClassName={`w-full ${formControlClassName}`}
            placeholder={"Address line 2"}
            type={type || "text"}
            //@ts-expect-error ignore
            {...register(`data.${name}.line2`, {
              required: false,
              value: value?.line2,
            })}
            // {...rest}
            className={`w-[100%] max-w-[100%] ${className} ${inputObj?.className}`}
            suffixClassName={inputObj?.suffixClassName}
            customPrefixClassName={inputObj?.customPrefixClassName}
            maxLength={inputObj?.maxLength}
            inputControlClassName={inputControlClassName}
            //@ts-expect-error ignore
            readonly={inputObj?.readOnly}
            // {...restProps}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[40px] gap-x-[20px]">
            <CkInput
              //@ts-expect-error ignore
              isError={splitByDotGetMany(`data.${name}.city`, errors)}
              formControlClassName={`w-full ${formControlClassName}`}
              placeholder={"City"}
              type={type || "text"}
              //@ts-expect-error ignore
              {...register(`data.${name}.city`, {
                required: true,
                value: value?.city,
              })}
              // {...rest}
              className={`w-[100%] max-w-[100%] ${className} ${inputObj?.className}`}
              suffixClassName={inputObj?.suffixClassName}
              customPrefixClassName={inputObj?.customPrefixClassName}
              maxLength={inputObj?.maxLength}
              inputControlClassName={inputControlClassName}
              //@ts-expect-error ignore
              readonly={inputObj?.readOnly}
              // {...restProps}
            />
            <CkSelect
              placeholder={"State"}
              // isMulti
              name={`data.${name}.state`}
              control={control}
              //@ts-expect-error ignore
              {...register(`data.${name}.state`, {
                required: true,
                value: value?.state,
              })}
              //@ts-expect-error ignore
              options={inputObj?.addressState}
              // {...rest}
              className={`w-[100%] max-w-[100%] ${inputObj?.className} ${className}`}
              //@ts-expect-error ignore
              // isError={errors?.[name]}
              onInputChange={inputObj?.onInpuChange}
              isLoading={inputObj?.isLoading}
              //@ts-expect-error ignore
              readOnly={inputObj?.readOnly}
              //@ts-expect-error ignore
              isClearable={!inputObj?.readOnly}
              isError={splitByDotGetMany(`data.${name}.state`, errors)}
            />
            <CkInput
              //@ts-expect-error ignore
              isError={splitByDotGetMany(`data.${name}.pincode`, errors)}
              formControlClassName={`w-full ${formControlClassName}`}
              placeholder={"Zip Code"}
              type={type || "text"}
              //@ts-expect-error ignore
              {...register(`data.${name}.pincode`, {
                required: true,
                value: value?.pincode,
                onChange: (event: any) => {
                  // Remove non-numeric characters from the input value
                  const numericValue = event.target.value.replace(/\D/g, "");
                  event.target.value = numericValue;
                  // Trigger onChange event with the updated value
                  event.target.dispatchEvent(new Event("change"));
                },
              })}
              // {...rest}
              className={`w-[100%] max-w-[100%] ${className} ${inputObj?.className}`}
              suffixClassName={inputObj?.suffixClassName}
              customPrefixClassName={inputObj?.customPrefixClassName}
              maxLength={5}
              inputControlClassName={inputControlClassName}
              //@ts-expect-error ignore
              readonly={inputObj?.readOnly}
              // {...restProps}
            />
          </div>
        </div>
      );
    }

    if (type == "mls") {
      const { value }: any = inputObj?.otherRegProps;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [caseCadeCount, setCaseCadeCount] = useState(
        value && value.length
          ? value
          : [
              {
                board: "",
                membership: "",
                mls_id: "",
              },
            ]
      );
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [indexVal, setIndexVal] = useState(0);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [tempValueBoard, setTempValueBoard] = useState(
        value && value?.length !== 0
          ? caseCadeCount.map((each: any) => each?.board)
          : undefined
      );
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [tempValueMember, setTempValueBoardMember] = useState(
        value && value?.length !== 0
          ? caseCadeCount.map((each: any) => each?.membership)
          : undefined
      );
      console.log(tempValueBoard, tempValueMember);
      const customStyles = (index: any) => ({
        menu: (provided: any) => ({
          ...provided,
          zIndex: index + 1, // Ensures the menu is above the control
        }),
      });

      const handleDelete = (index: any) => {
        //@ts-expect-error ignore
        const test = watch(`data.${name}`);

        const filteredArr = test?.filter((f: any, ind: any) => ind !== index);
        setCaseCadeCount(
          filteredArr?.filter((each: any) => {
            return each;
          })
        );
        //@ts-expect-error ignore
        setValue(`data.${name}`, filteredArr);
      };
      const handleInputChangeMls = (e: string) => {
        setSearchValMls(e);
      };
      const dependency = watch
        ? //@ts-expect-error ignore
          watch(`data.question_${inputObj?.casecadeDepend?.tag}`)
        : null;
      return (
        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[6px]">
            {caseCadeCount?.map((each: any, index: any) => {
              const handleClick = (e: any) => {
                setValue &&
                  //@ts-expect-error ignore
                  setValue(`data.${name}.${index}.board`, e === null ? "" : e);
                setTempValueBoard(e);
                //@ts-expect-error ignore
                if (e?.state) setSelectedBoarded(e?.state);
              };
              const handleClickMls = (e: any) => {
                setValue &&
                  //@ts-expect-error ignore
                  setValue(
                    `data.${name}.${index}.membership`,
                    e === null ? "" : e
                  );
                setTempValueBoardMember(e);
              };
              return (
                <>
                  {
                    //@ts-expect-error ignore
                    index !== 0 && !inputObj?.readOnly ? (
                      <div className="flex justify-end mt-[20px]">
                        {/* <AppText className="text-[14px] font-[600]">
                      MLS (additional)
                    </AppText> */}
                        <div
                          onClick={() => handleDelete(index)}
                          className="p-[5px] border border-[#10295A] rounded-[8px] cursor-pointer"
                        >
                          <AppImage
                            alt=""
                            src={"/assets/icons/delete-icon.svg"}
                            width={20}
                            height={20}
                          />
                        </div>
                      </div>
                    ) : null
                  }
                  <div className="flex flex-col gap-[40px]">
                    <div className="flex flex-col gap-[16px]">
                      <label
                        className={`flex items-center gap-[10px] text-[14px] font-[600]`}
                      >
                        What is the name of the local Board of Realtors
                        (Association of Realtors) you are member of ?
                      </label>
                      <div>
                        <CkInput
                          isError={splitByDotGetMany(
                            `data.${name}.${index}.board`,
                            errors
                          )}
                          formControlClassName={`w-full ${formControlClassName}`}
                          placeholder={"Board"}
                          type={type || "text"}
                          //@ts-expect-error ignore
                          {...register(`data.${name}.${index}.board`, {
                            required: false,
                            //@ts-expect-error ignore
                            value:
                              value && value?.length !== 0
                                ? each?.board
                                : undefined,
                          })}
                          // {...rest}
                          className={`w-[100%] max-w-[100%] ${className} ${inputObj?.className} hidden`}
                          suffixClassName={inputObj?.suffixClassName}
                          customPrefixClassName={
                            inputObj?.customPrefixClassName
                          }
                          maxLength={inputObj?.maxLength}
                          inputControlClassName={inputControlClassName}
                          // {...restProps}
                        />
                        <Select
                          inputId="mls-board-input"
                          loadingMessage={() => (
                            <p className="text-[13px]">Searching......</p>
                          )}
                          isLoading={isFetchingNextPage}
                          value={
                            //@ts-expect-error ignore
                            watch(`data.${name}.${index}.board`) ?? each?.board
                          }
                          filterOption={() => true}
                          placeholder={"Enter the Real Estate Board"}
                          //@ts-expect-error ignore
                          className={`w-full !text-[10px] md:!text-[14px]  !top-0 custom_select_css_mls  ${
                            errors[name] && errors[name][index]?.board
                              ? "custom_select_css_mls_error"
                              : ""
                          } `}
                          options={groupedOptionMls}
                          onInputChange={handleInputChangeMls}
                          onChange={handleClick}
                          onMenuScrollToBottom={loadMoreOptions}
                          noOptionsMessage={() => (
                            <div>Enter the Real Estate Board</div>
                          )}
                          styles={customStyles(100 - index - 1)}
                          isClearable
                          //@ts-expect-error ignore
                          isDisabled={inputObj?.readOnly}
                        />
                        {
                          //@ts-expect-error ignore
                          errors[name] && errors[name][index]?.board && (
                            <AppText className="text-[11px] mt-[1px] !text-[#e53e3e]">
                              Select the value
                            </AppText>
                          )
                        }
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px]">
                      <div className="flex flex-col justify-between gap-[16px]">
                        <label
                          className={`flex items-center gap-[10px] text-[14px] font-[600]`}
                        >
                          What is the name of the MLS you are member of ?
                        </label>
                        <div>
                          <CkInput
                            isError={splitByDotGetMany(
                              `data.${name}.${index}.membership`,
                              errors
                            )}
                            formControlClassName={`w-full ${formControlClassName}`}
                            placeholder={"MLS#"}
                            type={type || "text"}
                            //@ts-expect-error ignore
                            {...register(`data.${name}.${index}.membership`, {
                              required: false,
                              value:
                                value && value?.length !== 0
                                  ? each?.membership
                                  : undefined,
                            })}
                            // {...rest}
                            className={`w-[100%] max-w-[100%] ${className} ${inputObj?.className} hidden`}
                            suffixClassName={inputObj?.suffixClassName}
                            customPrefixClassName={
                              inputObj?.customPrefixClassName
                            }
                            maxLength={inputObj?.maxLength}
                            inputControlClassName={inputControlClassName}
                            //@ts-expect-error ignore
                            readonly={inputObj?.readOnly}
                            // {...restProps}
                          />
                          <Select
                            inputId="mls-member-input"
                            loadingMessage={() => (
                              <p className="text-[13px]">Searching......</p>
                            )}
                            value={
                              //@ts-expect-error ignore
                              watch(`data.${name}.${index}.membership`) ??
                              each?.membership
                            }
                            noOptionsMessage={() => (
                              <div>Enter the MLS Membership</div>
                            )}
                            onMenuScrollToBottom={loadMoreOptions}
                            isLoading={isFetchingNextPage}
                            filterOption={() => true}
                            placeholder={"Enter the MLS Membership"}
                            //@ts-expect-error ignore
                            className={`w-full !text-[10px] md:!text-[14px]  !top-0 custom_select_css_mls  ${
                              errors[name] && errors[name][index]?.membership
                                ? "custom_select_css_mls_error"
                                : ""
                            }`}
                            options={groupedOptionMls}
                            onInputChange={handleInputChangeMls}
                            onChange={handleClickMls}
                            styles={customStyles(100 - index - 1)}
                            isClearable
                            //@ts-expect-error ignore
                            isDisabled={inputObj?.readOnly}
                            // isDisabled={
                            //   //@ts-expect-error ignore
                            //   watch && watch(`data.${name}.${index}.board`)?.value
                            //     ? false
                            //     : true
                            // }
                          />
                          {
                            //@ts-expect-error ignore
                            errors[name] && errors[name][index]?.membership && (
                              <AppText
                                className="text-[11px] mt-[1px] !text-[#e53e3e]"
                                // pos={'absolute'}
                              >
                                Select the value
                              </AppText>
                            )
                          }
                        </div>
                      </div>
                      <div className="flex justify-between flex-col gap-[16px]">
                        <label
                          className={`flex items-center gap-[10px] text-[14px] font-[600]`}
                        >
                          Primary MLS ID
                        </label>
                        <CkInput
                          //@ts-expect-error ignore
                          isError={errors[name] && errors[name][index]?.mls_id}
                          formControlClassName={`w-full ${formControlClassName}`}
                          placeholder={"MLS ID"}
                          type={type || "text"}
                          value={
                            //@ts-expect-error ignore
                            watch(`data.${name}.${index}.mls_id`) ??
                            each?.mls_id
                          }
                          // value={each?.mls_id}
                          //@ts-expect-error ignore
                          {...register(`data.${name}.${index}.mls_id`, {
                            required: false,
                            value:
                              value && value?.length !== 0
                                ? each?.mls_id
                                : undefined,
                          })}
                          // {...rest}
                          className={`w-[100%] max-w-[100%] ${className} ${inputObj?.className}`}
                          suffixClassName={inputObj?.suffixClassName}
                          customPrefixClassName={
                            inputObj?.customPrefixClassName
                          }
                          maxLength={inputObj?.maxLength}
                          inputControlClassName={inputControlClassName}
                          //@ts-expect-error ignore
                          readonly={inputObj?.readOnly}
                          // {...restProps}
                        />
                      </div>
                      {/* <div className="flex flex-col gap-[16px]">
                    <div
                      onClick={() => handleDelete(index)}
                      className="p-[5px] border border-[#10295A] rounded-[8px] cursor-pointer"
                    >
                      <AppImage
                        alt=""
                        src={'/assets/icons/delete-icon.svg'}
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>
                ) : null}
                <div className="flex flex-col gap-[40px]">
                  <div className="flex flex-col gap-[16px]">
                    <label
                      className={`flex items-center gap-[10px] text-[14px] font-[600]`}
                    >
                      What is the name of the local Board of Realtors
                      (Association of Realtors) you are member of ?
                    </label>
                    <div>
                      <CkInput
                        isError={splitByDotGetMany(
                          `data.${name}.${index}.board`,
                          errors
                        )}
                        formControlClassName={`w-full ${formControlClassName}`}
                        placeholder={'Board'}
                        type={type || 'text'}
                        //@ts-expect-error ignore
                        {...register(`data.${name}.${index}.board`, {
                          required: false,
                          //@ts-expect-error ignore
                          value:
                            value && value?.length !== 0
                              ? value[index]?.board
                              : undefined,
                        })}
                        // {...rest}
                        className={`w-[100%] max-w-[100%] ${className} ${inputObj?.className} hidden`}
                        suffixClassName={inputObj?.suffixClassName}
                        customPrefixClassName={inputObj?.customPrefixClassName}
                        maxLength={inputObj?.maxLength}
                        inputControlClassName={inputControlClassName}
                        // {...restProps}
                      />
                      <Select
                        inputId="mls-board-input"
                        loadingMessage={() => (
                          <p className="text-[13px]">Searching......</p>
                        )}
                        value={
                          tempValueBoard
                            ? tempValueBoard[index]
                            : tempValueBoard
                        }
                        filterOption={() => true}
                        placeholder={'Enter the Real Estate Board'}
                        //@ts-expect-error ignore
                        className={`w-full !text-[10px] md:!text-[14px]  !top-0 custom_select_css_mls  ${errors[name] && errors[name][index]?.board ? 'custom_select_css_mls_error' : ''} `}
                        options={groupedOptions}
                        onInputChange={handleInputChange}
                        onChange={handleClick}
                        noOptionsMessage={() => (
                          <div>Enter the Real Estate Board</div>
                        )}
                        // styles={customStyles(100 - index - 1)}
                        styles={{
                          menu: (provided) => ({ ...provided, zIndex: 98 }),
                        }}
                        isClearable
                      />
                      {
                        //@ts-expect-error ignore
                        errors[name] && errors[name][index]?.board && (
                          <AppText className="text-[11px] mt-[1px] !text-[#e53e3e]">
                            Select the value
                          </AppText>
                        )
                      }
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px]">
                    <div className="flex flex-col justify-between gap-[16px]">
                      <label
                        className={`flex items-center gap-[10px] text-[14px] font-[600]`}
                      >
                        What is the name of the local Board of Realtors
                        (Association of Realtors) you are member of ?
                      </label>
                      <div>
                        <CkInput
                          isError={splitByDotGetMany(
                            `data.${name}.${index}.board`,
                            errors
                          )}
                          formControlClassName={`w-full ${formControlClassName}`}
                          placeholder={'Board'}
                          type={type || 'text'}
                          //@ts-expect-error ignore
                          {...register(`data.${name}.${index}.board`, {
                            required: false,
                            //@ts-expect-error ignore
                            value:
                              value && value?.length !== 0
                                ? value[index]?.board
                                : undefined,
                          })}
                          // {...rest}
                          className={`w-[100%] max-w-[100%] ${className} ${inputObj?.className} hidden`}
                          suffixClassName={inputObj?.suffixClassName}
                          customPrefixClassName={
                            inputObj?.customPrefixClassName
                          }
                          maxLength={inputObj?.maxLength}
                          inputControlClassName={inputControlClassName}
                          // {...restProps}
                        />
                        <Select
                          inputId="mls-board-input"
                          loadingMessage={() => (
                            <p className="text-[13px]">Searching......</p>
                          )}
                          value={
                            tempValueBoard
                              ? tempValueBoard[index]
                              : tempValueBoard
                          }
                          filterOption={() => true}
                          placeholder={'Enter the Real Estate Board'}
                          //@ts-expect-error ignore
                          className={`w-full !text-[10px] md:!text-[14px]  !top-0 custom_select_css_mls z-[11] ${errors[name] && errors[name][index]?.board ? 'custom_select_css_mls_error' : ''} `}
                          options={groupedOptions}
                          onInputChange={handleInputChange}
                          onChange={handleClick}
                          noOptionsMessage={() => (
                            <div>Enter the Real Estate Board</div>
                          )}
                          isClearable
                        />
                        {
                          //@ts-expect-error ignore
                          errors[name] && errors[name][index]?.board && (
                            <AppText className="text-[11px] mt-[1px] !text-[#e53e3e]">
                              Select the value
                            </AppText>
                          )
                        }
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px]">
                      <div className="flex flex-col justify-between gap-[16px]">
                        <label
                          className={`flex items-center gap-[10px] text-[14px] font-[600]`}
                        >
                          What is the name of the MLS you are member of ?
                        </label>
                        <div>
                          <CkInput
                            isError={splitByDotGetMany(
                              `data.${name}.${index}.membership`,
                              errors
                            )}
                            formControlClassName={`w-full ${formControlClassName}`}
                            placeholder={'MLS#'}
                            type={type || 'text'}
                            //@ts-expect-error ignore
                            {...register(`data.${name}.${index}.membership`, {
                              required: false,
                              value:
                                value && value?.length !== 0
                                  ? value[index]?.membership
                                  : undefined,
                            })}
                            // {...rest}
                            className={`w-[100%] max-w-[100%] ${className} ${inputObj?.className} hidden`}
                            suffixClassName={inputObj?.suffixClassName}
                            customPrefixClassName={
                              inputObj?.customPrefixClassName
                            }
                            maxLength={inputObj?.maxLength}
                            inputControlClassName={inputControlClassName}
                            // {...restProps}
                          />
                          <Select
                            inputId="mls-member-input"
                            loadingMessage={() => (
                              <p className="text-[13px]">Searching......</p>
                            )}
                            value={
                              tempValueMember
                                ? tempValueMember[index]
                                : tempValueMember
                            }
                            noOptionsMessage={() => (
                              <div>Enter the MLS Membership</div>
                            )}
                            filterOption={() => true}
                            placeholder={'Enter the MLS Membership'}
                            //@ts-expect-error ignore
                            className={`w-full !text-[10px] md:!text-[14px]  !top-0 custom_select_css_mls z-[10] ${errors[name] && errors[name][index]?.membership ? 'custom_select_css_mls_error' : ''}`}
                            options={groupedOptionMls}
                            onInputChange={handleInputChangeMls}
                            onChange={handleClickMls}
                            isClearable
                            // isDisabled={
                            //   //@ts-expect-error ignore
                            //   watch && watch(`data.${name}.${index}.board`)?.value
                            //     ? false
                            //     : true
                            // }
                          />
                          {
                            //@ts-expect-error ignore
                            errors[name] && errors[name][index]?.membership && (
                              <AppText
                                className="text-[11px] mt-[1px] !text-[#e53e3e]"
                                // pos={'absolute'}
                              >
                                Select the value
                              </AppText>
                            )
                          }
                        </div>
                      </div>
                      <div className="flex justify-between flex-col gap-[16px]">
                        <label
                          className={`flex items-center gap-[10px] text-[14px] font-[600]`}
                        >
                          Primary MLS ID
                        </label>
                        <CkInput
                          //@ts-expect-error ignore
                          isError={errors[name] && errors[name][index]?.mls_id}
                          formControlClassName={`w-full ${formControlClassName}`}
                          placeholder={'MLS ID'}
                          type={type || 'text'}
                          //@ts-expect-error ignore
                          {...register(`data.${name}.${index}.mls_id`, {
                            required: false,
                            value:
                              value && value?.length !== 0
                                ? value[index]?.mls_id
                                : undefined,
                          })}
                          // {...rest}
                          className={`w-[100%] max-w-[100%] ${className} ${inputObj?.className}`}
                          suffixClassName={inputObj?.suffixClassName}
                          customPrefixClassName={
                            inputObj?.customPrefixClassName
                          }
                          maxLength={inputObj?.maxLength}
                          inputControlClassName={inputControlClassName}
                          // {...restProps}
                        />
                      </div>
                      {/* <div className="flex flex-col gap-[16px]">
                    <label
                      className={`flex items-center gap-[10px] text-[14px] font-[600]`}
                    >
                      Are registered under any alternate names?
                    </label>
                    <CustomRadio
                      errors={splitByDotGetMany(name, errors)}
                      defaultValue={
                        value && value?.length !== 0
                          ? value[index]?.alternat_names
                          : undefined
                      }
                      register={{
                        //@ts-expect-error ignore
                        ...register(`data.${name}.${index}.alternat_names`, {
                          required: true,
                          value: '1',
                        }),
                      }}
                      options={[
                        { id: '1', label: 'Yes' },
                        { id: '2', label: 'No' },
                      ]}
                    />
                  </div> */}
                    </div>
                  </div>
                </>
              );
            })}
            <div className="flex md:justify-end">
              <AppText className="!text-[#787878CC] min-w-[266px]">
                Optional for new agents
              </AppText>
            </div>
          </div>
          <div
            className={`flex items-center ${
              dependency?.value === "Yes"
                ? "md:justify-between"
                : "md:justify-end"
            } flex-col-reverse md:flex-row`}
          >
            {
              //@ts-expect-error ignore
              dependency?.value === "Yes" && !inputObj?.readOnly ? (
                <AppButton
                  className="!text-[#1329E6] w-fit"
                  variant="transparent"
                  onClick={() => {
                    setIndexVal(indexVal + 1);
                    setCaseCadeCount([
                      ...caseCadeCount,
                      {
                        board: "",
                        membership: "",
                        mls_id: "",
                      },
                    ]);
                  }}
                >
                  + Add Another MLS
                </AppButton>
              ) : null
            }
            {/* <AppText className="!text-[#787878CC] min-w-[266px]">
              optional for new agents
            </AppText> */}
          </div>
        </div>
      );
    }

    if (type == "license") {
      const { value }: any = inputObj?.otherRegProps;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [caseCadeCount, setCaseCadeCount] = useState(
        value && value.length !== 0 ? value : [0]
      );
      const handleDelete = (index: any) => {
        //@ts-expect-error ignore
        const test = watch(`data.${name}`);

        const filteredArr = test?.filter((f: any, ind: any) => ind !== index);
        setCaseCadeCount(
          filteredArr?.filter((each: any) => {
            return each;
          })
        );
        //@ts-expect-error ignore
        setValue(`data.${name}`, filteredArr);
      };
      //@ts-expect-error ignore
      const dependency = watch
        ? //@ts-expect-error ignore
          watch(`data.question_${inputObj?.casecadeDepend?.tag}`)
        : null;
      //@ts-expect-error ignore
      const selectVal = (index: number) => watch(`data.${name}.${index}.state`);
      return (
        <div className="flex flex-col gap-[32px]">
          {caseCadeCount.map((each: any, index: any) => {
            return (
              <div key={index}>
                {index !== 0 ? (
                  <div key={index} className="flex justify-between">
                    <AppText className="text-[14px] font-[600]">
                      License (additional) *
                    </AppText>
                    {
                      //@ts-expect-error ignore
                      !inputObj?.readOnly ? (
                        <div
                          onClick={() => handleDelete(index)}
                          className="p-[5px] border border-[#10295A] rounded-[8px] cursor-pointer"
                        >
                          <AppImage
                            alt=""
                            src={"/assets/icons/delete-icon.svg"}
                            width={20}
                            height={20}
                          />
                        </div>
                      ) : null
                    }
                  </div>
                ) : null}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px] pt-[16px]">
                  <CkSelect
                    key={`data.${name}.${index}.state`}
                    chakraStyles={{
                      dropdownIndicator: (base: any) => ({
                        ...base,
                        background: "white",
                      }),
                      clearIndicator: (provided: any) => ({
                        ...provided,
                        fontSize: "9px",
                      }),
                      menu: (provided: any) => ({
                        ...provided,
                        zIndex: 70,
                      }),
                    }}
                    zIndex={false}
                    placeholder={"Select State"}
                    name={`data.${name}.${index}.state`}
                    control={control}
                    value={{
                      id:
                        selectVal(index)?.id ||
                        selectVal(index)?.value ||
                        each?.state?.id,
                      label:
                        selectVal(index)?.identity ||
                        selectVal(index)?.label ||
                        each?.state?.label ||
                        each?.state?.identity,
                      identity:
                        selectVal(index)?.identity ||
                        selectVal(index)?.label ||
                        each?.state?.identity,
                      value:
                        selectVal(index)?.id ||
                        selectVal(index)?.value ||
                        each?.state?.id,
                    }}
                    //@ts-expect-error ignore
                    {...register(`data.${name}.${index}.state`, {
                      required: true,
                      value:
                        value && value.length !== 0
                          ? {
                              id:
                                selectVal(index)?.id ||
                                selectVal(index)?.value ||
                                each?.state?.id ||
                                null,
                              label:
                                selectVal(index)?.identity ||
                                selectVal(index)?.label ||
                                each?.state?.label ||
                                each?.state?.identity ||
                                null,
                              identity:
                                selectVal(index)?.identity ||
                                selectVal(index)?.label ||
                                each?.state?.identity ||
                                null,
                              value:
                                selectVal(index)?.id ||
                                selectVal(index)?.value ||
                                each?.state?.id ||
                                null,
                            }
                          : undefined,
                    })}
                    //@ts-expect-error ignore
                    options={inputObj?.addressState}
                    // {...rest}
                    className={`w-[100%] max-w-[100%]  ${inputObj?.className} ${className}`}
                    //@ts-expect-error ignore
                    // isError={errors?.[name]}
                    onInputChange={inputObj?.onInpuChange}
                    isLoading={inputObj?.isLoading}
                    //@ts-expect-error ignore
                    readOnly={inputObj?.readOnly}
                    //@ts-expect-error ignore
                    isClearable={!inputObj?.readOnly}
                    isError={splitByDotGetMany(
                      `data.${name}.${index}.state`,
                      errors
                    )}
                  />
                  <CkInput
                    isError={splitByDotGetMany(
                      `data.${name}.${index}.license_no`,
                      errors
                    )}
                    formControlClassName={`w-full ${formControlClassName}`}
                    placeholder={"License Number"}
                    type={type || "text"}
                    //@ts-expect-error ignore
                    {...register(`data.${name}.${index}.license_no`, {
                      required: true,
                      //@ts-expect-error ignore
                      value:
                        value && value?.length !== 0
                          ? each?.license_no
                          : undefined,
                    })}
                    // {...rest}
                    className={`w-[100%] max-w-[100%] ${className} ${inputObj?.className}`}
                    suffixClassName={inputObj?.suffixClassName}
                    customPrefixClassName={inputObj?.customPrefixClassName}
                    maxLength={inputObj?.maxLength}
                    inputControlClassName={inputControlClassName}
                    //@ts-expect-error ignore
                    readonly={inputObj?.readOnly}
                    // {...restProps}
                  />
                  {/* <div className="flex flex-col gap-[16px]">
                    <label
                      className={`flex items-center gap-[10px] text-[14px] font-[600]`}
                    >
                      Registration date
                    </label>
                    <CkInput
                      isError={splitByDotGetMany(`data.line1_${name}`, errors)}
                      formControlClassName={`w-full ${formControlClassName}`}
                      placeholder={'Registration date'}
                      type={'date'}
                      //@ts-expect-error ignore
                      {...register(`data.${name}.${index}.registration_date`, {
                        required: true,
                        //@ts-expect-error ignore
                        value:
                          value && value?.length !== 0
                            ? value[index]?.registration_date
                            : undefined,
                      })}
                      // {...rest}
                      className={`w-[100%] max-w-[100%] ${className} ${inputObj?.className}`}
                      suffixClassName={inputObj?.suffixClassName}
                      customPrefixClassName={inputObj?.customPrefixClassName}
                      maxLength={inputObj?.maxLength}
                      inputControlClassName={inputControlClassName}
                      // {...restProps}
                    />
                  </div> */}
                  <div className="flex flex-col gap-[16px]">
                    <label
                      className={`flex items-center gap-[10px] text-[14px] font-[600]`}
                    >
                      Expiration date
                    </label>
                    <CkInput
                      isError={splitByDotGetMany(
                        `data.${name}.${index}.expiry_date`,
                        errors
                      )}
                      formControlClassName={`w-full ${formControlClassName}`}
                      placeholder={"Expiry date"}
                      type={"date"}
                      //@ts-expect-error ignore
                      {...register(`data.${name}.${index}.expiry_date`, {
                        required: true,
                        //@ts-expect-error ignore
                        value:
                          value && value?.length !== 0
                            ? each?.expiry_date
                            : undefined,
                      })}
                      // {...rest}
                      className={`w-[100%] max-w-[100%] ${className} ${inputObj?.className}`}
                      suffixClassName={inputObj?.suffixClassName}
                      customPrefixClassName={inputObj?.customPrefixClassName}
                      maxLength={inputObj?.maxLength}
                      inputControlClassName={inputControlClassName}
                      //@ts-expect-error ignore
                      readonly={inputObj?.readOnly}
                      // {...restProps}
                    />
                  </div>
                </div>
              </div>
            );
          })}
          {
            //@ts-expect-error ignore
            dependency?.value === "Yes" && !inputObj?.readOnly ? (
              <div>
                <AppButton
                  className="!text-[#1329E6]"
                  variant="transparent"
                  onClick={() => setCaseCadeCount([...caseCadeCount, 0])}
                >
                  + Add Another License
                </AppButton>
              </div>
            ) : null
          }
        </div>
      );
    }
    if (type == "state") {
      return (
        <CkSelect
          name={name}
          control={control}
          {...customizeReg}
          //@ts-expect-error ignore
          options={inputObj?.options}
          {...rest}
          className={`w-[100%] max-w-[100%] ${className} ${inputObj?.className}`}
          //@ts-expect-error ignore
          isError={errors?.[name]}
          placeholder={inputObj?.placeholder || "Select"}
          onInputChange={inputObj?.onInpuChange}
          isLoading={inputObj?.isLoading}
          //@ts-expect-error ignore
          isClearable={!inputObj?.readOnly}
        />
      );
    }
    if (type == "dob") {
      return (
        <CkInput
          isError={splitByDotGetMany(name, errors)}
          formControlClassName={`w-full ${formControlClassName}`}
          placeholder={inputObj?.placeholder || "Enter"}
          type={"date"}
          {...customizeReg}
          {...rest}
          className={`w-[100%] max-w-[100%] ${className} ${inputObj?.className}`}
          suffixClassName={inputObj?.suffixClassName}
          customPrefixClassName={inputObj?.customPrefixClassName}
          maxLength={inputObj?.maxLength}
          inputControlClassName={inputControlClassName}
          {...restProps}
        />
      );
    }

    return (
      <CkInput
        isError={splitByDotGetMany(name, errors)}
        formControlClassName={`w-full ${formControlClassName}`}
        placeholder={inputObj?.placeholder || "Enter"}
        type={type || "text"}
        {...customizeReg}
        {...rest}
        className={`w-[100%] max-w-[100%] ${className} ${inputObj?.className}`}
        suffixClassName={inputObj?.suffixClassName}
        customPrefixClassName={inputObj?.customPrefixClassName}
        maxLength={inputObj?.maxLength}
        inputControlClassName={inputControlClassName}
        {...restProps}
      />
    );
  };

  return (
    <div
      className={`flex flex-col gap-[8px] ${wrapperClassName} ${inputObj?.wrapperClass}`}
    >
      <Flex
        gap={"10px"}
        alignItems={"center"}
        className={`${labelContainerClassName}`}
      >
        {inputObj?.label ? (
          <label
            className={`flex items-center gap-[10px] text-[18px] whitespace-nowrap font-[600] ${labelClassName}`}
          >
            {inputObj?.label}
            {inputObj?.labelToolTip ? (
              <AdminLabelToolTip toolTipContent={inputObj?.labelToolTip} />
            ) : null}
          </label>
        ) : null}
        {inputObj?.tags ? (
          <AppText
            className={`text-[16px] !text-[#979797] font-[400] ${sublabelClassName} xl:whitespace-nowrap`}
          >
            {inputObj?.tags}
          </AppText>
        ) : null}
      </Flex>
      {inputObj?.sublabel ? (
        <AppText
          className={`text-[12px] text-[#6D6D6D] font-[400] ${sublabelClassName} xl:whitespace-nowrap`}
        >
          {inputObj?.sublabel}
        </AppText>
      ) : null}
      {getInputField()}
      {inputObj?.bottomLeftInfo || inputObj?.bottomRightInfo ? (
        <Flex
          w={"100%"}
          justifyContent={"space-between"}
          mt={"3px"}
          fontSize={"12px"}
        >
          <Box>{inputObj?.bottomLeftInfo}</Box>
          <Box>{inputObj?.bottomRightInfo}</Box>
        </Flex>
      ) : null}
    </div>
  );
};

export default AdminInputRenderer;
