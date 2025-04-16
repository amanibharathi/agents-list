import AdminFilterRenderer from '@/app/(dashboards)/components/AdminFilterRenderer'
import AdminSerachComponent from '@/app/admin/_AdminComponent/AdminSerachComponent'
import PageHeader from '@/app/admin/_AdminComponent/PageHeader'
import CommonDocumentUploadModal from '@/app/admin/agents/onboarding-teams/[id]/[tab]/_TeamDocumentationTabModels/CommonDocumentUploadModal'
import DocumentRemoveModal from '@/app/admin/agents/onboarding-teams/[id]/[tab]/_TeamDocumentationTabModels/DocumentsRemoveModal'
// import DocumentRemoveModal from '@/app/admin/agents/onboarding-teams/[id]/[tab]/_TeamDocumentationTabModels/DocumentsRemoveModal'
import {
  // ADMIN_AGENT_TEAM_UPDATE,
  ADMIN_TEAM_DOCUMENT_LIST,
  ADMIN_TEAM_DOCUMENT_LIST_META,
  // AGENT_TEAM_DOCUMENT_POST,
} from '@/app/api-utils'
import AppButton from '@/app/components/elements/AppButton'
import ListingTable from '@/app/components/table/ListingTable'
import { useDebounce } from '@/app/hooks/useDebounce'
import useGetTableList from '@/app/hooks/useGetTableList'
import useHandlePagination from '@/app/hooks/useHandlePagination'
import { AdminListFilterContext } from '@/app/provider/AdminListFilterProvider'
import { debouncerTimeAdmin } from '@/app/utils/functions/otherFunctions'
import { ADMIN_TEAM_DOCUMENT_LISTING } from '@/app/utils/navigation'
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react'
import { UploadIcon } from '@radix-ui/react-icons'
import moment from 'moment'
import { useRouter } from 'next-nprogress-bar'
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'

const TeamDocumentstab = ({
  params,
}: {
  params: { tab: string; id: string }
}) => {
  // @ts-ignore
  const { AppliedTeamsRosterFilterForm, dateRange, setDateRange } = useContext(
    AdminListFilterContext
  )
  const { register, control, watch, setValue } = AppliedTeamsRosterFilterForm
  const router = useRouter()
  const searchParams = useSearchParams()

  const uploaded_by: any = searchParams.get('uploaded_by')
  const document_type: any = searchParams.get('document_type')
  const sort_by: any = searchParams.get('sort_by')

  const { page, handleMaxPage, max, handlePaginationClick, setPage } =
    useHandlePagination()

  const searchValue = watch('search')
  const debouncedValue = useDebounce(searchValue, debouncerTimeAdmin)

  const { listData, listMeta, isLoading, selectable, isFetching } =
    useGetTableList({
      endPoint: ADMIN_TEAM_DOCUMENT_LIST(params?.id),
      metaEndPoint: ADMIN_TEAM_DOCUMENT_LIST_META(params?.id),
      handleMax: handleMaxPage,
      page,
      setPage,
      filterObject: {
        document_type: watch('document_type')?.value,
        uploaded_by: watch('uploaded_by')?.value,
        search: searchValue || '',
        created_after:
          dateRange?.startDate &&
          moment(dateRange?.startDate).format('YYYY-MM-DD'),
        created_before:
          dateRange?.endDate && moment(dateRange?.endDate).format('YYYY-MM-DD'),
        sort_by: watch('sort_by')?.value,
      },
      deps: [uploaded_by, document_type, dateRange, sort_by],
      refetchDeps: [debouncedValue],
    })
  listData?.data?.results?.forEach(
    (list: any) => (list.name = list?.name?.split('/').pop())
  )

  useEffect(() => {
    router.push(
      ADMIN_TEAM_DOCUMENT_LISTING(
        'applied-teams',
        params?.id,
        watch('document_type')?.value,
        watch('uploaded_by')?.value,
        dateRange?.startDate
          ? moment(dateRange?.startDate).format('YYYY-MM-DD')
          : null,
        dateRange?.endDate
          ? moment(dateRange?.endDate).format('YYYY-MM-DD')
          : null,
        watch('sort_by')?.value
      )
    )
  }, [
    watch('document_type'),
    watch('uploaded_by'),
    dateRange,
    watch('sort_by'),
  ])

  const docTypes = ['Team Document', 'Agent Document']
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isRemoveOpen,
    onOpen: onRemoveOpen,
    onClose: onRemoveClose,
  } = useDisclosure()

  const [imageState, setImageState] = useState()
  const inputObj = {
    label: '',
    name: '',
    type: '',
    required: true,
    imageState: imageState,
    setImageState: setImageState,
    uploadKey: '',
    fileTypes: ['jpg', 'jpeg', 'png', 'pdf'],
    placeholder: '',
    fileTypeKey: '',
  }

  const [selected, setSelected] = useState({})

  const customFunction = useCallback(
    (obj: any) => {
      const act = [
        {
          label: 'Remove Document',
          onClick: () => {
            onRemoveOpen()
            setSelected(obj)
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

  const filterOptions = listMeta?.data?.filter_data

  const filterArr = [
    {
      type: 'select',
      filterLabel: 'Document Type',
      name: 'document_type',
      options: filterOptions?.document_type,
    },
    {
      type: 'select',
      filterLabel: 'Sort ',
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
      type: 'dob',
    },
    // {
    //   type: 'select',
    //   filterLabel: 'Uploaded By',
    //   name: 'uploaded_by',
    //   options: metaData?.data?.results,
    //   onInputChange: (val: any) => handleOnInputChange(val),
    // },
  ]

  return (
    <Box>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <PageHeader title="Documents" />
        <div className="flex gap-[10px] w-full justify-end">
          {/* <AppButton
            label="Remove Document"
            variant="outline"
            className="!px-0 !py-0 max-h-[44px] max-w-[200px]"
            onClick={() => onRemoveOpen()}
          /> */}
          <AppButton
            label="Upload Document"
            icon={<UploadIcon />}
            onClick={() => onOpen()}
          />
        </div>
      </Flex>
      <Flex gap={'20px'}>
        <AdminSerachComponent
          register={register('search')}
          placeholder="Search by agent name"
        />
        <AdminFilterRenderer
          register={register}
          filterArr={filterArr}
          control={control}
          setValue={setValue}
          watch={watch}
          dateRange={dateRange}
          setDateRange={setDateRange}
          // reset={reset}
        />
      </Flex>
      <Box mt={'38px'}>
        <ListingTable
          //   showTextAsTag={showTextAsTag}
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
        />
      </Box>
      <CommonDocumentUploadModal
        isOpen={isOpen}
        onClose={onClose}
        documentTypes={docTypes}
        inputObj={inputObj}
        params={params}
      />
      <DocumentRemoveModal
        isOpen={isRemoveOpen}
        onClose={onRemoveClose}
        params={params}
        singleSelected={selected}
        setSingleSelected={setSelected}
      />
    </Box>
  )
}

export default TeamDocumentstab
