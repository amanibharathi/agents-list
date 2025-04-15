import AdminInputRenderer from '../../../../login/adminlogin/AdminInputRenderer'
import ButtonPair from '../../../Auth/AgentComponents/admincompenets/ButtonPair'
import {
  POST_USER_PROFILE_PICTURE,
  PUT_ADMINS_AGENT_UPDATE,
} from '../../../../api-utils'
import CkAppModal from '../../../Auth/AgentComponents/admincompenets/AppModal'
import makePatchRequest from '../../../../api/makePatchRequest'
import {
  addSpecialCharsForPhoneNumber,
  commissionPlanOptions,
  getFirstErrorMessage,
  removeSpecialChars,
  validateName,
} from '../../../../utils/functions/commonFunctions'
import { Box, Flex } from '@chakra-ui/react'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'

const AgentDetailsEditModal = ({
  isOpen,
  onClose,
  data,
  refetch,
  metaData,
  metaIsLoading = false,
}: {
  isOpen: boolean
  onClose: () => void
  data: any
  refetch: any
  metaData: any
  metaIsLoading?: boolean
}) => {
  const isActiveAgent = data?.agent_detail?.agent_status === 'active'
  // const formUtil = useForm({
  //   defaultValues: {
  //     data: {
  //       ...data,
  //       phone_number: addSpecialCharsForPhoneNumber(
  //         data?.phone_number?.slice(2)
  //       ),
  //       roa_email: data?.agent_detail?.roa_email,
  //     },
  //   },
  // })
  const formUtil = useForm()
  const { watch, setValue, reset } = formUtil

  useEffect(() => {
    if (data && metaData) {
      let capStatusValue = metaData?.data?.meta?.cap_status?.filter(
        (m: any) => m?.id === metaData?.data?.initial?.cap_status
      )?.[0]

      if (capStatusValue?.id) {
        capStatusValue = {
          label: capStatusValue?.identity,
          value: capStatusValue?.id,
        }
      }

      const commPlanValue =
        commissionPlanOptions?.filter(
          (f) =>
            f?.value == data?.agent_detail?.commission_plan ||
            f?.label == data?.agent_detail?.commission_plan
        )?.[0] || ''

      reset({
        data: {
          ...data,
          phone_number: addSpecialCharsForPhoneNumber(
            data?.phone_number?.slice(2)
          ),
          roa_email: data?.agent_detail?.roa_email,
          commission_plan: commPlanValue,
          team_commission_plan: data?.agent_detail?.team_commission_plan,
          cap_status: capStatusValue,
        },
      })
    }
  }, [data, metaIsLoading, metaData])

  const agentInputFields = [
    {
      label: 'First Name*',
      name: 'first_name',
      otherRegProps: {
        //@ts-ignore
        // value: stateObject?.label,
        required: true,
        validate: validateName,
      },
    },
    {
      label: 'Last Name*',
      name: 'last_name',
      otherRegProps: {
        //@ts-ignore
        // value: stateObject?.label,
        required: true,
        validate: validateName,
      },
    },
    {
      label: 'ROA Email*',
      name: 'roa_email',
      type: 'email',
      otherRegProps: {
        isDisabled: !isActiveAgent,
        //@ts-ignore
        // value: stateObject?.label,
        required: true,
      },
    },
    {
      label: 'Phone Number* ',
      name: 'phone_number',
      type: 'tel',
      otherRegProps: {
        required: true,
      },
    },
    {
      name: 'address',
      label: 'Address',
      type: 'textarea',
      otherRegProps: {
        required: false,
      },
    },
    {
      label: 'City',
      name: 'city',
      type: 'text',
      otherRegProps: {
        //@ts-ignore
        // value: stateObject?.label,
        required: false,
      },
    },
    {
      label: 'Zip code',
      name: 'zipcode',
      type: 'number',
      otherRegProps: {
        //@ts-ignore
        // value: stateObject?.label,
        required: false,
        minLength: 5,
        maxLength: 5,
        pattern: /^\d+$/,
      },
    },
    {
      label: 'Commission Plan *',
      name: 'commission_plan',
      type: 'select',
      options: commissionPlanOptions,
      className: '!z-[12]',
    },
    {
      label: 'Team Commission Plan',
      name: 'team_commission_plan',
      hide: data?.agent_detail?.onboard_type !== 'team',
      type: 'number',
      placeholder: 'Enter a value between 15 to 100',
      otherRegProps: {
        required: false,
        min: { value: 15, message: 'Minimum split is 15' },
        max: { value: 100, message: 'Maximum split is 100' },
      },
    },
    {
      label: 'Capping *',
      name: 'cap_status',
      type: 'select',
      options: metaData?.data?.meta?.cap_status,
    },
    {
      label: 'Profile Picture',
      name: 'image',
      type: 'file',
      imageState: watch('data.image'),
      setImageState: (val: any) => setValue('data.image', [...val]),
      uploadKey: 'resource',
      fileTypes: ['PNG', 'JPEG', 'JPG', 'SVG', 'GIF', 'WEBP'],
      placeholder: 'Upload thumbnail',
      fileTypeKey: 'image',
      customEndPoint: POST_USER_PROFILE_PICTURE,
      required: false,
    },
  ]?.filter((f) => f?.hide !== true)

  if (!isActiveAgent) {
    agentInputFields?.splice(2, 1)
  }

  const inputFields = useMemo(
    () => agentInputFields,
    [
      watch('data.first_name'),
      watch('data.last_name'),
      watch('data.phone_number]'),
      watch('data.city'),
      watch('data.zipcode'),
      watch('data.profile_picture'),
      watch('data.image'),
      watch('data.roa_email'),
      isActiveAgent,
    ]
  )

  const { mutate: profileEditMutate, isLoading } = useMutation(
    (body) =>
      makePatchRequest(PUT_ADMINS_AGENT_UPDATE(data?.agent_detail?.id), body),
    
      {onSuccess: () => {
        toast.success('Agent Details Updated Sucessfully')
        refetch()
        onClose()
      },
      onError: (err) => {
        //@ts-ignore
        const errMsg = getFirstErrorMessage(err?.response?.data)
        //@ts-ignore
        toast.error(errMsg)
      },
    }
  )

  const handlePrimaryBtnClick = () => {
    const agentData = watch('data')
    // @ts-ignore
    const {
      first_name,
      last_name,
      phone_number,
      address,
      city,
      zipcode,
      image,
      roa_email,
    } = agentData
    const finalData = {
      user: {
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number
          ? `+1${removeSpecialChars(phone_number)}`
          : null,
        address: address,
        city: city,
        zipcode: zipcode,
        profile_picture: image
          ? image[0]?.id
          : data?.profile_picture
            ? data?.profile_picture?.id
            : null,
      },
      roa_email: roa_email,
      commission_plan: agentData?.commission_plan?.value,
      team_commission_plan: agentData?.team_commission_plan
        ? agentData?.team_commission_plan
        : null,
      cap_status: agentData?.cap_status?.value,
    }
    if (!isActiveAgent) {
      delete finalData?.roa_email
    }
    // @ts-ignore
    profileEditMutate(finalData)
  }

  const handleSecondaryBtnClick = () => {
    onClose()
    reset({
      data: {
        ...data,
        phone_number: addSpecialCharsForPhoneNumber(
          data?.phone_number?.slice(2)
        ),
        roa_email: data?.agent_detail?.roa_email,
        team_commission_plan: data?.agent_detail?.team_commission_plan,
      },
    })
  }

  return (
    <CkAppModal
      className="!w-full !max-w-[771px] !rounded-[10px]"
      bodyClassName=" !px-[40px]"
      isOpen={isOpen}
      onClose={onClose}
      header={`Edit Agent Information`}
      headerClassName="text-[#10295A] text-[20px] font-[500] !py-[25px] !px-[40px]"
      closeButton
    >
      <form onSubmit={formUtil.handleSubmit(handlePrimaryBtnClick)}>
        <Box className="grid grid-cols-1 gap-[28px] basis-[70%]">
          {inputFields?.map((i: any) => (
            <AdminInputRenderer
              className="w-full max-w-[100%] agent-modal-select"
              wrapperClassName="flex gap-[20px] text-[14px]"
              labelClassName=""
              inputObj={i}
              key={i?.name}
              register={formUtil?.register}
              control={formUtil?.control}
              errors={formUtil?.formState?.errors?.data}
            />
          ))}
        </Box>
        <Flex mb={'28px'} justifyContent={'end'} mt={'40px'}>
          <ButtonPair
            primaryBtnText={'Update'}
            secondaryBtnText={'Cancel'}
            onPrimaryClick={undefined}
            primaryBtnType={'submit'}
            onSecondaryClick={handleSecondaryBtnClick}
            primaryBtnIsLoading={isLoading}
          />
        </Flex>
      </form>
    </CkAppModal>
  )
}

export default AgentDetailsEditModal
