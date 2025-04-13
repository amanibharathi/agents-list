
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { ReactNode } from 'react'
import { IDropDownBtnMenuList } from './AdminHeaderWithButtons'
import AppButton from '../../../../AppComponents/AppButton-agent'

const DropDownButton = ({
  dropDownTrigger,
  dropDownBtnText,
  dropDownBtnMenuList,
  noIcon = false,
  customIcon,
  className = '',
  disabled = false,
  isLoading = false,
  iconClassName = '',
  triggererIcon,
}: {
  dropDownTrigger?: ReactNode
  dropDownBtnText?: string
  dropDownBtnMenuList: IDropDownBtnMenuList[]
  noIcon?: boolean
  customIcon?: ReactNode
  className?: string
  disabled?: boolean
  isLoading?: boolean
  iconClassName?: string
  triggererIcon?: any
}) => {
  return (
    <Menu>
      <MenuButton disabled={disabled} type="button">
        {dropDownTrigger ? (
          dropDownTrigger
        ) : (
          <>
            {customIcon ? (
              customIcon
            ) : (
              <AppButton
                disabled={disabled}
                isLoading={isLoading}
                className={`flex gap-[10px] ${className}`}
                icon={triggererIcon}
              >
                {dropDownBtnText}
                {!noIcon ? (
                  <ChevronDownIcon
                    className={`mt-[5px] ml-[5px] ${iconClassName}`}
                  />
                ) : null}
              </AppButton>
            )}
          </>
        )}
      </MenuButton>
      <MenuList>
        {dropDownBtnMenuList?.map((m) => (
          <MenuItem
            className={m?.menuItemClassName}
            onClick={m?.onClick}
            key={m?.label}
            icon={m?.icon}
          >
            {m?.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default DropDownButton
