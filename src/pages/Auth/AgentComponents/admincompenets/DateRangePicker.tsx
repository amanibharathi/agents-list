
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { DateRange } from 'react-date-range'
import CalendarIcon from './calendarIcon'
import moment from 'moment'
import AppText from '../../../../AppComponents/AppText-agent'


export default function DateRangePicker({
  setDateRange,
  dateRange,
  buttonStyles = {},
  textStyle = {},
  iconColor = 'black',
  gapBtwIconAndValue = '10px',
}: {
  setDateRange: any
  dateRange: any
  buttonStyles?: React.CSSProperties
  textStyle?: React.CSSProperties
  iconColor?: string
  gapBtwIconAndValue?: string
}) {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const getLabel = (val: any) => {
    if (val?.startDate && val?.endDate && val?.startDate === val?.endDate) {
      return moment(val?.startDate).format('MMM D')
    } else if (val?.startDate && val?.endDate) {
      return `${moment(val?.startDate).format('MMM D')}-${moment(val?.endDate).format('MMM D')}`
    }
    return 'Date Range'
  }
  return (
    <Menu
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      closeOnSelect={false}
      isLazy={true}
    >
      <MenuButton>
        <Flex
          alignItems={'center'}
          borderRadius={'10px'}
          bg={'white'}
          padding={'7px 11px'}
          boxShadow={'1px 1px 4px 0px #00000040 !important'}
          border="1px solid #cdcdcdcc !important"
          cursor={'pointer'}
          pos={'relative'}
          sx={{ ...buttonStyles }}
        >
          <Flex alignItems={'center'}>
            <label htmlFor="date-dash">
              <Flex
                cursor={'pointer'}
                alignItems={'center'}
                whiteSpace={'nowrap'}
                gap={gapBtwIconAndValue}
              >
                <CalendarIcon color={iconColor} />
                {/* @ts-ignore */}
                <AppText
                  style={{ ...textStyle }}
                  className="text-[14px]"
                  text={getLabel(dateRange)}
                />
                {/* {getLabel(dateRange)} */}
              </Flex>
            </label>
          </Flex>
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem p={'0px'}>
          <Box>
            <DateRange
              showMonthAndYearPickers={false}
              editableDateInputs={true}
              onChange={(item: any) => {
                setDateRange(item.selection)
              }}
              moveRangeOnFirstSelection={false}
              ranges={[
                {
                  startDate: dateRange?.startDate || new Date(),
                  endDate: dateRange?.endDate || new Date(),
                  key: 'selection',
                },
              ]}
            />
          </Box>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
