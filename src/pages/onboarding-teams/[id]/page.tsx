

import { MAKE_ADMIN_TEAM_DETAIL_TAB } from '../../Auth/AgentComponents/navigation/urls'

import { useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Page = ({ params }: { params: { id: string } }) => {
  const router = useNavigate()
  useLayoutEffect(
    () => router(MAKE_ADMIN_TEAM_DETAIL_TAB(params?.id, 'team-members')),
    []
  )
  return null
}

export default Page
