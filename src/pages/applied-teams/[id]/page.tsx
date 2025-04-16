
// import { MAKE_ADMIN_APPLIED_TEAM_DETAIL_TAB } from '@/app/utils/navigation'
// import { useRouter } from 'next/navigation'
import { useLayoutEffect } from 'react'
import { MAKE_ADMIN_APPLIED_TEAM_DETAIL_TAB } from '../../Auth/AgentComponents/navigation/urls'
import { useNavigate } from 'react-router-dom'

const Page = ({ params }: { params: { id: string } }) => {
  const router = useNavigate()
  useLayoutEffect(
    () =>
      router(
        MAKE_ADMIN_APPLIED_TEAM_DETAIL_TAB(params?.id, 'team-details')
      ),
    []
  )
  return null
}

export default Page
