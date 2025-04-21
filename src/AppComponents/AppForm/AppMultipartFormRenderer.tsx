// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import AppText from "../AppText";
import AppButton from "../AppButton-agent";
import AppInputRenderer from "./AppInputRenderer";
import { IMultipartInputList } from "./types/types";
import { Flex } from "@chakra-ui/react";
import { FieldValues, UseFormReturn } from "react-hook-form";

const AppMultipartFormRenderer = ({
  inputFields,
  formUtils,
  onSuccess,
  isLoading,
  selfForm = false,
}: {
  onSuccess?: (val: unknown) => void;
  inputFields: IMultipartInputList[];
  formUtils: UseFormReturn<FieldValues, unknown, FieldValues>;
  isLoading?: boolean;
  selfForm?: boolean;
}) => {
  const child = (
    <Flex sx={{ flexFlow: "column", gap: "39px", px: "25px" }}>
      {inputFields?.map((field, ind) => (
        <Flex
          sx={{
            flexFlow: "column",
            gap: { base: "17px", md: "19px" },
          }}
          key={ind}
        >
          {field.desc || field?.title ? (
            <Flex
              sx={{
                flexFlow: "column",
                gap: { base: "8px", md: "10px" },
              }}
            >
              {field?.title && (
                <AppText
                  sx={{
                    fontSize: "25px",
                    fontWeight: 600,
                    color: "#333333",
                    lineHeight: "120%",
                    ...(field?.titleStyles || {}),
                  }}
                >
                  {field?.title}
                </AppText>
              )}
              {/* {field?.title && (
              <AppText
                sx={{
                  fontSize: "16px",
                  fontWeight: 400,
                  color: "#797979",
                  lineHeight: "24px",
                  ...(field?.descStyles || {}),
                }}
              >
                {field?.desc}
              </AppText>
            )} */}
            </Flex>
          ) : null}

          <AppInputRenderer
            register={formUtils?.register}
            control={formUtils?.control}
            inputList={field?.inputs}
            errors={formUtils?.formState?.errors}
            boxWrapperStyles={{
              gap: { base: "17px", md: "19px" },
              width: "100%",
              maxW: "800px",
            }}
          />
        </Flex>
      ))}
    </Flex>
  );
  return (
    <>
      {selfForm ? (
        <form onSubmit={formUtils?.handleSubmit(onSuccess)}>
          {child}
          <Flex sx={{ justifyContent: "end", gap: "10px" }}>
            {/* <AppButton variant="outline">Cancel</AppButton> */}
            <AppButton isLoading={isLoading} type="submit">
              Save
            </AppButton>
          </Flex>
        </form>
      ) : (
        <>{child}</>
      )}
    </>
  );
};

export default AppMultipartFormRenderer;
