// import AppText from '@/app/components/elements/AppText'
import { Box, Flex } from '@chakra-ui/react'
import  { ReactNode, useEffect, useRef } from 'react'
import AppText from '../../../../AppComponents/AppText-agent'

const NotesBody = ({
  subject,
  title,
  desc,
  extraComponent,
  type,
  isExpand = false,
  isRemoveExpand = false,
  setIsRemoveExpand,
}: {
  subject?: string
  title?: string
  desc?: string
  extraComponent?: ReactNode
  type?: string
  isExpand?: boolean
  setIsRemoveExpand?: any
  isRemoveExpand?: boolean
}) => {
  useEffect(() => {
    if (contentRef.current) {
      //@ts-ignore
      const contentHeight = contentRef?.current?.clientHeight
      setIsRemoveExpand && setIsRemoveExpand(contentHeight > 50)
    }
  }, [])
  const contentRef = useRef(null)
  return (
    <Box>
      <Flex justifyContent={'space-between'}>
        <Flex flexFlow={'column'} gap={'9px'}>
          {(subject ?? title) ? (
            <Flex gap={'2px'}>
              {(subject ?? title) && (
                <AppText
                  className="font-[600]"
                  text={type === 'call' ? 'Title: ' : 'Subject: '}
                />
              )}
              <AppText text={subject || title} />
            </Flex>
          ) : null}
          {desc && (
            <p
              dangerouslySetInnerHTML={{ __html: desc || '' }}
              ref={contentRef}
              className={`text-[#333333] text-[16px] text-wrap w-[95ch] ${isExpand ? '' : isRemoveExpand ? 'h-[50px] overflow-hidden' : ''} `}
            />
          )}
        </Flex>
        {extraComponent ? extraComponent : null}
      </Flex>
    </Box>
  )
}

export default NotesBody
