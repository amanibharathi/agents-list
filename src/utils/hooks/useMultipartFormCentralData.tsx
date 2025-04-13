import { useForm } from "react-hook-form";
import useHandleDataSubmitForEachStep from "./useHandleDataSubmitForEachStep";
import { useMutation } from "@tanstack/react-query";
import makePostRequest from "../../api/makePostRequest";
import useMultipartFormSteps from "./useMultipartFormSteps";
import { setFormErrors, showToastError } from "../functions/commonFunctions";
import usePrefillData from "./usePrefillData";

const useMultipartFormCentralData = () => {
  const formUtils = useForm();
  const values = formUtils?.watch();
  const reset = formUtils?.reset;
  const { goNextStep, goBackStep, inputSectionAndSteps, getCurrentStep } =
    useMultipartFormSteps({ values });
  const { mutate, isPending } = useMutation({
    mutationKey: ["postSubmitDataApi"],
    mutationFn: (content) => {
      //@ts-expect-error ignore
      return makePostRequest(content?.endpoint, content?.body);
    },
    onSuccess: () => {
      goNextStep();
    },
    onError(error) {
      //@ts-expect-error ignore
      showToastError(error?.response?.data);
      //@ts-expect-error ignore
      setFormErrors(error?.response?.data, formUtils?.setError);
    },
  });

  usePrefillData({ reset });

  const { handleSubmitAppropriateData } = useHandleDataSubmitForEachStep({
    //@ts-expect-error ignore
    mutate,
    //@ts-expect-error ignore
    values,
    formUtils,
    inputSectionAndSteps,
  });
  return {
    formUtils,
    handleSubmitAppropriateData,
    isPending,
    goBackStep,
    inputSectionAndSteps,
    getCurrentStep,
  };
};

export default useMultipartFormCentralData;
