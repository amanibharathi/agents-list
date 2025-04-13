
import ListingTableBody from './ListingTableBody'
import ListingTableHeader from './ListingTableHeader'
import { Avatar, Box, Flex, Link, Switch, Tag, Text } from '@chakra-ui/react'
// import {
//   replaceUnderscoreWithSpace,
//   truncateString,
// } from '@/app/utils/functions/otherFunctions'
//import AppText from '../elements/AppText'
//import LoaderLayout from '../layouts/loaderLayout/LoaderLayout'
import moment from 'moment'
//import PaginationComponent from '@/app/(dashboards)/components/PaginationComponent'
import ListingTableSkeleton from './ListingTableSkeleton'
//import NoData from '@/app/admin/_AdminComponent/NoData/NoData'
//import { capitalizeFirstLetter } from '@/app/utils/constants/resourceSectionData'
import ListingTableBodyWithReactWindow from './ListingTableBodyWithReactWindow'
import { truncateString} from '../../../../utils/functions/commonFunctions'
import AppText from '../../../../AppComponents/AppText-agent'
import LoaderLayout from './LoaderLayout'
import PaginationComponent from '../admincompenets/PaginationComponent'
import NoData from '../admincompenets/NoData'
import { capitalizeFirstLetter, replaceUnderscoreWithSpace } from './resourceSectionData'

