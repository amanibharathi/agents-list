
import { GoArrowUpRight } from 'react-icons/go'
import AppImage from '../../../AppComponents/AppImage'
import AppText from '../../../AppComponents/AppText-agent'
import AppButton from '../../../AppComponents/AppButton-agent'
import AppLink from '../../../AppComponents/AppLink'
// import {
//   AGENT_ONBOARD_SIGNUP_SPONSOR,
//   MAKE_ABSOLUTE_URL,
// } from '@/app/utils/navigation'

export const sponsorLink = (id: string, type: 'agent' | 'team') => {
  const env = import.meta.env.VITE_PUBLIC_NODE_ENV
  let base = ''
  const restUrl = `/real-estate-agents/join/onboard/signup?sponsor=${id}&referraltype=${type}`
  if (env == 'production') base = `https://join.realtyofamerica.com`
  else if (env == 'staging')
    base = `https://staging-v2.join.realtyofamerica.com`
  else base = `http://join.localhost:3000`

  return base + restUrl
}

export default function JoinRoaSection({ data }: any) {
  // Have hardcoded the host because of a issue in SSR

  return (
    <div className="image-container relative select-none" id="join_roa_section">
      <AppImage
        src={'/assets/join-bg-img.png'}
        alt="join_image"
        height={600}
        width={1440}
        className="relative z-[0] object-cover w-[100%] h-[346px] md:w-[100%] md:h-[363px] lg:h-[600px] select-none"
        priority={true}
        fetchPriority="high"
      />
      <div className="absolute w-full top-[0] z-[2]">
        <div className="website-container py-[21px] px-[20px] md:px-[0px]">
          <div className="mt-[30px] md:mt-[50px] lg:mt-[80px] flex flex-col gap-[6px] md:gap-[14px] lg:gap-[24px] md:max-w-[60%] justify-center md:justify-start items-center md:items-start ">
            <div className="flex flex-col">
              <AppText className="text-[#FFFFFF] xl:text-[52px] xl:leading-[62px] md:text-[34px] md:leading-[44px] text-[24px] leading-[34px] font-bold text-center md:text-left">
                Already an Agent?
              </AppText>
              <AppText className="text-[#FFFFFF] xl:text-[52px] xl:leading-[62px] md:text-[34px] md:leading-[44px] text-[24px] leading-[34px] font-bold text-center md:text-left md:whitespace-nowrap">
                Join me at Realty of America.
              </AppText>
            </div>
            <div className="w-[94px] h-[5px] rounded-full md:w-[172px] bg-[#1A9175]"></div>
            <AppText
              className="text-[#FFFFFF] xl:text-[18px] xl:leading-[28px] text-[15px] leading-[24px] md:leading-[28px] text-center md:text-left"
              text={
                "If you're looking for a brokerage that values your growth and success, Realty of America is where you belong!"
              }
            />
            <div className="w-full md:w-[unset]">
              <AppLink
                target="_blank"
                href={sponsorLink(data?.agent_detail?.referral_code, 'agent')}
              >
                <AppButton
                  className="bg-[#DB1264] w-full md:w-[unset] !text-[15px] !text-[#ffffff] !rounded-[12px] !px-[28px] !py-[14px] mt-[8px] font-[700]"
                  label="Start Your ROA Journey"
                  icon={<GoArrowUpRight fontSize={'15px'} />}
                  iconPosition="right"
                />
              </AppLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
