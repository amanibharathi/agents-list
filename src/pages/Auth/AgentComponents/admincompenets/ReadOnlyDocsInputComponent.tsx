
import { Flex } from '@chakra-ui/react'

import { IoEyeOutline } from 'react-icons/io5'
import AppLink from '../../../../AppComponents/AppLink'
import AppText from '../../../../AppComponents/AppText-agent'
import { getFileName } from '../../../../utils/functions/commonFunctions'

const ReadOnlyDocsInputComponent = ({ fileUrl }: { fileUrl: string }) => {
  const fileName = getFileName(fileUrl, true)
  return (
    <Flex
      px={'19px'}
      py={'14px'}
      border={'1px solid #F0F0F0'}
      borderRadius={'8px'}
      alignItems={'center'}
      justifyContent={'space-between'}
      w={'100%'}
    >
      <Flex flexFlow={'column'} gap={'5px'}>
        <AppText className="!text-[#010101]" text={fileName?.split('.')?.[0]} />
        <AppText
          className="!text-[#6D6D6D] text-[12px]"
          text={fileName?.split('.')?.[0]}
        />
      </Flex>
      <AppLink target="_blank" href={fileUrl}>
        <Flex gap={'10px'} alignItems={'center'} justifyContent={'center'}>
          <IoEyeOutline color="#10295A" fontSize={'20px'} />
          <AppText className="text-[18px] !text-[#10295A]" text="View" />
        </Flex>
      </AppLink>
    </Flex>
  )
}

export default ReadOnlyDocsInputComponent
