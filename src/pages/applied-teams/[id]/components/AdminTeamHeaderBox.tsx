'use client'
import { Flex } from '@chakra-ui/react'
import React from 'react'
import AdminTeamHeaderPrimaryBox, {
  IAdminTeamHeaderPrimaryBox,
} from './AdminTeamHeaderPrimaryBox'
import CustomBoxButton from '../../../onboarding-agents/[id]/components/custom-box-button'
import AdminTeamHeaderFinalBox from './AdminTeamHeaderFinalBox'

interface IAdminTeamHeaderBox extends IAdminTeamHeaderPrimaryBox {
  onAssignBrokerageClick: () => void
  brokerAgeContent: string
  board: string
  mls: string
  state: string
  teamAdmin: string
  teamLead: string
  image: string
  closedVolumes?: any
  transactions?: any
}

const AdminTeamHeaderBox = ({
  name,
  teamId,
  created,
  onAssignBrokerageClick,
  brokerAgeContent = '-',
  board,
  mls,
  state,
  status,
  teamAdmin,
  teamLead,
  image,
  closedVolumes,
  transactions,
}: IAdminTeamHeaderBox) => {
  return (
    <Flex
      direction={'column'}
      gap={'20px'}
      px={'20px'}
      py={'20px'}
      bg={'white'}
      border={'1px solid #E6E7E9'}
      style={{ boxShadow: '8px 16px 56px 0px #0000000A' }}
    >
      <Flex justify={'space-between'} alignItems={'center'}>
        <AdminTeamHeaderPrimaryBox
          name={name}
          teamId={teamId}
          created={created}
          status={status}
          image={image}
          isAppliedTeams
        />
        <Flex gap={'20px'}>
          <CustomBoxButton
            wrapperClassName="flex-1"
            onClick={onAssignBrokerageClick}
            buttonLabel="Assign Office"
            headerText="Office Details"
            content={brokerAgeContent}
            teamAdmin={teamAdmin}
            teamLead={teamLead}
            isTeamPage
            isAppliedTeams
            closedVolumes={closedVolumes}
            transactions={transactions}
          />
          <AdminTeamHeaderFinalBox state={state} MLS={mls} board={board} />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default AdminTeamHeaderBox
