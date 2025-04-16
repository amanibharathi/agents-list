// import AdminInputRenderer from '@/app/admin/_AdminComponent/AdminInputRenderer'
import { Box, Divider, Flex } from '@chakra-ui/react'
import { AgentProfileHeader } from '../[memberId]/components/AgentProfileHeader'
import AdminInputRenderer from '../../../../../login/adminlogin/AdminInputRenderer'
import MultiFileUpload from '../../../../Auth/AgentComponents/admincompenets/MultiFileUpload'
import AppLoader from '../../../../Auth/AgentComponents/admincompenets/AppLoader'
import { ExportUp } from './ExportUp'
import AppText from '../../../../../AppComponents/AppText-agent'
import { ADMIN_TEAM_DOCUMENT_UPLOAD } from '../../../../../api-utils'

const AddATeamMemberModalStep2 = ({
  formUtil,
  inputFields,
  selectedAgentFrom1,
  imageState,
  setImageState,
}: {
  formUtil: any
  inputFields: any[]
  selectedAgentFrom1?: any
  imageState?: any
  setImageState?: any
}) => {
  const customUiBodyComp = (isLoading: boolean) => (
    <Flex maxWidth={'680px'} alignItems={'center'} flexFlow={'column'}>
      {isLoading ? (
        <AppLoader />
      ) : (
        <div className="border border-dashed rounded-[5px] border-[#C0C0C0] flex flex-col gap-[10px] w-[680px] h-[150px] items-center justify-center">
          <ExportUp />
          <AppText>
            Drag your files here or{' '}
            <span className="underline text-[#10295A]">Browse</span>
          </AppText>
        </div>
      )}
    </Flex>
  )

  const uploadObj = {
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

  return (
    <div>
      {selectedAgentFrom1 ? (
        <>
          <AgentProfileHeader data={selectedAgentFrom1} notModal />
          <Divider mt={'20px'} />
        </>
      ) : null}
      <Box
        className={`${selectedAgentFrom1 ? 'mt-[40px]' : 'mt-0'} grid grid-cols-2 gap-[28px] basis-[70%]`}
      >
        {inputFields?.map((i: any) => (
          <AdminInputRenderer
            className="w-full max-w-[100%] agent-modal-select"
            wrapperClassName="flex gap-[20px] text-[14px]"
            labelClassName="!text-[16px] !text-[#444444]"
            inputObj={i}
            key={i?.name}
            register={formUtil?.register}
            control={formUtil?.control}
            errors={formUtil?.formState?.errors?.data}
          />
        ))}
      </Box>

      <Box className="mt-[40px] flex flex-col gap-[10px]">
        <AppText
          text="Upload File"
          className="text-[16px] !text-[#444444] font-semibold"
        />
        <MultiFileUpload
          customUiBody={customUiBodyComp}
          customEndPoint={ADMIN_TEAM_DOCUMENT_UPLOAD}
          imageState={uploadObj?.imageState}
          setImageState={uploadObj?.setImageState}
          uploadKey={uploadObj?.uploadKey}
          fileTypeKey={uploadObj?.fileTypeKey}
          fileTypes={uploadObj?.fileTypes}
          name={uploadObj?.name}
        />
      </Box>
    </div>
  )
}

export default AddATeamMemberModalStep2
