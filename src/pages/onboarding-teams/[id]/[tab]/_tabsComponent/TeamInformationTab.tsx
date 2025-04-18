// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
// import ListingTable from '@/app/components/table/ListingTable'
// import useGetTableList from '@/app/hooks/useGetTableList'
// import useHandlePagination from '@/app/hooks/useHandlePagination'
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useState, useContext } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoPersonAddOutline } from "react-icons/io5";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ConfirmRemoveAgentModal } from "../_TeamDocumentationTabModels/ConfirmRemoveAgentModal";
import TeamDocumentationTabModals from "../_TeamDocumentationTabModels/TeamDocumentationTabModals";
// import { getorigin } from '@/app/(dashboards)/agent/agent-website/[tabs]/_tabComponents/services'
import DropDownButton from "../../../../../login/adminlogin/DropDownButton";
import PageHeader from "../../../../onboarding-agents/[id]/documents/PageHeader";
import {
  GET_ADMIN_TEAM_MEMBERS_LIST,
  ADMIN_AGENT_TEAM_LIST,
  POST_REASSIGN_TEAM_MEMBER,
  GET_ADMIN_TEAM_MEMBERS_LIST_META,
} from "../../../../../api-utils";
import ListingTable from "../../../../Auth/AgentComponents/table/ListingTable";
import useGetTableList from "../../../../../utils/hooks/useGetTableList";
import useHandlePagination from "../../../../../utils/hooks/useHandlePagination";
import {
  ADMIN_TEAM_MEMBERS_INDIVIDUAL_PAGE,
  MAKE_TEAM_ROSTER_LIST_PAGE,
} from "../../../../Auth/AgentComponents/navigation/urls";
import makePostRequest from "../../../../../api/makePostRequest";
import AdminSerachComponent from "../../../../../login/adminlogin/AdminSerachComponent";
import AdminFilterRenderer from "../../../../Auth/AgentComponents/admincompenets/AdminFilterRenderer";
import { useDebounce } from "../../../../../utils/hooks/useDebounce";
import {
  commissionPlanOptions,
  debouncerTimeAdmin,
} from "../../../../../utils/functions/commonFunctions";
import CkAppModal from "../../../../Auth/AgentComponents/admincompenets/AppModal";
import ModalRejectComponent from "../../../../onboarding-agents/[id]/components/modal-reject-component";
import useGetMetaFromApi from "../../../../../utils/hooks/useGetMetaFromApi";
import { AdminListFilterContext } from "../../../../Auth/AgentComponents/admincompenets/AdminListFilterProvider";
import AppText from "../../../../../AppComponents/AppText-agent";
import { getorigin } from "./services";

