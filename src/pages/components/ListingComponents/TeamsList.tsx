
import  {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import useHandlePagination from '../../../utils/hooks/useHandlePagination'
import useGetTableList from '../../../utils/hooks/useGetTableList'
import {
  ADMIN_AGENT_STATE_LIST,
  // ADMIN_AGENT_TEAM_CREATE,
  ADMIN_TEAM_CUD,
  GET_ASSIGN_TEAM_IN_ADMIN,
  GET_ASSIGN_TEAM_META,
} from '../../../api-utils'
import ListingTable from '../../Auth/AgentComponents/table/ListingTable'
import { debouncerTimeAdmin,getFirstErrorMessage } from '../../../utils/functions/commonFunctions'
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react'
import AppButton from '../../../AppComponents/AppButton-agent'
import AdminFilterRenderer from '../../Auth/AgentComponents/admincompenets/AdminFilterRenderer'
import { useDebounce } from '../../../utils/hooks/useDebounce'
import { LuFileInput } from 'react-icons/lu'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  ADMIN_TEAM_CREATION_PAGE,
  MAKE_ACTIVE_TEAMS_LIST_PAGE,
  MAKE_ADMIN_TEAM_DETAIL_TAB,
} from '../../Auth/AgentComponents/navigation/urls'
import useHandleExportData from '../../../utils/hooks/useHandleExportData'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import AdminContainer from '../../../login/adminlogin/AdminContainer'
import AdminSerachComponent from '../../../login/adminlogin/AdminSerachComponent'
import AdminBreadcrumbs from '../../Auth/AgentComponents/admincompenets/AdminBreadcrumbs'
import AdminHeaderWithButtons from '../../../login/adminlogin/AdminHeaderWithButtons'
import { GoUpload } from 'react-icons/go'
// import CkAppModal from '@/app/components/modal/AppModal'
import makeGetRequest from '../../../api/makeGetRequest'
import { useMutation, useQuery } from 'react-query'
import { AdminListFilterContext } from '../../Auth/AgentComponents/admincompenets/AdminListFilterProvider'
import AppText from '../../../AppComponents/AppText-agent'
// import AssignAgentToBrokerageModal from '@/app/admin/_AdminComponent/modal/AssignAgentToBrokerageModal'
import toast from 'react-hot-toast'
import ConfirmDeleteTeamModal from './ConfirmDeleteTeam'
import makeDeleteRequest from '../../../api/makeDeleteRequest'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import DashboardCardStatsList, { IDashboardlistData } from '../../../Components/DashboardCardStatsList'
import DashIconTotalAgents  from '../../../assets/dashboard-icon/total-agents.svg'
import CkAppModal from '../../Auth/AgentComponents/admincompenets/AppModal'
import AssignAgentToBrokerageModal from '../../Auth/AgentComponents/admincompenets/AssignAgentToBrokerageModal'

