'use client'

import { MAKE_ADMIN_APPLIED_TEAM_DETAIL_TAB } from '@/app/utils/navigation'
import { useRouter } from 'next/navigation'
import { useLayoutEffect } from 'react'

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  useLayoutEffect(
    () =>
      router.push(
        MAKE_ADMIN_APPLIED_TEAM_DETAIL_TAB(params?.id, 'team-details')
      ),
    []
  )
  return null
}

export default Page
