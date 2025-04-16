// import AppText from '@/app/components/elements/AppText'
import { Avatar, Box } from '@chakra-ui/react'
import { ColorTags } from '../../../../components/ColorTags'
// import EmailatIcon from '../../../../Auth/AgentComponents/admincompenets/emailatIcon'
import PhoneIcon from '../../../../../Auth/AgentComponents/admincompenets/phoneIcon'
import {
  formatToUSPhone,
  truncateString,
} from '../../../../../../utils/functions/commonFunctions'
import { ADMIN_MAKE_AGENT_INDIVIDUAL_PAGE } from '../../../../../Auth/AgentComponents/navigation/urls'
import AppText from '../../../../../../AppComponents/AppText-agent'
import EmailatIcon from '../../../../../Auth/AgentComponents/admincompenets/emailatIcon'
import { useNavigate } from 'react-router-dom'

export const AgentProfileHeader = ({
  data,
  className = '',
  notModal = false,
}: {
  data: any
  className?: string
  notModal?: boolean
}) => {
  const router = useNavigate()
  const fullName =
    data?.full_name ??
    data?.label ??
    data?.agent_fullName ??
    (data?.first_name && `${data?.first_name} ${data?.last_name}`) ??
    (data?.user && `${data?.user?.first_name} ${data?.user?.last_name}`) ??
    '-'
  return (
    <div className={`${className} flex gap-[25px]`}>
      <Avatar
        className="rounded-full"
        src={
          data?.user?.profile_picture?.file ??
          data?.profile_picture?.file ??
          data?.profile ??
          data?.profile?.file ??
          '/assets/profile-placeholder-male.png'
        }
        height={'108px'}
        width={'108px'}
      />
      <Box className="w-full flex flex-col gap-[17px]">
        <div className="flex justify-between">
          <div>
            <AppText
              className="!text-[#10295A] text-[24px] font-semibold capitalize"
              text={truncateString(fullName, 30)}
            />
            <AppText
              className="!text-[#717171] text-[17px] font-medium"
              text={`License: ${data?.agent?.primary_license_no ?? data?.license ?? data?.user?.license ?? '-'}`}
            />
          </div>
          {notModal ? (
            <Box
              className="cursor-pointer"
              onClick={() => {
                router(ADMIN_MAKE_AGENT_INDIVIDUAL_PAGE(data?.id))
              }}
            >
              <ColorTags
                text="View Agent Profile"
                textColor="#04213E"
                background="#C7DAFF"
                className="max-h-[40px]"
              />
            </Box>
          ) : null}
        </div>
        <div className="flex gap-[45px]">
          <div className="flex gap-[10px] items-center">
            <PhoneIcon fill="#010101" />
            <AppText className="text-[16px]" type="span">
              {formatToUSPhone(
                data?.phone?.slice(2) ??
                  data?.phone_number?.slice(2) ??
                  data?.user?.phone_number?.slice(2)
              ) ?? 'N/A'}
            </AppText>
          </div>
          <div className="flex gap-[10px] items-center">
            <EmailatIcon />
            <AppText className="text-[16px]" type="span">
              {data?.email ?? data?.user?.email ?? 'N/A'}
            </AppText>
          </div>
        </div>
      </Box>
    </div>
  )
}
