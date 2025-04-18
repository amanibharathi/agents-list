// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import AdminSearchIcon from '../../assets/Images/Icons/admin-search-icon.svg'
import { Box } from '@chakra-ui/react'
import { memo } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import AppImage from '../../AppComponents/AppImage'
import CkInput from '../../pages/Auth/AgentComponents/admincompenets/CkInput'

const AdminSerachComponent = ({
  placeholder = 'Search',
  register,
  isShadowBox = true,
  maxW = '283px',
  isTeam = false,
}: {
  placeholder?: string
  register: UseFormRegisterReturn<string>
  isShadowBox?: boolean
  maxW?: string
  isTeam?: boolean
}) => {
  return (
    <Box maxW={maxW} pos={'relative'}>
      <CkInput
        {...register}
        placeholder={placeholder}
        style={{
          boxShadow: isShadowBox ? '3px 4px 4px 0px #00000040' : '',
          borderRadius: isTeam ? '8px' : '20px',
        }}
        wrapperClassName={`w-full ${isTeam ? 'w-[100%]' : '!w-[283px]'}`}
        className="border-[1px]  border-[#B9B9B980] pr-[40px] !text-[14px]"
      />
      <AppImage
        src={AdminSearchIcon}
        alt="search-icon"
        className="absolute right-[17px] top-[20px] translate-y-[-50%] bg-white z-[1]"
      />
    </Box>
  )
}

export default memo(AdminSerachComponent)
