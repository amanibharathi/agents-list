import { useQuery } from 'react-query'
//import makeGetRequest from '@/app/utils/api/makeGetRequest'
// import { GET_AGENT_SUPPORT_DOCUMENT_LIST } from '@/app/api-utils'
import makeGetRequest from '../../api/makeGetRequest'
import { GET_AGENT_SUPPORT_DOCUMENT_LIST } from '../../api-utils'

export function useGetAgentDocumentList(id?: any) {
  const { isLoading, refetch, data } = useQuery(
    [GET_AGENT_SUPPORT_DOCUMENT_LIST],
    () => makeGetRequest(GET_AGENT_SUPPORT_DOCUMENT_LIST + `?user=${id}`)
  )
  return { agentDocumentList: data, isLoading, refetch }
}
