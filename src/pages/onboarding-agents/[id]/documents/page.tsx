import { Box, Flex } from "@chakra-ui/react";
import { UploadIcon } from "@radix-ui/react-icons";
import { useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import AdminFileUpload from "../../../Auth/AgentComponents/fileupload/AdminFileUpload";
import PageHeader from "./PageHeader";
import {
  ADMIN_AGENT_DOCUMENTS_LIST,
  ADMIN_AGENT_DOCUMENTS_LIST_META,
  AGENT_DOCUMENT_UPLOAD,
} from "../../../../api-utils";
import AppButton from "../../../../AppComponents/AppButton-agent";
import AppLoader from "../../../Auth/AgentComponents/admincompenets/AppLoader";
import ListingTable from "../../../Auth/AgentComponents/table/ListingTable";
import useGetTableList from "../../../../utils/hooks/useGetTableList";
import useHandlePagination from "../../../../utils/hooks/useHandlePagination";

const Page = ({ params }: { params: { tab: string; id: string } }) => {
  const { page, handleMaxPage, max, handlePaginationClick, setPage } =
    useHandlePagination();

  const inputObj = {
    label: "",
    name: "",
    type: "",
    imageState: undefined,
    setImageState: function (res: any): void {
      //   setImage(res?.[0])
      console.log("document", res);
    },
    uploadKey: "",
    fileTypes: ["pdf"],
    placeholder: "",
    fileTypeKey: "",
  };

  const { listData, listMeta, isLoading, selectable, refetch } =
    useGetTableList({
      endPoint: ADMIN_AGENT_DOCUMENTS_LIST(params?.id),
      metaEndPoint: ADMIN_AGENT_DOCUMENTS_LIST_META,
      handleMax: handleMaxPage,
      page,
      setPage,
    });
  listData?.data?.results?.forEach(
    (list: any) => (list.name = list?.name?.split("/").pop())
  );

  const queryClient = useQueryClient();
  const { id } = useParams();

  const handleDownload = (data: any) => {
    const link = document.createElement("a");
    link.href = data?.file;
    link.target = "_blank";
    link.download = `${data?.name?.split("/").pop()}.pdf`;
    document.body.appendChild(link);
    link.click();
  };
  const onSuccess = () => {
    refetch();
    queryClient.invalidateQueries({
      queryKey: [ADMIN_AGENT_DOCUMENTS_LIST(id)],
    });
  };
  const customUiBodyComp = (isLoading: boolean) => (
    <Flex maxWidth={"300px"} alignItems={"center"} flexFlow={"column"}>
      {isLoading ? (
        <AppLoader />
      ) : (
        <>
          <AppButton icon={<UploadIcon />}>Upload</AppButton>
        </>
      )}
    </Flex>
  );
  return (
    <Box>
      <Flex justifyContent={"space-between"}>
        <PageHeader title="Documents" />
        <div className="overflow-x-hidden pt-[39px] pb-[39px]">
          <AdminFileUpload
            imageState={inputObj?.imageState}
            setImageState={inputObj?.setImageState}
            uploadKey={inputObj?.uploadKey}
            fileTypeKey={inputObj?.fileTypeKey}
            fileTypes={inputObj?.fileTypes}
            name={inputObj?.name}
            
            customUiBody={customUiBodyComp}
            customEndPoint={AGENT_DOCUMENT_UPLOAD}
            customType={{ user: params?.id }}
            // customUploadUiList={customUploadUiList}
            // isError={false}
            onSuccess={onSuccess}
          />
        </div>
      </Flex>
      <Box mt={"-10px"}>
        <ListingTable
          //   showTextAsTag={showTextAsTag}
          //   customFunction={customFunction}
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
          downloadable={true}
          handleDownload={handleDownload}
        />
      </Box>
    </Box>
  );
};

export default Page;
