"use client";
import { Box } from "@chakra-ui/react";
import React, { useMemo } from "react";
import TeamDocumentstab from "./_tabsComponent/TeamDocumentstab";
import TeamSystemLogsTab from "./_tabsComponent/TeamSystemLogsTab";
import TeamInformationTab from "./_tabsComponent/TeamInformationTab";

const Page = ({ params }: { params: { tab: string; id: string } }) => {
  const comp = useMemo(() => {
    return {
      "team-details": {
        component: <TeamInformationTab params={params} />,
      },
      documents: {
        component: <TeamDocumentstab params={params} />,
      },
      "activity-log": {
        component: <TeamSystemLogsTab params={params} />,
      },
    };
  }, [params]);

  //@ts-expect-error ignore
  return <Box>{comp?.[params?.tab]?.component}</Box>;
};

export default Page;
