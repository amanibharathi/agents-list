import AppText from '../../../../../../AppComponents/AppText-agent'
import { Box, Divider, Flex, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
// import AdminInputRenderer from '@/app/admin/_AdminComponent/AdminInputRenderer'
import { UseFormReturn } from 'react-hook-form'
// import AppButton from '@/app/components/elements/AppButton'
import { FaFileArrowUp } from 'react-icons/fa6'
import { AgentProfileHeader } from './AgentProfileHeader'
import CommonDocumentUploadModal from '../../_TeamDocumentationTabModels/CommonDocumentUploadModal'
// import { DocumentFile } from '@/app/icons/DocumentFile'
// import { DownloadGreen } from '@/app/icons/DownloadGreen'
// import { DeleteRed } from '@/app/icons/DeleteRed'
import { useMutation } from 'react-query'
import makePostRequest from '../../../../../../api/makePostRequest'
import { ADMIN_TEAM_DOCUMENT_UPLOAD_DELETE } from '../../../../../../api-utils'
import toast from 'react-hot-toast'
import {
  downloadFile,
  formatDate,
  getFirstErrorMessage,
} from '../../../../../../utils/functions/commonFunctions'
// import AppLoader from '@/app/components/layouts/AppLoader'
import AdminInputRenderer from '../../../../../../login/adminlogin/AdminInputRenderer'
import AppButton from '../../../../../../AppComponents/AppButton-agent'
import { DocumentFile } from '../../../../../Auth/AgentComponents/admincompenets/DocumentFile'
import { DownloadGreen } from '../../../../../Auth/AgentComponents/admincompenets/DownloadGreen'
import { DeleteRed } from '../../../../../Auth/AgentComponents/admincompenets/DeleteRed'
import AppLoader from '../../../../../Auth/AgentComponents/admincompenets/AppLoader'

export const CommonDetailContainer = ({
  data,
  fields,
  editForm,
  documents,
  params,
  refetch,
}: {
  data: {
    id: string
    agent_fullName: string
    license: string
    email: string
    phone: string
    profile: string
    role?: { id: string; identity: string; label: string; value: string } | null
    cap?: { id: string; identity: string; label: string; value: string } | null
    commision_plan: {
      id: string
      identity: string
      label: string
      value: string
    } | null
    commision_split: {
      id: string
      identity: string
      label: string
      value: string
    } | null
  }
  fields: any
  editForm: UseFormReturn<any>
  documents: any
  params: { tab: string; id: string; memberId: string }
  refetch: any
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const docTypes = ['Team Document', 'Agent Document']
  const [deletingId, setDeletingId] = useState('')

  const { mutate, isLoading } = useMutation(
    (body) =>
      makePostRequest(ADMIN_TEAM_DOCUMENT_UPLOAD_DELETE(params?.id), body),
    {
      onSuccess: () => {
        toast.success('Documents Deleted Successfully')
        refetch()
      },
      onError: (err) => {
        //@ts-ignore
        const errMsg = getFirstErrorMessage(err?.response?.data?.data)
        //@ts-ignore
        toast.error(errMsg)
      },
    }
  )

  const [imageState, setImageState] = useState()
  const inputObj = {
    label: '',
    name: '',
    type: '',
    required: true,
    imageState: imageState,
    setImageState: setImageState,
    uploadKey: '',
    fileTypes: ['jpg', 'jpeg', 'png', 'pdf', 'xlsx'],
    placeholder: '',
    fileTypeKey: '',
  }

  const agentNameAndLicense = {
    name: data?.agent_fullName,
    license: data?.license,
    avatarUrl: data?.profile,
  }

  return (
    <Box className="border border-[#61687640] p-[40px]">
      <AgentProfileHeader data={data} notModal />
      <Divider className="pt-[40px]" />
      <Box className="mt-[40px] grid grid-cols-2 gap-y-[20px] gap-x-[30px] w-[80%]">
        {fields?.map((i: any, ind: number) => (
          <Box key={ind} className="">
            <AdminInputRenderer
              register={editForm?.register}
              labelClassName="!text-[#444444] !text-[16px]"
              control={editForm?.control}
              errors={editForm?.formState?.errors?.data}
              inputObj={i}
            />
          </Box>
        ))}
      </Box>
      <Flex justify={'space-between'} w={'80%'} my={'20px'}>
        <AppText
          className="!text-[#10295A] text-[24px] font-semibold"
          text={`Documents`}
        />
        <AppButton
          label="Upload Document"
          icon={<FaFileArrowUp />}
          className="max-w-[250px]"
          onClick={() => onOpen()}
          // isLoading={isLoading}
        />
      </Flex>
      {documents ? (
        <Flex gap={'10px'} flexDirection={'column'} w={'80%'}>
          {documents?.map((each: any) => (
            <div
              key={each?.id}
              className="flex p-[15px] justify-between items-center h-[64px] border-[1px] border-[#F0F0F0] rounded-[8px]"
            >
              <Flex gap={'10px'}>
                <DocumentFile />
                <a
                  className="text-[#10295A]"
                  target="_blank"
                  href={each?.document?.file}
                >
                  {`${each?.document?.file_name} - ${formatDate(each?.created)}`}
                </a>
              </Flex>
              <Flex gap={'10px'}>
                <Box
                  className="cursor-pointer"
                  onClick={() =>
                    downloadFile(
                      each?.document?.file,
                      each?.document?.file_name
                    )
                  }
                >
                  <DownloadGreen />
                </Box>

                <Box
                  className="cursor-pointer"
                  onClick={() => {
                    setDeletingId(each?.id)
                    //@ts-ignore
                    mutate({ team_document: [each?.id] })
                  }}
                >
                  {isLoading && each?.id == deletingId ? (
                    <AppLoader />
                  ) : (
                    <DeleteRed />
                  )}
                </Box>
              </Flex>
            </div>
          ))}
        </Flex>
      ) : null}
      <CommonDocumentUploadModal
        isOpen={isOpen}
        onClose={onClose}
        documentTypes={docTypes}
        inputObj={inputObj}
        selectedAgent={agentNameAndLicense}
        isAgentDetail
        params={params}
        id={data?.id}
      />
    </Box>
  )
}
