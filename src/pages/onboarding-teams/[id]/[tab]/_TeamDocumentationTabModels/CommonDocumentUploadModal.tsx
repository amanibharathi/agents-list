import ButtonPair from '@/app/admin/_AdminComponent/ButtonPair/ButtonPair'
import MultiFileUpload from '@/app/admin/_AdminComponent/fileupload/MultiFileUpload'
import {
  ADMIN_TEAM_DOCUMENT_LIST,
  ADMIN_TEAM_DOCUMENT_UPLOAD,
  ADMIN_TEAM_DOCUMENT_UPLOAD_CREATE,
  ADMIN_TEAM_MEMBER_DETAIL,
  GET_ADMIN_TEAM_MEMBERS_LIST,
} from '@/app/api-utils'
import AppLoader from '@/app/components/elements/AppLoader'
import AppText from '@/app/components/elements/AppText'
import { ExportUp } from '@/app/components/elements/ExportUp'
import CkAppModal from '@/app/components/modal/AppModal'
import { useGetAgentList } from '@/app/hooks/useGetAgentList'
import makePostRequest from '@/app/utils/api/makePostRequest'
import { getFirstErrorMessage } from '@/app/utils/functions/otherFunctions'
import { Box, Radio, RadioGroup, Flex, Text, Avatar } from '@chakra-ui/react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { GoChevronDown } from 'react-icons/go'
import { useMutation, useQueryClient } from 'react-query'
import Select, { components } from 'react-select'

type DocumentUploaderProps = {
  documentTypes: string[]
  selectedAgent?: { name: string; license: string; avatarUrl: string }
  isOpen: boolean
  onClose: () => void
  inputObj: any
  isAgentDetail?: boolean
  params?: any
  id?: any
}

