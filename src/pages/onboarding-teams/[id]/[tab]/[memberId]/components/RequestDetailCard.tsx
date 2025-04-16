import AppText from "@/app/components/elements/AppText";
import { Flex } from "@chakra-ui/react";
import React from "react";
import { ColorTags } from "../../../../components/ColorTags";
import { LeaderCard } from "./LeaderCard";
import { formatDateWithMonth } from "@/app/utils/functions/otherFunctions";

export const RequestDetailCard = ({ data }: { data: any }) => {
  const detail = [
    {
      title: "Request ID",
      data: data?.request_id ?? "-",
    },
    {
      title: "Request type",
      data: data?.request_type?.replace("_", " ") ?? "-",
    },
    {
      title: "Changes done by",
      data: data?.created_by,
    },
    {
      title: "Requested date",
      data: formatDateWithMonth(data?.created) ?? "-",
    },
    {
      title: "Status",
      data: data?.status ?? "-",
    },
    data?.status == "pending"
      ? null
      : {
          title: "Updated at",
          data: formatDateWithMonth(data?.status_updated_at) ?? "-",
        },
    data?.status == "pending"
      ? null
      : {
          title: "Updated by",
          data: data?.status_updated_by?.name ?? "-",
        },
  ];
  return (
    <Flex
      className={`${
        data?.status == "pending" ? "max-h-[520px]" : "max-h-[590px]"
      } gap-[20px] max-w-[490px] px-[20px] py-[50px] border border-[#61687640]`}
      direction={"column"}
    >
      {detail?.map((i: any) => (
        <RequestStat key={i?.title} title={i?.title} data={i?.data} />
      ))}
    </Flex>
  );
};

const colors = {
  pending: {
    background: "#FF98001A",
    textColor: "#FF9800",
  },
  approved: {
    background: "#2FB3441A",
    textColor: "#2FB344",
  },
  rejected: {
    background: "#EF53501A",
    textColor: "#EF5350",
  },
  cancelled: {
    background: "#fccfc0",
    textColor: "#d93f0b",
  },
};

const RequestStat = ({ title, data }: { title: string; data: any }) => {
  return (
    <div className="grid grid-cols-2 gap-x-[20px]">
      <div className="flex justify-between items-center">
        <AppText className="!text-[#10295A] text-[16px] font-semibold">
          {title}
        </AppText>
        {title && (
          <AppText className="!text-[#10295A] text-[16px] font-semibold">
            :
          </AppText>
        )}
      </div>
      <div
        className={`${
          title == "Changes done by" ? "col-span-2" : "col-span-1"
        }`}
      >
        {title == "Status" ? (
          <ColorTags
            className="max-w-[100px]"
            text={data}
            //@ts-expect-error ignore
            background={colors[data]?.background || "#ffffff"}
            //@ts-expect-error ignore
            textColor={colors[data]?.textColor || "#000"}
          />
        ) : title == "Changes done by" ? (
          <LeaderCard data={data} />
        ) : (
          <AppText className="!text-[#000000] capitalize text-[16px] font-normal">
            {data}
          </AppText>
        )}
      </div>
    </div>
  );
};