const TeamsList = () => {
  const [team, setTeam] = useState({})
  // @ts-ignore
  const { TeamListFilterForm } = useContext(AdminListFilterContext)
  const { register, control, watch, setValue } = TeamListFilterForm
  const router = useNavigate()
  const searchValue = watch('search')
  const debouncedValue = useDebounce(searchValue, debouncerTimeAdmin)
  const { page, handleMaxPage, max, handlePaginationClick, setPage } =
    useHandlePagination()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const {
    isOpen: isDeleteOpen,
    onClose: onDeleteClose,
    onOpen: onDeleteOpen,
  } = useDisclosure()

  const breadcrumbs = useMemo(
    () => [
      {
        text: 'Agents',
      },
      {
        text: 'Active Teams',
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
      MAKE_ACTIVE_TEAMS_LIST_PAGE(
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
    totalListCount,
    currentListCount,
    refetch,
  } = useGetTableList({
    endPoint: GET_ASSIGN_TEAM_IN_ADMIN() + `?status=approved`,
    metaEndPoint: GET_ASSIGN_TEAM_META(),
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

  const { mutate: deleteMutate, isLoading: deleteIsLoading } = useMutation(
    //@ts-ignore
    () => makeDeleteRequest(ADMIN_TEAM_CUD(team?.id)),
    {
      onSuccess: () => {
        refetch()
        toast.success('Team Removed Successfully')
        onDeleteClose()
      },
      onError: (err) => {
        //@ts-ignore
        const errMsg = getFirstErrorMessage(err?.response?.data?.data)
        //@ts-ignore
        toast.error(errMsg)
      },
    }
  )

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

  const { isLoading: exportDataIsLoading, generateData } = useHandleExportData()

  const sortByOption = listMeta?.data?.sort_by

  const showTextAsTag = {
    approved: 'green',
    pending: 'yellow',
    Rejected: 'red',
  }

  const { data: agentsStateData } = useQuery([ADMIN_AGENT_STATE_LIST], () =>
    makeGetRequest(ADMIN_AGENT_STATE_LIST)
  )
  // const filterOptions = listMeta?.data?.filter_data
  const listStateData = agentsStateData?.data?.results ?? []

  const filterArr = [
    // {
    //   type: 'select',
    //   filterLabel: 'Status',
    //   name: 'status',
    //   options: filterOptions?.status,
    // },
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

  const customFunction = useCallback(
    (obj: any) => {
      const act = [
        {
          label: 'View Team',
          onClick: () =>
            //@ts-ignore
            router(MAKE_ADMIN_TEAM_DETAIL_TAB(obj?.id, 'team-members')),
        },
        {
          label: 'Assign Brokerage',
          onClick: () => {
            setTeam(obj)
            onOpen()
          },
        },
        {
          label: 'Remove Team',
          onClick: () => {
            setTeam(obj)
            onDeleteOpen()
          },
        },
      ]?.filter((f: any) => f?.label)
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
    router(MAKE_ADMIN_TEAM_DETAIL_TAB(obj?.id, 'team-members'))
  }

  return (
    <AdminContainer>
      <Flex justify={'space-between'} alignItems={'center'}>
        <AdminBreadcrumbs route={breadcrumbs} />
        <div className="pt-[24px]">
          <AppButton
            isLoading={exportDataIsLoading}
            onClick={() => generateData({ type: 'agent' })}
            className="whitespace-nowrap py-[12.5px] font-[400] text-[16px] bg-[#1A9175]"
            icon={<LuFileInput />}
          >
            Export Data
          </AppButton>
        </div>
      </Flex>
      <AdminHeaderWithButtons
        title={'Teams'}
        primaryBtnText={'Create new Team'}
        primaryBtnIcon={<MdOutlineAddCircleOutline />}
        primaryBtnOnClick={() => router(ADMIN_TEAM_CREATION_PAGE)}
        additionalBtnIcon={<GoUpload />}
        // secondaryBtnOnClick={undefined}
        additionalBtnText="Bulk Upload"
        additionalBtnClassName="bg-[#ffffff] !text-[#10295A] border border-[#CDCDCD]"
      />
      <Flex width={'100%'} flexDirection={'column'} mb={'30px'}>
        <DashboardCardStatsList listData={cardListData} />
      </Flex>
      {/* <AdminHeaderWithButtons
        title={'Active Teams'}
        primaryBtnText={'Assign Brokerage'}
        primaryBtnIcon={undefined}
        primaryBtnOnClick={() => onOpen()}
        isPrimaryBtnDisabled={selectable?.select?.length == 0}
      /> */}
      <Flex mb={'40px'} justifyContent={'space-between'}>
        <Flex gap={'20px'} width={'100%'}>
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
      <CkAppModal
        className="!w-full !max-w-[960px] !rounded-[10px]"
        bodyClassName=" px-[30px]"
        isOpen={isOpen}
        closeButton
        onClose={onClose}
        header={'Assign Office - Teams'}
        headerClassName="text-[#10295A] text-[20px] font-[500] !py-[25px]"
      >
        {/* <AssignAgentToTeamModal
          onClose={onClose}
          selected={selectable?.select}
          setSelected={selectable?.setSelect}
          refetch={refetch}
          tableHeader={'Selected Teams'}
          dropDownName={'Select Brokerage'}
          btnText={'Assign Brokerage'}
          isBrokerage
        /> */}
        <AssignAgentToBrokerageModal
          onClose={onClose}
          //@ts-ignore
          selected={
            selectable?.select?.length !== 0 ? selectable?.select : [team]
          }
          setSelected={selectable?.setSelect}
          refetch={refetch}
          tableHeader={'Selected Teams'}
          btnText={'Assign Brokerage'}
          isTeam={true}
          isBrokerage={true}
        />
      </CkAppModal>
      <ConfirmDeleteTeamModal
        deleteMutate={deleteMutate}
        isLoading={deleteIsLoading}
        onClose={onDeleteClose}
        isOpen={isDeleteOpen}
        btnLabel="remove"
        headerText="Are you sure want to remove team?"
      />
    </AdminContainer>
  )
}

export default TeamsList
