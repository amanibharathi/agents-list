
import { ReactNode } from 'react'
import AppButton from '../../../../AppComponents/AppButton-agent'
import AppText from '../../../../AppComponents/AppText-agent'
export interface ButtonDataInterFace {
  buttonClassName?: string
  label: string
  disabled?: any
  variant?:
    | 'outline'
    | 'simpleBorder'
    | 'basic'
    | 'transparent'
    | 'rate'
    | undefined
  icon?: ReactNode
  onClick: () => void
}
interface CustomContendHeaderInterface {
  heading: string
  buttonData?: ButtonDataInterFace[]
  wrapperClassName?: string
  buttonWrapperClassName?: string
}

export default function CustomContendHeader({
  heading,
  buttonData = [],
  wrapperClassName = '',
  buttonWrapperClassName = '',
}: CustomContendHeaderInterface) {
  return (
    <div className={`flex justify-between ${wrapperClassName}`}>
      <AppText className="text-2xl !text-[#10295A] font-semibold">
        {heading}
      </AppText>
      <div className={`flex gap-[10px] ${buttonWrapperClassName}`}>
        {buttonData?.map((each, index) => (
          <AppButton
            key={index}
            className={each?.buttonClassName}
            label={each?.label}
            variant={each?.variant}
            icon={each?.icon}
            onClick={each?.onClick}
            disabled={each?.disabled}
          />
        ))}
      </div>
    </div>
  )
}
