"use client";
import AdminBreadcrumbs from "@/app/admin/_AdminComponent/AdminBreadcrumbs/AdminBreadcrumbs";
import AdminContainer from "@/app/admin/_AdminComponent/AdminContainer";
import AppButton from "@/app/components/elements/AppButton";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import React, { ReactNode, useMemo } from "react";
import SecondaryNav from "@/app/components/layouts/secondaryNav";
import { usePathname } from "next/navigation";
import {
  MAKE_ACTIVE_TEAMS_LIST_PAGE,
  MAKE_ADMIN_APPLIED_TEAM_DETAIL_TAB,
  MAKE_AGENT_RELATED_LIST_PAGE,
} from "@/app/utils/navigation";
import { useMutation, useQuery } from "react-query";
import makeGetRequest from "@/app/utils/api/makeGetRequest";
import {
  ADMIN_AGENT_ASSIGN_OFFICE_BROKERAGE_POST,
  ADMIN_AGENT_TEAM_DETAIL,
  ADMIN_TEAM_CUD,
  AGENT_DASHBOARD_OFFICE_OR_BROKERAGE_LIST,
  REMOVE_OFFICE_AGENT,
} from "@/app/api-utils";
import CkAppModal from "@/app/components/modal/AppModal";
import ModalRejectComponent from "../../onboarding-agents/[id]/components/modal-reject-component";
import makePostRequest from "@/app/utils/api/makePostRequest";
import toast from "react-hot-toast";
import {
  extractIdentities,
  getFirstErrorMessage,
} from "@/app/utils/functions/otherFunctions";
import AdminTeamHeaderBox from "./components/AdminTeamHeaderBox";
import makePatchRequest from "@/app/utils/api/makePatchRequest";
import { useRouter } from "next-nprogress-bar";
import ConfirmDeleteTeamModal from "../../components/ListingComponents/ConfirmDeleteTeam";
import { v4 as uuidv4 } from "uuid";

const Layout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: string; tab: string };
}) => {
  const id = params?.id;
  const pathname = usePathname();
  const editPage = pathname.split("/")?.includes("edit");
  const { data: detailData, refetch } = useQuery(
    [ADMIN_AGENT_TEAM_DETAIL(id)],
    () => makeGetRequest(ADMIN_AGENT_TEAM_DETAIL(id))
  );

  const rejectedStatus = detailData?.data?.status == "rejected";
  const {
    isOpen: isOffOpen,
    onOpen: onOffOpen,
    onClose: onOffClose,
  } = useDisclosure();
  const {
    isOpen: isRemoveOpen,
    onOpen: onRemoveOpen,
    onClose: onRemoveClose,
  } = useDisclosure();
  const breadcrumbs = useMemo(
    () => [
      {
        text: "Agents",
        link: "/admin/agents/agents-list",
      },
      {
        text: "Applied Teams",
        link: "/admin/agents/applied-teams-list",
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
        label: "Team Details",
        link: MAKE_ADMIN_APPLIED_TEAM_DETAIL_TAB(id, "team-details"),
        includes: "team-details",
      },
      {
        id: "2",
        label: "Documents",
        link: MAKE_ADMIN_APPLIED_TEAM_DETAIL_TAB(id, "documents"),
        includes: "documents",
      },
      {
        id: "3",
        label: "Activity Log",
        link: MAKE_ADMIN_APPLIED_TEAM_DETAIL_TAB(id, "activity-log"),
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
  const router = useRouter();

  const { mutate: approveOrRejectMutate, isLoading: approveOrRejectLoading } =
    useMutation((body) => makePatchRequest(ADMIN_TEAM_CUD(id), body), {
      onSuccess: (res) => {
        toast.success(`Team ${res?.data?.status} successfully`);
        router.push(MAKE_ACTIVE_TEAMS_LIST_PAGE());
      },
      onError: (err: any) => {
        //@ts-expect-error ignore
        const errMsg = getFirstErrorMessage(err?.response?.data?.data);
        //@ts-expect-error ignore
        toast.error(errMsg);
      },
    });
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
        link: MAKE_AGENT_RELATED_LIST_PAGE("teams-list"),
      },
      {
        id: uuidv4(),
        label: "Applied Agents",
        link: MAKE_AGENT_RELATED_LIST_PAGE("applied-agents-list"),
      },
      {
        id: uuidv4(),
        label: "Applied Teams",
        link: MAKE_AGENT_RELATED_LIST_PAGE("applied-teams-list"),
        includes: ["/admin/agents/applied-teams/"],
      },
    ],
    []
  );

  return (
    <AdminContainer className="bg-[#ffffff]">
      <SecondaryNav
        wrapperClassName="!justify-start w-full max-w-[1360px] mx-auto px-[10px] bg-[#ffffff] bg-[#ffffff] border-b-[1.5px] border-[#CDCDCD80]"
        isSelectedClassName="!text-[#10295A]"
        tabClassName="!px-[0px]"
        navData={nav}
        urlPath={pathname}
      />
      {!editPage && (
        <Flex justifyContent={"space-between"} alignItems={"end"}>
          <AdminBreadcrumbs route={breadcrumbs} />
          {!rejectedStatus && (
            <Flex gap={"16px"}>
              <AppButton
                variant="outline"
                className="max-h-[39px] !px-[30px] !py-[10px] flex items-center"
                onClick={() => {
                  onRemoveOpen();
                }}
              >
                Reject Team
              </AppButton>
              <AppButton
                onClick={() => {
                  //@ts-expect-error ignore
                  approveOrRejectMutate({ status: "approved" });
                }}
                className="max-w-[170px] whitespace-nowrap"
              >
                Approve Team
              </AppButton>
            </Flex>
          )}
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
              status={detailData?.data?.status ?? ""}
              teamAdmin={extractIdentities(detailData?.data?.team_admins) || ""}
              teamLead={extractIdentities(detailData?.data?.team_leaders) || ""}
              image={detailData?.data?.image ?? ""}
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

      {children}
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
      <ConfirmDeleteTeamModal
        headerText="Are you sure want to reject team?"
        deleteMutate={approveOrRejectMutate}
        isLoading={approveOrRejectLoading}
        onClose={onRemoveClose}
        isOpen={isRemoveOpen}
        btnLabel="reject"
      />
    </AdminContainer>
  );
};

export default Layout;
