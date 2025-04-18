// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { UploadIcon } from "@radix-ui/react-icons";
import { useCallback, useContext, useEffect, useState } from "react";
import CommonDocumentUploadModal from "../_TeamDocumentationTabModels/CommonDocumentUploadModal";
import DocumentRemoveModal from "../_TeamDocumentationTabModels/DocumentsRemoveModal";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
// import { ADMIN_TEAM_DOCUMENT_LISTING } from '@/app/utils/navigation'
import { useParams, useSearchParams } from "react-router-dom";
import moment from "moment";
import AdminSerachComponent from "../../../../../login/adminlogin/AdminSerachComponent";
import {
  ADMIN_TEAM_DOCUMENT_LIST,
  ADMIN_TEAM_DOCUMENT_LIST_META,
} from "../../../../../api-utils";
import AppButton from "../../../../../AppComponents/AppButton-agent";
import PageHeader from "../../../../onboarding-agents/[id]/documents/PageHeader";
import ListingTable from "../../../../Auth/AgentComponents/table/ListingTable";
import { useDebounce } from "../../../../../utils/hooks/useDebounce";
import useGetTableList from "../../../../../utils/hooks/useGetTableList";
import useHandlePagination from "../../../../../utils/hooks/useHandlePagination";
import { debouncerTimeAdmin } from "../../../../../utils/functions/commonFunctions";
import AdminFilterRenderer from "../../../../Auth/AgentComponents/admincompenets/AdminFilterRenderer";
import { AdminListFilterContext } from "../../../../Auth/AgentComponents/admincompenets/AdminListFilterProvider";
import { useNavigate } from "react-router-dom";
import {  ADMIN_TEAM_DOCUMENT_LISTING1 } from "../../../../Auth/AgentComponents/navigation/urls";
// import useGetMetaFromApi from '@/app/hooks/admin/useGetMetaFromApi'

const TeamDocumentstab = () => {
  //@ts-expect-error ignore
  const { AppliedTeamsRosterFilterForm, dateRange, setDateRange } = useContext(
    AdminListFilterContext
  );
  const { register, control, watch, setValue } = AppliedTeamsRosterFilterForm;
  const router = useNavigate();
  const params=useParams()
  const { page, handleMaxPage, max, handlePaginationClick, setPage } =
    useHandlePagination();

  const searchValue = watch("search");
  const debouncedValue = useDebounce(searchValue, debouncerTimeAdmin);
  const [searchParams] = useSearchParams();

  const uploaded_by: any = searchParams.get("uploaded_by");
  const document_type: any = searchParams.get("document_type");
  const sort_by: any = searchParams.get("sort_by");

  // const { metaData, handleOnInputChange } = useGetMetaFromApi({
  //   endPoint: GET_ADMIN_TEAM_MEMBERS_LIST(params?.id),
  // })

  const { listData, listMeta, isLoading, selectable, isFetching } =
    useGetTableList({
      endPoint: ADMIN_TEAM_DOCUMENT_LIST(params?.id),
      metaEndPoint: ADMIN_TEAM_DOCUMENT_LIST_META(params?.id),
      handleMax: handleMaxPage,
      page,
      setPage,
      filterObject: {
        document_type: watch("document_type")?.value,
        uploaded_by: watch("uploaded_by")?.value,
        search: searchValue || "",
        created_after:
          dateRange?.startDate &&
          moment(dateRange?.startDate).format("YYYY-MM-DD"),
        created_before:
          dateRange?.endDate && moment(dateRange?.endDate).format("YYYY-MM-DD"),
        sort_by: watch("sort_by")?.value,
      },
      deps: [uploaded_by, document_type, dateRange, sort_by],
      refetchDeps: [debouncedValue],
    });
  listData?.data?.results?.forEach(
    (list: any) => (list.name = list?.name?.split("/").pop())
  );

  const docTypes = ["Team Document", "Agent Document"];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isRemoveOpen,
    onOpen: onRemoveOpen,
    onClose: onRemoveClose,
  } = useDisclosure();

  const [imageState, setImageState] = useState();
  const inputObj = {
    label: "",
    name: "",
    type: "",
    required: true,
    imageState: imageState,
    setImageState: setImageState,
    uploadKey: "",
    fileTypes: ["jpg", "jpeg", "png", "pdf", "xlsx"],
    placeholder: "",
    fileTypeKey: "",
  };

  useEffect(() => {
    router(
      ADMIN_TEAM_DOCUMENT_LISTING1(
        params?.id,
        watch("document_type")?.value,
        watch("uploaded_by")?.value,
        dateRange?.startDate
          ? moment(dateRange?.startDate).format("YYYY-MM-DD")
          : null,
        dateRange?.endDate
          ? moment(dateRange?.endDate).format("YYYY-MM-DD")
          : null,
        watch("sort_by")?.value
      )
    );
  }, [
    watch("document_type"),
    watch("uploaded_by"),
    dateRange,
    watch("sort_by"),
  ]);

  const [selected, setSelected] = useState({});

  const customFunction = useCallback(
    (obj: any) => {
      const act = [
        {
          label: "Remove Document",
          onClick: () => {
            //@ts-expect-error ignore
            onRemoveOpen();
            setSelected(obj);
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
      filterLabel: "Document Type",
      name: "document_type",
      options: filterOptions?.document_type,
    },
    {
      type: "select",
      filterLabel: "Sort ",
      name: "sort_by",
      options: [
        {
          id: "created",
          identity: "Oldest",
        },
        {
          id: "-created",
          identity: "Recent",
        },
      ],
    },
    // {
    //   type: 'select',
    //   filterLabel: 'Uploaded By',
    //   name: 'uploaded_by',
    //   options: metaData?.data?.results,
    //   onInputChange: (val: any) => handleOnInputChange(val),
    // },
    {
      type: "dob",
    },
  ];

  return (
    <Box>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <PageHeader title="Documents" />
        <div className="flex gap-[10px] w-full justify-end">
          <AppButton
            label="Remove Document"
            variant="outline"
            className="!px-0 !py-0 max-h-[44px] max-w-[200px]"
            onClick={() => onRemoveOpen()}
            disabled={selectable?.select?.length == 0}
          />
          <AppButton
            label="Upload Document"
            icon={<UploadIcon />}
            onClick={() => onOpen()}
          />
        </div>
      </Flex>
      <Flex gap={"20px"}>
        <AdminSerachComponent
          register={register("search")}
          placeholder="Search by agent name"
        />
        <AdminFilterRenderer
          register={register}
          filterArr={filterArr}
          control={control}
          setValue={setValue}
          watch={watch}
          dateRange={dateRange}
          setDateRange={setDateRange}
          // reset={reset}
        />
      </Flex>
      <Box mt={"38px"}>
        <ListingTable
          //   showTextAsTag={showTextAsTag}
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
        />
      </Box>
      <CommonDocumentUploadModal
        isOpen={isOpen}
        onClose={onClose}
        documentTypes={docTypes}
        inputObj={inputObj}
        params={params}
      />
      <DocumentRemoveModal
        isOpen={isRemoveOpen}
        onClose={onRemoveClose}
        params={params}
        selected={selectable}
        singleSelected={selected}
        setSingleSelected={setSelected}
      />
    </Box>
  );
};

export default TeamDocumentstab;