const CommonDocumentUploadModal: React.FC<DocumentUploaderProps> = ({
  documentTypes,
  selectedAgent,
  isOpen,
  onClose,
  inputObj,
  isAgentDetail,
  params,
  id,
}) => {
  const [selectedType, setSelectedType] = useState<string | undefined>(
    documentTypes[0] || undefined
  )
  const [selectedId, setSelectedId] = useState<string | undefined>()

  const [showUploadError, setShowUploadError] = useState(false)

  const customUiBodyComp = (isLoading: boolean) => (
    <Flex flexFlow={'column'}>
      <AppText className="text-[18px] !text-[#444444] font-semibold mb-2">
        Upload File
      </AppText>
      {isLoading ? (
        <AppLoader />
      ) : (
        <>
          <div
            className={`border border-dashed rounded-[5px] ${showUploadError ? 'border-[#FC8181]' : 'border-[#C0C0C0]'}  flex flex-col gap-[10px] w-full h-[150px] items-center justify-center`}
          >
            <ExportUp fill={showUploadError ? '#E33326' : '#10295A'} />
            <AppText
              className={` ${showUploadError ? '!text-[#E33326]' : 'text-[#000000]'}`}
            >
              Drag your files here or{' '}
              <span
                className={`underline ${showUploadError ? '!text-[#E33326]' : 'text-[#10295A]'}`}
              >
                Browse
              </span>
            </AppText>
          </div>
          {showUploadError ? (
            <AppText className="text-[12px] !text-[#E33326] mt-[4px]">
              Please upload a document
            </AppText>
          ) : null}
        </>
      )}
    </Flex>
  )
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(
    (body) =>
      makePostRequest(ADMIN_TEAM_DOCUMENT_UPLOAD_CREATE(params?.id), body),
    {
      onSuccess: () => {
        toast.success('Documents submitted Successfully')
        onClose()
        queryClient.invalidateQueries([
          isAgentDetail
            ? ADMIN_TEAM_MEMBER_DETAIL(params?.id, params?.memberId)
            : ADMIN_TEAM_DOCUMENT_LIST(params?.id),
        ])
        // router.push(
        //   isAgentDetail
        //     ? ADMIN_TEAM_MEMBERS_INDIVIDUAL_PAGE(params?.id, params?.memberId)
        //     : MAKE_ADMIN_TEAM_DETAIL_TAB(params?.id, 'documents')
        // )
        setSelectedType(documentTypes[0])
        inputObj?.setImageState([])
      },
      onError: (err) => {
        //@ts-ignore
        const errMsg = getFirstErrorMessage(err?.response?.data?.data)
        //@ts-ignore
        toast.error(errMsg)
      },
    }
  )

  const handleSubmit = () => {
    if (!inputObj?.imageState?.length) {
      setShowUploadError(true) // Show error if no files uploaded
      return
    }

    setShowUploadError(false)
    const obj = {
      document_type: isAgentDetail
        ? 'agent_document'
        : selectedType == 'Agent Document'
          ? 'agent_document'
          : 'team_document',
      agent: isAgentDetail
        ? parseInt(id)
        : selectedType == 'Agent Document'
          ? //@ts-ignore
            parseInt(selectedId)
          : null,
      documents: inputObj?.imageState?.flat()?.map((m: any) => m?.id),
    }
    //@ts-ignore
    mutate(obj)
  }

  const {
    // metaIsLoading,
    groupedOptions,
    // isFetching,
    // isSuccess,
    setSearchVal,
  } = useGetAgentList(GET_ADMIN_TEAM_MEMBERS_LIST(params?.id), true)

  const customOptionComp = ({ ...props }) => {
    return (
      //@ts-ignore
      <components.Option {...props} className="!cursor-pointer">
        <div className="flex gap-[10px] md:gap-[15px] items-center h-full">
          <Avatar
            src={props?.data?.profile?.file}
            width={32}
            height={32}
            className="rounded-full !h-[32px] !w-[32px]"
          />
          <AppText className="text-[16px] !text-[#000000] font-[500] capitalize">
            {props?.data?.label}
          </AppText>
          <AppText className="text-[14px] !text-[#717171] font-[400]">
            License: {props?.data?.license ?? '-'}
          </AppText>
        </div>
      </components.Option>
    )
  }

  //@ts-ignore
  const Menu = ({ children, ...props }) => {
    // if (groupedOptions?.length == 0) return null
    return (
      //@ts-ignore
      <components.Menu {...props} className="!cursor-pointer">
        {children}
      </components.Menu>
    )
  }

  const singleValueComp = ({ ...props }) => {
    return (
      //@ts-ignore
      <components.SingleValue {...props} className="!cursor-pointer">
        <div className="flex gap-[10px] md:gap-[15px] items-center h-full">
          <Avatar
            src={props?.data?.profile?.file}
            width={32}
            height={32}
            className="rounded-full !h-[32px] !w-[32px]"
          />
          <AppText className="text-[16px] !text-[#000000] font-[500] capitalize">
            {props?.data?.label}
          </AppText>
          <AppText className="text-[14px] !text-[#717171] font-[400]">
            License: {props?.data?.license ?? '-'}
          </AppText>
        </div>
      </components.SingleValue>
    )
  }

  const handleInputChange = (e: string) => {
    setSearchVal(e)
  }

  const handleClick = (e: any) => {
    setSelectedId(e?.userId)
  }

  const handleSecondaryBtnCLick = () => {
    onClose()
    setShowUploadError(false)
    inputObj.setImageState([])
    setSelectedType(documentTypes[0])
  }

  return (
    <CkAppModal
      className="!w-full !max-w-[771px] !rounded-[10px] max-h-[90vh] overflow-y-scroll no-scrollbar"
      bodyClassName=" !px-[40px]"
      isOpen={isOpen}
      onClose={onClose}
      header={`Upload Documents`}
      headerClassName="text-[#10295A] text-[20px] font-[500] !py-[25px] !px-[40px]"
      closeButton
    >
      <Box className="">
        {!isAgentDetail ? (
          <RadioGroup
            onChange={setSelectedType}
            value={selectedType}
            className="mb-5"
          >
            <Flex className="space-x-4">
              {documentTypes?.map((type) => (
                <Radio key={type} value={type}>
                  <AppText className="!text-xl font-medium text-black">
                    {type}
                  </AppText>
                </Radio>
              ))}
            </Flex>
          </RadioGroup>
        ) : null}

        {selectedType == 'Agent Document' ? (
          <div className="flex flex-col gap-[10px] my-[40px]">
            <AppText className={`!text-[#444444] text-[16px] font-[600]`}>
              Select Agent Name
            </AppText>
            <div>
              <Select
                inputId="agent-search-input"
                loadingMessage={() => (
                  <p className="text-[13px]">Searching......</p>
                )}
                placeholder="Search and select agent by name, LIC #, phone, or email..."
                className={`w-full !text-[10px] md:!text-[14px] !top-0 rounded-[5px] !z-[12] custom-select-modal`}
                options={groupedOptions}
                filterOption={() => true}
                onChange={handleClick}
                components={{
                  Option: customOptionComp,
                  DropdownIndicator: (props) => (
                    <components.DropdownIndicator {...props}>
                      <GoChevronDown color="#2D2D2D80" fontSize={'20px'} />
                    </components.DropdownIndicator>
                  ),
                  Menu: Menu,
                  SingleValue: singleValueComp,
                }}
                onInputChange={handleInputChange}
                noOptionsMessage={() => (
                  <p className="text-[13px]">
                    Search and select agent by name, LIC #
                  </p>
                )}
              />
            </div>
          </div>
        ) : null}

        {selectedAgent && (
          <Flex flexDirection={'column'} gap={'16px'}>
            <AppText className="!text-[#444444] font-semibold">
              Agent Name
            </AppText>
            <Box className="w-full bg-white border p-3 rounded-md mb-5 flex justify-between items-center">
              <Flex align="center" className="space-x-4">
                <Avatar
                  src={
                    selectedAgent?.avatarUrl ??
                    '/assets/profile-placeholder-male.png'
                  }
                  size="md"
                />
                <Text className="text-black font-medium text-base capitalize">
                  {selectedAgent?.name}
                </Text>
                <Text className="text-[#717171] text-sm">
                  License: {selectedAgent?.license ?? '-'}
                </Text>
              </Flex>
            </Box>
          </Flex>
        )}

        <Flex className="items-start justify-between my-[20px]">
          <MultiFileUpload
            imageState={inputObj?.imageState}
            setImageState={inputObj?.setImageState}
            uploadKey={inputObj?.uploadKey}
            fileTypeKey={inputObj?.fileTypeKey}
            fileTypes={inputObj?.fileTypes}
            name={inputObj?.name}
            //@ts-ignore
            customUiBody={customUiBodyComp}
            customEndPoint={ADMIN_TEAM_DOCUMENT_UPLOAD}
            setUploadError={setShowUploadError}
          />
        </Flex>

        <Flex mb={'28px'} justifyContent={'end'} mt={'40px'}>
          <ButtonPair
            primaryBtnText={'Upload'}
            secondaryBtnText={'Cancel'}
            onPrimaryClick={() => handleSubmit()}
            onSecondaryClick={handleSecondaryBtnCLick}
            primaryBtnIsLoading={isLoading}
          />
        </Flex>
      </Box>
    </CkAppModal>
  )
}

export default CommonDocumentUploadModal
