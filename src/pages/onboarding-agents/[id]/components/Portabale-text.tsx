/**
 * This component uses Portable Text to render a post body.
 * 
 * Portable Text Docs:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 */

import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from '@portabletext/react' // <- Changed from 'next-sanity' to '@portabletext/react'
import AppLink from '../../../../AppComponents/AppLink'
import AppText from '../../../../AppComponents/AppText-agent'

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string
  value: PortableTextBlock[]
}) {
  const components: PortableTextComponents = {
    block: {
      h5: ({ children }) => (
        <h5 className="mb-2 text-sm font-semibold">{children}</h5>
      ),
      h6: ({ children }) => (
        <h6 className="mb-1 text-xs font-semibold">{children}</h6>
      ),
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <AppLink href={value?.href} target="_blank">
            <AppText
              type="span"
              className="text-[14px] md:text-[16px] !text-[#247AFF]"
            >
              {children}
            </AppText>
          </AppLink>
        )
      },
    },
  }

  return (
    <div className={['prose', className].filter(Boolean).join(' ')}>
      <PortableText components={components} value={value} />
    </div>
  )
}
