import { useForm } from "react-hook-form";
import AppMultipartFormRenderer from "../../../../../../AppComponents/AppForm/AppMultipartFormRenderer";
import { tellAboutYourSelfInputs } from "./roa-application.data";
import useMutateShortHand from "../../../../../../utils/hooks/useMutateShortHand";
import { POST_PERSONAL_INFO } from "./onboarding-endpoints";

const MoreAboutYourSelf = () => {
  const formUtils = useForm();
  const _tellAboutYourSelfInputs = tellAboutYourSelfInputs();
  const { isLoading } = useMutateShortHand({
    endpoint: POST_PERSONAL_INFO,
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
        inputFields={_tellAboutYourSelfInputs}
      />
    </div>
  );
};

export { MoreAboutYourSelf };
