import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "../../utils/hooks/useDebounce";
import {
  debouncerTimeAdmin,
  removeSpecialChars,
  validateName,
} from "../../utils/functions/commonFunctions";
import useHandlePagination from "../../utils/hooks/useHandlePagination";
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  ADMIN_AGENTS_LISTING,
  MAKE_APPLIED_AGENTS_LIST_PAGE,
} from "../Auth/AgentComponents/navigation/urls";
import { useMutation, useQuery } from "react-query";
import {
  ADMIN_AGENT_STATE_LIST,
  ADMIN_CREATE_TEAM_MEMBER_AGENT,
  GET_ADMIN_BROKERAGE_LIST,
  GET_AGENTS_LIST_IN_ADMIN,
  GET_AGENTS_LIST_META_IN_ADMIN,
} from "../../api-utils";
import makeGetRequest from "../../api/makeGetRequest";
import useGetTableList from "../../utils/hooks/useGetTableList";
import toast from "react-hot-toast";
import useHandleExportData from "../../utils/hooks/useHandleExportData";
import { useAppStore } from "../../store-admin";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import moment from "moment";
import { ADMIN_MAKE_AGENT_INDIVIDUAL_PAGE } from "../Auth/AgentComponents/navigation";
import makePostRequest from "../../api/makePostRequest";
import CkAppModal from "../Auth/AgentComponents/admincompenets/AppModal";
import AdminContainer from "../Auth/AgentComponents/admincompenets/AdminContainer";
import AdminBreadcrumbs from "../Auth/AgentComponents/admincompenets/AdminBreadcrumbs";
import AdminHeaderWithButtons from "../Auth/AgentComponents/admincompenets/AdminHeaderWithButtons";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import AdminSerachComponent from "../Auth/AgentComponents/admincompenets/AdminSerachComponent";
import AdminFilterRenderer from "../Auth/AgentComponents/admincompenets/AdminFilterRenderer";
import AppButton from "../../AppComponents/AppButton-agent";
import { GoUpload } from "react-icons/go";
import { LuFileInput } from "react-icons/lu";
import AppText from "../../AppComponents/AppText-agent";
import ListingTable from "../Auth/AgentComponents/table/ListingTable";
import { ConfirmRemoveAgentModal } from "../Auth/AgentComponents/admincompenets/ConfirmRemoveAgentModal";
import ConfirmDeleteAgentModal from "../Auth/AgentComponents/admincompenets/ConfirmDeleteAgentModal";
import BulkUploadAgentsModal from "../../Components/BulkUploadAgentsModal";
import DashboardCardStatsList from "../../Components/DashboardCardStatsList";
import CreateCommonModal from "../../Components/createIndividualAgent";
import { DashIconTotalAgents } from "../../assets";
import { AdminListFilterContext } from "../Auth/AgentComponents/admincompenets/AdminListFilterProvider";
import makeDeleteRequest from "../../api/makeDeleteRequest";

