
import { Box } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import DynamicTeamDetails from '../../components/DynamicTeamDetails'
import { useQuery } from 'react-query'
import { ADMIN_AGENT_TEAM_DETAIL } from '../../../../../api-utils'
import makeGetRequest from '../../../../../api/makeGetRequest'
import {
  addSpecialCharsForPhoneNumber,
  getResponse,
  transformSelectData,
} from '../../../../../utils/functions/commonFunctions'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
// import { getResponse } from '@/app/real-estate-agents/join/onboard/stage/utils/common'

const TeamInformationTabApplied = () => {
  const params=useParams()
  const newTeamForm = useForm()
  const { data } = useQuery(
    [ADMIN_AGENT_TEAM_DETAIL(params?.id)],
    () => makeGetRequest(ADMIN_AGENT_TEAM_DETAIL(params?.id)),
    {
      onSuccess: (res) => {
        const obj = {
          identity: res?.data?.identity,
          email: res?.data?.email,
          phone_number: addSpecialCharsForPhoneNumber(res?.data?.phone_number),
          mls: getResponse(res?.data?.mls),
          board: getResponse(res?.data?.board),
          state: transformSelectData(res?.data?.state),
          website: res?.data?.website,
          first_name: res?.data?.created_by?.first_name,
          last_name: res?.data?.created_by?.last_name,
          leader_email: res?.data?.created_by?.email,
          leader_phone_number: addSpecialCharsForPhoneNumber(
            res?.data?.created_by?.phone_number
          ),
          leader_state: transformSelectData(
            res?.data?.created_by?.primary_state
          ),
          license: res?.data?.created_by?.license,
        }
        newTeamForm.reset({
          data: obj,
        })
      },
    }
  )

  const detailData = data?.data

  const teamInfoInputObj = useMemo(
    () => [
      {
        label: 'Team Name*',
        name: 'identity',
        className: ' w-full max-w-[495px] !col-span-2',
        readOnly: true,
        otherRegProps: {
          required: true,
        },
      },
      {
        className: 'hidden w-full max-w-[410px] !col-span-2',
        readOnly: true,
      },
      {
        label: 'Contact Email',
        name: 'email',
        className: ' w-full max-w-[495px]',
        readOnly: true,
        otherRegProps: {
          required: false,
          pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}(?<![.,])$/,
        },
      },
      {
        label: 'Contact Phone Number',
        name: 'phone_number',
        type: 'tel',
        className: ' w-full max-w-[495px]',
        readOnly: true,
        otherRegProps: {
          required: false,
        },
      },
      {
        label: 'State',
        name: 'state',
        type: 'select',
        className: 'w-full max-w-[495px] !z-[11]',
        readOnly: true,
        otherRegProps: {
          required: false,
        },
      },
      {
        label: 'Board',
        type: 'multi-select',
        name: 'board',
        className: ' w-full max-w-[495px]',
        readOnly: true,
        otherRegProps: {
          required: false,
        },
      },
      {
        label: 'MLS',
        name: 'mls',
        type: 'multi-select',
        className: ' w-full max-w-[495px]',
        readOnly: true,
        otherRegProps: {
          required: false,
        },
        filterOption: () => true,
      },
      {
        label: 'Website',
        name: 'website',
        className: ' w-full max-w-[495px]',
        readOnly: true,
        otherRegProps: {
          pattern:
            /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/,
          required: false,
        },
      },
    ],
    [detailData]
  )

  const agentsInfoInputObj = [
    {
      label: 'First Name *',
      name: 'first_name',
      className: ' w-full max-w-[495px]',
      readOnly: true,
      otherRegProps: {
        required: false,
      },
    },
    {
      label: 'Last Name *',
      name: 'last_name',
      className: ' w-full max-w-[495px]',
      readOnly: true,
      otherRegProps: {
        required: false,
      },
    },
    {
      label: 'License # *',
      name: 'license',
      className: ' w-full max-w-[495px]',
      readOnly: true,
      otherRegProps: {
        required: false,
      },
    },
    {
      label: 'Primary State *',
      type: 'select',
      name: 'leader_state',
      className: ' w-full max-w-[495px] !z-[11]',
      readOnly: true,
      otherRegProps: {
        required: false,
      },
    },
    {
      label: 'Contact Phone Number *',
      name: 'leader_phone_number',
      type: 'tel',
      className: ' w-full max-w-[495px]',
      readOnly: true,
      otherRegProps: {
        required: false,
      },
    },
    {
      label: 'Contact Email *',
      name: 'leader_email',
      className: ' w-full max-w-[495px]',
      readOnly: true,
      otherRegProps: {
        required: false,
      },
    },
  ]

  return (
    <Box className="flex flex-col gap-[41px] py-[40px] px-[20px]">
      <DynamicTeamDetails
        title="Team Details"
        teamInfoInputObj={teamInfoInputObj}
        register={newTeamForm.register}
        control={newTeamForm.control}
        errors={newTeamForm.formState.errors.data}
      />
      <DynamicTeamDetails
        title="Team Lead Details"
        teamInfoInputObj={agentsInfoInputObj}
        register={newTeamForm.register}
        control={newTeamForm.control}
        errors={newTeamForm.formState.errors.data}
      />
      {detailData?.documents?.length > 0 ? (
        <DynamicTeamDetails
          title="Documents"
          isDocument
          documents={detailData?.documents}
        />
      ) : null}
    </Box>
  )
}

export default TeamInformationTabApplied
