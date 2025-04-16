import AppText from '@/app/components/elements/AppText'
import { Box } from '@chakra-ui/react'
import React from 'react'

export const ColorTags = ({
  text,
  background,
  textColor,
  className = '',
  fontClassName = '',
}: {
  text: string
  background: string
  textColor: string
  className?: string
  fontClassName?: string
}) => {
  return (
    <Box
      style={{ backgroundColor: background }}
      className={`bg-[${background}] py-[6px] px-[12px] rounded-full ${className} inline-block max-w-fit`}
    >
      <AppText
        style={{ color: textColor }}
        className={`!text-[${textColor}] text-[16px] ${fontClassName} font-[500] capitalize`}
        text={text}
      />
    </Box>
  )
}
