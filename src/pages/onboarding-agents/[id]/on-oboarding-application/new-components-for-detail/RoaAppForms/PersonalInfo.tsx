import { useForm } from "react-hook-form";
import AppMultipartFormRenderer from "../../../../../../AppComponents/AppForm/AppMultipartFormRenderer";
import {
  tellAboutYourSelfInputs,
  yourEmergencyDetailsInputs,
  yourResidentialDetailsInputs,
} from "./roa-application.data";
import useMutateShortHand from "../../../../../../utils/hooks/useMutateShortHand";
import { POST_PERSONAL_INFO } from "./onboarding-endpoints";
import useGetMetaFromApi from "../../../../../../utils/hooks/useGetMetaFromApi";
import { GET_STATES_META_API } from "../../../../../../api/endpoints/endpoints";
import AppButton from "../../../../../../AppComponents/AppButton-agent";
import { Flex } from "@chakra-ui/react";

const PersonalInfo = () => {
  const formUtils = useForm();
  const _tellAboutYourSelfInputs = tellAboutYourSelfInputs();
  const { isLoading } = useMutateShortHand({
    endpoint: POST_PERSONAL_INFO,
  });

  const { metaData, handleOnInputChange, metaDataIsLoading } =
    useGetMetaFromApi({
      endPoint: GET_STATES_META_API,
    });
  const _yourResidentialDetailsInputs = yourResidentialDetailsInputs({
    metaData: metaData,
    handleOnInputChange,
    metaDataIsLoading: metaDataIsLoading,
  });
  const _yourEmergencyDetailsInputs = yourEmergencyDetailsInputs();

  const onSuccess = (data: unknown) => {
    // mutate()
    console.log("DATTA", data);
  };

  return (
    <div>
      <form onSubmit={formUtils?.handleSubmit(onSuccess)}>
        <div className="flex flex-col gap-[28px]">
          <AppMultipartFormRenderer
            isLoading={isLoading}
            formUtils={formUtils}
            inputFields={_tellAboutYourSelfInputs}
          />
          <AppMultipartFormRenderer
            isLoading={isLoading}
            formUtils={formUtils}
            inputFields={_yourResidentialDetailsInputs}
          />
          <AppMultipartFormRenderer
            formUtils={formUtils}
            inputFields={_yourEmergencyDetailsInputs}
          />
          <Flex sx={{ justifyContent: "end", gap: "10px" }}>
            <AppButton isLoading={isLoading} type="submit">
              Save
            </AppButton>
          </Flex>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;
