
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
import { DownloadIcon } from '@radix-ui/react-icons'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { appColors } from '../admincompenets/appColors'
//import { appColors } from '@/app/theme/foundations/appColors'
function ListingTableBody({
  tableData,
  getColumnSize,
  selectable,
  handleSeletced,
  handleRowClick,
  undefined,
  getRowTemplateColumn,
  getRowColumn,
  includeIndex,
  keysToMap,
  customizeDataView,
  editPermissions,
  handleEditClick,
  customActions,
  downloadable,
  handleDownload,
  menuBtnOptions,
  toggleButton,
  customFunction,
  handleTabClick,
  customButtonFunction,
}) {
  return (
    <Flex bg={'white'} flexFlow={'column'}>
      {tableData?.data?.results?.map((data, ind) => (
        <SimpleGrid
          _hover={{
            bg: '#2b5cab12',
          }}
          borderTop={'1px solid #61687629'}
          borderBottom={'1px solid #61687629'}
          key={data?.uuid} // py="15px"
          // columns={selectable ? 2 : 1}
          gridTemplateColumns={getColumnSize}
          alignItems={'center'}
          px="20px"
        >
          {selectable && (
            <Text textAlign={'center'} className="w-[50px]">
              <Checkbox
                py="15px"
                onChange={(e) => handleSeletced(e?.target?.checked, data)}
                isChecked={selectable.select?.some((s) => s?.id == data?.id)}
              />
            </Text>
          )}
          <SimpleGrid
            alignItems={'center'}
            py="15px"
            role="button"
            gap="40px"
            onClick={() => {
              if (handleRowClick) {
                handleRowClick(data?.id, data)
              } else {
                undefined
              }
              if (handleTabClick) {
                handleTabClick(data)
              }
            }}
            gridTemplateColumns={getRowTemplateColumn()}
            columns={getRowColumn()}
          >
            {includeIndex && (
              <Text color={'#000000'} fontSize={'15px'} textAlign={'center'}>
                {ind + 1}
              </Text>
            )}
            {keysToMap?.map((key) => (
              <Text
                color={'#000000'}
                fontSize={'15px'}
                key={key}
                textAlign={'left'}
                // className="truncate"
              >
                {/* {JSON.stringify(data[key])} */}
                {customizeDataView(
                  data?.[`${key}`]?.toString() || '-',
                  key,
                  data
                ) || '-'}
              </Text>
            ))}
            {editPermissions && (
              <Text
                role="button"
                onClick={() => handleEditClick(data?.uuid)}
                textAlign={'center'}
              >
                {/* {JSON.stringify(data[head])} */}
                {'Edit'}
              </Text>
            )}
          </SimpleGrid>
          {customActions
            ? customActions?.map((_) => (
                <Box
                  cursor={'pointer'}
                  color={appColors.appPrimary[600]}
                  textDecoration={'underline'}
                  onClick={() => _?.handler(data, ind)}
                  key={_?.text}
                  textTransform={'uppercase'}
                  fontWeight={600}
                  fontSize={'12px'}
                  textAlign={'center'}
                  display={'flex'}
                  justifyContent={'center'}
                >
                  {_?.text}
                </Box>
              ))
            : null}
          {downloadable ? (
            <Flex
              onClick={() => handleDownload(data, ind)}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <DownloadIcon color={appColors.appPrimary[600]} role="button" />
            </Flex>
          ) : null}
          {menuBtnOptions ? (
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
                    onClick={() => m?.onClick(data, ind)}
                    key={m?.label}
                  >
                    {m?.label}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          ) : null}
          {toggleButton ? (
            <Box
              cursor={'pointer'}
              color={appColors.appPrimary[600]}
              textDecoration={'underline'}
              onClick={() =>
                toggleButton?.handler(
                  data?.[toggleButton?.key1] === data?.[toggleButton?.key2] ??
                    true,
                  data,
                  ind
                )
              }
              key={_?.text}
              textTransform={'uppercase'}
              fontWeight={600}
              fontSize={'12px'}
              textAlign={'center'}
              display={'flex'}
              justifyContent={'center'}
            >
              {(data?.[toggleButton?.key1] === data?.[toggleButton?.key2] ??
              true)
                ? toggleButton?.text_while_in_false
                : toggleButton?.text_while_in_true}
            </Box>
          ) : null}
          {customFunction ? customFunction(data) : null}
          {customButtonFunction ? customButtonFunction(data) : null}
        </SimpleGrid>
      ))}
    </Flex>
  )
}

export default ListingTableBody
