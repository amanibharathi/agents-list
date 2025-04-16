// import AppText from '@/app/components/elements/AppText'
import { Flex } from '@chakra-ui/react'
import moment from 'moment'
// import AppImage from '@/app/components/elements/AppImage'
import { ColorTags } from './ColorTags'
import ShowText from '../../onboarding-agents/[id]/components/ShowText'
import AppText from '../../../AppComponents/AppText-agent'
import AppImage from '../../../AppComponents/AppImage'

export interface IAdminTeamHeaderPrimaryBox {
  name: string
  teamId: number | string
  created: string
  status: string
  image: string
  isAppliedTeams?: boolean
}

const AdminTeamHeaderPrimaryBox = ({
  name,
  teamId,
  created,
  status,
  image,
  isAppliedTeams = false,
}: IAdminTeamHeaderPrimaryBox) => {
  const getAgentDetail = (
    value: any,
    valueClassName = '',
    truncateText = false
  ) => {
    return (
      <div className="flex items-center gap-[20px] ">
        <>
          {truncateText ? (
            <ShowText
              maxLength={20}
              textClassName={`font-[600] text-[30px] !text-[#10295A] capitalize ${valueClassName}`}
              text={value || 'N/A'}
            />
          ) : (
            <AppText
              text={value || 'N/A'}
              className={`font-[600] text-[30px] !text-[#10295A] capitalize whitespace-nowrap ${valueClassName}`}
            />
          )}
        </>
      </div>
    )
  }
  return (
    <Flex gap={'10px'} className="!w-[600px]">
      <AppImage
        src={image ? image : '/assets/team-image.png'}
        alt="team-image"
        height={120}
        width={160}
        className="!h-[120px] !w-[160px] object-cover"
      />
      <Flex w={'100%'} maxW={'350px'} gap={'16px'} flexFlow={'column'}>
        {!isAppliedTeams ? (
          <ColorTags
            text={`${(status == 'approved' ? 'Active' : status) ?? ''} Team`}
            background="#E5FFF9"
            textColor="#1A9175"
            className="!inline-block"
          />
        ) : null}
        {getAgentDetail(`${name}'s Team`, '', true)}
        <Flex direction={'column'}>
          <AppText className="text-[18px] !text-[#10295A] font-[600]">
            ROA Team ID:{' '}
            <span className="!text-[#000000] font-[400]">{teamId || '-'}</span>
          </AppText>
          {/* <AppText className="text-[18px] !text-[#10295A]" text={<DotIcon />} /> */}
          <AppText className="text-[18px] !text-[#10295A] font-[600]">
            Created on:{' '}
            <span className="!text-[#000000] font-[400]">
              {moment(created).format('l') || '-'}
            </span>
          </AppText>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default AdminTeamHeaderPrimaryBox
