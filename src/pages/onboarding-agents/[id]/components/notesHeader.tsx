//import AppText from '@/app/components/elements/AppText'
import { Flex } from '@chakra-ui/react'
import moment from 'moment'
import AppText from '../../../../AppComponents/AppText-agent'

const NotesHeader = ({
  created,
  title,
}: {
  created: string
  title: any
  readOnly?: boolean
}) => {
  return (
    <Flex alignItems={'center'} justifyContent={'space-between'}>
      <Flex alignItems={'center'} gap={'15px'} className="max-w-[100%] ">
        <Flex gap={'6px'} alignItems={'center'} className="max-w-[80%] ">
          <AppText className="font-[600] text-[#332828] " text={title} />
        </Flex>
        <AppText
          className="text-[#757575] text-[14px]"
          text={moment(created).format('MMMM Do YYYY, h:mm:ss a')}
        />
      </Flex>
    </Flex>
  )
}

export default NotesHeader
