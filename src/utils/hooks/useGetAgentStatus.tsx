import { useQuery } from "react-query";
//import makeGetRequest from '../../../../api/makeGetRequest'
//import { ADMIN_AGENT_STAGE_GET } from '@/app/api-utils'
import makeGetRequest from "../../api/makeGetRequest";
import { ADMIN_AGENT_STAGE_GET } from "../../api-utils";

const useGetAgentStatus = (id: string | number | undefined) => {
  const { refetch, data } = useQuery([ADMIN_AGENT_STAGE_GET(id)], () =>
    makeGetRequest(ADMIN_AGENT_STAGE_GET(id))
  );
  return {
    search: data,
    refetch,
  };
};

export default useGetAgentStatus;
