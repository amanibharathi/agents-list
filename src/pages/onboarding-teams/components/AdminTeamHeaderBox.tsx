
import { Flex } from '@chakra-ui/react'
import AdminTeamHeaderPrimaryBox, {
  IAdminTeamHeaderPrimaryBox,
} from './AdminTeamHeaderPrimaryBox'
import CustomBoxButton from '../../onboarding-agents/[id]/components/custom-box-button'
import AdminTeamHeaderFinalBox from './AdminTeamHeaderFinalBox'
import { ColorTags } from './ColorTags'
import AppText from '../../../AppComponents/AppText-agent'
import AppButton from '../../../AppComponents/AppButton-agent'
import { GoCopy } from 'react-icons/go'
import { copyUrl } from '../[id]/[tab]/_tabsComponent/services'
import { sponsorLink } from './joinRoaComp'


interface IAdminTeamHeaderBox extends IAdminTeamHeaderPrimaryBox {
  onAssignBrokerageClick: () => void;
  brokerAgeContent: string;
  board: string;
  mls: string;
  state: string;
  website?: string;
  teamAdmin: string;
  teamLead: string;
  joinLink?: string;
  image: string;
  agents_count: number;
  request_count: number;
  closedVolumes?: string;
  transactions?: string;
}

const AdminTeamHeaderBox = ({
  name,
  teamId,
  created,
  onAssignBrokerageClick,
  brokerAgeContent = "-",
  board,
  mls,
  state,
  website,
  status,
  teamAdmin,
  teamLead,
  joinLink,
  image,
  agents_count,
  request_count,
  closedVolumes,
  transactions,
}: IAdminTeamHeaderBox) => {
  const tags = [
    {
      text: `Active Agents: ${agents_count}`,
      bg: "#EBF5FD",
      color: "#000000",
    },
    {
      text: `Open Requests: ${request_count}`,
      bg: "#FFF5E5",
      color: "#000000",
    },
  ];
  //@ts-expect-error ignore
  const newLink = sponsorLink(joinLink, "team");
  return (
    <Flex
      direction={"column"}
      gap={"20px"}
      px={"20px"}
      py={"20px"}
      bg={"white"}
      border={"1px solid #E6E7E9"}
      style={{ boxShadow: "8px 16px 56px 0px #0000000A" }}
      borderRadius={"8px"}
    >
      <Flex justify={"space-between"} alignItems={"center"}>
        <AdminTeamHeaderPrimaryBox
          name={name}
          teamId={teamId}
          created={created}
          status={status}
          image={image}
        />
        <Flex gap={"20px"}>
          <CustomBoxButton
            wrapperClassName="flex-1"
            onClick={onAssignBrokerageClick}
            buttonLabel="Assign Office"
            headerText="Office Details"
            content={brokerAgeContent}
            teamAdmin={teamAdmin}
            teamLead={teamLead}
            isTeamPage
          />
          <AdminTeamHeaderFinalBox
            state={state}
            MLS={mls}
            board={board}
            closedVolumes={closedVolumes}
            transactions={transactions}
          />
        </Flex>
      </Flex>
      <Flex justify={"space-between"} className="items-center">
        <Flex gap={"20px"}>
          {tags?.map((tag: any) => (
            <ColorTags
              key={tag?.text}
              text={tag?.text}
              background={tag?.bg}
              textColor={tag?.color}
              className="!py-[10px] !px-[30px]"
              fontClassName="!text-[18px]"
            />
          ))}
        </Flex>
        {website ? (
          <Flex alignItems={"center"} gap={"10px"}>
            <AppText className="text-[18px] !text-[#10295A]">
              Team Website:{" "}
            </AppText>
            <div className="max-w-[250px] overflow-x-scroll no-scrollbar">
              <AppText>
                <span className="!text-[#000000] whitespace-nowrap">
                  {website || "-"}
                </span>
              </AppText>
            </div>
          </Flex>
        ) : null}
        {joinLink ? (
          <Flex alignItems={"center"} gap={"10px"}>
            <AppText className="text-[18px] !text-[#10295A]">
              Team Join Link:{" "}
            </AppText>
            <div className="max-w-[250px] overflow-x-scroll no-scrollbar">
              <AppText>
                <span className="!text-[#000000] whitespace-nowrap">
                  {newLink || "-"}
                </span>
              </AppText>
            </div>
            <AppButton
              label="Copy"
              icon={<GoCopy />}
              className="bg-[#ffffff] !text-[#10295A] border border-[#10295A] px-[12px] py-[2px]"
              onClick={() => copyUrl(newLink)}
            />
          </Flex>
        ) : null}
      </Flex>
    </Flex>
  );
};

export default AdminTeamHeaderBox;
