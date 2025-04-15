import React, { CSSProperties } from 'react'
import { Link } from 'react-router-dom'

function AppLink({
  children,
  onClick,
  href = '#',
  target = '',
  className = '',
  style = {},
  id,
}: {
  id?: string
  onClick?: () => void
  children: React.ReactNode
  href: string
  target?: string
  className?: string
  style?: CSSProperties
}) {
  const isExternal = href.startsWith('http')

  if (isExternal) {
    return (
      <a
        id={id}
        href={href}
        target={target || '_blank'}
        className={className}
        style={style}
        onClick={onClick}
        rel="noopener noreferrer"
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      id={id}
      to={href}
      className={className}
      style={style}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

export default AppLink
