//import AdminInputRenderer from '@/app/admin/_AdminComponent/AdminInputRenderer'
// import AppButton from '@/app/components/elements/AppButton'
//import { commissionPlanOptions } from '@/app/utils/functions/otherFunctions'
import { ReactNode, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import AdminInputRenderer from '../../../../login/adminlogin/AdminInputRenderer'
import AppButton from '../../../../AppComponents/AppButton-agent'
import { commissionPlanOptions } from '../../../../utils/functions/commonFunctions'

interface ModalRejectComponentInterface {
  onClose: () => void
  inputFields: {
    name: string
    type?: string
    placeholder?: string
    label?: string
    otherRegProps?: unknown
    isMulti?: boolean
    options?: unknown
    required?: boolean
    bottomRightInfo?: ReactNode | string
    bottomLeftInfo?: ReactNode | string
    className?: string
    minH?: string
    onChange?: any
    value?: any
    imageState?: any
    setImageState?: any
    fileTypeKey?: string
    uploadKey?: string
    fileTypes?: string | string[]
    suffixClassName?: string
    onInpuChange?: any
    isLoading?: boolean
    maxLength?: string | number
    customPrefixClassName?: string
    labelToolTip?: string | ReactNode
    ref?: any
  }[]
  buttonLabel1?: string
  buttonLabel2?: string
  isLoading?: any
  handleSumbit?: (data: any) => void
  data?: any
  metaData?: any
  setData?: any
}

export default function ModalRejectComponent({
  onClose,
  inputFields,
  isLoading = false,
  buttonLabel1 = '',
  buttonLabel2 = '',
  handleSumbit,
  data,
  metaData,
  setData,
}: ModalRejectComponentInterface) {
  const rejectForm = useForm()

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
          (f) => f?.value == data?.agent_detail?.commission_plan
        )?.[0] || ''

      rejectForm.reset({
        data: {
          commission_plan: commPlanValue,
          team_commission_plan: data?.agent_detail?.team_commission_plan,
          cap_status: capStatusValue,
        },
      })
    }
  }, [data, metaData])

  useEffect(() => {
    setData && setData(rejectForm.watch('data.team'))
  }, [rejectForm.watch('data.team')])
  return (
    <form
      onSubmit={rejectForm.handleSubmit((e: any) => {
        handleSumbit && handleSumbit(e)
      })}
    >
      <div className="flex flex-col gap-[30px]">
        {inputFields?.map((i: any) => (
          <AdminInputRenderer
            className={`w-full max-w-[100%] ${i?.className ?? ''}`}
            wrapperClassName={`flex gap-[20px] text-[14px] ${i?.wrapperName ?? ''}`}
            labelClassName=""
            inputObj={i}
            key={i?.name}
            register={rejectForm.register}
            control={rejectForm.control}
            errors={rejectForm.formState.errors?.data}
            inputControlClassName={i?.wrapperName}
          />
        ))}
      </div>
      <div className="flex justify-end py-6">
        <div className="flex gap-[10px]">
          <AppButton
            className="!text-[#10295A] border border-[#CDCDCD] rounded px-[30px]"
            label={buttonLabel1}
            variant="transparent"
            onClick={() => onClose()}
          />
          <AppButton isLoading={isLoading} label={buttonLabel2} type="submit" />
        </div>
      </div>
    </form>
  )
}
