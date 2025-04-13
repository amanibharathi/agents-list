//import AppText from '@/app/components/elements/AppText'
import { Box, Flex } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import AppText from '../../AppComponents/AppText-agent'

const AdminFormWrapperTeam = ({
  children,
  title,
  titleClassName = '',
}: {
  children: ReactNode
  title?: string
  titleClassName?: string
}) => {
  return (
    <Flex gap={'41px'} direction={'column'}>
      {title ? (
        <AppText
          text={title}
          className={`text-[24px] font-[600] !text-[#10295A] ${titleClassName}`}
        />
      ) : null}
      <Box className="border border-[#61687640] w-full" py={'39px'} px={'39px'}>
        {children}
      </Box>
    </Flex>
  )
}

export default AdminFormWrapperTeam