const ListingTable = ({
  tableData,
  tableMeta,
  showTextAsTag,
  selectable,
  includeIndex,
  handleRowClick,
  downloadable,
  editPermissions,
  handleEditClick,
  isLoading = false,
  // page,
  hideKeys = [],
  // hidePagination = false,
  // handlePage,
  // showKeys = [],
  // max = 0,
  // total,
  // showTotal = false,
  handleDownload,
  customActions,
  archive,
  customRowsColumnsTemplate,
  customHeadersColumnsTemplate,
  avatar = [],
  relativeTime = [],
  property = [],
  handlePaginationClick,
  max,
  menuBtnOptions,
  toggleButton,
  initialPage,
  forcePage,
  customFunction,
  handleTabClick,
  customRelativeTime,
  customButtonFunction,
  customGridCss,
  handleSwitch,
  isReactWindow = false,
  ...others
}) => {
  // const [isSelectAll, setIsSelectAll] = useState(false)
  // const [show, setShow] = useState('right')
  const columnHeaders = Object.values(tableMeta?.data?.columns || []).filter(
    (header, index) =>
      !hideKeys.includes(Object.keys(tableMeta?.data?.columns || [])[index])
  )
  const keysToMap = Object.keys(tableMeta?.data?.columns || []).filter(
    (key) => !hideKeys.includes(key)
  )
  const columnLength = columnHeaders?.length
  const returnAsTag = (color, txt) => {
    return (
      <Tag className={`${color}-tag truncate`}>
        <AppText
          text={capitalize(txt)}
          className="!text-[inherit] text-left capitalize truncate"
        />
      </Tag>
    )
  }

  const returnWithAvatar = (txt) => {
    return (
      <Flex
        // as={'p'}
        gap={'20px'}
        justifyContent={'start'}
        alignItems={'center'}
        padding={'0px 9%'}
        // border={'1px solid red'}
      >
        <Avatar color={'white'} size={'sm'} name={txt} />
        <AppText text={txt} className="text-left capitalize " />
      </Flex>
    )
  }

  const splitAndReturnAsValue = (head, data) => {
    const splitedHead = head?.split('.')
    if (splitedHead?.length == 2) {
      if (splitedHead?.[0]?.includes('[')) {
        const splitedHeadWithIndex = splitedHead?.[0]?.split('[')
        return data?.[splitedHeadWithIndex?.[0]]?.[
          splitedHeadWithIndex[1][0] ? parseInt(splitedHeadWithIndex[1][0]) : 0
        ]?.[splitedHead?.[1]]
      } else {
        return data?.[splitedHead?.[0]]?.[splitedHead?.[1]]
      }
    }

    if (splitedHead?.length == 3)
      return data?.[splitedHead?.[0]]?.[splitedHead?.[1]]?.[splitedHead?.[2]]
  }

  const toAddressValue = (data) =>
    data?.street +
    (data?.city ? `, ${data?.city}` : '') +
    (data?.state ? `, ${data?.state}` : '') +
    (data?.zip ? `, ${data?.zip}` : '')

  const capitalize = (str, head, wholeData) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (head?.includes('.')) {
      // Email pattern regex
      const splitValue = splitAndReturnAsValue(head, wholeData)

      // Check if the string matches an email pattern
      if (emailPattern.test(splitValue)) {
        return splitValue // Return the email as is, without capitalization
      }
      if (splitValue && head?.includes('.') && typeof splitValue === 'string') {
        return (
          splitValue?.replaceAll('_', ' ')?.charAt(0).toUpperCase() +
          splitValue?.slice(1)
        )
      }
    }
    if (emailPattern.test(str)) {
      return str
    }
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const customMlsLicenseView = (head: any, wholeData: any) => {
    return wholeData[head] && wholeData[head].length !== 0 ? (
      <div className="flex flex-col gap-[12px]">
        {wholeData[head].map((each, index) =>
          index < 2 ? (
            <div
              className="flex justify-between item-center items-center gap-[5px]"
              key={index}
            >
              <div className="flex items-center gap-[6px]">
                <div
                  className={`w-[6px] min-w-[6px] h-[6px] rounded-full ${each?.status === 'approved' ? 'bg-[#1A9175]' : 'bg-[#ED2929]'}`}
                ></div>
                <AppText className="text-[12px] leading-[15px] font-[400] max-w-[90px]">
                  {each?.board?.identity || each?.state?.identity}
                </AppText>
              </div>
              <AppText className="text-[12px] leading-[15px] font-[400]">
                {each?.mls_id || each?.license_no}
              </AppText>
            </div>
          ) : null
        )}
        {wholeData[head]?.length > 2 && (
          <AppText className="text-[12px] leading-[15px] font-[400]">
            + {wholeData[head]?.length - 2} more{' '}
            {head === 'license_details' ? 'licenses' : 'boards'}{' '}
          </AppText>
        )}
      </div>
    ) : (
      '-'
    )
  }

  const customtoggle = (head: any, wholeData: any) => {
    return (
      <Switch
        isChecked={wholeData[head]}
        onChange={() => handleSwitch(wholeData)}
      />
    )
  }

  const customizeDataView = (txt, head, wholeData) => {
    txt =
      head === 'email' || head === 'instruction'
        ? txt
        : capitalize(txt, head, wholeData)
    if (head === 'instruction') {
      return (
        <Link
          href={txt}
          target="_blank"
          className="!text-[inherit] underline text-left"
        >
          {txt}
        </Link>
      )
    }
    if (head === 'license_transfer_fee') {
      return <Text>{`$${txt == '-' ? 0 : txt}`}</Text>
    }

    if (
      head === 'identity' ||
      head === 'team.identity' ||
      head === 'full_name' ||
      head === 'brokerages[0].identity'
    ) {
      return <Text>{truncateString(txt, 30)}</Text>
    }

    if (head === 'is_active') {
      return <Text>{txt === 'True' ? 'Active' : 'Inactive'}</Text>
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // Check if the string matches an email pattern
    if (emailPattern.test(txt)) {
      return txt // Return the email as is, without capitalization
    }

    if (head === 'mls_details' || head === 'license_details') {
      return customMlsLicenseView(head, wholeData)
    }
    if (head === 'is_locked') {
      return customtoggle(head, wholeData)
    }

    const tagColor = showTextAsTag?.[txt?.replaceAll(' ', '_')?.toLowerCase()]
    if (tagColor) {
      if (head == 'user.first_name') return txt
      if (head?.includes('.')) {
        return returnAsTag(
          tagColor,
          splitAndReturnAsValue(head, wholeData)?.replaceAll('_', ' ')
        )
      } else {
        return returnAsTag(tagColor, txt?.replaceAll('_', ' '))
      }
    }

    // code to format list meta to date and time format
    if (customRelativeTime?.includes(head))
      return moment(txt).format(`MMM DD, YYYY; HH:mm:ss`)

    // Code to format list meta to accessable format
    if (relativeTime?.includes(head)) return moment(txt)?.fromNow()

    const doesItMatchesDateStampPattern = (val) => {
      const regex =
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2}|[+-]\d{4})?$/
      return regex.test(val)
    }

    if (doesItMatchesDateStampPattern(txt))
      return moment(txt).format(`YYYY-MM-DD`)
    if (avatar?.includes(head)) {
      if (head?.includes('.')) {
        return returnWithAvatar(splitAndReturnAsValue(head, wholeData))
      } else {
        return returnWithAvatar(txt)
      }
    }

    if (property?.includes(head)) {
      const propObj = splitAndReturnAsValue(head, wholeData)
      if (propObj) {
        return toAddressValue(propObj)
      }
    }
    if (head?.includes('.'))
      return capitalizeFirstLetter(splitAndReturnAsValue(head, wholeData))

    if (head === 'state')
      return replaceUnderscoreWithSpace(wholeData?.state?.identity)

    return replaceUnderscoreWithSpace(txt)
  }

  const handleSeletced = (e, data) => {
    // const selectedData = selectable?.select;
    if (e) {
      // selectedData?.push(data?.id);
      selectable?.setSelect([...selectable?.select, data])
    } else {
      const newSelectedData = selectable?.select?.filter(
        (f) => f?.id !== data?.id
      )
      selectable?.setSelect(newSelectedData)
    }
  }
  const handleSelectAll = (data) => {
    // Determine the current selection state (selected or not)
    const isSelectAll = selectable?.select?.length === data?.results?.length

    if (isSelectAll) {
      selectable?.setSelect([]) // Clear the selection
    } else {
      // Select all rows
      selectable?.setSelect(data?.results?.map((item) => item))
    }
  }

  const getColumnSize = () => {
    const a = ['auto']
    if (selectable) a.unshift('60px')
    if (downloadable) a?.push('80px')
    if (menuBtnOptions) a?.push('50px')
    if (customFunction) a?.push('50px')
    if (customButtonFunction) a?.push(customGridCss)
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    if (customActions) customActions?.map((_) => a?.push('100px'))
    if (archive) a?.push('100px')
    const newVal = a?.join(' ')
    return [newVal]
  }

  const getRowColumn = () => {
    if (customRowsColumnsTemplate) return null
    return includeIndex || editPermissions ? columnLength + 1 : columnLength
  }

  const getRowTemplateColumn = () => {
    return customRowsColumnsTemplate ? customRowsColumnsTemplate : null
  }

  const getHeaderColumn = () => {
    if (customHeadersColumnsTemplate) return null
    return includeIndex || editPermissions ? columnLength + 1 : columnLength
  }

  const getHeaderTemplateColumn = () => {
    return customHeadersColumnsTemplate ? customHeadersColumnsTemplate : null
  }

  return (
    <Box>
      <Box border={isLoading ? 'none' : '1px solid #D5D5D5'} {...others}>
        {/* <Flex justifyContent={'end'} alignItems={'center'}>
        {showTotal && total && (
          <Text
            fontSize={'18px'}
            fontWeight={600}
          >{`Total : ${endItem} / ${totalCount}`}</Text>
        )}

        {max != 1 && max != 0 && (
          <TablePagination
            hidePagination={hidePagination}
            page={page}
            appColors={appColors}
            handlePage={handlePage}
            max={max}
            setShow={setShow}
          />
        )}
      </Flex> */}
        {/* <AdminLayout autoHeight noNav isLoading={isLoading}> */}
        {/* <SlideFade
        offsetX={show == 'right' ? '50px' : '-50px'}
        style={{ position: 'static', transition: ' transform 1ms' }}
        // initialScale={0.1}
        in={true}
        offsetY="0px"
      > */}
        {/* Table header */}
        <Box bg={'white'}>
          {!isLoading ? (
            <LoaderLayout isLoading={false}>
              <ListingTableHeader
                getColumnSize={getColumnSize}
                selectable={selectable}
                getHeaderColumn={getHeaderColumn}
                getHeaderTemplateColumn={getHeaderTemplateColumn}
                includeIndex={includeIndex}
                columnHeaders={columnHeaders}
                customActions={customActions}
                handleSelectAll={handleSelectAll}
                tableData={tableData}
              />

              {/* React Window Table Body */}
              {tableData?.data?.results?.length != 0 && isReactWindow ? (
                <ListingTableBodyWithReactWindow
                  menuBtnOptions={menuBtnOptions}
                  tableData={tableData}
                  getColumnSize={getColumnSize}
                  selectable={selectable}
                  handleSeletced={handleSeletced}
                  handleRowClick={handleRowClick}
                  getRowTemplateColumn={getRowTemplateColumn}
                  getRowColumn={getRowColumn}
                  includeIndex={includeIndex}
                  keysToMap={keysToMap}
                  customizeDataView={customizeDataView}
                  editPermissions={editPermissions}
                  handleEditClick={handleEditClick}
                  customActions={customActions}
                  handleDownload={handleDownload}
                  toggleButton={toggleButton}
                  customFunction={customFunction}
                  downloadable={downloadable}
                  handleTabClick={handleTabClick}
                  customButtonFunction={customButtonFunction}
                />
              ) : (
                isReactWindow && <NoData height="250px" mt="0" />
              )}

              {/* Table body */}
              {/* <HandleListing fs="16px" data={tableData?.data?.results}> */}
              {!isReactWindow && (
                <div>
                  {tableData?.data?.results?.length != 0 ? (
                    <ListingTableBody
                      menuBtnOptions={menuBtnOptions}
                      tableData={tableData}
                      getColumnSize={getColumnSize}
                      selectable={selectable}
                      handleSeletced={handleSeletced}
                      handleRowClick={handleRowClick}
                      getRowTemplateColumn={getRowTemplateColumn}
                      getRowColumn={getRowColumn}
                      includeIndex={includeIndex}
                      keysToMap={keysToMap}
                      customizeDataView={customizeDataView}
                      editPermissions={editPermissions}
                      handleEditClick={handleEditClick}
                      customActions={customActions}
                      handleDownload={handleDownload}
                      toggleButton={toggleButton}
                      customFunction={customFunction}
                      downloadable={downloadable}
                      handleTabClick={handleTabClick}
                      customButtonFunction={customButtonFunction}
                    />
                  ) : (
                    <NoData />
                  )}
                </div>
              )}
            </LoaderLayout>
          ) : (
            <ListingTableSkeleton />
          )}
        </Box>
        {/* </HandleListing> */}
        {/* </SlideFade> */}
        {/* </AdminLayout> */}
      </Box>
      {max ? (
        <div className="my-[20px]">
          <PaginationComponent
            initialPage={initialPage}
            forcePage={forcePage}
            handlePaginationClick={handlePaginationClick}
            pageCount={max}
          />
        </div>
      ) : null}
    </Box>
  )
}

export default ListingTable
