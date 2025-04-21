import { useFieldArray, useForm } from "react-hook-form";
import AppMultipartFormRenderer from "../../../../../../AppComponents/AppForm/AppMultipartFormRenderer";
import {
  areYouLicensedInMulitpleStates,
  hasDisciplinaryActionsTaken,
  licenseDetailsInputs,
} from "./roa-application.data";
import useMutateShortHand from "../../../../../../utils/hooks/useMutateShortHand";
import { POST_PERSONAL_INFO } from "./onboarding-endpoints";
import useGetMetaFromApi from "../../../../../../utils/hooks/useGetMetaFromApi";
import { GET_STATES_META_API } from "../../../../../../api/endpoints/endpoints";
import { Divider, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { getTodayDate } from "../../../../../../utils/functions/commonFunctions";
import { licenseDetailsOptions } from "./roa-application.options.data";
import AppInputRenderer from "../../../../../../AppComponents/AppForm/AppInputRenderer";
import AppButton from "../../../../../../AppComponents/AppButton";

const dividerStyle = { background: "#C6C6C6", flex: 1, height: "1px" };

const LicenseDetails = () => {
  const formUtils = useForm();
  const hasTheLicenseEverSuspended = formUtils.watch("is_license_suspended");
  const multiplelicense = formUtils.getValues();

  const { fields, remove, append } = useFieldArray({
    control: formUtils?.control,
    name: "licenses",
  });

  useEffect(() => {
    if (
      multiplelicense.multiple_license_enabled === "false" &&
      fields.length > 1
    ) {
      for (let i = fields.length - 1; i > 0; i--) {
        remove(i);
      }
    }
  }, [multiplelicense.multiple_license_enabled, fields, remove]);
  const _areYouLicensedInMulitpleStates = areYouLicensedInMulitpleStates();

  const { isLoading } = useMutateShortHand({
    endpoint: POST_PERSONAL_INFO,
  });

  const { metaData, handleOnInputChange, metaDataIsLoading } =
    useGetMetaFromApi({
      endPoint: GET_STATES_META_API,
    });

  const _licenseDetailsInputs = licenseDetailsInputs({
    metaData: metaData,
    handleOnInputChange,
    metaDataIsLoading: metaDataIsLoading,
  });

  const _hasDisciplinaryActionsTaken = hasDisciplinaryActionsTaken({
    hasLicenseSuspended: hasTheLicenseEverSuspended,
  });

  const onSuccess = (data: unknown) => {
    // mutate()
    console.log("DATTA", data);
  };

  if (
    multiplelicense.multiple_license_enabled === "false" &&
    fields.length > 1
  ) {
    for (let i = fields.length - 1; i > 0; i--) {
      remove(i);
    }
  }
  const _fieldsWithoutFirstOne = fields?.slice(1)?.map((_, ind) => [
    {
      thisWrapperStyles: {},
      render: [
        {
          type: "select",
          name: `licenses.${ind + 1}.state`,
          label: "Primary State",
          placeholder: "Select One",
          options: metaData?.data?.results,
          inputOptions: {
            isLoading: metaDataIsLoading,
            onInputChange: handleOnInputChange,
          },
        },
      ],
    },
    {
      thisWrapperStyles: {
        gap: "15px",
        gridTemplateColumns: { base: "auto", md: "1fr 1fr" },
      },
      render: [
        {
          type: "select",
          name: `licenses.${ind + 1}.license_type`,
          label: "What type of license is it?",
          placeholder: "Select",
          options: licenseDetailsOptions?.licenseType,
        },
        {
          type: "text",
          name: `licenses.${ind + 1}.license_no`,
          label: "License Number",
          placeholder: "License Number",
        },
      ],
    },
    {
      thisWrapperStyles: {
        gap: "15px",
        gridTemplateColumns: { base: "auto", md: "1fr 1fr" },
      },
      render: [
        {
          type: "date",
          name: `licenses.${ind + 1}.expiry_date`,
          label: "Expiration Date",
          placeholder: "mm/dd/yyyy",
          inputOptions: {
            min: getTodayDate(),
          },
        },
        {
          type: "date",
          name: `licenses.${ind + 1}.planned_transfer_date`,
          label: "When do you plan to transfer this license?",
          placeholder: "mm/dd/yyyy",
          inputOptions: {
            min: getTodayDate(),
          },
        },
      ],
    },
  ]);

  return (
    <div>
      <form onSubmit={formUtils?.handleSubmit(onSuccess)}>
        <div className="flex flex-col gap-[28px] w-full max-w-[800px]">
          <AppMultipartFormRenderer
            isLoading={isLoading}
            formUtils={formUtils}
            inputFields={_areYouLicensedInMulitpleStates}
          />
          <AppMultipartFormRenderer
            isLoading={isLoading}
            formUtils={formUtils}
            inputFields={_licenseDetailsInputs}
          />
          {_fieldsWithoutFirstOne?.map((fields, ind) => (
            <Flex
              sx={{ flexFlow: "column", gap: "10px", position: "relative" }}
            >
              <AppInputRenderer
                register={formUtils?.register}
                control={formUtils?.control}
                inputList={fields}
                errors={formUtils?.formState?.errors}
                boxWrapperStyles={{ gap: { base: "17px", md: "19px" } }}
              />
              <AppButton
                onClick={() => remove(ind + 1)}
                sx={{ position: "absolute", right: "0px" }}
                variant={"smallRemoveBtn"}
              >
                Remove
              </AppButton>
              <Divider sx={{ ...dividerStyle }} />
            </Flex>
          ))}
          {multiplelicense.multiple_license_enabled == "true" && (
            <Flex sx={{ alignItems: "center", gap: "8px", mt: "30px" }}>
              <Divider sx={{ ...dividerStyle }} />
              <AppButton
                leftIcon={<FaPlus color="rgba(26, 145, 117, 1)" />}
                variant={"whiteGray"}
                type="button"
                onClick={() =>
                  append({
                    license_no: "",
                    license_type: "",
                    planned_transfer_date: "",
                    expiry_date: "",
                  })
                }
              >
                Add Additional License
              </AppButton>
              <Divider sx={{ ...dividerStyle }} />
            </Flex>
          )}
          <AppMultipartFormRenderer
            formUtils={formUtils}
            inputFields={_hasDisciplinaryActionsTaken}
          />
        </div>
        <Flex sx={{ justifyContent: "end", gap: "10px" }}>
          <AppButton
            isLoading={isLoading}
            type="submit"
            bg={"#10295A"}
            color={"white"}
          >
            Save
          </AppButton>
        </Flex>
      </form>
    </div>
  );
};

export default LicenseDetails;
