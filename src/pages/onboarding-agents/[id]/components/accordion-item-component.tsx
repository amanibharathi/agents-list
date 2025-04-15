
import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'
import AppText from '../../../../AppComponents/AppText-agent'

interface AccordionItemComponentInterface {
  title: string
  icon?: ReactNode
  status?: string
}

const AccordionItemComponent = ({
  title,
  icon,
  status = '',
}: AccordionItemComponentInterface) => {
  const getStatusClass = (status: string) => {
    if (status === 'Approved') return 'bg-[#2FB3441A] !text-[#2FB344]'
    else if (status === 'Waiting for Approval')
      return 'bg-[#FF98001A] !text-[#FF9800]'
    return ''
  }
  return (
    <Box
      as="span"
      flex="1"
      textAlign="left"
      className="flex items-center justify-between"
    >
      <div className="flex w-[500px] j">
        <AppText className="text-2xl font-medium">{title}</AppText>
        {status && (
          <AppText
            className={`text-lg px-[18px] py-[6px] font-medium rounded-[50px] ${getStatusClass(status)}`}
          >
            {status}
          </AppText>
        )}
      </div>
      {icon ? (
        <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-[#E6E7E9] mr-[20px]">
          {icon}
        </div>
      ) : (
        ''
      )}
    </Box>
  )
}

export default AccordionItemComponent
