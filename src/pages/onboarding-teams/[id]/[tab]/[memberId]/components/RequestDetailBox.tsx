import React from 'react'
import { AgentProfileHeader } from './AgentProfileHeader'
import AppText from '@/app/components/elements/AppText'
import { Divider } from '@chakra-ui/react'
import { NewAndRemovedDocumentsList } from './NewAndRemovedDocumentsList'
import { EditFieldDetails } from './EditFieldDetails'
import AgentTeamNotesComp from '@/app/(dashboards)/agent/my-team/overview/components/AgentTeamNotesComp'
import { RoleChangeRequestDetail } from './RoleChangeRequestDetail'

export const RequestDetailBox = ({
  data,
  documents,
  params,
}: {
  data: any
  documents: any
  params: { tab: string; id: string; memberId: string }
}) => {
  const inputFields = [
    (data?.request_type == 'edit_member' && data?.request_data?.role) ||
    data?.request_type == 'invite_member'
      ? {
          label: 'Role',
          tags: data?.request_type == 'edit_member' ? '(Changed)' : '',
          name: 'role',
          type: 'select',
          className: '!z-[14] team-form',
          readOnly: true,
        }
      : {
          name: 'role',
          type: 'select',
          className: '!z-[14] team-form !hidden',
          wrapperClass: '!hidden',
          readOnly: true,
        },
    (data?.request_type == 'edit_member' &&
      data?.request_data?.agent_cap_detail?.commission_plan) ||
    data?.request_type == 'invite_member'
      ? {
          label: 'Brokerage Commission Plan',
          tags: data?.request_type == 'edit_member' ? '(Changed)' : '',
          name: 'commission_plan',
          type: 'select',
          className: '!z-[12] team-form',
          readOnly: true,
        }
      : {
          name: 'commission_plan',
          type: 'select',
          wrapperClass: '!hidden',
          className: '!z-[12] team-form !hidden',
          readOnly: true,
        },
    (data?.request_type == 'edit_member' &&
      data?.request_data?.agent_cap_detail?.team_commission_plan) ||
    data?.request_type == 'invite_member'
      ? {
          label: 'Minimum Team Commission Split',
          tags: data?.request_type == 'edit_member' ? '(Changed)' : '',
          name: 'team_commission_plan',
          className: '!z-[12] team-form',
          required: true,
          readOnly: true,
          type: 'number',
          otherRegProps: {
            min: { value: 15, message: 'Minimum split is 15' },
            max: { value: 100, message: 'Maximum split is 100' },
          },
        }
      : {
          name: 'commission_plan',
          type: 'select',
          wrapperClass: '!hidden',
          className: '!z-[12] team-form !hidden',
          readOnly: true,
        },
    (data?.request_type == 'edit_member' &&
      data?.request_data?.agent_cap_detail?.cap_status) ||
    data?.request_type == 'invite_member'
      ? {
          label: 'Cap Structure',
          tags: data?.request_type == 'edit_member' ? '(Changed)' : '',
          name: 'cap_status',
          type: 'select',
          className: '!z-[12] team-form',
          readOnly: true,
        }
      : {
          name: 'cap_status',
          type: 'select',
          wrapperClass: '!hidden',
          className: '!z-[12] team-form !hidden',
          readOnly: true,
        },
  ]
  const fields =
    data?.request_type == 'remove_member' || data?.request_type == 'role_change'
  return (
    <div
      className={`${data?.request_type == 'join_request' ? 'max-h-[190px]' : ''} max-w-[893px] border border-[#61687640] flex flex-col gap-[20px] p-[40px] flex-1`}
    >
      {data?.request_type == 'remove_member' ? (
        <AppText className="!text-[#10295A] text-[20px] font-bold mb-[20px]">
          Remove Team Member
        </AppText>
      ) : null}
      {data?.request_type == 'role_change' ? (
        <RoleChangeRequestDetail data={data} />
      ) : (
        <div>
          <AgentProfileHeader
            data={
              data?.request_type != 'edit_member' &&
              data?.request_type != 'join_request'
                ? data?.request_data?.user
                : data?.request_type == 'join_request'
                  ? data?.request_data?.user_details
                  : (data?.request_data?.team_member?.user ?? data?.team_member)
            }
            notModal
          />
          <Divider className="pb-[40px]" />
        </div>
      )}
      {fields || data?.request_type == 'join_request' ? null : (
        <div className="flex flex-col gap-[20px]">
          <EditFieldDetails data={data} inputFields={inputFields} />
          {documents?.length > 0 ? (
            <NewAndRemovedDocumentsList documents={documents} />
          ) : null}
        </div>
      )}
      {data?.request_type == 'join_request' ? null : (
        <AgentTeamNotesComp id={params?.memberId} isAdmin />
      )}
    </div>
  )
}
