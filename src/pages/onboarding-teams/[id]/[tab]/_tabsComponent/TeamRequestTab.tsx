'use client'
import PageHeader from '@/app/admin/_AdminComponent/PageHeader'
import {
  ADMIN_TEAM_REQUEST_LIST,
  ADMIN_TEAM_REQUEST_LIST_META,
} from '@/app/api-utils'
import ListingTable from '@/app/components/table/ListingTable'
import useGetTableList from '@/app/hooks/useGetTableList'
import useHandlePagination from '@/app/hooks/useHandlePagination'
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import React, { useCallback, useContext, useEffect } from 'react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { useSearchParams } from 'next/navigation'
import {
  ADMIN_TEAM_REQUEST_INDIVIDUAL_PAGE,
  ADMIN_TEAM_REQUEST_LISTING,
} from '@/app/utils/navigation'
import AdminSerachComponent from '@/app/admin/_AdminComponent/AdminSerachComponent'
import AdminFilterRenderer from '@/app/(dashboards)/components/AdminFilterRenderer'
import { useDebounce } from '@/app/hooks/useDebounce'
import { debouncerTimeAdmin } from '@/app/utils/functions/otherFunctions'
import { AdminListFilterContext } from '@/app/provider/AdminListFilterProvider'
import AppText from '@/app/components/elements/AppText'
import { useRouter } from 'next-nprogress-bar'
import moment from 'moment'

const TeamRequestTab = ({
  params,
}: {
  params: { tab: string; id: string }
}) => {
  // @ts-ignore
  const { AppliedTeamsRosterFilterForm, dateRange, setDateRange } = useContext(
    AdminListFilterContext
  )

  const searchParams = useSearchParams()
  const router = useRouter()

  const status: any = searchParams.get('status')
  const requestType = searchParams.get('request_type')
  const sort_by = searchParams.get('sort_by')

  const { register, control, watch, setValue } = AppliedTeamsRosterFilterForm

  useEffect(() => {
    router.push(
      ADMIN_TEAM_REQUEST_LISTING(
        params?.id,
        watch('request_type')?.value,
        watch('status')?.value,
        dateRange?.startDate
          ? moment(dateRange?.startDate).format('YYYY-MM-DD')
          : null,
        dateRange?.endDate
          ? moment(dateRange?.endDate).format('YYYY-MM-DD')
          : null,
        watch('sort_by')?.value
      )
    )
  }, [watch('status'), watch('request_type'), dateRange, watch('sort_by')])
  const searchValue = watch('search')
  const debouncedValue = useDebounce(searchValue, debouncerTimeAdmin)

  const { page, handleMaxPage, max, handlePaginationClick, setPage } =
    useHandlePagination()

  const {
    listData,
    listMeta,
    isLoading,
    selectable,
    totalListCount,
    currentListCount,
    isFetching,
  } = useGetTableList({
    endPoint: ADMIN_TEAM_REQUEST_LIST(params?.id),
    metaEndPoint: ADMIN_TEAM_REQUEST_LIST_META(params?.id),
    handleMax: handleMaxPage,
    page,
    setPage,
    filterObject: {
      request_type: watch('request_type')?.value,
      status: watch('status')?.value,
      search: searchValue || '',
      created_after:
        dateRange?.startDate &&
        moment(dateRange?.startDate).format('YYYY-MM-DD'),
      created_before:
        dateRange?.endDate && moment(dateRange?.endDate).format('YYYY-MM-DD'),
      sort_by: watch('sort_by')?.value,
    },
    deps: [requestType, status, dateRange, sort_by],
    refetchDeps: [debouncedValue],
  })

  const showTextAsTag = {
    approved: 'green',
    pending: 'yellow',
    Rejected: 'red',
    rejected: 'red',
    cancelled: 'vivid-orange',
  }

  const customFunction = useCallback(
    (obj: any) => {
      const act = [
        {
          label: 'View Request',
          onClick: () =>
            //@ts-ignore
            router.push(
              ADMIN_TEAM_REQUEST_INDIVIDUAL_PAGE(params?.id, obj?.id)
            ),
        },
      ]?.filter((f: any) => f?.label)
      return (
        <Menu>
          <MenuButton
            w="fit-content"
            display={obj?.status != 'cancelled' ? 'flex' : 'none'}
            justifyContent={'center'}
            margin={'auto'}
          >
            <HiOutlineDotsHorizontal />
          </MenuButton>
          <MenuList>
            {act?.map((m) => (
              <MenuItem onClick={() => m?.onClick()} key={m?.label}>
                {m?.label}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      )
    },
    [listData]
  )

  const filterOptions = listMeta?.data?.filter_data

  const filterArr = [
    {
      type: 'select',
      filterLabel: 'Sort',
      name: 'sort_by',
      options: [
        {
          id: 'created',
          identity: 'Oldest',
        },
        {
          id: '-created',
          identity: 'Recent',
        },
      ],
    },
    {
      type: 'select',
      filterLabel: 'Status',
      name: 'status',
      options: filterOptions?.status,
    },
    {
      type: 'select',
      filterLabel: 'Request Type',
      name: 'request_type',
      options: filterOptions?.request_type,
    },
    {
      type: 'dob',
    },
  ]

  const handleTabClick = (obj: any) => {
    obj?.status != 'cancelled' &&
      router.push(ADMIN_TEAM_REQUEST_INDIVIDUAL_PAGE(params?.id, obj?.id))
  }

  return (
    <Box>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <PageHeader title="Team Requests" />
      </Flex>
      <Flex mb={'40px'} justifyContent={'space-between'}>
        <Flex gap={'20px'}>
          <AdminSerachComponent
            placeholder="Search by request ID"
            register={register('search')}
          />
          <AdminFilterRenderer
            register={register}
            filterArr={filterArr}
            control={control}
            setValue={setValue}
            watch={watch}
            dateRange={dateRange}
            // @ts-ignore
            setDateRange={setDateRange}
            // reset={reset}
          />
        </Flex>
      </Flex>
      <Box mt={'38px'}>
        <Box className="flex justify-end">
          <AppText
            text={`Count:${currentListCount ? currentListCount : '0'} / ${totalListCount ? totalListCount : '0'} `}
          />
        </Box>
        <ListingTable
          showTextAsTag={showTextAsTag}
          customFunction={customFunction}
          handlePaginationClick={handlePaginationClick}
          max={max}
          tableMeta={listMeta}
          tableData={listData}
          //@ts-ignore
          avatar={['full_name']}
          //@ts-ignore
          relativeTime={['created']}
          selectable={selectable}
          isLoading={isLoading || isFetching}
          forcePage={page - 1}
          handleTabClick={handleTabClick}
        />
      </Box>
    </Box>
  )
}

export default TeamRequestTab
