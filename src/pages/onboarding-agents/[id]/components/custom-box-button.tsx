
import { useCallback } from 'react'
import ShowText from './ShowText'
import AppButton from '../../../../AppComponents/AppButton-agent'
import AppText from '../../../../AppComponents/AppText-agent'
import { addCommas } from '../../../../utils/functions/commonFunctions'
interface CustomBoxButtonInterface {
  headerText: string
  buttonLabel?: string
  onClick?: () => void
  content: string
  wrapperClassName?: string
  contentOnClick?: any
  teamLead?: string
  teamAdmin?: string
  isTeamPage?: boolean
  isAppliedTeams?: boolean
  closedVolumes?: any
  transactions?: any
}

export default function CustomBoxButton({
  headerText,
  buttonLabel,
  onClick,
  content,
  wrapperClassName = '',
  contentOnClick,
  teamLead,
  teamAdmin,
  isTeamPage = false,
  isAppliedTeams = false,
  closedVolumes,
  transactions,
}: CustomBoxButtonInterface) {
  const data = useCallback(
    () => [
      {
        title: 'Closed Volumes:',
        value: closedVolumes ?? 'N/A',
      },
      {
        title: 'Transactions:',
        value: addCommas(transactions?.toString()) ?? '-',
      },
    ],
    [closedVolumes, transactions]
  )
  const getAgentDetail = (
    label: any,
    value: any,
    valueClassName = '',
    truncateText = false,
    maxlength = 30
  ) => {
    return (
      <div className="flex items-center gap-[20px] ">
        <AppText
          text={label}
          className="!text-[14px] font-[600] !text-[#010101] whitespace-nowrap"
        />
        <>
          {truncateText ? (
            <ShowText
              maxLength={maxlength}
              textClassName={`!text-[14px] !leading-[21px] !text-[#000000] !font-[400] ${valueClassName}`}
              text={value || 'N/A'}
            />
          ) : (
            <AppText
              text={value || 'N/A'}
              className={` '!text-[#000000] !text-[14px] capitalize !leading-[21px] !font-[400] whitespace-nowrap ${valueClassName}`}
            />
          )}
        </>
      </div>
    )
  }
  return (
    <div
      className={`flex flex-col ${isAppliedTeams ? 'gap-[10px]' : 'gap-[20px]'} p-[12px] max-h-[170px] ${isTeamPage ? '!w-[400px]' : ''} rounded-[10px] bg-[#EDF3FF] ${wrapperClassName}`}
    >
      {isTeamPage ? (
        <>
          {getAgentDetail('Team Lead:', teamLead ?? '-', '', true)}
          {getAgentDetail('Team Admin:', teamAdmin ?? '-', '', true)}
        </>
      ) : null}

      {!isAppliedTeams ? (
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <AppText
              className="text-sm cursor-pointer capitalize"
              onClick={() => {
                contentOnClick && contentOnClick()
              }}
            >
              {getAgentDetail(headerText, content ?? '-', '', true, 25)}
            </AppText>
          </div>
          {buttonLabel ? (
            <AppButton
              className="!text-[#10295A] border border-[#CDCDCD] rounded !py-[10px] !px-[10px] !pb-[25px] !text-[12px] bg-white max-h-[27px] whitespace-nowrap"
              variant="transparent"
              label={buttonLabel}
              onClick={onClick}
            />
          ) : null}
        </div>
      ) : (
        data()?.map((m) => {
          return getAgentDetail(m?.title, m?.value, '', true)
        })
      )}
    </div>
  )
}
