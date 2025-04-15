
// import AppLink from '../elements/AppLink'
import AppLink from '../../../../../AppComponents/AppLink';
import AppText from '../../../../../AppComponents/AppText-agent';
// import AppText from '../elements/AppText'

function SecondaryNav({
  navData,
  urlPath,
  wrapperClassName = '',
  isSelectedClassName = '',
  tabClassName = '',
  minWidth = '',
  isAgentDashboard,
  nonSelectedClassName = '',
  tabLinkClassName = '',
}: {
  navData: { id: string; label: string; link: string; count?: any }[]
  urlPath: any
  wrapperClassName?: string
  isSelectedClassName?: string
  tabClassName?: string
  minWidth?: string
  isAgentDashboard?: boolean
  nonSelectedClassName?: string
  tabLinkClassName?: string
}) {
  return (
    <ul
      className={`secondaryNavbar max-h-[56px] flex md:items-center 
     overflow-y-hidden overflow-scroll no-scrollbar max-w-[340px] md:max-w-[100%]
    md:min-h-[48px] md:w-full ${wrapperClassName}`}
    >
      {navData.map((each: any) => {
        let isSelected = false

        if (each?.includes) isSelected = urlPath?.includes(each?.includes)
        else isSelected = urlPath === each?.link
        return (
          <AppLink
            key={each.id}
            href={each.link}
            className={` ${isAgentDashboard ? 'pr-[24px]' : 'md:py-3.5 px-[21px]'} min-h-[56px] md:min-h-[48px] text-center  ${minWidth}  ${isSelected ? (isAgentDashboard ? '' : 'border-b-2 border-[#10295A]') : ''} ${each?.count > 0 ? 'flex items-center gap-[5px]' : ''} ${tabLinkClassName}`}
          >
            <AppText
              type="li"
              className={`text-[14px] whitespace-nowrap md:my-[1px] ${isAgentDashboard ? 'my-0' : 'my-[20px]'} ${tabClassName} ${isSelected ? `font-semibold text-[#10295A] ${isSelectedClassName}` : `text-[#585858] ${nonSelectedClassName}`}`}
            >
              {each.label}
            </AppText>
            {each.count > 0 && (
              <AppText className="text-[14px] whitespace-nowrap md:my-[1px] !text-white !bg-[#2C4B7B] rounded-full h-[7px] w-[7px]  m-auto" />
            )}
          </AppLink>
        )
      })}
    </ul>
  )
}

export default SecondaryNav
