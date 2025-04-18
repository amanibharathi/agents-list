/* eslint-disable no-constant-binary-expression */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import DownloadIcon from './downloadIcon'
import {
  Box,
  Checkbox,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { FixedSizeList as List } from 'react-window'

const Row = ({ index, style, data }) => {
  const {
    tableData,
    getColumnSize,
    // getRowTemplateColumn,
    // getRowColumn,
    selectable,
    handleSeletced,
    // handleRowClick,
    // handleTabClick,
    includeIndex,
    keysToMap,
    customizeDataView,
    editPermissions,
    handleEditClick,
    customActions,
    appColors,
    downloadable,
    handleDownload,
    menuBtnOptions,
    toggleButton,
    customFunction,
    customButtonFunction,
  } = data

  const rowData = tableData?.data?.results[index]

  return (
    <div style={style}>
      <SimpleGrid
        _hover={{
          bg: '#2b5cab12',
        }}
        borderTop={'1px solid #61687629'}
        borderBottom={'1px solid #61687629'}
        key={rowData?.uuid}
        gridTemplateColumns={getColumnSize}
        alignItems={'center'}
        px="20px"
      >
        {/* <SimpleGrid
          alignItems={'center'}
          py="15px"
          role="button"
          gap="40px"
          onClick={() => {
            handleRowClick?.(rowData?.id, rowData)
            handleTabClick?.(rowData)
          }}
          //   gridTemplateColumns={getRowTemplateColumn()}
          //   columns={getRowColumn()}
        > */}

        <div className="flex p-[13px] gap-[28px]">
          {includeIndex && (
            <Text color={'#000000'} fontSize={'15px'} textAlign={'center'}>
              {index + 1}
            </Text>
          )}
          {selectable && (
            <Checkbox
              // py="15px"
              onChange={(e) => handleSeletced(e?.target?.checked, rowData)}
              isChecked={selectable.select?.some((s) => s?.id == rowData?.id)}
            />
          )}
          <div className="grid grid-cols-3 w-[100%]">
            {keysToMap?.map((key) => (
              <Text
                color={'#000000'}
                fontSize={'15px'}
                key={key}
                textAlign={'left'}
              >
                {customizeDataView(
                  rowData?.[`${key}`]?.toString() || '-',
                  key,
                  rowData
                ) || '-'}
              </Text>
            ))}
          </div>
          {editPermissions && (
            <Text
              role="button"
              onClick={() => handleEditClick(rowData?.uuid)}
              textAlign={'center'}
            >
              {'Edit'}
            </Text>
          )}
          {customActions?.map((action) => (
            <Box
              cursor={'pointer'}
              color={appColors.appPrimary[600]}
              textDecoration={'underline'}
              onClick={() => action?.handler(rowData, index)}
              key={action?.text}
              textTransform={'uppercase'}
              fontWeight={600}
              fontSize={'12px'}
              textAlign={'center'}
              display={'flex'}
              justifyContent={'center'}
            >
              {action?.text}
            </Box>
          ))}
          {customFunction?.(rowData)}
        </div>

        {/* </SimpleGrid> */}

        {downloadable && (
          <Flex
            onClick={() => handleDownload(rowData, index)}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <DownloadIcon color={appColors.appPrimary[600]} role="button" />
          </Flex>
        )}
        {menuBtnOptions && (
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
              {menuBtnOptions?.map((m) => (
                <MenuItem
                  onClick={() => m?.onClick(rowData, index)}
                  key={m?.label}
                >
                  {m?.label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        )}
        {toggleButton && (
          <Box
            cursor={'pointer'}
            color={appColors.appPrimary[600]}
            textDecoration={'underline'}
            onClick={() =>
              toggleButton?.handler(
                // eslint-disable-next-line no-constant-binary-expression
                rowData?.[toggleButton?.key1] ===
                  rowData?.[toggleButton?.key2] ?? true,
                rowData,
                index
              )
            }
            textTransform={'uppercase'}
            fontWeight={600}
            fontSize={'12px'}
            textAlign={'center'}
            display={'flex'}
            justifyContent={'center'}
          >
           
            {(rowData?.[toggleButton?.key1] === rowData?.[toggleButton?.key2] ??
            true)
              ? toggleButton?.text_while_in_false
              : toggleButton?.text_while_in_true}
          </Box>
        )}

        {customButtonFunction?.(rowData)}
      </SimpleGrid>
    </div>
  )
}

const ListingTableBodyWithReactWindow = ({
  tableData,
  selectable,
  handleSeletced,
  handleRowClick,
  handleTabClick,
  includeIndex,
  keysToMap,
  customizeDataView,
  editPermissions,
  handleEditClick,
  customActions,
  appColors,
  downloadable,
  handleDownload,
  menuBtnOptions,
  toggleButton,
  customFunction,
  customButtonFunction,
}) => {
  const rowCount = tableData?.data?.results?.length || 0

  const itemData = {
    tableData,
    selectable,
    handleSeletced,
    handleRowClick,
    handleTabClick,
    includeIndex,
    keysToMap,
    customizeDataView,
    editPermissions,
    handleEditClick,
    customActions,
    appColors,
    downloadable,
    handleDownload,
    menuBtnOptions,
    toggleButton,
    customFunction,
    customButtonFunction,
  }

  return (
    <List
      height={250} // Adjust as per your UI
      itemCount={rowCount}
      itemSize={50} // Adjust based on row height
      itemData={itemData}
      width="100%"
    >
      {Row}
    </List>
  )
}

export default ListingTableBodyWithReactWindow
