import { useState } from "react";
import { useQuery } from "react-query";
//import makeGetRequest from '@/app/utils/api/makeGetRequest'
// import {
//  // ADMIN_AGENT_DETAIL_GET,
//   ADMIN_AGENT_DETAIL_GET_META,
// } from '@/app/api-utils'
import makeGetRequest from "../../api/makeGetRequest";
import { ADMIN_AGENT_DETAIL_GET_META } from "../../api-utils";

export function useGetAgentDetail(id?: string) {
  const agentDetailApi = `/api/agent/${id}/basic-info/`;
  const [agentData, setAgentData] = useState({});
  const { isLoading, refetch, data } = useQuery(
    [agentDetailApi],
    () => makeGetRequest(agentDetailApi),
    {
      onSuccess: (res) => {
        setAgentData(res?.data);
      },
    }
  );

  const metaEndpoint = ADMIN_AGENT_DETAIL_GET_META(
    data?.data?.agent_detail?.id
  );

  const {
    isLoading: metaIsLoading,
    refetch: metaRefetch,
    data: metaData,
  } = useQuery([metaEndpoint], () => makeGetRequest(metaEndpoint), {
    enabled: !!data?.data,
  });

  return {
    agentData,
    isLoading,
    refetch,
    metaData,
    metaIsLoading,
    metaRefetch,
  };
}
