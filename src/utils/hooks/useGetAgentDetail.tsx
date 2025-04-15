import { useState } from 'react'
import { useQuery } from 'react-query'
//import makeGetRequest from '@/app/utils/api/makeGetRequest'
// import {
//  // ADMIN_AGENT_DETAIL_GET,
//   ADMIN_AGENT_DETAIL_GET_META,
// } from '@/app/api-utils'
import makeGetRequest from '../../api/makeGetRequest'
import { ADMIN_AGENT_DETAIL_GET, ADMIN_AGENT_DETAIL_GET_META } from '../../api-utils'

export function useGetAgentDetail(id?: any) {
  const [agentData, setAgentData] = useState<any>({})
  const { isLoading, refetch, data } = useQuery(
    [ADMIN_AGENT_DETAIL_GET(id)],
    () => makeGetRequest(ADMIN_AGENT_DETAIL_GET(id)),
    {
      onSuccess: (res) => {
        setAgentData(res?.data)
      },
    }
  )

  const metaEndpoint = ADMIN_AGENT_DETAIL_GET_META(data?.data?.agent_detail?.id)

  const {
    isLoading: metaIsLoading,
    refetch: metaRefetch,
    data: metaData,
  } = useQuery([metaEndpoint], () => makeGetRequest(metaEndpoint), {
    enabled: !!data?.data,
  })

  return { agentData, isLoading, refetch, metaData, metaIsLoading, metaRefetch }
}
