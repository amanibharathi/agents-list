

import AppText from "../../AppComponents/AppText-agent"

const LoginBottomLink = ({
  text,
  linkText,
  onClick,
}: {
  text: string
  linkText: string
  onClick: () => void
}) => {
  return (
    <div className="gap-[9px] flex">
      <AppText
        className="text-[12px] md:text-[14px] !text-[#000000]"
        text={text}
      />
      <AppText
        className="!text-[#10295A] text-[12px] md:text-[14px] underline cursor-pointer"
        text={linkText}
        onClick={onClick}
      />
    </div>
  )
}

export default LoginBottomLink
