import AppText from '@/app/components/elements/AppText'
import { getFileName } from '@/app/utils/functions/otherFunctions'
import { Box, CloseButton, Flex } from '@chakra-ui/react'
import { FileIcon } from '@radix-ui/react-icons'
import React from 'react'

const BulkUploadFileListUi = ({
  fileUrl,
  size,
  onRemove,
}: {
  fileUrl?: string
  size?: string
  onRemove: (val: any) => void
}) => {
  return (
    <Flex
      borderRadius={'5px'}
      border={'1px solid #DBDBDB'}
      w={'100%'}
      p={'19px'}
    >
      <Flex alignItems={'center'} w={'100%'} gap={'19px'}>
        <Box pos={'relative'}>
          <FileIcon width={'50px'} height={'50px'} />
          <AppText
            className="absolute top-[18px] text-[11px] font-[600] px-[2px] bg-[#05db5c]"
            text={getFileName(fileUrl, true)?.split('.')?.[1]?.toUpperCase()}
          />
        </Box>

        <Flex width={'100%'} flexFlow={'column'}>
          <Flex justifyContent={'space-between'} alignItems={'center'}>
            <AppText
              className="text-[18px] font-[600] !text-[#000000]"
              text={getFileName(fileUrl, true)}
            />
            <CloseButton onClick={() => onRemove(fileUrl)} />
          </Flex>
          <Flex gap={'10px'}>
            {size ? (
              <AppText className="!text-[#808080] text-[18px]" text={size} />
            ) : null}
            <AppText
              className="!text-[#808080] text-[18px]"
              text={'100% Uploaded'}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default BulkUploadFileListUi
