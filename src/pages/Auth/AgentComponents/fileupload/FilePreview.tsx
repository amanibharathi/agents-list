
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { RiFile2Line } from 'react-icons/ri'
import AppImage from '../../../../AppComponents/AppImage'
import AppText from '../../../../AppComponents/AppText-agent'
import { getFileName } from '../../../../utils/functions/commonFunctions'

const FilePreview = ({
  src,
  obj,
  handleRemove,
  isFile = false,
}: {
  src: string
  obj: any
  handleRemove: any
  isFile?: boolean
}) => {
  return (
    <Box w={'100%'} maxW={isFile ? '211px' : '611px'}>
      <Flex
        borderTopRadius={'20px'}
        justifyContent={'space-between'}
        alignItems={'center'}
        px={'27px'}
        py={'6px'}
        bg={'#E7EFF7'}
      >
        <AppText
          className="text-[#10295A] font-[600]"
          text={getFileName(src, true)}
        />
        <Menu>
          <MenuButton type="button" px={'17px'} py={'11px'}>
            <HiOutlineDotsHorizontal />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleRemove(obj)}>Remove</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Box border={'1px solid #D9D9D9'}>
        {isFile ? (
          <Flex className="!border !border-[#D9D9D9] h-[126px] w-[100%]">
            <RiFile2Line className="m-auto text-[#D9D9D9]" fontSize={'77px'} />
          </Flex>
        ) : (
          <AppImage
            width={611}
            height={426}
            alt="img"
            src={src}
            className="!border !border-[#D9D9D9] h-[426px] w-[100%] object-cover"
          />
        )}
      </Box>
    </Box>
  )
}

export default FilePreview
