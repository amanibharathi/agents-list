// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { Box } from '@chakra-ui/react'
import  { useMemo } from 'react'
import TeamInformationTab from './_tabsComponent/TeamInformationTab'
import TeamDocumentstab from './_tabsComponent/TeamDocumentstab'
import TeamSystemLogsTab from './_tabsComponent/TeamSystemLogsTab'
import TeamRequestTab from './_tabsComponent/TeamRequestTab'

const Page = ({ params }: { params: { tab: string; id: string } }) => {
  const comp = useMemo(() => {
    return {
      "team-members": {
        component: <TeamInformationTab params={params} />,
      },
      documents: {
        component: <TeamDocumentstab params={params} />,
      },
      "team-requests": {
        component: <TeamRequestTab params={params} />,
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
