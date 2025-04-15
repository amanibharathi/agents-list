
// import AppButton from '@/app/components/elements/AppButton'
import { Box, Flex, Tag, Text, useDisclosure } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import CustomContendHeader from '../components/custom-content-header'
// import CkAppModal from '@/app/components/modal/AppModal'
// import AppText from '@/app/components/elements/AppText'
//import useGetAgentStatus from '@/app/hooks/admin/useGetAgentStatus'
import toast from 'react-hot-toast'
//import makePostRequest from '@/app/utils/api/makePostRequest'
import {
  ADMIN_E_SIGNED_VIEW,
  GET_AGENT_SIGNATURE_REQUEST_LIST,
  POST_SIGN_REQUEST,
  ADMIN_GET_TEMPLATE_LIST,
} from '../../../../api-utils'
import { useMutation, useQuery } from 'react-query'
import makeGetRequest from '../../../../api/makeGetRequest'
import { IoEyeOutline } from 'react-icons/io5'
//import NoData from '@/app/admin/_AdminComponent/NoData/NoData'
//import AdminFormWrapper from '@/app/admin/_AdminComponent/AdminFormWrapper'
import moment from 'moment'
// import { capitalizeFirstLetter } from '@/app/utils/constants/resourceSectionData'
import { useForm } from 'react-hook-form'
// import AdminInputRenderer from '@/app/admin/_AdminComponent/AdminInputRenderer'
//import { getFirstErrorMessage } from '@/app/utils/functions/otherFunctions'
//import { useAppStore } from '@/app/utils/store'
import AppButton from '../../../../AppComponents/AppButton-agent'
import CkAppModal from '../../../Auth/AgentComponents/admincompenets/AppModal'
import AppText from '../../../../AppComponents/AppText-agent'
import useGetAgentStatus from '../../../../utils/hooks/useGetAgentStatus'
import makePostRequest from '../../../../api/makePostRequest'
import NoData from '../../../Auth/AgentComponents/admincompenets/NoData'
import AdminFormWrapper from '../../../../login/adminlogin/AdminFormWrapper'
import { capitalizeFirstLetter } from '../../../Auth/AgentComponents/table/resourceSectionData'
import AdminInputRenderer from '../../../../login/adminlogin/AdminInputRenderer'
import { getFirstErrorMessage } from '../../../../utils/functions/commonFunctions'
import { useAppStore } from '../../../../store-admin'

