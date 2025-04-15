
import { ReactNode, useMemo } from 'react'
import HeaderLayout from './components/header-layout'
import DetailCard from './components/detail-card'
// import SecondaryNav from '@/app/components/layouts/secondaryNav'
import { usePathname, useParams } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { MAKE_AGENT_DETAIL_TAB_PAGE } from '@/app/utils/navigation'
import { useGetAgentDetail } from '@/app/hooks/queryhooks/useGetAgentDetail'
import { useQuery } from 'react-query'
import { ADMIN_AGENT_DOCUMENTS_LIST, AGENT_NOTES_LIST } from '@/app/api-utils'
import makeGetRequest from '@/app/utils/api/makeGetRequest'
import useGetAgentStatus from '@/app/hooks/admin/useGetAgentStatus'
import { useAppStore } from '@/app/utils/store'
import SecondaryNav from './on-oboarding-application/components/secondaryNav'

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  // const [notesCount, setNotesCount] = useState(0)
  // const [docCount, setDocCount] = useState(0)

  const { id } = useParams()

  const { data: notesData } = useQuery(
    [AGENT_NOTES_LIST() + `?review_type=internal_notes&user=${id}`],
    () =>
      makeGetRequest(
        AGENT_NOTES_LIST() + `?review_type=internal_notes&user=${id}`
      )
    // {
    //   onSuccess: (res) => {
    //     setNotesCount(res?.data?.count)
    //   },
    // }
  )

  const { data: docData } = useQuery(
    [ADMIN_AGENT_DOCUMENTS_LIST(id)],
    () => makeGetRequest(ADMIN_AGENT_DOCUMENTS_LIST(id))
    // {
    //   onSuccess: (res) => {
    //     setDocCount(res?.data?.count)
    //   },
    // }
  )

  // const { data: licenseData } = useQuery(
  //   [GET_AGENT_STAGE_LICENSE_LIST(id)],
  //   async () => makeGetRequest(GET_AGENT_STAGE_LICENSE_LIST(id))
  // )

  // const { data: mlsData } = useQuery([GET_AGENT_STAGE_MLS_LIST(id)], async () =>
  //   makeGetRequest(GET_AGENT_STAGE_MLS_LIST(id))
  // )

  // const approvedflow = licenseData?.data?.results
  //   ?.concat(mlsData?.data?.results)
  //   ?.map((e: any) => e?.status)

  // const isApproved = approvedflow?.includes('submitted')
  const stageDataResponse = useGetAgentStatus(id)?.search ?? []
  let isFirstThreeStagesCompleted = false
  const stages = ['application', 'e_sign', 'tools']
  if (stageDataResponse?.length > 0) {
    isFirstThreeStagesCompleted = stageDataResponse
      .filter((each: any) => stages.includes(each?.stage))
      .every((stage) => stage.status === 'completed')
  }
  const { adminRoles } = useAppStore()

  const navData = useMemo(
    () =>
      [
        {
          id: uuidv4(),
          label: 'Onboarding Application',
          link: MAKE_AGENT_DETAIL_TAB_PAGE(id, 'on-oboarding-application'),
        },
        {
          id: uuidv4(),
          label: 'Onboarding Checklist',
          link: MAKE_AGENT_DETAIL_TAB_PAGE(id, 'on-boarding-checklist'),
        },
        {
          id: uuidv4(),
          label: 'Account',
          link: MAKE_AGENT_DETAIL_TAB_PAGE(id, 'account'),
        },
        {
          id: uuidv4(),
          label: 'Tools & Provisioning',
          link: MAKE_AGENT_DETAIL_TAB_PAGE(id, 'tools-provisioning'),
        },
        {
          id: uuidv4(),
          label: 'Notes',
          link: MAKE_AGENT_DETAIL_TAB_PAGE(id, 'notes'),
          count: notesData?.data?.count,
        },
        {
          id: uuidv4(),
          label: 'Email Forwarding',
          link: MAKE_AGENT_DETAIL_TAB_PAGE(id, 'email-forwarding'),
        },
        {
          id: uuidv4(),
          label: 'Documents',
          link: MAKE_AGENT_DETAIL_TAB_PAGE(id, 'documents'),
          count: docData?.data?.count,
        },
        adminRoles['ESign Management Policy']?.permissions?.is_viewable && {
          id: uuidv4(),
          label: 'ICA',
          link: MAKE_AGENT_DETAIL_TAB_PAGE(id, 'ica'),
        },
      ]?.filter(Boolean),
    [docData, notesData, adminRoles]
  )
  // const { data, isLoading, refetch } = useQuery(
  //   [ADMIN_AGENT_DETAIL_GET(id)],
  //   () => makeGetRequest(ADMIN_AGENT_DETAIL_GET(id))
  // )
  // const agentData = data?.data
  const { agentData, isLoading, refetch, metaData, metaIsLoading } =
    useGetAgentDetail(id)
  return (
    <div className="w-full max-w-[1280px] mx-auto py-[40px]">
      <HeaderLayout
        name={
          agentData?.first_name
            ? agentData?.first_name + ' ' + agentData?.last_name
            : ''
        }
        id={agentData?.agent_detail?.id}
        status={agentData?.agent_detail?.agent_status}
        email={agentData ? agentData?.email : ''}
        // licenseMlsStatus={isApproved}
        isFirstThreeStagesCompleted={isFirstThreeStagesCompleted}
      />
      <DetailCard
        metaData={metaData}
        data={agentData}
        isLoading={isLoading}
        metaIsLoading={metaIsLoading}
        refetch={refetch}
      />
      <SecondaryNav
        wrapperClassName="!justify-start border-b-[1.5px] border-[#CDCDCD80]"
        isSelectedClassName="!text-[#10295A]"
        tabClassName="!px-[0px]"
        navData={navData}
        urlPath={pathname}
      />
      {children}
    </div>
  )
}

export default Layout