const AppliedAgents = () => {
  const [dateRange, setDateRange] = useState<any>({});
  //@ts-expect-error ignore
  const { appliedAgentsFilterForm } = useContext(AdminListFilterContext);
  //@ts-expect-error ignore
  const { register, control, watch, setValue } = appliedAgentsFilterForm;

  const [isBulkLicenseUpload, setIsBulkLicenseUpload] = useState(false);
  const router = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const searchValue = watch("search");
  const debouncedValue = useDebounce(searchValue, debouncerTimeAdmin);
  const [agent, setAgent] = useState({});
  const { page, handleMaxPage, max, handlePaginationClick, setPage } =
    useHandlePagination();
  const {
    isOpen: bulkUploadIsOpen,
    onOpen: bulkUploadOnOpen,
    onClose: bulkUploadOnClose,
  } = useDisclosure();
  const {
    isOpen: CreateAgentIsOpen,
    onOpen: CreateAgentOnOpen,
    onClose: CreateAgentOnClose,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const formUtil = useForm({ mode: "onSubmit" });

  const breadcrumbs = useMemo(
    () => [
      {
        text: "Agents",
        link: ADMIN_AGENTS_LISTING,
      },
      {
        text: "Applied Agents",
      },
    ],
    []
  );

  const { data: agentsStateData } = useQuery([ADMIN_AGENT_STATE_LIST], () =>
    makeGetRequest(ADMIN_AGENT_STATE_LIST)
  );

  const listStateData = agentsStateData?.data?.results ?? [];

  // brokerage list
  const { data: brokerageList } = useQuery([GET_ADMIN_BROKERAGE_LIST], () =>
    makeGetRequest(GET_ADMIN_BROKERAGE_LIST)
  );

  const brokerageListData = brokerageList?.data?.results ?? [];

  const stage_status: any = searchParams.get("stage_status");
  const agent_status = searchParams.get("agent_status");
  const onboard_type = searchParams.get("onboard_type");
  const primary_state = searchParams.get("primary_state");
  const stage = searchParams.get("stage");
  const sort_by = searchParams.get("sort_by");
  const brokerage = searchParams.get("brokerage");
  const modified_after = searchParams.get("modified_after");
  const modified_before = searchParams.get("modified_before");
  const last_active = searchParams.get("last_active");

  useEffect(() => {
    setValue("agent_status", {
      id: agent_status,
      identity: agent_status,
      value: agent_status,
      label: agent_status,
    });
  }, [agent_status]);

  const {
    listData,
    listMeta,
    isLoading,
    selectable,
    refetch,
    totalListCount,
    currentListCount,
  } = useGetTableList({
    endPoint: GET_AGENTS_LIST_IN_ADMIN() + `?applied_agents=True`,
    metaEndPoint: GET_AGENTS_LIST_META_IN_ADMIN(true),
    handleMax: handleMaxPage,
    page,
    setPage,
    filterObject: {
      stage_status: watch("stage_status")?.value,
      agent_status: agent_status, // watch('agent_status')?.value,
      stage: watch("stage")?.value,
      onboard_type: watch("onboard_type")?.value,
      primary_state: watch("primary_state")?.value,
      search: searchValue || "",
      sort_by: watch("sort_by")?.value,
      brokerage: watch("brokerage")?.value,
      modified_after:
        dateRange?.startDate &&
        moment(dateRange?.startDate).format("YYYY-MM-DD"),
      modified_before:
        dateRange?.endDate && moment(dateRange?.endDate).format("YYYY-MM-DD"),
      last_active: last_active,
    },
    deps: [
      stage_status,
      agent_status,
      onboard_type,
      primary_state,
      stage,
      sort_by,
      brokerage,
      modified_after,
      modified_before,
    ],
    refetchDeps: [debouncedValue],
  });

  const { mutate: deleteMutate, isLoading: deleteIsLoading } = useMutation(
    () => makeDeleteRequest(ADMIN_CREATE_TEAM_MEMBER_AGENT(agent?.id)),
    {
      onSuccess: () => {
        refetch();
        onClose();
      },
      onError: () => {
        toast.error("Unable to logout");
      },
    }
  );

  const { isLoading: exportDataIsLoading, generateData } =
    useHandleExportData();

  const filterOptions = listMeta?.data?.filter_data;

  const sortByOption = listMeta?.data?.sort_by;

  const filterArr = [
    // {
    //   type: 'select',
    //   filterLabel: 'State',
    //   name: 'agent_state',
    //   options: filterOptions?.agent_type,
    // },
    // {
    //   type: 'select',
    //   filterLabel: 'Managing Broker',
    //   name: 'agent_broker',
    //   options: filterOptions?.agent_type,
    // },
    // {
    //   type: 'select',
    //   filterLabel: 'Progress',
    //   name: 'agent_progress',
    //   options: filterOptions?.agent_type,
    // },
    // {
    //   type: "select",
    //   filterLabel: "Brokerage",
    //   name: "brokerage",
    //   options: brokerageListData,
    // },
    // {
    //   type: "select",
    //   filterLabel: "Agent Status",
    //   name: "agent_status",
    //   options: filterOptions?.agent_status,
    //   value: {
    //     id: agent_status,
    //     identity: agent_status,
    //     value: agent_status,
    //     label: agent_status,
    //   },
    // },
    {
      type: "select",
      filterLabel: "Status",
      name: "status",
      options: filterOptions?.status,
    },
    // {
    //   type: "select",
    //   filterLabel: "Stage Status",
    //   name: "stage_status",
    //   options: filterOptions?.stage_status,
    //   isDisabled: !watch("stage")?.value,
    // },
    // {
    //   type: "select",
    //   filterLabel: "Onboard Type",
    //   name: "onboard_type",
    //   options: filterOptions?.onboard_type,
    // },
    {
      type: "select",
      filterLabel: "State",
      name: "primary_state",
      options: listStateData,
    },
    {
      type: "select",
      filterLabel: "Sort by",
      name: "sort_by",
      options: sortByOption,
    },
    {
      type: "dob",
    },
  ];

  const inputFields = [
    {
      label: "First Name*",
      name: "first_name",
      placeholder: "Enter First Name",
      className: "!z-[2]",
      formControlClassName: "!z-[2]",
      otherRegProps: {
        required: true,
        validate: validateName,
      },
    },
    {
      label: "Last Name*",
      name: "last_name",
      otherRegProps: {
        required: true,
        validate: validateName,
      },
    },
    {
      label: "Phone Number*",
      name: "phone_number",
      type: "tel",
    },
    {
      label: "Email*",
      name: "email",
      otherRegProps: {
        pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,20})+$/,
        required: true,
      },
    },
    {
      label: "Country*",
      name: "country",
      otherRegProps: {
        required: true,
      },
    },
  ];

  const showTextAsTag = {
    approved: "green",
    waiting_for_approval: "yellow",
    application_in_progress: "yellow",
    invite_sent: "yellow",
    uploaded: "yellow",
    rejected: "red",
    new: "blue",
    active: "green",
    inactive: "red",
  };

  const cardListData = useMemo(() => {
    return [
      {
        title: "Total Applied",
        value: listMeta?.data?.list_count_meta?.total_applied || "0",
        icon: DashIconTotalAgents,
        link: "",
      },
      {
        title: "Onboarding Inprogress",
        value: listMeta?.data?.list_count_meta?.onboarding_in_progress || "0",
        icon: DashIconTotalAgents,
        link: "",
      },
      {
        title: "Waiting for Approval",
        value: listMeta?.data?.list_count_meta?.waiting_for_approval || "0",
        icon: DashIconTotalAgents,
        link: "",
      },
      {
        title: "Rejected",
        value: listMeta?.data?.list_count_meta?.rejected || "0",
        icon: DashIconTotalAgents,
        link: "",
      },
    ];
  }, [listMeta]);

  const { adminRoles } = useAppStore();

  // const isDeletable = adminRoles && adminRoles["Agent Management Policy"]?.permissions?.is_deletable;
  const isDeletable=true
  const customFunction = useCallback(
    (obj: any) => {
      const act = [
        {
          label: "View Agent",
          onClick: () =>
            //@ts-expect-error ignore
            router(ADMIN_MAKE_AGENT_INDIVIDUAL_PAGE(obj?.id)),
        },
        isDeletable && {
          label: "Remove Agent",
          onClick: () => {
            setAgent(obj);
            onOpen();
          },
        },
        {
          label: "Send Invite",
          onClick: () => {
            handleSendInvite(obj);
          },
        },
      ]
        ?.filter(Boolean)
        ?.filter((f: any) => f?.label);
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
    [listData, adminRoles]
  );

  useEffect(() => {
    router(
      MAKE_APPLIED_AGENTS_LIST_PAGE(
        watch("stage_status")?.value,
        watch("agent_status")?.value,
        watch("stage")?.value,
        watch("onboard_type")?.value,
        watch("primary_state")?.value,
        watch("sort_by")?.value,
        watch("brokerage")?.value,
        dateRange?.startDate
          ? moment(dateRange?.startDate).format("YYYY-MM-DD")
          : null,
        dateRange?.endDate
          ? moment(dateRange?.endDate).format("YYYY-MM-DD")
          : null,
        last_active
      )
    );
  }, [
    agent_status,
    watch("stage_status"),
    watch("agent_status"),
    watch("onboard_type"),
    watch("primary_state"),
    watch("stage"),
    watch("sort_by"),
    watch("brokerage"),
    dateRange,
  ]);

  const handleTabClick = (obj: any) => {
    router(ADMIN_MAKE_AGENT_INDIVIDUAL_PAGE(obj?.id));
  };

  const { mutate: sendLinkMutate, isLoading: isSendLinkLoading } = useMutation(
    //@ts-expect-error ignore
    (body) => makePostRequest(ADMIN_TEAM_LIST_SEND_INVITE, body),
    {
      onSuccess: () => {
        toast.success("Invite sended successfully");
        selectable.setSelect([]);
        // setIsSelectAll(!isSelectAll)
      },
      onError: () => {
        toast.error("Error");
      },
    }
  );

  const handleSendInvite = (obj?: any) => {
    const selectedData = selectable?.select?.map((each: any) => {
      return each?.id;
    });
    const bdy = {
      agents_id: selectedData?.length !== 0 ? selectedData : [obj?.id],
    };
    //@ts-expect-error ignore
    sendLinkMutate(bdy);
  };

  const { mutate } = useMutation(
    (body) => makePostRequest(ADMIN_CREATE_TEAM_MEMBER_AGENT(), body),
    {
      onSuccess: () => {
        formUtil.reset();
        refetch();
        toast.success("Agent Created Successfully");
        CreateAgentOnClose();
      },
      onError: (err) => {
        //@ts-expect-error ignore
        const errMsg = getFirstErrorMessage(err?.response?.data?.data);
        //@ts-expect-error ignore
        toast.error(errMsg);
      },
    }
  );

  const handleSumbit = (data: any) => {
    const obj = {
      first_name: data?.data?.first_name,
      last_name: data?.data?.last_name,
      email: data?.data?.email,
      phone_number: `+1${removeSpecialChars(data?.data?.phone_number)}`,
      country: data?.data?.country,
      onboard_type: "individual",
    };
    //@ts-expect-error ignore
    mutate(obj);
  };

  return (
    <AdminContainer>
      <CkAppModal
        className="!w-full !max-w-[771px] !rounded-[10px]"
        bodyClassName=" !px-[40px]"
        isOpen={CreateAgentIsOpen}
        onClose={CreateAgentOnClose}
        header={`Create an Agent`}
        headerClassName="text-[#10295A] text-[20px] font-[500] !py-[25px] !px-[40px]"
        closeButton
      >
        <CreateCommonModal
          onClose={CreateAgentOnClose}
          inputFields={inputFields}
          formUtil={formUtil}
          handleSubmit={handleSumbit}
        />
      </CkAppModal>
      <AdminBreadcrumbs route={breadcrumbs} />
      <AdminHeaderWithButtons
        title={"Applied Agents"}
        primaryBtnText={"Send Invite"} // Create an Agent
        primaryBtnIcon={<MdOutlineAddCircleOutline />}
        primaryBtnOnClick={handleSendInvite}
        primaryBtnIsLoading={isSendLinkLoading}
        isPrimaryBtnDisabled={selectable?.select?.length === 0}
        additionalBtnText={"Create an Agent"}
        additionalBtnClick={CreateAgentOnOpen}
        additionalBtnIcon={<MdOutlineAddCircleOutline />}
      />
      <Flex width={"100%"} flexDirection={"column"} mb={"30px"}>
        <DashboardCardStatsList listData={cardListData} />
      </Flex>
      <Flex mb={"40px"} justifyContent={"space-between"}>
        <Flex gap={"20px"}>
          <AdminSerachComponent
            placeholder="Search by name, email, phone"
            register={register("search")}
          />
          <AdminFilterRenderer
            register={register}
            filterArr={filterArr}
            control={control}
            setValue={setValue}
            watch={watch}
            dateRange={dateRange}
            //@ts-expect-error ignore
            setDateRange={setDateRange}
            // reset={reset}
          />
        </Flex>
        <Flex gap={"20px"}>
          <AppButton
            //need to enable after bulk api integration
            icon={<GoUpload />}
            className="whitespace-nowrap py-[7px] font-[400] text-[14px] self-start"
            variant="outline"
            onClick={() => {
              setIsBulkLicenseUpload(false);
              bulkUploadOnOpen();
            }}
          >
            Bulk Upload
          </AppButton>
          <AppButton
            // bulk upload with license
            icon={<GoUpload />}
            className="whitespace-nowrap py-[7px] font-[400] text-[14px] self-start"
            variant="outline"
            onClick={() => {
              setIsBulkLicenseUpload(true);
              bulkUploadOnOpen();
            }}
          >
            Bulk Upload With Data
          </AppButton>
          <AppButton
            isLoading={exportDataIsLoading}
            onClick={() => generateData({ type: "agent" })}
            className="self-start whitespace-nowrap py-[7px] font-[400] text-[14px]"
            icon={<LuFileInput />}
          >
            Export Data
          </AppButton>
        </Flex>
      </Flex>
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
        isLoading={isLoading}
        forcePage={page - 1}
        handleTabClick={handleTabClick}
      />
      <BulkUploadAgentsModal
        isOpen={bulkUploadIsOpen}
        onClose={bulkUploadOnClose}
        onOptionRemove={() => console.log("removesd")}
        inputObj={{
          label: "",
          name: "",
          type: "",
          imageState: undefined,
          setImageState: function (): void {
            console.log("removed");
          },
          uploadKey: "",
          fileTypes: ["csv"],
          placeholder: "",
          fileTypeKey: "",
        }}
        isBulkLicenseUpload={isBulkLicenseUpload}
      />
      {
        //@ts-expect-error ignore
        agent?.team ? (
          <ConfirmRemoveAgentModal
            isOpen={isOpen}
            onClose={onClose}
            data={agent}
          />
        ) : (
          <ConfirmDeleteAgentModal
            deleteMutate={deleteMutate}
            isLoading={deleteIsLoading}
            onClose={onClose}
            isOpen={isOpen}
          />
        )
      }
    </AdminContainer>
  );
};

export default AppliedAgents;
