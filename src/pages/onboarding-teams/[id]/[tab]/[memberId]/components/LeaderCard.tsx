// import AppText from '@/app/components/elements/AppText'
// import EmailatIcon from '@/app/icons/emailatIcon'
// import PhoneIcon from '@/app/icons/phoneIcon'
import { formatToUSPhone } from '../../../../../../utils/functions/commonFunctions'
import { Avatar } from '@chakra-ui/react'
import AppText from '../../../../../../AppComponents/AppText-agent'
import PhoneIcon from '../../../../../Auth/AgentComponents/admincompenets/phoneIcon'
import EmailatIcon from '../../../../../Auth/AgentComponents/admincompenets/emailatIcon'

interface User {
  id: number
  full_name: string
  email: string
  phone_number: string
  profile_picture: any
  team_role: 'leader' | 'member' | 'admin' // Extend with possible roles
}

interface LeaderCardProps {
  data: User
}

export const LeaderCard = ({ data }: LeaderCardProps) => {
  return (
    <div className="p-[20px] mt-[20px] bg-[#EDF3FF] rounded-[8px] flex flex-col gap-[20px]">
      <div className="flex gap-[14px]">
        <Avatar
          className="rounded-full"
          src={
            data?.profile_picture?.file ??
            '/assets/profile-placeholder-male.png'
          }
          height={'56px'}
          width={'56px'}
        />
        <div className="flex flex-col gap-[6px]">
          <AppText
            className="!text-[#1A1C1E] text-[18px] font-semibold"
            text={`${data?.full_name ?? '-'}`}
          />
          <AppText
            className="!text-[#878787] text-[16px] font-normal capitalize"
            text={`${data?.team_role ?? '-'}`}
          />
        </div>
      </div>
      <div className="flex gap-[10px] items-center">
        <PhoneIcon fill="#010101" />
        <AppText className="text-[16px]" type="span">
          {formatToUSPhone(data?.phone_number?.slice(2)) ?? 'N/A'}
        </AppText>
      </div>
      <div className="flex gap-[10px] items-center">
        <EmailatIcon />
        <AppText className="text-[16px]" type="span">
          {data?.email ?? 'N/A'}
        </AppText>
      </div>
    </div>
  )
}
