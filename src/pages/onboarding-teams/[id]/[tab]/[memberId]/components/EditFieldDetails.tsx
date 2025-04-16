// import AdminInputRenderer from '@/app/admin/_AdminComponent/AdminInputRenderer'
// import AppText from '@/app/components/elements/AppText'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import AppText from '../../../../../../AppComponents/AppText-agent'
import AdminInputRenderer from '../../../../../Auth/AgentComponents/admincompenets/AdminInputRenderer'

export const EditFieldDetails = ({
  data,
  inputFields,
}: {
  data: any
  inputFields: any
}) => {
  const formUtil = useForm()
  useEffect(() => {
    formUtil.setValue('data.role', {
      label: data?.request_data?.role ?? data?.existing_role,
      value: data?.request_data?.role ?? data?.existing_role,
    })
    formUtil.setValue('data.new_role', {
      label: data?.request_data?.role ?? data?.role,
      value: data?.request_data?.role ?? data?.role,
    })
    formUtil.setValue('data.commission_plan', {
      label:
        data?.request_data?.agent_cap_detail?.commission_plan ??
        data?.agent_cap_detail?.commission_plan,
      value:
        data?.request_data?.agent_cap_detail?.commission_plan ??
        data?.agent_cap_detail?.commission_plan,
    })
    formUtil.setValue(
      'data.team_commission_plan',
      data?.request_data?.agent_cap_detail?.team_commission_plan ??
        data?.agent_cap_detail?.team_commission_plan
    )
    formUtil.setValue('data.cap_status', {
      label:
        data?.request_data?.agent_cap_detail?.cap_status?.replace('_', ' ') ??
        data?.agent_cap_detail?.cap_status?.replace('_', ' '),
      value:
        data?.request_data?.agent_cap_detail?.cap_status ??
        data?.request_data?.agent_cap_detail?.cap_status,
    })
  }, [data])
  return (
    <div className="flex flex-col gap-[20px]">
      <AppText
        className={`${data?.team_member?.request_type == 'role_change' ? 'mt-[20px]' : ''} !text-[#10295A] text-[20px] font-bold`}
      >{`${data?.request_type == 'edit_member' || data?.team_member?.request_type == 'role_change' ? 'Edited ' : ''} Details`}</AppText>
      <div className="grid grid-cols-2 gap-[20px]">
        {inputFields?.map((i: any) => (
          <AdminInputRenderer
            className="w-full max-w-[100%] !bg-[#fbfcff] custom-select-css"
            wrapperClassName="flex gap-[20px] text-[14px]"
            labelClassName="!text-[16px] !text-[#444444]"
            inputObj={i}
            key={i?.name}
            register={formUtil?.register}
            control={formUtil?.control}
            errors={formUtil?.formState?.errors?.data}
          />
        ))}
      </div>
    </div>
  )
}
