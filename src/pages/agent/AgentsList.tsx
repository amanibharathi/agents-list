import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { LuFileInput } from "react-icons/lu";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ADMIN_MAKE_AGENT_INDIVIDUAL_PAGE,
  MAKE_ACTIVE_AGENTS_LIST_PAGE,
} from "../Auth/AgentComponents/navigation/index";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { GoUpload } from "react-icons/go";
import { useMutation, useQuery } from "react-query";
import toast from "react-hot-toast";
import moment from "moment";

import {
  debouncerTimeAdmin,
  getFirstErrorMessage,
} from "../../utils/functions/commonFunctions";
import useHandlePagination from "../../utils/hooks/useHandlePagination";
import useGetTableList from "../../utils/hooks/useGetTableList";
import {
  ADMIN_AGENT_STATE_LIST,
  ADMIN_CREATE_TEAM_MEMBER_AGENT,
  GET_ADMIN_BROKERAGE_LIST,
  GET_AGENTS_LIST_IN_ADMIN,
  GET_AGENTS_LIST_META_IN_ADMIN,
} from "../../api-utils";
import ListingTable from "../Auth/AgentComponents/table/ListingTable";
import AppButton from "../../AppComponents/AppButton-agent";
import { useDebounce } from "../../utils/hooks/useDebounce";
import AdminFilterRenderer from "../Auth/AgentComponents/admincompenets/AdminFilterRenderer";
import useHandleExportData from "../../utils/hooks/useHandleExportData";
import AdminContainer from "../Auth/AgentComponents/admincompenets/AdminContainer";
import AdminBreadcrumbs from "../Auth/AgentComponents/admincompenets/AdminBreadcrumbs";
import AdminHeaderWithButtons from "../Auth/AgentComponents/admincompenets/AdminHeaderWithButtons";
import AdminSerachComponent from "../Auth/AgentComponents/admincompenets/AdminSerachComponent";
import CkAppModal from "../Auth/AgentComponents/admincompenets/AppModal";
import AssignAgentToTeamModal from "../Auth/AgentComponents/admincompenets/AssignAgentToTeamModal";
import makeGetRequest from "../../api/makeGetRequest";
import ConfirmDeleteAgentModal from "../Auth/AgentComponents/admincompenets/ConfirmDeleteAgentModal";
import makeDeleteRequest from "../../api/makeDeleteRequest";
import AppText from "../../AppComponents/AppText-agent";
import { AdminListFilterContext } from "../Auth/AgentComponents/admincompenets/AdminListFilterProvider";
import { useAppStore } from "../../store-admin";
import AssignAgentToBrokerageModal from "../Auth/AgentComponents/admincompenets/AssignAgentToBrokerageModal";
import { ConfirmRemoveAgentModal } from "../Auth/AgentComponents/admincompenets/ConfirmRemoveAgentModal";

