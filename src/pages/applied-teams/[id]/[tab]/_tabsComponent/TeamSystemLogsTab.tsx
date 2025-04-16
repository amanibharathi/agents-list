
import {
  Step,
  StepIndicator,
  Stepper,
  StepSeparator,
  StepStatus,
  useSteps,
} from '@chakra-ui/react'
import moment from 'moment'
import React, { useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import makeGetRequest from '../../../../../api/makeGetRequest'
import AdminHeaderWithButtons from '../../../../Auth/AgentComponents/admincompenets/AdminHeaderWithButtons'
import AdminFormWrapper from '../../../../../login/adminlogin/AdminFormWrapper'
import LoaderLayout from '../../../../Auth/AgentComponents/table/LoaderLayout'
import DateRangePicker from '../../../../Auth/AgentComponents/admincompenets/DateRangePicker'
import AppText from '../../../../../AppComponents/AppText-agent'
import AppButton from '../../../../../AppComponents/AppButton-agent'
import { GET_TEAM_ACTIVITY_LOG_LIST } from '../../../../../api-utils'

const TeamSystemLogsTab = ({
  params,
}: {
  params: { tab: string; id: string }
}) => {
  const [dateRange, setDateRange] = useState({})
  const { activeStep } = useSteps({
    index: -1,
  })
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    //@ts-ignore
  } = useInfiniteQuery({
    queryKey: [
      //@ts-ignore
      `${GET_TEAM_ACTIVITY_LOG_LIST}-${dateRange?.startDate}-${dateRange?.endDate}`,
    ],
    queryFn: ({ pageParam = 1 }) =>
      makeGetRequest(GET_TEAM_ACTIVITY_LOG_LIST + `?team=${params?.id}`, {
        page: pageParam,
        start_date:
          dateRange &&
          //@ts-ignore
          dateRange?.startDate &&
          //@ts-ignore
          moment(dateRange?.startDate).format('YYYY-MM-DD'),
        end_date:
          dateRange &&
          //@ts-ignore
          dateRange?.endDate &&
          //@ts-ignore
          moment(dateRange?.endDate).format('YYYY-MM-DD'),
      }),
    initialPageParam: 0,
    getPreviousPageParam: (firstPage: any) =>
      firstPage?.data?.previous ?? undefined,
    getNextPageParam: (lastPage: any) =>
      lastPage?.data?.next?.split('?page=')?.[1] ?? undefined,
  })

  const systemLogs = data?.pages
  const totalCount = data?.pages[0]?.data?.count

  return (
    <div>
      <AdminHeaderWithButtons title={'Activity Logs'} />
      <AdminFormWrapper>
        <LoaderLayout height="18.519vh" isLoading={isLoading}>
          <div className="flex pb-[30px]">
            <DateRangePicker
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
          </div>
          {totalCount !== 0 ? (
            <div className="min-h-[30vh] max-h-[716px] overflow-scroll no-scrollbar">
              <div className="flex flex-col gap-[30px] pt-[30px]">
                <Stepper index={activeStep} orientation="vertical" gap="0">
                  {systemLogs?.map((systemLog: any) => {
                    return systemLog?.data?.results.map(
                      (each: any, index: any) => (
                        <Step style={{ width: '100%' }} key={index}>
                          <StepIndicator bg={'transparent'}>
                            <StepStatus
                              incomplete={
                                <div className="w-[8px] h-[8px] bg-[#2B5CAB] rounded-full"></div>
                              }
                            />
                          </StepIndicator>
                          <div className="flex flex-col gap-[20px] mb-[40px] mt-[10px]">
                            <AppText className="text-[16px] leading-[17px]">
                              {each?.description}
                            </AppText>
                            <AppText className="text-[16px] leading-[17px] !text-[#616876]">
                              {moment(each?.action_time).format(
                                'MMMM Do YYYY, h:mm:ss a'
                              )}
                            </AppText>
                          </div>
                          <StepSeparator className="!bg-[#2B5CAB] separator_custom_class" />
                        </Step>
                      )
                    )
                  })}
                </Stepper>
              </div>
              {hasNextPage && (
                <div className="flex justify-center">
                  <AppButton
                    className=""
                    onClick={fetchNextPage}
                    isLoading={isFetchingNextPage}
                  >
                    See more
                  </AppButton>
                </div>
              )}
            </div>
          ) : (
            <div>
              <AppText className="py-[90px] text-[#808080] text-center font-[600] text-[24px]">
                No Logs!
              </AppText>
            </div>
          )}
        </LoaderLayout>
      </AdminFormWrapper>
    </div>
  )
}

export default TeamSystemLogsTab
