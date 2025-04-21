import { useForm } from "react-hook-form";
import { GET_STATES_META_API } from "../../../../../../api/endpoints/endpoints";
import AppMultipartFormRenderer from "../../../../../../AppComponents/AppForm/AppMultipartFormRenderer";
import useGetMetaFromApi from "../../../../../../utils/hooks/useGetMetaFromApi";
import useMutateShortHand from "../../../../../../utils/hooks/useMutateShortHand";
import { yourResidentialDetailsInputs } from "./roa-application.data";

const YourResidentialAddress = () => {
  const formUtils = useForm();

  const { metaData, handleOnInputChange, metaDataIsLoading } =
    useGetMetaFromApi({
      endPoint: GET_STATES_META_API,
    });
  const _yourResidentialDetailsInputs = yourResidentialDetailsInputs({
    metaData: metaData,
    handleOnInputChange,
    metaDataIsLoading: metaDataIsLoading,
  });

  const { isLoading } = useMutateShortHand({
    endpoint: "",
  });

  const onSuccess = (data: unknown) => {
    // mutate()
    console.log("DATTA", data);
  };
  return (
    <div>
      <AppMultipartFormRenderer
        isLoading={isLoading}
        onSuccess={onSuccess}
        formUtils={formUtils}
        inputFields={_yourResidentialDetailsInputs}
      />
    </div>
  );
};

export { YourResidentialAddress };
