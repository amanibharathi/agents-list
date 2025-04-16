
import  {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react'
// import AppButton from '@/app/components/elements/AppButton'
// import AdminFilterRenderer from '@/app/(dashboards)/components/AdminFilterRenderer'
// import { useDebounce } from '@/app/hooks/useDebounce'
import { LuFileInput } from 'react-icons/lu'
import { useNavigate,  useSearchParams } from 'react-router-dom'
// import useHandleExportData from '@/app/hooks/admin/useHandleExportData'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
// import AdminContainer from '@/app/admin/_AdminComponent/AdminContainer'
// import AdminHeaderWithButtons from '@/app/admin/_AdminComponent/AdminHeaderWithButtons'
// import AdminSerachComponent from '@/app/admin/_AdminComponent/AdminSerachComponent'
// import AdminBreadcrumbs from '@/app/admin/_AdminComponent/AdminBreadcrumbs/AdminBreadcrumbs'
import { GoUpload } from 'react-icons/go'
import DashIconTotalAgents  from '../../../assets/dashboard-icon/total-agents.svg'


// import { MdOutlineAddCircleOutline } from 'react-icons/md'
// import makeGetRequest from '@/app/utils/api/makeGetRequest'
import { useMutation, useQuery } from 'react-query'
// import { AdminListFilterContext } from '@/app/provider/AdminListFilterProvider'
// import AppText from '@/app/components/elements/AppText'
import ConfirmDeleteTeamModal from './ConfirmDeleteTeam'
import toast from 'react-hot-toast'
import useHandlePagination from '../../../utils/hooks/useHandlePagination'
import useGetTableList from '../../../utils/hooks/useGetTableList'
import { ADMIN_AGENT_STATE_LIST,ADMIN_TEAM_CUD,
  GET_ASSIGN_TEAM_IN_ADMIN,
  GET_ASSIGN_TEAM_META, } from '../../../api-utils'
import ListingTable from '../../Auth/AgentComponents/table/ListingTable'
import { debouncerTimeAdmin,getFirstErrorMessage, } from '../../../utils/functions/commonFunctions'
import AppButton from '../../../AppComponents/AppButton-agent'
import AdminFilterRenderer from '../../Auth/AgentComponents/admincompenets/AdminFilterRenderer'
import { useDebounce } from '../../../utils/hooks/useDebounce'
import { MAKE_ADMIN_APPLIED_TEAM_DETAIL_TAB,MAKE_APPLIED_TEAMS_LIST_PAGE, } from '../../Auth/AgentComponents/navigation/urls'
import useHandleExportData from '../../../utils/hooks/useHandleExportData'
import AdminContainer from '../../../login/adminlogin/AdminContainer'
import AdminSerachComponent from '../../../login/adminlogin/AdminSerachComponent'
import AdminBreadcrumbs from '../../Auth/AgentComponents/admincompenets/AdminBreadcrumbs'
import DashboardCardStatsList, { IDashboardlistData } from '../../../Components/DashboardCardStatsList'
import AdminHeaderWithButtons from '../../../login/adminlogin/AdminHeaderWithButtons'
import makeGetRequest from '../../../api/makeGetRequest'
import { AdminListFilterContext } from '../../Auth/AgentComponents/admincompenets/AdminListFilterProvider'
import AppText from '../../../AppComponents/AppText-agent'
import makePatchRequest from '../../../api/makePatchRequest'

const AppliedTeams = () => {
  const [team, setTeam] = useState({})
  // @ts-ignore
  const { AppliedTeamsFilterForm } = useContext(AdminListFilterContext)

  const { register, control, watch, setValue } = AppliedTeamsFilterForm
  const router = useNavigate()
  const searchValue = watch('search')
  const debouncedValue = useDebounce(searchValue, debouncerTimeAdmin)
  const { page, handleMaxPage, max, handlePaginationClick, setPage } =
    useHandlePagination()

  const breadcrumbs = useMemo(
    () => [
      {
        text: 'Agents',
      },
      {
        text: 'Applied Teams',
      },
    ],
    []
  )

  const [searchParams] = useSearchParams()

  const agent_type: any = searchParams.get('agent_type')
  const state = searchParams.get('state')
  const mls = searchParams.get('mls')
  const status = searchParams.get('status')
  const sort_by = searchParams.get('sort_by')

  useEffect(() => {
    router(
      MAKE_APPLIED_TEAMS_LIST_PAGE(
        watch('agent_type')?.value,
        watch('state')?.value,
        watch('mls')?.value,
        watch('status')?.value,
        watch('sort_by')?.value
      )
    )
  }, [
    watch('agent_type')?.value,
    watch('state')?.value,
    watch('mls')?.value,
    watch('status')?.value,
    watch('sort_by')?.value,
  ])

  const {
    listData,
    listMeta,
    isLoading,
    selectable,
    refetch,
    totalListCount,
    currentListCount,
  } = useGetTableList({
    endPoint: GET_ASSIGN_TEAM_IN_ADMIN() + `?applied_teams=True`,
    metaEndPoint: GET_ASSIGN_TEAM_META(true),
    handleMax: handleMaxPage,
    page,
    setPage,
    filterObject: {
      agent_type: watch('agent_type')?.value,
      state: watch('state')?.value,
      mls: watch('mls')?.value,
      status: watch('status')?.value,
      search: searchValue || '',
      sort_by: watch('sort_by')?.value,
    },
    // @ts-ignore
    deps: [
      agent_type,
      state,
      mls,
      status,
      sort_by,
      // watch('agent_type'),
      // watch('state'),
      // watch('mls'),
      // watch('status'),
      // watch('sort_by'),
    ],
    refetchDeps: [debouncedValue],
  })

  const { isLoading: exportDataIsLoading, generateData } = useHandleExportData()

  const filterOptions = listMeta?.data?.filter_data

  const sortByOption = listMeta?.data?.sort_by

  const { data: agentsStateData } = useQuery([ADMIN_AGENT_STATE_LIST], () =>
    makeGetRequest(ADMIN_AGENT_STATE_LIST)
  )

  const listStateData = agentsStateData?.data?.results ?? []

  const showTextAsTag = {
    approved: 'green',
    pending: 'yellow',
    rejected: 'red',
  }

  const filterArr = [
    {
      type: 'select',
      filterLabel: 'Status',
      name: 'status',
      options: filterOptions?.status,
    },
    {
      type: 'select',
      filterLabel: 'State',
      name: 'state',
      options: listStateData,
    },
    {
      type: 'select',
      filterLabel: 'Sort by',
      name: 'sort_by',
      options: sortByOption,
    },
    // {
    //   type: 'dateRange',
    //   filterLabel: 'Date Range',
    //   name: 'dateRange',
    // },
  ]

  const cardListData: IDashboardlistData[] = useMemo(() => {
    return [
      {
        title: 'Total Teams',
        value: listMeta?.data?.list_count_meta?.total_teams || '0',
        icon: DashIconTotalAgents,
        link: '',
      },
      {
        title: 'Approved Teams',
        value: listMeta?.data?.list_count_meta?.approved_teams || '0',
        icon: DashIconTotalAgents,
        link: '',
      },
      {
        title: 'Waiting for Approval',
        value: listMeta?.data?.list_count_meta?.pending_teams || '0',
        icon: DashIconTotalAgents,
        link: '',
      },
      {
        title: 'Rejected',
        value: listMeta?.data?.list_count_meta?.rejected_teams || '0',
        icon: DashIconTotalAgents,
        link: '',
      },
    ]
  }, [listMeta])

  const {
    isOpen: isDeleteOpen,
    onClose: onDeleteClose,
    onOpen: onDeleteOpen,
  } = useDisclosure()

  const { mutate: approveOrRejectMutate, isLoading: approveOrRejectLoading } =
    //@ts-ignore
    useMutation((body) => makePatchRequest(ADMIN_TEAM_CUD(team?.id), body), {
      onSuccess: (res) => {
        toast.success(`Team ${res?.data?.status} successfully`)
        refetch()
        onDeleteClose()
      },
      onError: (err: any) => {
        //@ts-ignore
        const errMsg = getFirstErrorMessage(err?.response?.data?.data)
        //@ts-ignore
        toast.error(errMsg)
      },
    })

  const customFunction = useCallback(
    (obj: any) => {
      const act = [
        {
          label: 'View Team',
          onClick: () =>
            //@ts-ignore
            router(
              MAKE_ADMIN_APPLIED_TEAM_DETAIL_TAB(obj?.id, 'team-details')
            ),
        },
        obj?.status == 'pending'
          ? {
              label: 'Reject Team',
              onClick: () => {
                setTeam(obj)
                onDeleteOpen()
              },
            }
          : {
              label: 'hide',
              onClick: () => {
                setTeam(obj)
                onDeleteOpen()
              },
            },
      ]?.filter((f: any) => f?.label !== 'hide')
      return (
        <Menu>
          <MenuButton
            w="fit-content"
            display={'flex'}
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

  const handleTabClick = (obj: any) => {
    router(MAKE_ADMIN_APPLIED_TEAM_DETAIL_TAB(obj?.id, 'team-details'))
  }

  return (
    <AdminContainer>
      <AdminBreadcrumbs route={breadcrumbs} />
      <AdminHeaderWithButtons
        title={'Applied Teams'}
        // primaryBtnText={'Create new Team'}
        // primaryBtnIcon={<MdOutlineAddCircleOutline />}
        // primaryBtnOnClick={() => router.push(ADMIN_TEAM_CREATION_PAGE)}
      />
      <Flex width={'100%'} flexDirection={'column'} mb={'30px'}>
        <DashboardCardStatsList listData={cardListData} />
      </Flex>
      <Flex mb={'40px'} justifyContent={'space-between'}>
        <Flex gap={'20px'}>
          <AdminSerachComponent
            placeholder="Search by name, phone or email"
            register={register('search')}
          />
          <AdminFilterRenderer
            register={register}
            filterArr={filterArr}
            control={control}
            setValue={setValue}
            watch={watch}
            // reset={reset}
          />
        </Flex>
        <Flex gap={'20px'} className="self-start">
          <AppButton 
            icon={<GoUpload />}
            className="whitespace-nowrap py-[7px] font-[400] text-[14px]"
            variant="outline"
          >
            Bulk Upload
          </AppButton>
          <AppButton
            isLoading={exportDataIsLoading}
            onClick={() => generateData({ type: 'agent' })}
            className="whitespace-nowrap py-[7px] font-[400] text-[14px]"
            icon={<LuFileInput />}
          >
            Export Data
          </AppButton>
        </Flex>
      </Flex>
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
        isLoading={isLoading}
        forcePage={page - 1}
        handleTabClick={handleTabClick}
      />
      <ConfirmDeleteTeamModal
        headerText="Are you sure want to reject team?"
        deleteMutate={approveOrRejectMutate}
        isLoading={approveOrRejectLoading}
        onClose={onDeleteClose}
        isOpen={isDeleteOpen}
        btnLabel="reject"
      />
    </AdminContainer>
  )
}

export default AppliedTeams
