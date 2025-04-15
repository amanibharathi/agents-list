//import { capitalizeFirstLetter } from '@/app/utils/constants/resourceSectionData'
import { Text, Tooltip } from '@chakra-ui/react'
import { useState } from 'react'
import { capitalizeFirstLetter } from '../../../Auth/AgentComponents/table/resourceSectionData'

const ShowText = ({
  text,
  maxLength = 50,
  textClassName = '',
}: {
  text: string
  maxLength?: number
  textClassName?: string
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  const isTextTruncated = text?.length > maxLength
  const displayText = isTextTruncated ? text?.slice(0, maxLength) + '...' : text

  return (
    <Tooltip
      label={isTextTruncated ? capitalizeFirstLetter(text) : undefined}
      isOpen={isHovered && isTextTruncated}
      placement="bottom"
      hasArrow
      bg="white"
      color="gray.700"
      fontSize="sm"
      maxW={'500px'}
    >
      <Text
        className={`text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer ${textClassName}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {displayText}
      </Text>
    </Tooltip>
  )
}

export default ShowText
