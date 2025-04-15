import { useQuery } from 'react-query'
import { useState } from 'react'
//import makeGetRequest from '../../../../api/makeGetRequest'
//import { ADMIN_AGENT_STAGE_GET } from '@/app/api-utils'
import makeGetRequest from '../../api/makeGetRequest'
import { ADMIN_AGENT_STAGE_GET } from '../../api-utils'

const useGetAgentStatus = (id: any) => {
  const [search, setSearch] = useState<any[]>([])
  const { refetch } = useQuery(
    [ADMIN_AGENT_STAGE_GET(id)],
    () => makeGetRequest(ADMIN_AGENT_STAGE_GET(id)),
    {
      onSuccess(res) {
        setSearch(res?.data?.results)
      },
    }
  )
  return {
    search,
    refetch,
  }
}

export default useGetAgentStatus
