
import { AgentProfileHeader } from '../[memberId]/components/AgentProfileHeader'
// import ButtonPair from '@/app/admin/_AdminComponent/ButtonPair/ButtonPair'
import { Flex } from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
// import makeDeleteRequest from '@/app/utils/api/makeDeleteRequest'
import {
  ADMIN_AGENT_DETAIL_GET,
  ADMIN_AGENT_TEAM_DETAIL,
  ADMIN_TEAM_MEMBER_DELETE,
  ADMIN_TEAM_MEMBER_DELETE_META,
  GET_ADMIN_TEAM_MEMBERS_LIST,
} from '../../../../../api-utils'
import toast from 'react-hot-toast'
// import makeGetRequest from '@/app/utils/api/makeGetRequest'
import AppText from '@/app/components/elements/AppText'
import AppLink from '@/app/components/elements/AppLink'
import {
  ADMIN_TEAM_REQUEST_INDIVIDUAL_PAGE,
  MAKE_ADMIN_TEAM_DETAIL_TAB,
} from '@/app/utils/navigation'
import { useRouter } from 'next-nprogress-bar'
import CkAppModal from '../../../../Auth/AgentComponents/admincompenets/AppModal'
import ButtonPair from '../../../../Auth/AgentComponents/admincompenets/ButtonPair'
import makeDeleteRequest from '../../../../../api/makeDeleteRequest'
import makeGetRequest from '../../../../../api/makeGetRequest'

export const ConfirmRemoveAgentModal = ({
  isOpen,
  onClose,
  data,
  isDetail = false,
  isAgentDetail = false,
}: {
  isOpen: boolean
  onClose: () => void
  data: any
  isDetail?: boolean
  isAgentDetail?: boolean
}) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { mutate, isLoading } = useMutation(
    //@ts-ignore
    (body) =>
      //@ts-ignore
      makeDeleteRequest(ADMIN_TEAM_MEMBER_DELETE(data?.team?.id, body?.id)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [GET_ADMIN_TEAM_MEMBERS_LIST(data?.team?.id)],
        })
        queryClient.invalidateQueries({
          queryKey: [ADMIN_AGENT_TEAM_DETAIL(data?.team?.id)],
        })
        queryClient.invalidateQueries({
          queryKey: [ADMIN_AGENT_DETAIL_GET(data?.id)],
        })
        onClose()
        toast.success('Team Member Removed Successfuly')
        !isAgentDetail &&
          router.push(MAKE_ADMIN_TEAM_DETAIL_TAB(data?.team?.id))
      },
      onError: (err) => {
        console.log(err)
      },
    }
  )

  const { data: metaData } = useQuery(
    [
      ADMIN_TEAM_MEMBER_DELETE_META(
        data?.team?.id,
        isDetail ? data?.memberId : data?.id
      ),
    ],
    () =>
      makeGetRequest(
        ADMIN_TEAM_MEMBER_DELETE_META(
          data?.team?.id,
          isDetail ? data?.memberId : data?.id
        )
      ),
    {
      enabled: isDetail ? !!data?.memberId : !!data?.id,
    }
  )

  return (
    <CkAppModal
      className="!w-full !max-w-[771px] items-center text-center !rounded-[10px] !max-h-[90vh] overflow-scroll no-scrollbar"
      bodyClassName=" px-[30px]"
      isOpen={isOpen}
      onClose={onClose}
      header="Remove Team Member"
      headerClassName="text-[#10295A] text-[20px] font-[500] !py-[30px]"
      description={`Are you sure you want to remove this agent from ${data?.team?.identity ?? 'Team'}?`}
      descriptionClassName="!text-[#000000] mt-[30px]"
    >
      {metaData?.data?.length > 0 ? (
        <div className="bg-[#EBF5FD] mb-[20px] rounded-[8px] px-[10px] py-[4px] text-left">
          <AppText className="mb-[4px]">
            This member has a pending request. Please complete it before
            removing them from the team.
          </AppText>
          <Flex gap={'10px'}>
            {metaData?.data?.map((i: any) => (
              <AppLink
                key={i?.id}
                className="underline"
                href={ADMIN_TEAM_REQUEST_INDIVIDUAL_PAGE(data?.team?.id, i?.id)}
              >
                {i?.request_id}
              </AppLink>
            ))}
          </Flex>
        </div>
      ) : null}
      <AgentProfileHeader
        data={data}
        className="border border-[#D4D4D4] px-[10px] py-[20px] text-left w-[690px]"
      />
      <Flex justify={'end'} mt={'40px'} mb={'30px'}>
        <ButtonPair
          primaryBtnText={'Remove'}
          secondaryBtnText={'Cancel'}
          onPrimaryClick={() =>
            mutate(
              //@ts-ignore
              { id: isDetail ? data?.memberId : data?.id }
            )
          }
          primaryBtnType={'submit'}
          onSecondaryClick={() => {
            onClose()
          }}
          primaryBtnDisabled={metaData?.data?.length > 0}
          primaryBtnIsLoading={isLoading}
        />
      </Flex>
    </CkAppModal>
  )
}
