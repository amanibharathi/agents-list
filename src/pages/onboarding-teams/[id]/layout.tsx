import AdminContainer from '../../Auth/AgentComponents/admincompenets/AdminContainer'
import AdminBreadcrumbs from '../../Auth/AgentComponents/admincompenets/AdminBreadcrumbs'
// import AppButton from '@/app/components/elements/AppButton'
import { Box, Flex, useDisclosure } from '@chakra-ui/react'
import {  useMemo } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import AdminTeamHeaderBox from '../components/AdminTeamHeaderBox'
import {
  ADMIN_TEAM_EDIT_PAGE,
  MAKE_ADMIN_TEAM_DETAIL_TAB,
  MAKE_AGENT_RELATED_LIST_PAGE,
  MAKE_AGENT_RELATED_LIST_PAGE1,
} from '../../Auth/AgentComponents/navigation/urls'
import { useMutation, useQuery } from 'react-query'
import makeGetRequest from'../../../api/makeGetRequest'
import {
  ADMIN_AGENT_ASSIGN_OFFICE_BROKERAGE_POST,
  ADMIN_AGENT_TEAM_DETAIL,
  AGENT_DASHBOARD_OFFICE_OR_BROKERAGE_LIST,
  REMOVE_OFFICE_AGENT,
} from '../../../api-utils'
// import CkAppModal from '@/app/components/modal/AppModal'
import ModalRejectComponent from '../../onboarding-agents/[id]/components/modal-reject-component'
import makePostRequest from '../../../api/makePostRequest'
import toast from 'react-hot-toast'
import {
  extractIdentities,
  getFirstErrorMessage,
} from '../../../utils/functions/commonFunctions'
import { v4 as uuidv4 } from 'uuid'
import AppButton from '../../../AppComponents/AppButton-agent'
import SecondaryNav from '../../onboarding-agents/[id]/on-oboarding-application/components/secondaryNav'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import CkAppModal from '../../Auth/AgentComponents/admincompenets/AppModal'

