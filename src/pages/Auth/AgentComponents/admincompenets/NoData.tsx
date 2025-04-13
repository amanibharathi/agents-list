//import AppImage from '@/app/components/elements/AppImage'
//import AppText from '@/app/components/elements/AppText'
import  NoDataIcon  from '../../../../assets/images/no-data.svg'
import { Flex } from '@chakra-ui/react'
import AppImage from '../../../../AppComponents/AppImage'
import AppText from '../../../../AppComponents/AppText-agent'

const NoData = ({ text = 'No Data', height = '60vh', mt = '-100px' }) => {
  return (
    <Flex justifyContent={'center'} alignItems={'center'} h={height} w={'100%'}>
      <Flex gap={'7px'} mt={mt} flexFlow={'column'} alignItems={'center'}>
        <AppImage
          className="w-full max-w-[160px]"
          src={NoDataIcon}
          alt="no data"
        />
        <AppText
          className="font-[600] text-[20px] text-[#abadaf]"
          text={text}
        />
      </Flex>
    </Flex>
  )
}

export default NoData
