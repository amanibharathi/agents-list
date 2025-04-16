import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { RxCalendar } from "react-icons/rx";
import { DateRange } from "react-date-range";
import AppButton from "../../../../AppComponents/AppButton-agent";

const DashFilterDateRange = (props: unknown) => {
  //@ts-expect-error ignore
  const setDateRange = (val: any) => {
    //@ts-expect-error ignore
    if (props?.value) {
      //@ts-expect-error ignore
      props?.setValue(props?.name, val);
    } else {
      //@ts-expect-error ignore
      props?.setValue("dateRange", val);
    }
  };
  //@ts-expect-error ignore
  const dateRange = props?.watch("dateRange");

  const { isOpen, onClose, onOpen } = useDisclosure();

  // console.log(first)

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
          alignItems={"center"}
          borderRadius={"10px"}
          bg={"white"}
          padding={"9.5px 11px"}
          boxShadow={"1px 1px 4px 0px #00000040 !important"}
          border="1px solid #cdcdcdcc !important"
          cursor={"pointer"}
          pos={"relative"}
        >
          <Flex
            // onBlur={onClose}
            alignItems={"center"}
            // border={'1px solid #f3f3f5'}
          >
            <label htmlFor="date-dash">
              <Flex
                cursor={"pointer"}
                alignItems={"center"}
                whiteSpace={"nowrap"}
                gap={"10px"}
                fontSize={"13px"}
              >
                <RxCalendar />
                {/* @ts-ignore */}
                {props?.filterLabel}
              </Flex>
            </label>
          </Flex>
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem p={"0px"}>
          <Box>
            <DateRange
              editableDateInputs={true}
              onChange={(item: any) => {
                setDateRange([item.selection]);
              }}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
              // months={2}
              direction="horizontal"
              color=""
            />
            <Flex mt={"5px"} px={"10px"} gap={"10px"}>
              <AppButton
                variant="outline"
                className="flex-1 py-1"
                onClick={onClose}
              >
                Close
              </AppButton>
            </Flex>
          </Box>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default DashFilterDateRange;
