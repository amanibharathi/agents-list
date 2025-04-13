import { useContext } from "react";
import AppText from "../AppText";
import AppInputRenderer from "./AppInputRenderer";
import { IMultipartInputList } from "./types/types";
import { MultipartFormContext } from "../../pages/Form/layout/FormLayout";
import { Flex } from "@chakra-ui/react";

const AppMultipartFormRenderer = ({
  inputFields,
}: {
  inputFields: IMultipartInputList[];
}) => {
  const { formUtils } = useContext(MultipartFormContext);
  return (
    <Flex sx={{ flexFlow: "column", gap: "39px" }}>
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
              {field?.title && (
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
              )}
            </Flex>
          ) : null}

          <AppInputRenderer
            register={formUtils?.register}
            control={formUtils?.control}
            inputList={field?.inputs}
            errors={formUtils?.formState?.errors}
            boxWrapperStyles={{ gap: { base: "17px", md: "19px" } }}
          />
        </Flex>
      ))}
    </Flex>
  );
};

export default AppMultipartFormRenderer;
