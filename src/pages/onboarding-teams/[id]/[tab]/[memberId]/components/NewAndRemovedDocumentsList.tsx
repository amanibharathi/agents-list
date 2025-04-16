// import AppText from '@/app/components/elements/AppText'
// import { DocumentFile } from '@/app/icons/DocumentFile'
// import { DownloadGreen } from '@/app/icons/DownloadGreen'
import {
  downloadFile,
  formatDate,
  truncateString,
} from '../../../../../../utils/functions/commonFunctions'
import { Box, Flex } from '@chakra-ui/react'
import { ColorTags } from '../../../../components/ColorTags'
import AppText from '../../../../../../AppComponents/AppText-agent'
import { DocumentFile } from '../../../../../Auth/AgentComponents/admincompenets/DocumentFile'
import { DownloadGreen } from '../../../../../Auth/AgentComponents/admincompenets/DownloadGreen'

export const NewAndRemovedDocumentsList = ({
  documents,
  isAgent = false,
}: {
  documents: any
  isAgent?: boolean
}) => {
  return (
    <div className="flex flex-col gap-[20px]">
      <AppText className="!text-[#444444] text-[16px] font-semibold">
        Team Verification Documents
      </AppText>
      <Flex direction={'column'} className={isAgent ? 'gap-0' : 'gap-[20px]'}>
        {documents?.map((each: any) => (
          <div
            key={each?.id}
            className={`flex p-[15px] justify-between items-center h-[64px] ${isAgent ? 'border-t-[1px] border-b-[1px]' : 'border-[1px] rounded-[8px]'}  border-[#F0F0F0]`}
          >
            <Flex gap={'10px'}>
              <DocumentFile />
              <a className="text-[#10295A]" target="_blank" href={each?.file}>
                {`${truncateString(each?.file_name, 30)} ${each?.created ? ` - ${formatDate(each?.convert)}` : '-'}`}
              </a>
              <ColorTags
                className="!py-[2px]"
                text={
                  each?.status == 'new_document' ? 'New!' : 'Delete Requested'
                }
                background={
                  each?.status == 'new_document' ? '#1A91751A' : '#EF53501A'
                }
                textColor={
                  each?.status == 'new_document' ? '#1A9175' : '#EF5350'
                }
              />
            </Flex>
            <Flex gap={'10px'}>
              <Box
                className="cursor-pointer"
                onClick={() => downloadFile(each?.file, each?.file_name)}
              >
                <DownloadGreen />
              </Box>
            </Flex>
          </div>
        ))}
      </Flex>
    </div>
  )
}
