'use client'
import React, { useState } from 'react'
import { CommonTeamMemberDetail } from './components/CommonTeamMemberDetail'
import { useQuery } from 'react-query'
import {
  ADMIN_TEAM_MEMBER_DETAIL,
  ADMIN_TEAM_MEMBER_UPDATE_META,
  ADMIN_TEAM_REQUEST_DETAIL,
} from '@/app/api-utils'
import makeGetRequest from '@/app/utils/api/makeGetRequest'
import AdminContainer from '@/app/admin/_AdminComponent/AdminContainer'
import { RequestDetailPage } from './components/RequestDetailPage'

const Page = ({
  params,
}: {
  params: { tab: string; id: string; memberId: string }
}) => {
  const [isEdit, setIsEdit] = useState(false)

  const { data, refetch, isLoading } = useQuery(
    [
      ADMIN_TEAM_MEMBER_DETAIL(params?.id, params?.memberId),
      ADMIN_TEAM_REQUEST_DETAIL(params?.id, params?.memberId),
    ],
    () =>
      makeGetRequest(
        params?.tab == 'team-requests'
          ? ADMIN_TEAM_REQUEST_DETAIL(params?.id, params?.memberId)
          : ADMIN_TEAM_MEMBER_DETAIL(params?.id, params?.memberId)
      )
  )
  const detailObj = data?.data
  const documents = detailObj?.documents
  const detail = {
    id: detailObj?.user?.id,
    agent_fullName: `${detailObj?.user?.first_name} ${detailObj?.user?.last_name}`,
    license: detailObj?.user?.license,
    email: detailObj?.user?.email,
    phone: detailObj?.user?.phone_number,
    profile: detailObj?.user?.profile_picture?.file,
    role:
      detailObj?.role != null
        ? {
            id: detailObj?.role,
            identity: detailObj?.role,
            label: detailObj?.role,
            value: detailObj?.role,
          }
        : null,
    cap:
      detailObj?.user?.cap_status != null
        ? {
            id: detailObj?.user?.cap_status?.id,
            identity: detailObj?.user?.cap_status?.identity,
            label: detailObj?.user?.cap_status?.identity,
            value: detailObj?.user?.cap_status?.id,
          }
        : null,
    commision_plan:
      detailObj?.user?.commission_plan != null
        ? {
            id: detailObj?.user?.commission_plan,
            identity: detailObj?.user?.commission_plan,
            label: detailObj?.user?.commission_plan,
            value: detailObj?.user?.commission_plan,
          }
        : null,
    commision_split:
      detailObj?.user?.team_commission_plan != null
        ? detailObj?.user?.team_commission_plan
        : '',
    team: detailObj?.team,
    memberId: detailObj?.id,
  }
  const { data: metaData } = useQuery(
    [ADMIN_TEAM_MEMBER_UPDATE_META(params?.id)],
    () => makeGetRequest(ADMIN_TEAM_MEMBER_UPDATE_META(params?.id)),
    {
      enabled: !!params?.id,
    }
  )

  const meta = metaData?.data?.meta
  return (
    <AdminContainer isLoading={isLoading} className="px-[20px]">
      {params?.tab == 'team-requests' ? (
        <RequestDetailPage data={detailObj} params={params} />
      ) : (
        <CommonTeamMemberDetail
          data={detail}
          isDetail
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          meta={meta}
          params={params}
          documents={documents}
          refetch={refetch}
        />
      )}
    </AdminContainer>
  )
}

export default Page
