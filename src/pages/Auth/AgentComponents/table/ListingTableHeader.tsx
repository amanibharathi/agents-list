// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
//import { replaceUnderscoreWithSpace } from '@/app/utils/functions/otherFunctions'
import { Box, Checkbox, SimpleGrid, Text } from "@chakra-ui/react";
import { replaceUnderscoreWithSpace } from "./resourceSectionData";
function ListingTableHeader({
  getColumnSize,
  selectable,
  getHeaderColumn,
  getHeaderTemplateColumn,
  includeIndex,
  columnHeaders,
  customActions,
  handleSelectAll,
  tableData,
}) {
  const tableDataLength = tableData?.data?.results?.length;

  return (
    <SimpleGrid
      // background={'#F8FAFC'}
      background={"#EAF5FF"}
      borderTop={"1px solid rgba(97, 104, 118, 0.16)"}
      borderBottom={"1px solid rgba(97, 104, 118, 0.16)"}
      className="table-header" // columns={selectable ? 2 : 1}
      gridTemplateColumns={getColumnSize()}
      px="20px"
      py="20px"
    >
      {selectable && (
        <Text textAlign={"center"} className="w-[50px]">
          <Checkbox
            onChange={() => handleSelectAll(tableData?.data)}
            isChecked={selectable?.select?.length === tableDataLength}
          />
        </Text>
      )}
      <SimpleGrid
        alignItems={"center"}
        // py="20px"
        columns={getHeaderColumn()}
        gridTemplateColumns={
          getHeaderTemplateColumn() ? getHeaderTemplateColumn() : undefined
        }
        // px="32px"
        gap="40px"
      >
        {includeIndex && (
          <Text
            fontWeight={600}
            color={"#000000"}
            fontSize={"15px"}
            textAlign={"center"}
          >
            S.No
          </Text>
        )}
        {columnHeaders?.map((head) => (
          <Text
            fontWeight={600}
            fontSize={"15px"}
            textAlign={"left"}
            key={head}
            // color={'#585858'}
            color={"#000000"}
          >
            {replaceUnderscoreWithSpace(head)}
          </Text>
        ))}
      </SimpleGrid>
      {customActions?.map((_) => (
        <Box
          textAlign={"center"}
          fontWeight={600}
          fontSize={"15px"}
          key={_?.text}
        >
          {_?.headerText || ""}
        </Box>
      ))}
    </SimpleGrid>
  );
}

export default ListingTableHeader;
