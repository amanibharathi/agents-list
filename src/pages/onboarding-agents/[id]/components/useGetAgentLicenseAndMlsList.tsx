import { useQuery } from 'react-query'
import makeGetRequest from '../../../../api/makeGetRequest'
import {
  GET_AGENT_STAGE_LICENSE_LIST,
  GET_AGENT_STAGE_MLS_LIST,
} from '../../../../api-utils'

export function useGetAgentLicenseAndMlsList(id?: any) {
  const { isLoading: isLoadingLicenseList, refetch: refetchLicense } = useQuery(
    [GET_AGENT_STAGE_LICENSE_LIST],
    () => makeGetRequest(GET_AGENT_STAGE_LICENSE_LIST(id))
  )
  const { isLoading: isLoadingMlsList, refetch: refetchMls } = useQuery(
    [GET_AGENT_STAGE_MLS_LIST],
    () => makeGetRequest(GET_AGENT_STAGE_MLS_LIST(id))
  )
  return { isLoadingLicenseList, isLoadingMlsList, refetchLicense, refetchMls }
}