const TeamInformationTab = () => {
  const [isBulkLicenseUpload] = useState(false);
  const params=useParams()

  //@ts-expect-error ignore
  const { AppliedTeamsRosterFilterForm } = useContext(AdminListFilterContext);

  const [searchParams] = useSearchParams();

  const agent_status: any = searchParams.get("agent_status");
  const cap: any = searchParams.get("cap");
  const role = searchParams.get("role");
  const split = searchParams.get("split");

  const { register, control, watch, setValue } = AppliedTeamsRosterFilterForm;

  useEffect(() => {
    router(
      MAKE_TEAM_ROSTER_LIST_PAGE(
        params?.id,
        watch("role")?.value,
        watch("agent_status")?.value,
        watch("cap")?.value,
        watch("split")?.value
      )
    );
  }, [watch("agent_status"), watch("cap"), watch("role"), watch("split")]);

  const { isOpen, onClose } = useDisclosure();
  const router = useNavigate();
  const searchValue = watch("search");
  const debouncedValue = useDebounce(searchValue, debouncerTimeAdmin);
  const {
    isOpen: teamMemberIsOpen,
    onOpen: teamMemberOnOpen,
    onClose: teamMemberOnClose,
  } = useDisclosure();
  const {
    isOpen: teamMemberExistingIsOpen,
    onOpen: teamMemberExistingOnOpen,
    onClose: teamMemberExistingOnClose,
  } = useDisclosure();
  const {
    isOpen: teamMemberReassignIsOpen,
    // onOpen: teamMemberReassignOnOpen,
    onClose: teamMemberReassignOnClose,
  } = useDisclosure();
  const {
    isOpen: teamMemberRemoveIsOpen,
    onOpen: teamMemberRemoveOnOpen,
    onClose: teamMemberRemoveOnClose,
  } = useDisclosure();

  const dropDownData = useMemo(
    () => [
      {
        label: "Add a new member",
        onClick: () => teamMemberOnOpen(),
        menuItemClassName: "",
        icon: <IoPersonAddOutline />,
      },
      {
        label: "Add from existing member",
        onClick: () => teamMemberExistingOnOpen(),
        menuItemClassName: "",
        icon: <IoPersonAddOutline />,
      },
      // {
      //   label: 'Bulk upload',
      //   onClick: () => {
      //     setIsBulkLicenseUpload(false)
      //     onOpen()
      //   },
      //   menuItemClassName: '',
      //   icon: <IoCloudUploadOutline />,
      // },
      // {
      //   label: 'Bulk upload with data',
      //   onClick: () => {
      //     setIsBulkLicenseUpload(true)
      //     onOpen()
      //   },
      //   menuItemClassName: '',
      //   icon: <IoCloudUploadOutline />,
      // },
      // {
      //   label: 'Reassign team member',
      //   onClick: () => teamMemberReassignOnOpen(),
      //   menuItemClassName: '',
      //   icon: <IoPersonAddOutline />,
      // },
    ],
    []
  );

  const { page, handleMaxPage, max, handlePaginationClick, setPage } =
    useHandlePagination();

  const {
    listData,
    listMeta,
    isLoading,
    selectable,
    refetch,
    totalListCount,
    currentListCount,
    isFetching,
  } = useGetTableList({
    endPoint: GET_ADMIN_TEAM_MEMBERS_LIST(params?.id),
    metaEndPoint: GET_ADMIN_TEAM_MEMBERS_LIST_META(params?.id),
    handleMax: handleMaxPage,
    page,
    setPage,
    filterObject: {
      role: watch("role")?.value,
      agent_status: watch("agent_status")?.value,
      search: searchValue || "",
      cap_structure: watch("cap")?.value,
      commission_plan: watch("split")?.value,
    },
    deps: [role, agent_status, cap, split],
    refetchDeps: [debouncedValue],
  });

  const showTextAsTag = {
    approved: "green",
    waiting_for_approval: "yellow",
    application_in_progress: "yellow",
    invite_sent: "yellow",
    uploaded: "yellow",
    Rejected: "red",
    rejected: "red",
    active: "green",
    inactive: "red",
    new: "blue",
  };

  const modalPorps = {
    bulkUploadIsOpen: isOpen,
    bulkUploadOnClose: onClose,
    teamMemberIsOpen,
    teamMemberOnClose,
    teamMemberOnOpen,
    teamMemberExistingIsOpen,
    teamMemberExistingOnClose,
    isBulkLicenseUpload,
  };

  // const { mutate: sendLinkMutate, isLoading: isSendLinkLoading } = useMutation(
  //   //@ts-expect-error ignore
  //   (body) => makePostRequest(ADMIN_TEAM_LIST_SEND_INVITE, body),
  //   {
  //     onSuccess: () => {
  //       toast.success('Invite sended successfully')
  //       selectable.setSelect([])
  //     },
  //     onError: (err) => {
  //       console.log(err)
  //       toast.error('Error')
  //     },
  //   }
  // )
  // Reassign team member
  const { mutate: reassignTeamMutate, isLoading: reassignTeamLoading } =
    useMutation(
      //@ts-expect-error ignore
      (body) => makePostRequest(POST_REASSIGN_TEAM_MEMBER, body),
      {
        onSuccess: () => {
          toast.success("Reassign Done successfully");
          selectable.setSelect([]);
          teamMemberReassignOnClose();
          refetch();
        },
        onError: (err) => {
          console.log(err);
          toast.error("Error");
        },
      }
    );

  const { metaData, handleOnInputChange } = useGetMetaFromApi({
    endPoint: ADMIN_AGENT_TEAM_LIST,
  });

  const [team, setTeam] = useState();

  const teamList = metaData?.data?.results ?? [];

  const customFunction = useCallback(
    (obj: any) => {
      const act = [
        {
          label: "Edit Team member Details",
          onClick: () =>
            //@ts-expect-error ignore
            router(ADMIN_TEAM_MEMBERS_INDIVIDUAL_PAGE(params?.id, obj?.id)),
        },
        {
          label: "View Agent Website",
          onClick: () => {
            //@ts-expect-error ignore
            const url =
              getorigin("agent") + `/website/${obj?.user?.website_slug}`;
            obj?.user?.website_slug && window.open(url, "_blank");
          },
        },
        {
          label: "Remove Team Member",
          onClick: () => {
            //@ts-expect-error ignore
            teamMemberRemoveOnOpen();
            setTeam(obj);
          },
        },
      ]?.filter((f: any) => f?.label);
      return (
        <Menu>
          <MenuButton
            w="fit-content"
            display={"flex"}
            justifyContent={"center"}
            margin={"auto"}
          >
            <HiOutlineDotsHorizontal />
          </MenuButton>
          <MenuList>
            {act?.map((m) => (
              <MenuItem onClick={() => m?.onClick()} key={m?.label}>
                {m?.label}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      );
    },
    [listData]
  );

  const filterOptions = listMeta?.data?.filter_data;

  const filterArr = [
    {
      type: "select",
      filterLabel: "Agent Status",
      name: "agent_status",
      options: filterOptions?.agent_status,
    },
    {
      type: "select",
      filterLabel: "Role",
      name: "role",
      options: filterOptions?.role,
    },
    {
      type: "select",
      filterLabel: "Cap Structure",
      name: "cap",
      options: filterOptions?.cap_structure,
    },
    {
      type: "select",
      filterLabel: "Split",
      name: "split",
      options: commissionPlanOptions,
    },
  ];

  // const handleButtonClick = (obj?: any) => {
  //   const selectedData = selectable?.select?.map((each: any) => {
  //     return each?.user?.id
  //   })
  //   const bdy = {
  //     agents_id: selectedData.length !== 0 ? selectedData : [obj?.user?.id],
  //   }
  //   //@ts-expect-error ignore
  //   sendLinkMutate(bdy)
  // }
  const handleTabClick = (obj: any) => {
    router(ADMIN_TEAM_MEMBERS_INDIVIDUAL_PAGE(params?.id, obj?.id));
  };

  const inputFields = useMemo(
    () => [
      {
        name: "team",
        label: "Select Team",
        otherRegProps: {
          required: true,
          // value: { label: data?.team?.identity, value: data?.team?.id },
        },
        type: "select",
        options: teamList,
        onInpuChange: (val: any) => handleOnInputChange(val),
      },
    ],
    [teamList]
  );

  const handleReassignTeam = (bdyObj: any) => {
    const selectedData = selectable?.select?.map((each: any) => {
      return each?.id;
    });
    const bdy = {
      new_team: bdyObj?.data?.team?.id,
      team_members: selectedData,
    };
    if (selectedData?.length < 1) {
      toast.error("Please select a Member !");
    } else {
      //@ts-expect-error ignore
      reassignTeamMutate(bdy);
    }
  };

  return (
    <Box>
      <CkAppModal
        className="!w-full !max-w-[723px]"
        bodyClassName="!px-[40px] !py-[6px]"
        isOpen={teamMemberReassignIsOpen}
        onClose={teamMemberReassignOnClose}
        //@ts-expect-error ignore
        header={`Reassign to the Team`}
        headerClassName="rounded-md text-[#10295A] text-[20px] font-[500] !py-[26px] !px-[40px] "
        closeButton={true}
      >
        <ModalRejectComponent
          onClose={() => teamMemberReassignOnClose()}
          inputFields={inputFields}
          buttonLabel1="Cancel"
          buttonLabel2="Reassign"
          handleSumbit={handleReassignTeam}
          isLoading={reassignTeamLoading}
        />
      </CkAppModal>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <PageHeader title="Team Members" />

        <div className="flex gap-[20px]">
          {/* <AppButton
            className=""
            disabled={selectable?.select?.length === 0}
            onClick={handleButtonClick}
            isLoading={isSendLinkLoading}
          >
            Send Invite
          </AppButton> */}
          <DropDownButton
            triggererIcon={<IoIosAddCircleOutline />}
            dropDownBtnText="Add a Team Member"
            dropDownBtnMenuList={dropDownData}
          />
        </div>
      </Flex>
      <Flex mb={"40px"} justifyContent={"space-between"}>
        <Flex gap={"20px"}>
          <AdminSerachComponent
            placeholder="Search by Agent name"
            register={register("search")}
          />
          <AdminFilterRenderer
            register={register}
            filterArr={filterArr}
            control={control}
            setValue={setValue}
            watch={watch}
            // reset={reset}
          />
        </Flex>
      </Flex>
      <Box mt={"38px"}>
        <Box className="flex justify-end">
          <AppText
            text={`Count:${currentListCount ? currentListCount : "0"} / ${
              totalListCount ? totalListCount : "0"
            } `}
          />
        </Box>
        <ListingTable
          showTextAsTag={showTextAsTag}
          customFunction={customFunction}
          handlePaginationClick={handlePaginationClick}
          max={max}
          tableMeta={listMeta}
          tableData={listData}
          //@ts-expect-error ignore
          avatar={["full_name"]}
          //@ts-expect-error ignore
          relativeTime={["created"]}
          selectable={selectable}
          isLoading={isLoading || isFetching}
          forcePage={page - 1}
          handleTabClick={handleTabClick}
        />
      </Box>
      <TeamDocumentationTabModals
        refetch={refetch}
        params={params?.id}
        {...modalPorps}
      />
      <ConfirmRemoveAgentModal
        isOpen={teamMemberRemoveIsOpen}
        onClose={teamMemberRemoveOnClose}
        data={team}
      />
    </Box>
  );
};

export default TeamInformationTab;
