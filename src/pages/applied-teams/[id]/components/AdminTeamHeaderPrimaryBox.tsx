// import AppText from '@/app/components/elements/AppText'
import { Flex } from '@chakra-ui/react'
import moment from 'moment'
// import AppImage from '@/app/components/elements/AppImage'
import { ColorTags } from './ColorTags'
import ShowText from '../../../onboarding-agents/[id]/components/ShowText'
import AppImage from '../../../../AppComponents/AppImage'
import AppText from '../../../../AppComponents/AppText-agent'

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
  return (
    <Flex gap={'20px'}>
      <AppImage
        src={image ? image : '/assets/team-image.png'}
        alt="team-image"
        height={120}
        width={160}
        className="!max-h-[120px] !max-w-[160px] object-fill"
      />
      <Flex w={'100%'} gap={'16px'} flexFlow={'column'}>
        {!isAppliedTeams ? (
          <ColorTags
            text={`${status ?? ''} Team`}
            background="#E5FFF9"
            textColor="#1A9175"
            className="!max-w-[150px]"
          />
        ) : null}
        <ShowText
          textClassName="font-[600] text-[30px] !text-[#10295A] capitalize"
          text={`${name}'s Team`}
          maxLength={20}
        />
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
