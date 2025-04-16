// import CkAppModal from '@/app/components/modal/AppModal'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Flex } from '@chakra-ui/react'
// import ButtonPair from '@/app/admin/_AdminComponent/ButtonPair/ButtonPair'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import { PiPaperPlaneTilt } from 'react-icons/pi'
import AddATeamMemberModalStep2 from './AddATeamMemberModalStep1'
// import useGetMetaFromApi from '@/app/hooks/admin/useGetMetaFromApi'
import CkAppModal from '../../../../Auth/AgentComponents/admincompenets/AppModal'
import { ADMIN_AGENT_STATE_LIST,
  ADMIN_AGENT_TEAM_DETAIL,
  ADMIN_TEAM_MEMBER_CREATE,
  ADMIN_TEAM_MEMBER_UPDATE_META,
  GET_ADMIN_TEAM_MEMBERS_LIST, } from '../../../../../api-utils'
import ButtonPair from '../../../../Auth/AgentComponents/admincompenets/ButtonPair'
import makeGetRequest from '../../../../../api/makeGetRequest'
import makePostRequest from '../../../../../api/makePostRequest'
import { commissionPlanOptions,getFirstErrorMessage,
  removeSpecialChars,
  validateName, } from '../../../../../utils/functions/commonFunctions'
import useGetMetaFromApi from '../../../../../utils/hooks/useGetMetaFromApi'

const AddANewMemberModal = ({
  isOpen,
  onClose,
  params,
}: {
  isOpen: boolean
  onClose: () => void
  params: string
}) => {
  const [imageState, setImageState] = useState()
  const formUtil = useForm()
  const queryClient = useQueryClient()
  const {
    metaData: agentsStateData,
    handleOnInputChange: handleStateDataChange,
  } = useGetMetaFromApi({
    endPoint: ADMIN_AGENT_STATE_LIST,
  })
  const agentStateOptions = agentsStateData?.data?.results

  const { mutate, isLoading } = useMutation(
    (body) => makePostRequest(ADMIN_TEAM_MEMBER_CREATE(params), body),
    {
      onSuccess: () => {
        toast.success('Team Member Added Successfully')
        // const id = res?.data?.id
        queryClient.invalidateQueries({
          queryKey: [GET_ADMIN_TEAM_MEMBERS_LIST(params)],
        })
        queryClient.invalidateQueries({
          queryKey: [ADMIN_AGENT_TEAM_DETAIL(params)],
        })
        onClose()
        formUtil.reset()
      },
      onError: (err) => {
        //@ts-ignore
        const errMsg = getFirstErrorMessage(err?.response?.data?.data)
        //@ts-ignore
        toast.error(errMsg)
      },
    }
  )

  const { data: meta } = useQuery(
    [ADMIN_TEAM_MEMBER_UPDATE_META(params)],
    () => makeGetRequest(ADMIN_TEAM_MEMBER_UPDATE_META(params)),
    {
      enabled: !!params,
    }
  )

  const inputFields = useMemo(
    () => [
      {
        label: 'First Name*',
        name: 'first_name',
        maxLength: 50,
        otherRegProps: {
          required: true,
          validate: validateName,
        },
      },
      {
        label: 'Last Name*',
        name: 'last_name',
        maxLength: 50,
        otherRegProps: {
          required: true,
          validate: validateName,
        },
      },
      {
        label: 'Email Address*',
        name: 'email',
        otherRegProps: {
          required: true,
          pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,20})+$/,
        },
      },
      {
        label: 'Phone Number*',
        name: 'phone',
        type: 'tel',
        otherRegProps: {
          required: true,
        },
      },
      {
        label: 'Role*',
        name: 'role',
        type: 'select',
        options: meta?.data?.meta?.role,
        className: '!z-[14]',
        otherRegProps: {
          required: true,
        },
      },
      {
        label: 'State*',
        name: 'state',
        type: 'select',
        options: agentStateOptions,
        onInpuChange: (val: any) => handleStateDataChange(val),
        className: '!z-[11]',
        otherRegProps: {
          required: true,
        },
      },
      {
        label: 'Brokerage Commission Plan*',
        name: 'commission_plan',
        type: 'select',
        options: commissionPlanOptions,
        className: '!z-[12]',
        otherRegProps: {
          required: true,
        },
      },
      {
        label: 'Minimum Team Commission Split*',
        name: 'commission_split',
        type: 'number',
        placeholder: 'Enter a value between 15 to 100',
        otherRegProps: {
          required: true,
          min: { value: 15, message: 'Minimum split is 15' },
          max: { value: 100, message: 'Maximum split is 100' },
        },
      },
      {
        label: 'Cap Structure*',
        name: 'cap',
        type: 'select',
        options: meta?.data?.meta?.cap_structure,
        className: '!z-[11]',
        otherRegProps: {
          required: true,
        },
      },
    ],
    [meta, agentStateOptions, commissionPlanOptions]
  )

  const stepsComponent = [
    {
      comp: (
        <AddATeamMemberModalStep2
          inputFields={inputFields}
          formUtil={formUtil}
          imageState={imageState}
          setImageState={setImageState}
        />
      ),
    },
  ]

  const handlePrimaryBtnClick = () => {
    const watchData = formUtil.watch('data')
    const obj = {
      creation_type: 'new',
      role: watchData?.role?.value,
      new_user: {
        first_name: watchData?.first_name,
        last_name: watchData?.last_name,
        email: watchData?.email,
        state: watchData?.state?.value,
        country: 'USA',
        phone_number: `+1${removeSpecialChars(watchData?.phone)}`,
      },
      agent_cap_detail: {
        team_commission_plan: watchData?.commission_split,
        commission_plan: watchData?.commission_plan?.value,
        cap_status: watchData?.cap?.value,
      },
      //@ts-ignore
      documents: imageState?.flat()?.map((m: any) => m?.id) ?? [],
    }
    //@ts-ignore
    mutate(obj)
  }

  const handleReject = () => {
    formUtil?.reset({ data: { role: {}, team_members: {} } })
    onClose()
  }

  return (
    <CkAppModal
      className="!w-full !max-w-[771px] !rounded-[10px]"
      bodyClassName=" !px-[40px]"
      isOpen={isOpen}
      onClose={onClose}
      header={`Add a New Member to Team`}
      headerClassName="text-[#10295A] text-[20px] font-[500] !py-[25px] !px-[40px]"
      closeButton
    >
      <form onSubmit={formUtil.handleSubmit(handlePrimaryBtnClick)}>
        {stepsComponent?.[0]?.comp}
        <Flex mb={'28px'} justifyContent={'end'} mt={'40px'}>
          <ButtonPair
            primaryBtnText={'Send Invite'}
            secondaryBtnText={'Cancel'}
            onPrimaryClick={undefined}
            primaryBtnType={'submit'}
            onSecondaryClick={() => handleReject()}
            primaryBtnIsLoading={isLoading}
            primaryBtnIcon={<PiPaperPlaneTilt />}
          />
        </Flex>
      </form>
    </CkAppModal>
  )
}

export default AddANewMemberModal
