
import { Box, Flex } from '@chakra-ui/react'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import ButtonPair from '../../../../Auth/AgentComponents/admincompenets/ButtonPair'
import { ADMIN_TEAM_DOCUMENT_LIST,ADMIN_TEAM_DOCUMENT_UPLOAD_DELETE, } from '../../../../../api-utils'
import AppText from '../../../../../AppComponents/AppText-agent'
import CkAppModal from '../../../../Auth/AgentComponents/admincompenets/AppModal'
import { DeleteRed } from '../../../../Auth/AgentComponents/admincompenets/DeleteRed'
import { DocumentFile } from '../../../../Auth/AgentComponents/admincompenets/DocumentFile'
import makePostRequest from '../../../../../api/makePostRequest'
import { formatDate,getFirstErrorMessage, } from '../../../../../utils/functions/commonFunctions'

type DocumentUploaderProps = {
  isOpen: boolean
  onClose: () => void
  params?: any
  selected?: any
  singleSelected?: any
  setSingleSelected?: any
}

const DocumentRemoveModal: React.FC<DocumentUploaderProps> = ({
  isOpen,
  onClose,
  params,
  selected,
  singleSelected,
  setSingleSelected,
}) => {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(
    (body) =>
      makePostRequest(ADMIN_TEAM_DOCUMENT_UPLOAD_DELETE(params?.id), body),
    {
      onSuccess: () => {
        toast.success('Documents Removed Successfully')
        onClose()
        selected && selected.setSelect([])
        queryClient.invalidateQueries([ADMIN_TEAM_DOCUMENT_LIST(params?.id)])
        singleSelected && setSingleSelected({})
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
    const obj = {
      team_document:
        selected?.select?.length > 0
          ? selected?.select?.map((m: any) => m?.id)
          : [singleSelected?.id],
    }
    //@ts-ignore
    mutate(obj)
  }

  const handleRemoveInComponent = (file: any) => {
    //@ts-ignore
    const filteredImg = selected?.select?.filter(
      (f: any) => f?.document?.id !== file?.document?.id
    )
    selected?.setSelect(filteredImg)
  }

  return (
    <CkAppModal
      className="!w-full !max-w-[771px] !rounded-[10px] max-h-[90vh] overflow-y-scroll no-scrollbar"
      bodyClassName=" !px-[40px]"
      isOpen={isOpen}
      onClose={onClose}
      header={`Remove Documents`}
      headerClassName={`text-[#10295A] text-[20px] font-[500] !py-[25px] !px-[40px] ${selected?.select?.length == 0 ? 'text-center' : 'text-left'}`}
      closeButton={selected?.select?.length == 0 ? false : true}
    >
      <Box
        className={selected?.select?.length != 0 ? 'text-left' : 'text-center'}
      >
        <AppText
          className={`${selected?.select?.length > 0 ? 'mb-[40px]' : 'mb-[20px]'} text-[20px] font-[500] !text-[#000000]`}
        >
          Are you sure you want to remove this document ?
        </AppText>
        {selected?.select ? (
          <Flex gap={'10px'} flexDirection={'column'}>
            {selected?.select?.map((each: any) => (
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
                    onClick={() => handleRemoveInComponent(each)}
                  >
                    <DeleteRed />
                  </Box>
                </Flex>
              </div>
            ))}
          </Flex>
        ) : null}
        <Flex
          mb={selected?.select?.length > 0 ? '28px' : '20px'}
          justifyContent={selected?.select?.length > 0 ? 'end' : 'center'}
          mt={selected?.select?.length > 0 ? '40px' : '0px'}
        >
          <ButtonPair
            primaryBtnText={'Remove'}
            secondaryBtnText={'Cancel'}
            onPrimaryClick={() => handleSubmit()}
            onSecondaryClick={onClose}
            primaryBtnIsLoading={isLoading}
          />
        </Flex>
      </Box>
    </CkAppModal>
  )
}

export default DocumentRemoveModal