const AgentsList = () => {
  const [dateRange, setDateRange] = useState({});
  const { agentsListFilterForm } = useContext(AdminListFilterContext);
  const { register, control, watch, setValue } = agentsListFilterForm;
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = watch("search");
  const debouncedValue = useDebounce(searchValue, debouncerTimeAdmin);
  const [agent, setAgent] = useState({});
  const { page, handleMaxPage, max, handlePaginationClick, setPage } =
    useHandlePagination();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onClose: onDeleteModalClose,
    onOpen: onDeleteModalOpen,
  } = useDisclosure();
  const modalType = watch("modalType");
  const breadcrumbs = useMemo(
    () => [{ text: "Agents" }, { text: "Active Agents" }],
    []
  );

  const agent_status = searchParams.get("agent_status");
  const onboard_type = searchParams.get("onboard_type");
  const primary_state = searchParams.get("primary_state");
  const sort_by = searchParams.get("sort_by");
  const brokerage = searchParams.get("brokerage");
  const joining_date_after = searchParams.get("joining_date_after");
  const joining_date_before = searchParams.get("joining_date_before");

  const agentStatus = watch("agent_status")?.value;
  const onboardType = watch("onboard_type")?.value;
  const primaryState = watch("primary_state")?.value;
  const sortBy = watch("sort_by")?.value;
  const brokerageValue = watch("brokerage")?.value;

  useEffect(() => {
    navigate(
      MAKE_ACTIVE_AGENTS_LIST_PAGE(
        agentStatus,
        onboardType,
        primaryState,
        sortBy,
        brokerageValue,
        dateRange?.startDate
          ? moment(dateRange?.startDate).format("YYYY-MM-DD")
          : null,
        dateRange?.endDate
          ? moment(dateRange?.endDate).format("YYYY-MM-DD")
          : null
      )
    );
  }, [
    agentStatus,
    onboardType,
    primaryState,
    sortBy,
    brokerageValue,
    dateRange,
    navigate,
  ]);

  const {
    listData,
    listMeta,
    isLoading,
    selectable,
    refetch,
    totalListCount,
    currentListCount,
  } = useGetTableList({
    endPoint:
      GET_AGENTS_LIST_IN_ADMIN() + `?agent_status=approved&agent_status=active`,
    metaEndPoint: GET_AGENTS_LIST_META_IN_ADMIN(),
    handleMax: handleMaxPage,
    page,
    setPage,
    filterObject: {
      agent_status: watch("agent_status")?.value,
      onboard_type: watch("onboard_type")?.value,
      primary_state: watch("primary_state")?.value,
      search: searchValue || "",
      sort_by: watch("sort_by")?.value,
      brokerage: watch("brokerage")?.value,
      joining_date_after:
        dateRange?.startDate &&
        moment(dateRange?.startDate).format("YYYY-MM-DD"),
      joining_date_before:
        dateRange?.endDate && moment(dateRange?.endDate).format("YYYY-MM-DD"),
    },
    deps: [
      agent_status,
      onboard_type,
      primary_state,
      sort_by,
      brokerage,
      dateRange,
      joining_date_after,
      joining_date_before,
    ],
    refetchDeps: [debouncedValue],
  });

  const { isLoading: exportDataIsLoading, generateData } =
    useHandleExportData();
  const filterOptions = listMeta?.data?.filter_data;
  const sortByOption = listMeta?.data?.sort_by;

  const { data: agentsStateData } = useQuery([ADMIN_AGENT_STATE_LIST], () =>
    makeGetRequest(ADMIN_AGENT_STATE_LIST)
  );
  const listStateData = agentsStateData?.data?.results ?? [];

  const { data: brokerageList } = useQuery([GET_ADMIN_BROKERAGE_LIST], () =>
    makeGetRequest(GET_ADMIN_BROKERAGE_LIST)
  );
  const brokerageListData = brokerageList?.data?.results ?? [];

  const showTextAsTag = {
    active: "green",
    tour_scheduled: "yellow",
    created: "yellow",
    inactive: "red",
    closed: "blue",
  };

  const filterArr = [
    {
      type: "select",
      filterLabel: "Brokerage",
      name: "brokerage",
      options: brokerageListData,
    },
    {
      type: "select",
      filterLabel: "Onboard Type",
      name: "onboard_type",
      options: filterOptions?.onboard_type,
    },
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
    { type: "dob" },
  ];

  const { mutate: deleteMutate, isLoading: deleteIsLoading } = useMutation({
    mutationFn: () =>
      makeDeleteRequest(ADMIN_CREATE_TEAM_MEMBER_AGENT(agent?.id)),
    onSuccess: () => {
      refetch();
      toast.success("Agent Removed Successfully");
      onDeleteModalClose();
    },
    onError: (err) => {
      const errMsg = getFirstErrorMessage(err?.response?.data?.data);
      toast.error(errMsg);
    },
  });

  const { adminRoles } = useAppStore();
  const isDeletable = true;
  // adminRoles["Agent Management Policy"]?.permissions?.is_deletable;

  const handleOpenModal = (type) => {
    setValue("modalType", type);
    onOpen();
  };

  const headerDropDownMenu = useMemo(
    () => [
      { label: "Assign Office", onClick: () => handleOpenModal("office") },
    ],
    []
  );

  const customFunction = useCallback(
    (obj) => {
      const act = [
        {
          label: "View Agent",
          onClick: () => navigate(ADMIN_MAKE_AGENT_INDIVIDUAL_PAGE(obj?.id)),
        },
        isDeletable && {
          label: "Remove Agent",
          onClick: () => {
            setAgent(obj);
            onDeleteModalOpen();
          },
        },
        obj?.agent?.onboard_type === "individual"
          ? {
              label: "Assign Team",
              onClick: () => {
                setAgent(obj);
                handleOpenModal("team");
              },
            }
          : null,
        {
          label: "Assign Office",
          onClick: () => {
            setAgent(obj);
            handleOpenModal("office");
          },
        },
      ].filter(Boolean);
      return (
        <Menu>
          <MenuButton>
            <HiOutlineDotsHorizontal />
          </MenuButton>
          <MenuList>
            {act.map((m) => (
              <MenuItem onClick={m.onClick} key={m.label}>
                {m.label}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      );
    },
    [listData, adminRoles]
  );

  const handleTabClick = (obj) => {
    navigate(ADMIN_MAKE_AGENT_INDIVIDUAL_PAGE(obj?.id));
  };

  const isOffice = modalType !== "team";

  return (
    <AdminContainer>
      <AdminBreadcrumbs route={breadcrumbs} />
      <AdminHeaderWithButtons
        title={"Active Agents"}
        dropDownBtnText={"Assign Agent"}
        dropDownBtnMenuList={headerDropDownMenu}
      />
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
            setDateRange={setDateRange}
          />
        </Flex>
        <Flex gap={"20px"}>
          <AppButton
            icon={<GoUpload />}
            className="whitespace-nowrap py-[7px] font-[400] text-[14px] self-start"
            variant="outline"
          >
            Bulk Upload
          </AppButton>
          <AppButton
            isLoading={exportDataIsLoading}
            onClick={() => generateData({ type: "agent" })}
            className="whitespace-nowrap py-[7px] font-[400] text-[14px] self-start"
            icon={<LuFileInput />}
          >
            Export Data
          </AppButton>
        </Flex>
      </Flex>
      <Box className="flex justify-end">
        <AppText
          text={`Count:${currentListCount ?? "0"} / ${totalListCount ?? "0"}`}
        />
      </Box>
      <ListingTable
        showTextAsTag={showTextAsTag}
        customFunction={customFunction}
        handlePaginationClick={handlePaginationClick}
        max={max}
        tableMeta={listMeta}
        tableData={listData}
        avatar={["full_name"]}
        relativeTime={["created"]}
        selectable={selectable}
        isLoading={isLoading}
        forcePage={page - 1}
        handleTabClick={handleTabClick}
      />
      <CkAppModal
        className="!w-full !max-w-[960px] !rounded-[10px]"
        bodyClassName=" px-[30px]"
        isOpen={isOpen}
        closeButton
        onClose={onClose}
        header={
          modalType === "team"
            ? "Assign Team - Agents"
            : "Assign Office - Agents"
        }
        headerClassName="text-[#10295A] text-[20px] font-[500] !py-[25px]"
      >
        {isOffice ? (
          <AssignAgentToBrokerageModal
            onClose={onClose}
            selected={
              selectable?.select?.length !== 0 ? selectable?.select : [agent]
            }
            setSelected={selectable?.setSelect}
            modalType={modalType}
            refetch={refetch}
            tableHeader={"Selected Agents"}
            btnText={"Assign Brokerage"}
          />
        ) : (
          <AssignAgentToTeamModal
            onClose={onClose}
            selected={
              selectable?.select?.length !== 0 ? selectable?.select : [agent]
            }
            setSelected={selectable?.setSelect}
            modalType={modalType}
            refetch={refetch}
            tableHeader={"Selected Agents"}
            dropDownName={
              modalType === "team" ? "Select Team" : "Select Brokerage"
            }
            btnText={modalType === "team" ? "Assign Team" : "Assign Brokerage"}
          />
        )}
      </CkAppModal>
      {agent?.team ? (
        <ConfirmRemoveAgentModal
          isOpen={isDeleteModalOpen}
          onClose={onDeleteModalClose}
          data={agent}
        />
      ) : (
        <ConfirmDeleteAgentModal
          deleteMutate={deleteMutate}
          isLoading={deleteIsLoading}
          onClose={onDeleteModalClose}
          isOpen={isDeleteModalOpen}
        />
      )}
    </AdminContainer>
  );
};

export default AgentsList;
