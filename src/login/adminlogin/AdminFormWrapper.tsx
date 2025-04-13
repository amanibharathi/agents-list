//import AppButton from '@/app/components/elements/AppButton'
//import AppText from '@/app/components/elements/AppText'
import { Box, Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'
import AppText from '../../AppComponents/AppText-agent'
import AppButton from '../../AppComponents/AppButton-agent'

const AdminFormWrapper = ({
  children,
  title,
  titleClassName = '',
  buttonLabel = '',
  onOpen,
  disabled,
}: {
  children: ReactNode
  title?: string
  titleClassName?: string
  buttonLabel?: string
  onOpen?: () => void
  disabled?: boolean
}) => {
  return (
    <Box
      className="admin-form-wrapper w-full bg-white"
      py={'39px'}
      px={{ base: '14px', md: '39px' }}
    >
      <Flex justify={'space-between'}>
        {title ? (
          <AppText
            text={title}
            className={`text-[24px] font-[600] !text-[#10295A] ${titleClassName}`}
          />
        ) : null}
        {buttonLabel && (
          <AppButton
            label={buttonLabel}
            className="max-h-[50px]"
            onClick={() => onOpen && onOpen()}
            disabled={disabled && disabled}
          />
        )}
      </Flex>
      {children}
    </Box>
  )
}

export default AdminFormWrapper
