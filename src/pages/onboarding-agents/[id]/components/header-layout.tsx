
//import AppButton from '@/app/components/elements/AppButton'
import { useMemo, useState } from 'react'
//import CkAppModal from '@/app/components/modal/AppModal'
import { useDisclosure } from '@chakra-ui/react'
import ModalRejectComponent from './modal-reject-component'
import toast from 'react-hot-toast'
import { getFirstErrorMessage } from '../../../../utils/functions/commonFunctions'
import { useMutation, useQuery } from 'react-query'
//import useGetAgentStatus from '@/app/hooks/admin/useGetAgentStatus'
import {
  ADMIN_AGENT_ON_BOARDING_UPDATE,
  GET_AGENT_SUMMARY_DETAILS,
  GET_FORGOT_PASSWORD_LINK,
} from '../../../../api-utils'
import { useParams } from 'react-router-dom'
import makePostRequest from '../../../../api/makePostRequest'
//import AdminBreadcrumbs from '@/app/admin/_AdminComponent/AdminBreadcrumbs/AdminBreadcrumbs'
import AgentApproveEditModal from './agentApproveEditModal'
import makeGetRequest from '../../../../api/makeGetRequest'
//import { useGetAgentDetail } from '@/app/hooks/queryhooks/useGetAgentDetail'
import TerminatedStatusModal from './TerminatedStatusModal'
//import { useAppStore } from '@/app/utils/store'
import AppButton from '../../../../AppComponents/AppButton-agent'
import CkAppModal from '../../../Auth/AgentComponents/admincompenets/AppModal'
import useGetAgentStatus from '../../../../utils/hooks/useGetAgentStatus'
import AdminBreadcrumbs from '../../../Auth/AgentComponents/admincompenets/AdminBreadcrumbs'
import { useGetAgentDetail } from '../../../../utils/hooks/useGetAgentDetail'
import { useAppStore } from '../../../../store-admin'

interface IHeaderLayout {
  name?: string
  id: string
  status?: string
  email?: string
  // licenseMlsStatus?: boolean
  isFirstThreeStagesCompleted?: boolean
}

const inputFields = [
  {
    name: 'reason',
    label: 'Reason *',
    otherRegProps: {
      required: true,
    },
  },
  {
    name: 'note_for_agent',
    label: 'Note for Agent *',
    placeholder: 'Description...',
    otherRegProps: {
      required: true,
    },
    type: 'textarea',
  },
]

