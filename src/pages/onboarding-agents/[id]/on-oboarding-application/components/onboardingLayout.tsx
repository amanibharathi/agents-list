import { Image, Text } from '@chakra-ui/react'

export default function OnboardingLayout({ children, imageSrc, title }: any) {
  return (
    <div className="flex border-[#CDCDCD] border-[1px] rounded-[20px] bg-white px-[30px] py-[40px]">
      <div className="flex flex-col gap-[20px]">
        <div className="flex gap-[15px] items-center">
          <Image
            className="w-[30px] h-[30px]"
            alt=""
            src={imageSrc} //"/license-frame.png"
          />
          <Text className="text-[20px] leading-[25px] font-[600] text-[#10295A]">
            {title}
          </Text>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
