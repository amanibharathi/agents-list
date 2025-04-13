
import { Flex } from '@chakra-ui/react'
import AppButton from '../../../../AppComponents/AppButton-agent'


const ButtonPair = ({
  onSecondaryClick,
  onPrimaryClick,
  primaryBtnText = 'Save',
  secondaryBtnText = 'Save',
  primaryBtnType = 'submit',
  primaryBtnIsLoading = false,
  primaryBtnDisabled = false,
  primaryBtnIcon,
  primaryBtnClassName = '',
  secondaryBtnClassName = '',
}: {
  onSecondaryClick: any
  onPrimaryClick: any
  primaryBtnText?: string
  secondaryBtnText?: string
  primaryBtnType?: 'submit' | 'button' | 'reset' | undefined
  primaryBtnIsLoading?: boolean
  primaryBtnDisabled?: boolean
  primaryBtnIcon?: any
  primaryBtnClassName?: string
  secondaryBtnClassName?: string
}) => {
  return (
    <Flex alignItems={'center'} gap={'16px'}>
      <AppButton
        onClick={onSecondaryClick}
        variant="outline"
        className={`${secondaryBtnClassName} w-fit py-2`}
      >
        {secondaryBtnText}
      </AppButton>
      <AppButton
        isLoading={primaryBtnIsLoading}
        type={primaryBtnType}
        onClick={onPrimaryClick}
        disabled={primaryBtnDisabled}
        icon={primaryBtnIcon}
        className={primaryBtnClassName}
      >
        {primaryBtnText}
      </AppButton>
    </Flex>
  )
}

export default ButtonPair