export default function HeaderLayout({
  name = '',
  status,
  email,
  // licenseMlsStatus = false,
  isFirstThreeStagesCompleted = false,
}: IHeaderLayout) {
  // console.log('nvfh', isFirstThreeStagesCompleted)
  const { onClose, onOpen, isOpen } = useDisclosure()
  const [summaryData, setSummaryData] = useState<any>({})
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure()
  const { id: userId } = useParams()
  const [onboardingStatus, setOnboardingStatus] = useState('approved')
  // const queryClient = useQueryClient()

  const { agentData, refetch: refetchAgentData } = useGetAgentDetail(userId)
  const isActiveAgent = agentData?.agent_detail?.agent_status === 'active'
  // const isApprovedAgent = agentData?.agent_detail?.agent_status === 'approved'

  const breadcrumbs = useMemo(
    () => [
      {
        text: 'Agents',
        link: '/admin/agents/agents-list',
      },
      {
        text: 'Onboarding - Agents',
        link: isActiveAgent
          ? '/admin/agents/agents-list'
          : '/admin/agents/applied-agents-list',
      },
      {
        text: name,
      },
    ],
    [name, isActiveAgent]
  )

  const { refetch, search } = useGetAgentStatus(userId)

  // checking whether all stage status is approved or submitted
  // let isAllStagesSubmittedOrApproved = true
  // if (search?.length > 0) {
  //   search?.map((stage: any) => {
  //     if (stage?.status !== 'submitted' && stage?.status !== 'approved') {
  //       isAllStagesSubmittedOrApproved = false
  //     }
  //   })
  // }
  // checking whether 1st - 3 stage status is completed
  let isAllStagesCompleted = true
  if (search?.length > 0) {
    search?.slice(3, 1)?.map((stage: any) => {
      if (stage?.status !== 'completed') {
        isAllStagesCompleted = false
      }
    })
  }

  const {
    isLoading: isSummaryLoading,
    isError: isSummaryError,
    refetch: refetchSummary,
  } = useQuery(
    [GET_AGENT_SUMMARY_DETAILS(userId)],
    () => makeGetRequest(GET_AGENT_SUMMARY_DETAILS(userId)),
    {
      onSuccess: (res) => {
        setSummaryData(res?.data)
      },
    }
  )

  const { mutate, isLoading } = useMutation(
    (body) => makePostRequest(ADMIN_AGENT_ON_BOARDING_UPDATE, body),
    {
      onSuccess: (res, variables: any) => {
        if (res?.status === 'success')
          toast.success(
            variables?.status === 'rejected'
              ? 'Agent Rejected Successfully'
              : 'Agent Approved Successfully'
          )
        // queryClient.invalidateQueries(['getAgentStatus', id])
        refetch()
        refetchAgentData()
      },
      onError: (err: any) => {
        //@ts-ignore
        const errMsg = getFirstErrorMessage(err?.response?.data?.data)
        //@ts-ignore
        toast.error(errMsg)
      },
    }
  )

  const { isLoading: resetIsLoading, mutate: resetMutate } = useMutation(
    (body) => makePostRequest(GET_FORGOT_PASSWORD_LINK, body),
    {
      onSuccess: (res) => {
        if (res?.status === 'success')
          toast.success('Check your email to reset your password')
      },
      onError: () => {
        // @ts-ignore
        toast.error('Please recheck your email')
      },
    }
  )

  const handleSubmit = () => {
    const finalForm = {
      email: email,
    }
    // @ts-ignore
    resetMutate(finalForm)
  }

  const handleApprove = () => {
    setOnboardingStatus('approved')
    //@ts-ignore
    mutate({
      user: userId,
      status: 'approved',
    })
    onClose()
  }

  const handleRequestSubmit = (body: any) => {
    setOnboardingStatus('rejected')
    // @ts-ignore
    mutate({
      user: userId,
      status: 'rejected',
      reason: body?.data?.reason,
      note_for_agent: body?.data?.note_for_agent,
    })
    onClose()
  }

  const isActiveOrInActive = ['active', 'inactive']?.includes(
    agentData?.agent_detail?.agent_status
  )

  const { adminRoles } = useAppStore()

  const isDeletable =
    adminRoles['Agent Management Policy']?.permissions?.is_deletable

  return (
    <div className="flex justify-between item-center h-[50px]">
      <CkAppModal
        className="!w-full !max-w-[723px]"
        bodyClassName="!px-[40px] !py-[6px]"
        isOpen={isOpen}
        onClose={onClose}
        //@ts-ignore
        header={'Reject Agent'}
        headerClassName="rounded-md text-[#10295A] text-[20px] font-[500] !py-[26px] !px-[40px] "
        closeButton={true}
      >
        <ModalRejectComponent
          onClose={onClose}
          inputFields={inputFields}
          isLoading={isLoading && onboardingStatus === 'rejected'}
          buttonLabel1="Cancel"
          buttonLabel2="Reject"
          handleSumbit={handleRequestSubmit}
        />
      </CkAppModal>
      {/* <AppText className="!text-[#444444]" type={'span'}>
        Agents / Onboarding - Agents /{' '}
        <AppText className="!text-[#10295A] font-semibold" type={'span'}>
          {name}
        </AppText>
      </AppText> */}
      <AdminBreadcrumbs
        route={breadcrumbs}
        wrapperClassName="!mt-[10px] !pt-[10px]"
      />
      {status !== 'approved' ? (
        <div className="flex gap-[10px]">
          {isActiveOrInActive ? (
            <TerminatedStatusModal
              isTerminated={agentData?.agent_detail?.is_terminated}
              id={agentData?.agent_detail?.id}
              refetchAgentData={refetchAgentData}
              disabled={!isDeletable}
            />
          ) : null}
          <AppButton
            label="Send Reset Password Link"
            variant="outline"
            onClick={() => handleSubmit()}
            isLoading={resetIsLoading}
          />
          {isActiveOrInActive ? null : (
            <AppButton
              className="!text-[#10295A] border border-[#CDCDCD] rounded px-[30px]"
              label="Reject"
              variant="transparent"
              onClick={onOpen}
            />
          )}
          {isActiveOrInActive ? null : (
            <AppButton
              label="Approve"
              disabled={!isFirstThreeStagesCompleted}
              onClick={() => {
                if (isAllStagesCompleted) {
                  refetchSummary()
                  onOpenEdit()
                } else {
                  handleApprove()
                }
              }}
              isLoading={isLoading && onboardingStatus === 'approved'}
            />
          )}

          {/* <AppButton
            label="Approve"
            disabled={!islicenseSubmitted}
            onClick={() => onOpenEdit()}
          /> */}
          {!isSummaryLoading && isOpenEdit ? (
            <AgentApproveEditModal
              isOpen={isOpenEdit}
              onClose={onCloseEdit}
              refetch={refetch}
              refetchAgentData={refetchAgentData}
              data={summaryData}
              isLoading={isSummaryLoading}
              isError={isSummaryError}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
