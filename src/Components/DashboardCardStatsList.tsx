import { Flex } from "@chakra-ui/react";
import DashboardCard from "./DashboardCard";
import { memo } from "react";

export interface IDashboardlistData {
  title: string;
  desc?: string;
  icon: any;
  value: string;
  link: string;
}

const DashboardCardStatsList = ({
  listData,
}: {
  listData: IDashboardlistData[];
}) => {
  return (
    <Flex gap={"20px"}>
      {listData?.map((m) => (
        <DashboardCard {...m} key={m.title} />
      ))}
    </Flex>
  );
};

export default memo(DashboardCardStatsList);
