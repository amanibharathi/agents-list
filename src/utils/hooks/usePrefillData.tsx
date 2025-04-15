import { useQuery } from "react-query";
import { GET_ROA_APP_DATA } from "../../api/endpoints/endpoints";
import makeGetRequest from "../../api/makeGetRequest";
import { useEffect } from "react";
import { FieldValues, UseFormReset } from "react-hook-form";
import { returnRoaDataToSet } from "../../pages/Form/prefillData.data";
import { useNavigate } from "react-router-dom";
import { FORM_STARTING_PAGE } from "../../navigation/navigation";

const usePrefillData = ({ reset }: { reset: UseFormReset<FieldValues> }) => {
  const { data, isFetched } = useQuery({
    queryKey: [GET_ROA_APP_DATA],
    queryFn: () => makeGetRequest(GET_ROA_APP_DATA),
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (data?.data && isFetched) {
      const currPage = data?.data?.onboarding_info?.current_page;
      if (currPage)
        navigate(`/agent-onboarding/form${currPage}`, {
          replace: true,
        });
      else
        navigate(FORM_STARTING_PAGE, {
          replace: true,
        });
    }
  }, [data, isFetched]);

  useEffect(() => {
    if (data?.data) {
      const roaAppData = returnRoaDataToSet(data);
      reset({
        ...roaAppData,
      });
    }
  }, [data, reset]);

  return {};
};

export default usePrefillData;
