import AppButton from '../../AppComponents/AppButton-agent'
import AppText from '../../AppComponents/AppText-agent'
import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'
import DropDownButton from './DropDownButton'

export interface IDropDownBtnMenuList {
  label: string
  onClick?: () => void | void
  menuItemClassName?: string
  dontShowForDefault?: boolean
  icon?: any
}

interface IAdminHeaderWithButtons {
  title: string
  secondaryBtnText?: string
  secondaryBtnOnClick?: () => void
  secondaryBtnIcon?: ReactNode
  primaryBtnText?: string
  primaryBtnOnClick?: () => void
  primaryBtnIcon?: ReactNode
  dropDownBtnText?: string
  dropDownBtnMenuList?: IDropDownBtnMenuList[]
  isPrimaryBtnDisabled?: boolean
  wrapperClassName?: string
  primaryBtnIsLoading?: boolean
  additionalBtnText?: string
  additionalBtnIcon?: ReactNode
  additionalBtnClick?: () => void
  additionalBtnClassName?: string
}

const AdminHeaderWithButtons = ({
  title,
  secondaryBtnText,
  secondaryBtnOnClick,
  secondaryBtnIcon,
  primaryBtnText,
  primaryBtnOnClick,
  primaryBtnIcon,
  primaryBtnIsLoading = false,
  dropDownBtnText,
  dropDownBtnMenuList = [],
  isPrimaryBtnDisabled = false,
  wrapperClassName = '',
  additionalBtnText,
  additionalBtnIcon,
  additionalBtnClick,
  additionalBtnClassName = '',
}: IAdminHeaderWithButtons) => {
  return (
    <Flex
      w="100%"
      py={'38px'}
      justifyContent={'space-between'}
      alignItems={'center'}
      className={`${wrapperClassName}`}
    >
      <AppText
        className="text-[30px] font-[600]"
        style={{ color: '#10295A' }}
        text={title}
      />
      <Flex gap={'10px'}>
        {additionalBtnText ? (
          <AppButton
            className={additionalBtnClassName}
            icon={additionalBtnIcon}
            onClick={additionalBtnClick}
          >
            {additionalBtnText}
          </AppButton>
        ) : null}
        {secondaryBtnText ? (
          <AppButton
            className="py-[10px]"
            variant="outline"
            icon={secondaryBtnIcon}
            onClick={secondaryBtnOnClick}
          >
            {secondaryBtnText}
          </AppButton>
        ) : null}
        {primaryBtnText ? (
          <AppButton
            disabled={isPrimaryBtnDisabled}
            icon={primaryBtnIcon}
            onClick={primaryBtnOnClick}
            isLoading={primaryBtnIsLoading}
          >
            {primaryBtnText}
          </AppButton>
        ) : null}
        {dropDownBtnText ? (
          <DropDownButton
            dropDownBtnMenuList={dropDownBtnMenuList}
            dropDownBtnText={dropDownBtnText}
          />
        ) : null}
      </Flex>
    </Flex>
  )
}

export default AdminHeaderWithButtons