const Page = ({ params }: { params: { tab: string; id: string } }) => {
  const {
    register,
    formState: { errors },
    control,
    reset,
    handleSubmit,
  } = useForm({})

  const { adminRoles } = useAppStore()
  const isEditable =
    adminRoles['ESign Management Policy']?.permissions?.is_editable
  const { search: agentStageList } = useGetAgentStatus(params?.id)
  const [reversedSignedContractsList, setList] = useState([])
  const currentEsignId = useRef()
  const isEsignCompleted = ['in_progress', 'completed']?.includes(
    agentStageList?.[1]?.status
  )
  const { onClose, onOpen, isOpen } = useDisclosure()
  const {
    isOpen: isSignOpen,
    onClose: onSignClose,
    onOpen: onSignOpen,
  } = useDisclosure()

  const buttonData = [
    {
      buttonClassName: '',
      disabled: !isEsignCompleted,
      label: 'Request Re-sign',
      onClick: () => onOpen(),
    },
  ]

  const { refetch } = useQuery(
    [GET_AGENT_SIGNATURE_REQUEST_LIST],
    () =>
      makeGetRequest(GET_AGENT_SIGNATURE_REQUEST_LIST + `?user=${params?.id}`),
    {
      onSuccess: (res) => {
        setList(res?.data?.results?.slice()?.reverse())
      },
    }
  )

  const { data: ica_list } = useQuery([ADMIN_GET_TEMPLATE_LIST()], () =>
    makeGetRequest(ADMIN_GET_TEMPLATE_LIST())
  )

  const ica_list_data =
    ica_list?.data?.results?.map((i: any) => ({
      id: i?.id,
      identity: `${i?.identity} ${i?.version ? `(v${i?.version})` : ''}`,
    })) ?? []
  // useEffect(() => {
  //   reversedSignedContractsList = data?.data?.results?.slice()?.reverse()
  // }, [data])

  const { isLoading, mutate } = useMutation(
    (body: any) => makePostRequest(POST_SIGN_REQUEST, body),
    {
      onSuccess: () => {
        toast.success('Signature request send successfully')
        reset()
        refetch()
        onClose()
      },
      onError: (err: any) => {
        //@ts-ignore
        const errMsg = getFirstErrorMessage(err?.response?.data?.data)
        //@ts-ignore
        toast.error(errMsg)
      },
    }
  )

  // e sign view api
  const { data: signViewData, refetch: refetchEsign } = useQuery(
    [ADMIN_E_SIGNED_VIEW(currentEsignId?.current)],
    () => makeGetRequest(ADMIN_E_SIGNED_VIEW(currentEsignId?.current)),
    {
      enabled: !!currentEsignId?.current,
    }
  )

  const showTextAsTag = {
    approved: 'green',
    waiting_for_approval: 'yellow',
    application_in_progress: 'yellow',
    invite_sent: 'yellow',
    uploaded: 'yellow',
    rejected: 'red',
    new: 'blue',
    active: 'green',
    inactive: 'red',
    pending: 'red',
    signed: 'green',
  }

  const returnAsTag = (color: any, txt: any) => {
    // @ts-ignore
    const tagColor = showTextAsTag?.[color?.replaceAll(' ', '_')?.toLowerCase()]
    return (
      <Tag className={`${tagColor}-tag truncate`}>
        <AppText
          text={capitalizeFirstLetter(txt)}
          className="!text-[inherit] text-left capitalize truncate"
        />
      </Tag>
    )
  }

  const onSubmit = (data: any) => {
    mutate({ users: [params?.id], template: data?.data?.template?.id })
  }

  return (
    <Box>
      <div className="my-10">
        {isEditable && (
          <CustomContendHeader heading={'ICA'} buttonData={buttonData} />
        )}
      </div>
      {/*  */}
      <AdminFormWrapper>
        {reversedSignedContractsList?.length > 0 ? (
          <div className="grid grid-cols-3 gap-[15px]">
            {reversedSignedContractsList?.map((doc: any, index: any) => {
              const isContractSigned = doc?.status == 'signed'
              return (
                <div key={index} className="flex flex-wrap w-[100%] gap-[15px]">
                  <div className="p-[20px] border-[#CDCDCD] border-[1px] w-[100%] rounded-[5px]   shadow-[0_0_4px_0_#00000040] flex justify-center">
                    <div className="flex flex-col w-[100%] gap-[15px]">
                      <Text className="text-[18px] leading-[22px] font-[400] text-[#808080]">
                        {` ${
                          doc?.template?.identity !== 'W9-Form'
                            ? 'Independent Contractor Agreement'
                            : 'W9 Contractor'
                        }`}
                      </Text>
                      <Text className="text-[18px] leading-[22px] font-[600] text-[#000000]">
                        {`Realty of America - ${doc?.template?.identity?.split('-')?.join(' ')}`}
                      </Text>
                      <div
                        className="flex gap-[10px] items-center cursor-pointer"
                        onClick={() => {
                          currentEsignId.current = doc?.id
                          refetchEsign()
                          onSignOpen()
                        }}
                      >
                        <IoEyeOutline size={25} color={'#2C4B7B'} />
                        <Text className="text-[16px] leading-[22px] font-[400] text-[#2C4B7B]">
                          View
                        </Text>
                      </div>
                      <div className="flex justify-between">
                        <Text className="text-[12px] leading-[24px] font-[400] text-[#10295A]">
                          Created:
                          <span className="text-[12px] leading-[24px] font-[500] text-[#000000]">
                            {` ${moment(doc?.created).format('DD/MM/YYYY')}`}
                          </span>
                        </Text>
                        {isContractSigned ? (
                          <Text className="text-[12px] leading-[24px] font-[400] text-[#10295A]">
                            Signed:
                            <span className="text-[12px] leading-[24px] font-[500] text-[#000000]">
                              {` ${moment(doc?.modified).format('DD/MM/YYYY')}`}
                            </span>
                          </Text>
                        ) : (
                          <Text className="text-[12px] leading-[24px] font-[400] text-[#10295A]">
                            Status:{' '}
                            <span className="text-[12px] leading-[24px] font-[500] text-[#000000]">
                              {returnAsTag(doc?.status, doc?.status)}
                            </span>
                          </Text>
                        )}
                      </div>
                    </div>
                  </div>
                  <CkAppModal
                    className="!w-full !max-w-[1200px] !h-[80vh]"
                    bodyClassName=" !px-[40px] !pb-[30px]"
                    closeButton
                    isOpen={isSignOpen}
                    onClose={onSignClose}
                    header={`${doc?.template?.identity} Document`}
                  >
                    <div className="w-full h-full">
                      <iframe
                        width={'100%'}
                        height={'100%'}
                        src={signViewData?.data}
                      ></iframe>
                    </div>
                  </CkAppModal>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="h-[30vh]">
            <NoData />
          </div>
        )}
      </AdminFormWrapper>

      {/*  */}

      <CkAppModal closeButton isOpen={isOpen} onClose={onClose}>
        <Box py={'30px'}>
          <AppText
            className="text-[20px] font-[500] text-center mb-[20px]"
            text="Select the ICA Template"
          />
          <div className="flex flex-col">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-[24px]">
                <AdminInputRenderer
                  className=" w-full !h-[55px]"
                  wrapperClassName="flex gap-[20px] text-[14px]"
                  labelClassName="!text-[14px] !text-[#10295A]"
                  //@ts-ignore
                  inputObj={{
                    label: 'Template',
                    name: 'template',
                    type: 'select',
                    placeholder: 'Select the template',
                    options: ica_list_data,
                  }}
                  // key={i?.name}
                  register={register}
                  control={control}
                  errors={errors.data}
                />
              </div>
              <Flex justifyContent={'center'} gap={'10px'}>
                <AppButton
                  className="py-[10px] w-fit"
                  onClick={() => {
                    onClose()
                    reset()
                  }}
                  variant="outline"
                  type="button"
                >
                  Cancel
                </AppButton>
                <AppButton isLoading={isLoading} type="submit">
                  Confirm
                </AppButton>
              </Flex>
            </form>
          </div>
        </Box>
      </CkAppModal>
    </Box>
  )
}

export default Page
