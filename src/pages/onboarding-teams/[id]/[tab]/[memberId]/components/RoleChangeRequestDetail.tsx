import React from 'react'
import { AgentProfileHeader } from './AgentProfileHeader'
import { Divider } from '@chakra-ui/react'
import { EditFieldDetails } from './EditFieldDetails'

export const RoleChangeRequestDetail = ({ data }: { data: any }) => {
  const inputFields = [
    {
      label: 'Role',
      tags: '(old)',
      name: 'role',
      type: 'select',
      className: '!z-[14] team-form',
      readOnly: true,
    },
    {
      label: 'Role',
      tags: '(Changed)',
      name: 'new_role',
      type: 'select',
      className: '!z-[12] team-form',
      readOnly: true,
    },
  ]
  return (
    <div className="max-w-[853px] flex flex-col gap-[20px] flex-1">
      {data?.request_data?.changes?.map((change: any) => (
        <div key={change?.team_member?.id}>
          <div>
            <AgentProfileHeader data={change?.team_member?.user} notModal />
            <Divider className="pb-[20px]" />
          </div>
          <EditFieldDetails data={change} inputFields={inputFields} />
          <Divider className="pb-[20px]" />
        </div>
      ))}
    </div>
  )
}
