// import AppText from '@/app/components/elements/AppText'
import { Box } from '@chakra-ui/react'
import AppText from '../../../../AppComponents/AppText-agent'

const PageHeader = ({
  title,
  description,
  className = '',
  wrapperClassName,
}: {
  title: string
  description?: string
  className?: string
  wrapperClassName?: string
}) => {
  return (
    <Box pt="39px" pb="39px" className={`${wrapperClassName}`}>
      <AppText
        className={`!text-[#10295A] text-[30px] font-[600] ${className}`}
      >
        {title}
      </AppText>
      {description && <AppText>{description}</AppText>}
    </Box>
  )
}

export default PageHeader
