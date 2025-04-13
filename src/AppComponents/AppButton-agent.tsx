import { Spinner } from '@chakra-ui/react'
import classNames from 'classnames'
import  { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

const VARIANT_DEFAULT = 'rounded-md bg-[#10295A] text-white py-2 px-6'

function AppButton({
  label,
  icon,
  className,
  onClick,
  children,
  variant,
  isLoading = false,
  disabled = false,
  spinnerColor = 'white',
  link,
  iconPosition = 'left',
  type = 'button',
  ...props
}: {
  label?: string
  className?: string
  onClick?: () => void
  children?: ReactNode
  variant?: 'outline' | 'simpleBorder' | 'basic' | 'transparent' | 'rate'
  icon?: ReactNode
  isLoading?: boolean
  disabled?: boolean
  spinnerColor?: string
  link?: string
  type?: 'button' | 'submit' | 'reset' | undefined
  iconPosition?: 'left' | 'right'
}) {
  const navigate = useNavigate()
  const identity = label || children

  const handleClick = () => {
    if (link) {
      navigate(link)
    } else if (onClick) {
      onClick()
    }
  }

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={classNames(
        'outline-none app-button',
        className
          ? {
              [className]: true,
            }
          : '',
        {
          [variant ? variant : VARIANT_DEFAULT]: true,
          [icon ? 'flex gap-2 items-center justify-center' : '']: true,
        }
      )}
      onClick={handleClick}
      {...props}
    >
      {isLoading ? (
        <Spinner className="mb-[-5px]" color={spinnerColor} />
      ) : icon ? (
        iconPosition === 'left' ? (
          <>
            {icon}
            {identity}
          </>
        ) : (
          <>
            {identity}
            {icon}
          </>
        )
      ) : (
        identity
      )}
    </button>
  )
}

export default AppButton
