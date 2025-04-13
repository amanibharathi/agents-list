/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, createElement } from 'react'

function AppText({
  type = 'p',
  className = '',
  onClick,
  text,
  style,
  textStroke,
  children,
  truncate,
  onMouseEnter,
  onMouseLeave,
}: {
  type?: string
  className?: string
  children?: ReactNode
  text?: string | ReactNode
  style?: React.CSSProperties
  onClick?: () => void
  textStroke?: { color: string } | boolean
  truncate?: number | null
  onMouseEnter?: any
  onMouseLeave?: any
}) {
  const textStrokeStyle = textStroke
    ? {
        '-webkit-text-stroke':
          // @ts-ignore
          '1px ' + 'black',
      }
    : {}

  let truncatedText = null
  if (truncate && text) {
    // @ts-ignore
    const text_length = text.length
    truncatedText =
      // @ts-ignore
      text.slice(0, truncate) + (text_length > truncate ? '...' : '')
  }

  return createElement(
    type,
    {
      className: className + ' text-[#333333]',
      style: {
        ...textStrokeStyle,
        ...style,
      },
      onClick: onClick,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
    },
    truncatedText || text || children
  )
}

export default AppText
//NEED to replace apptext with appsemantictext , handle the font size for p basically it's 16 but only in privacy section its 18
