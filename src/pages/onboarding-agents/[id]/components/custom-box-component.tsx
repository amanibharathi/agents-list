
import AppLink from '../../../../AppComponents/AppLink'
import AppText from '../../../../AppComponents/AppText-agent'

interface BoxDataInterface {
  boxData: {
    title: string
    description: string
    link?: string
  }
}

const CustomBoxComponent = ({ boxData }: BoxDataInterface) => {
  return (
    <div className="flex flex-col gap-[10px]">
      <AppText className="text-[16px] md:text-lg !text-black font-medium leading-4">
        {boxData.title}
      </AppText>
      <AppText
        className="text-[14px] md:text-[16px] !text-[#858585]"
        type="span"
      >
        {boxData.description}{' '}
        <AppLink href={boxData?.link ?? ''} target="_blank">
          <AppText
            type="span"
            className="text-[14px] md:text-[16px] !text-[#247AFF]"
          >
            {boxData?.link}
          </AppText>
        </AppLink>
      </AppText>
    </div>
  )
}

export default CustomBoxComponent
