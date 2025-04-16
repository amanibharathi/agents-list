import AppText from '@/app/components/elements/AppText'
import { Flex } from '@chakra-ui/react'
import React, { memo, useCallback } from 'react'
import ShowText from '../../onboarding-agents/[id]/components/ShowText'
import { addCommas } from '@/app/utils/functions/otherFunctions'

const AdminTeamHeaderFinalBox = ({
  state,
  MLS,
  board,
  closedVolumes,
  transactions,
}: {
  state: string
  MLS: string
  board: string
  closedVolumes?: string
  transactions?: string
}) => {
  const getAgentDetail = (
    label: any,
    value: any,
    valueClassName = '',
    truncateText = false
  ) => {
    return (
      <div className="flex items-center gap-[10px] ">
        <AppText
          text={label}
          className="!text-[14px] font-[600] !text-[#010101]"
        />
        <>
          {truncateText ? (
            <ShowText
              maxLength={30}
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
  const data = useCallback(
    () => [
      {
        title: 'Primary State:',
        value: state ?? 'N/A',
      },
      {
        title: 'MLS:',
        value: MLS ?? 'N/A',
      },
      {
        title: 'Board:',
        value: board ?? 'N/A',
      },
      {
        title: 'Closed Volumes:',
        value: closedVolumes ?? 'N/A',
      },
      {
        title: 'Transactions:',
        value: addCommas(transactions?.toString()) ?? '-',
      },
    ],
    [state, MLS, board, closedVolumes, transactions]
  )
  return (
    <Flex
      w={'300px'}
      px="12px"
      py="12.5px"
      bg={'#EDF3FF'}
      borderRadius={'8px'}
      gap={'10px'}
      flexFlow={'column'}
      maxH={'170px'}
    >
      {data()?.map((m) => {
        return getAgentDetail(m?.title, m?.value, '', true)
      })}
    </Flex>
  )
}

export default memo(AdminTeamHeaderFinalBox)