const ApprovedLayout = () => {
  const {id} = useParams()
  const location = useLocation();
  const pathname = location.pathname;
  const editPage = pathname.split('/')?.includes('edit')
  const router = useNavigate()
  const {
    data: detailData,
    refetch,
    isLoading,
  } = useQuery([ADMIN_AGENT_TEAM_DETAIL(id)], () =>
    makeGetRequest(ADMIN_AGENT_TEAM_DETAIL(id))
  );
  const {
    isOpen: isOffOpen,
    onOpen: onOffOpen,
    onClose: onOffClose,
  } = useDisclosure();
  const isApprovedTeam = detailData?.data?.status === "approved";
  const breadcrumbs = useMemo(
    () => [
      {
        text: "Agents",
        link: "/admin/agents/agents-list",
      },
      {
        text: "Onboarding - Teams",
        link: isApprovedTeam
          ? "/admin/agents/teams-list"
          : "/admin/agents/applied-teams-list",
      },
      {
        text: detailData?.data?.identity,
      },
    ],
    [detailData]
  );
  const navData = useMemo(
    () => [
      {
        id: "1",
        label: "Team Members",
        link: MAKE_ADMIN_TEAM_DETAIL_TAB(id, "team-members"),
        includes: "team-members",
      },
      {
        id: "2",
        label: "Team Requests",
        link: MAKE_ADMIN_TEAM_DETAIL_TAB(id, "team-requests"),
        includes: "team-requests",
      },
      {
        id: "3",
        label: "Documents",
        link: MAKE_ADMIN_TEAM_DETAIL_TAB(id, "documents"),
        includes: "documents",
      },
      {
        id: "4",
        label: "Activity Log",
        link: MAKE_ADMIN_TEAM_DETAIL_TAB(id, "activity-log"),
        includes: "activity-log",
      },
    ],
    []
  );

  const { data: office } = useQuery(
    [AGENT_DASHBOARD_OFFICE_OR_BROKERAGE_LIST],
    () => makeGetRequest(AGENT_DASHBOARD_OFFICE_OR_BROKERAGE_LIST)
  );
  const getLabel = (val: any) => {
    const cvalue = val?.map((each: any) => {
      return {
        label: each?.identity,
        value: each?.id,
      };
    });
    return cvalue;
  };
  const officeList = office?.data?.results ?? [];
  const inputFields = useMemo(
    () => [
      {
        name: "office",
        label: "Select office",
        otherRegProps: {
          required: true,
          value:
            detailData?.data?.brokerage?.length !== 0
              ? getLabel(detailData?.data?.brokerage)
              : null,
          onChange: (e: any) => handleOfficeDelete(e.target?.value),
        },
        type: "multi-select",
        options: officeList,
      },
    ],
    [officeList, detailData]
  );
  const { mutate: officeMutate } = useMutation(
    (body) => makePostRequest(ADMIN_AGENT_ASSIGN_OFFICE_BROKERAGE_POST, body),
    {
      onSuccess: () => {
        refetch();
        onOffClose();
        toast.success("Assigned Successfully");
      },
      onError: (err: any) => {
        //@ts-expect-error ignore
        const errMsg = getFirstErrorMessage(err?.response?.data?.data);
        //@ts-expect-error ignore
        toast.error(errMsg);
      },
    }
  );

  const { mutate: removeOfficeMutate } = useMutation(
    (body) => makePostRequest(REMOVE_OFFICE_AGENT, body),
    {
      onSuccess() {
        refetch();
      },
      onError: (err: any) => {
        //@ts-expect-error ignore
        const errMsg = getFirstErrorMessage(err?.response?.data?.data);
        //@ts-expect-error ignore
        toast.error(errMsg);
      },
    }
  );

  // const handleOfficeDelete = (val: any) => {
  //   if (data?.brokerage && data?.brokerage?.length !== 0) {
  //     const value = data?.brokerage?.filter((each: any) => {
  //       return !val?.some((eachSome: any) => each?.id == eachSome?.value)
  //     })
  //     if (value?.length !== 0) {
  //       const bdy = {
  //         team: [],
  //         members: [parseInt(data?.id)],
  //         brokerage: value?.map((each: any) => {
  //           return each?.value || each?.id
  //         }),
  //       }
  //       //@ts-expect-error ignore
  //       removeOfficeMutate(bdy)
  //     }
  //   }
  // }

  const handleOfficeDelete = (val: any) => {
    if (
      detailData?.data?.brokerage &&
      detailData?.data?.brokerage?.length !== 0
    ) {
      const value = detailData?.data?.brokerage?.filter((each: any) => {
        return !val?.some((eachSome: any) => each?.id == eachSome?.value);
      });
      if (value?.length !== 0) {
        const bdy = {
          team: [parseInt(detailData?.data?.id)],
          members: [],
          brokerage: value?.map((each: any) => {
            return each?.value || each?.id;
          }),
        };
        //@ts-expect-error ignore
        removeOfficeMutate(bdy);
      }
    }
  };

  const handleSumbitOffice = (bdyObj: any) => {
    const bdy = {
      members: [],
      team: [parseInt(detailData?.data?.id)],
      brokerage: bdyObj?.data?.office?.map((each: any) => {
        return each?.id || each?.value;
      }),
    };
    //@ts-expect-error ignore
    officeMutate(bdy);
  };

  const nav = useMemo(
    () => [
      {
        id: uuidv4(),
        label: "Active Agents",
        link: MAKE_AGENT_RELATED_LIST_PAGE("agents-list"),
      },
      {
        id: uuidv4(),
        label: "Active Teams",
        link: MAKE_AGENT_RELATED_LIST_PAGE1("teams-list"),
        includes: ["/admin/teams/onboarding-teams/"],
      },
      {
        id: uuidv4(),
        label: "Applied Agents",
        link: MAKE_AGENT_RELATED_LIST_PAGE("applied-agents-list"),
      },
      {
        id: uuidv4(),
        label: "Applied Teams",
        link: MAKE_AGENT_RELATED_LIST_PAGE1("applied-teams-list"),
      },
    ],
    []
  );

  return (
    <>
      {/* <SecondaryNav
        wrapperClassName="!justify-start w-full max-w-[1360px] mx-auto px-[10px] bg-[#ffffff] bg-[#ffffff] border-b-[1.5px] border-[#CDCDCD80]"
        isSelectedClassName="!text-[#10295A]"
        tabClassName="!px-[0px]"
        navData={nav}
        urlPath={pathname}
      /> */}
      <AdminContainer className="bg-[#ffffff]" isLoading={isLoading}>
        {!editPage && (
          <Flex justifyContent={"space-between"} alignItems={"end"}>
            <AdminBreadcrumbs route={breadcrumbs} />
            <AppButton
              onClick={() => router(ADMIN_TEAM_EDIT_PAGE(id))}
              icon={<FaRegEdit />}
            >
              Edit Details
            </AppButton>
          </Flex>
        )}
        {!editPage && (
          <>
            <Box mt={"39px"}>
              <AdminTeamHeaderBox
                onAssignBrokerageClick={() => onOffOpen()}
                brokerAgeContent={
                  detailData?.data?.brokerage?.length !== 0
                    ? detailData?.data?.brokerage
                        ?.map((each: any) => each?.identity)
                        ?.join(", ")
                    : "-"
                }
                board={extractIdentities(detailData?.data?.board)}
                mls={extractIdentities(detailData?.data?.mls)}
                state={detailData?.data?.state?.identity}
                name={detailData?.data?.identity}
                teamId={detailData?.data?.team_id || "0"}
                created={detailData?.data?.created}
                website={detailData?.data?.website}
                joinLink={detailData?.data?.referral_code}
                status={detailData?.data?.status ?? ""}
                teamAdmin={
                  extractIdentities(detailData?.data?.team_admins) || ""
                }
                teamLead={
                  extractIdentities(detailData?.data?.team_leaders) || ""
                }
                image={detailData?.data?.image ?? ""}
                agents_count={detailData?.data?.active_agents_count || 0}
                request_count={detailData?.data?.open_request_count || 0}
                closedVolumes={detailData?.data?.closed_volumes}
                transactions={detailData?.data?.no_of_transactions}
              />
            </Box>

            <Box mt={"40px"} borderBottom={"1px solid #CDCDCD80"}>
              <SecondaryNav
                tabClassName="text-[16px] !text-[#000000]"
                isSelectedClassName="!text-[#10295A]"
                urlPath={pathname}
                navData={navData}
              />
            </Box>
          </>
        )}

        <Outlet/>
        <CkAppModal
          className="!w-full !max-w-[723px]"
          bodyClassName="!px-[40px] !py-[6px]"
          isOpen={isOffOpen}
          onClose={onOffClose}
          //@ts-expect-error ignore
          header={`Assign Office - ${detailData?.data?.identity}`}
          headerClassName="rounded-md text-[#10295A] text-[20px] font-[500] !py-[26px] !px-[40px] "
          closeButton={true}
        >
          <ModalRejectComponent
            onClose={() => onOffClose()}
            inputFields={inputFields}
            buttonLabel1="Cancel"
            buttonLabel2="Save"
            handleSumbit={handleSumbitOffice}
          />
        </CkAppModal>
      </AdminContainer>
    </>
  );
};

export default ApprovedLayout;
