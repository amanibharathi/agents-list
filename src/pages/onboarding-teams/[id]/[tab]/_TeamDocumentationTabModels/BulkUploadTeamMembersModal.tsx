
import { Box, Checkbox, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { GrCloudUpload } from 'react-icons/gr'
// import ListingTable from '@/app/components/table/ListingTable'
import { useParams } from 'react-router-dom'
import AdminFileUpload from '../../../../Auth/AgentComponents/fileupload/AdminFileUpload'
import AppText from '../../../../../AppComponents/AppText-agent'
import CkAppModal from '../../../../Auth/AgentComponents/admincompenets/AppModal'
import AppLoader from '../../../../Auth/AgentComponents/admincompenets/AppLoader'
import useGetTableList from '../../../../../utils/hooks/useGetTableList'
import useHandlePagination from '../../../../../utils/hooks/useHandlePagination'
import { ADMIN_BULK_LIST_DOCUMENT,  ADMIN_BULK_LIST_DOCUMENT_META,
  POST_AGENT_AND_TEAM_BULK_UPLOAD, } from '../../../../../api-utils'
import ListingTable from '../../../../Auth/AgentComponents/table/ListingTable'

const BulkUploadTeamMembersModal = ({
  isOpen,
  onClose,
  heading = 'Bulk Upload Team Members',
  inputObj,
  isBulkLicenseUpload,
  // onOptionRemove,
  // onPrimaryBtnSubmit,
  // onSecondaryBtnSubmit,
  // isSubmitLoading,
}: {
  isOpen: boolean
  onClose: () => void
  heading?: string
  onOptionRemove: (val: any) => void
  onPrimaryBtnSubmit?: () => void
  onSecondaryBtnSubmit?: () => void
  isSubmitLoading?: boolean
  isBulkLicenseUpload?: boolean
  inputObj: {
    label: string
    name: string
    type: string
    imageState: any
    setImageState: (val: any) => void
    uploadKey: string
    fileTypes: string[]
    placeholder: string
    fileTypeKey: string
  }
}) => {
  const params = useParams()
  const [freeAgent, setFreeAgent] = useState(true)
  const { page, handleMaxPage, handlePaginationClick, max, setPage } =
    useHandlePagination()
  const { listData, listMeta, isLoading, refetch } = useGetTableList({
    endPoint: ADMIN_BULK_LIST_DOCUMENT + '?team=' + params?.id,
    metaEndPoint: ADMIN_BULK_LIST_DOCUMENT_META,
    handleMax: handleMaxPage,
    page,
    setPage,
  })
  const onSuccess = () => {
    refetch()
  }
  const handleCheck = () => {
    if (freeAgent == false) {
      setFreeAgent(true)
    } else {
      setFreeAgent(false)
    }
  }
  const handleClick = (obj: any) => {
    window.open(obj?.file)
  }

  const customTypeValues = {
    type: 'team',
    team: params?.id,
    is_registration_fee_waived: freeAgent,
  }

  const customtypeValueForLicense = {
    type: 'team',
    team: params?.id,
    is_registration_fee_waived: freeAgent,
    is_bulk_upload_with_license: true,
  }

  const customUiBodyComp = (isLoading: boolean) => (
    <Flex
      w={'100%'}
      border={'1px dashed #C0C0C0'}
      py={'40px'}
      alignItems={'center'}
      flexFlow={'column'}
    >
      {isLoading ? (
        <AppLoader />
      ) : (
        <>
          <GrCloudUpload color="#10295A" fontSize={'50px'} />
          <AppText text="Drag your files here or Browse .xls, .csv" />
        </>
      )}
    </Flex>
  )

  return (
    <CkAppModal
      className="!w-full !max-w-[1180px] !rounded-[10px] !max-h-[90vh] overflow-scroll no-scrollbar"
      bodyClassName=" px-[30px]"
      isOpen={isOpen}
      onClose={onClose}
      header={heading}
      headerClassName="text-[#10295A] text-[20px] font-[500] !py-[25px]"
      closeButton
    >
      <Box>
        <Flex justify={'space-between'} mb={'20px'}>
          <label
            className={`flex items-center gap-[10px] text-[18px] font-[600] mb-[17px]`}
          >
            Upload File
          </label>
          {isBulkLicenseUpload && (
            <Checkbox isChecked={freeAgent} onChange={() => handleCheck()}>
              <AppText text={'Registration Fee waived'} />
            </Checkbox>
          )}
        </Flex>
        <AdminFileUpload
          imageState={inputObj?.imageState}
          setImageState={inputObj?.setImageState}
          uploadKey={inputObj?.uploadKey}
          fileTypeKey={inputObj?.fileTypeKey}
          fileTypes={inputObj?.fileTypes}
          name={inputObj?.name}
          //@ts-ignore
          customUiBody={customUiBodyComp}
          customEndPoint={POST_AGENT_AND_TEAM_BULK_UPLOAD}
          customType={
            isBulkLicenseUpload ? customtypeValueForLicense : customTypeValues
          }
          // customUploadUiList={customUploadUiList}
          // isError={false}
          onSuccess={onSuccess}
        />
        <ListingTable
          max={max}
          handlePaginationClick={handlePaginationClick}
          tableMeta={listMeta}
          tableData={listData}
          //@ts-ignore
          relativeTime={['created']}
          //@ts-ignore
          // property={['property.property.address']}
          // selectable
          isLoading={isLoading}
          // handleRowClick={handleRowClick}
          forcePage={page - 1}
          handleTabClick={handleClick}
        />
      </Box>
    </CkAppModal>
  )
}

export default BulkUploadTeamMembersModal
