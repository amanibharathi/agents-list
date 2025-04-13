import { useParams } from "react-router-dom";
import { serializeDataToSend } from "../../pages/Form/serializeDataToSend.data";
import { IMultipartFormData } from "../../AppComponents/AppForm/types/types";
import { validateDataToSend } from "../../pages/Form/validateDataToSend.data";
import { FieldValues, UseFormReturn } from "react-hook-form";

const useHandleDataSubmitForEachStep = ({
  mutate,
  values,
  formUtils,
  inputSectionAndSteps,
}: {
  values: IMultipartFormData;
  mutate: (val: unknown) => void;
  formUtils: UseFormReturn<FieldValues, unknown, undefined>;
  inputSectionAndSteps: unknown;
}) => {
  const currentStep = location.pathname.replace("/agent-onboarding/form", "");
  const pathname = useParams();
  const handleSubmitAppropriateData = () => {
    const section = pathname?.section;
    //@ts-expect-error ignore
    const filteredComp = inputSectionAndSteps?.[section]?.steps?.find(
      //@ts-expect-error ignore
      (sec) => sec?.route == currentStep
    );
    const fnName = filteredComp?.getData;
    const validateFnName = filteredComp?.validate;

    const serialize = (values: IMultipartFormData, fnName: string) => {
      //@ts-expect-error ignore
      const fnToCall = serializeDataToSend(values)?.[fnName];
      const dataToMutate = fnToCall();
      mutate(dataToMutate);
    };

    if (validateFnName) {
      //@ts-expect-error ignore
      const validateFnToCall = validateDataToSend(values)?.[validateFnName];
      if (validateFnToCall({ formUtils })) serialize(values, fnName);
    } else {
      serialize(values, fnName);
    }
  };

  return { handleSubmitAppropriateData };
};

export default useHandleDataSubmitForEachStep;
