// import { ADMIN_AGENT_STATE_LIST } from '@/app/api-utils'
// import makeGetRequest from '@/app/utils/api/makeGetRequest'
import { useQuery } from 'react-query'
import { ADMIN_AGENT_STATE_LIST } from '../../../../../api-utils'
import makeGetRequest from '../../../../../api/makeGetRequest'

export const useGetState = () => {
  const { data } = useQuery([ADMIN_AGENT_STATE_LIST], () =>
    makeGetRequest(ADMIN_AGENT_STATE_LIST)
  )
  return data?.data?.results ?? []
}
