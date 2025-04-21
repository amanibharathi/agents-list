import { useState } from "react";
import CustomContendHeader from "../components/custom-content-header";
//import CkCheckBox from '@/app/components/chakraOverwrites/CkCheckBox'
import CustomBoxComponent from "../components/custom-box-component";
import { useMutation, useQuery } from "react-query";
//import makePostRequest from '@/app/utils/api/makePostRequest'
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import AgentApproveEditModal from "../components/agentApproveEditModal";
import { useDisclosure } from "@chakra-ui/react";
import CkCheckBox from "./CkCheckBox";
import {
  DELETE_CHECKLIST_RESPONSE,
  GET_AGENT_SUMMARY_DETAILS,
  GET_CHECKLIST_RESPONSE_LIST,
  POST_CHECKLIST_RESPONSE,
} from "../../../../api-utils";
import makePostRequest from "../../../../api/makePostRequest";
import makeGetRequest from "../../../../api/makeGetRequest";
import makeDeleteRequest from "../../../../api/makeDeleteRequest";
import { checkBoxDummyData } from "../../../../utils/functions/commonFunctions";
import useGetAgentStatus from "../../../../utils/hooks/useGetAgentStatus";
import { useGetAgentDetail } from "../../../../utils/hooks/useGetAgentDetail";

export default function Page() {
  const { id } = useParams();

  const [summaryData, setSummaryData] = useState<any>({});

  const { search } = useGetAgentStatus(id);

  const { agentData, refetch: agentRefetch } = useGetAgentDetail(id);

  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  // const isForceApprove =
  //   (search[0]?.status == 'submitted' || search[0]?.status == 'approved') &&
  //   (search[1]?.status == 'approved' || search[1]?.status == 'submitted')
  const isForceApprove =
    search[0]?.status == "completed" && search[1]?.status == "completed";

  const isActiveAgent = agentData?.agent_detail?.agent_status === "active";

  const getForceButton = () => {
    if (isForceApprove && !isActiveAgent) {
      return [
        {
          buttonClassName: "text-nowrap bg-red-700",
          label: "Force Approve",
          onClick: () => {
            refetchSummary();
            onOpenEdit();
          },
        },
      ];
    } else {
      return [];
    }
  };

  const { refetch } = useQuery(
    [GET_CHECKLIST_RESPONSE_LIST],
    () => makeGetRequest(GET_CHECKLIST_RESPONSE_LIST + `?agent=${id}`),
    {
      onSuccess: (res) => {
        const selectedFields: any[] = [];
        res?.data?.results?.map((each: any) =>
          selectedFields.push({ code: each?.code, id: each?.id })
        );
        checkBoxDummyData?.map((each: any) => (each.checked = false));
        selectedFields?.map(
          (each: any) => {
            const selectedCheckboxIndex = checkBoxDummyData?.findIndex(
              (dummy: any) => dummy.title === each.code
            );

            checkBoxDummyData[selectedCheckboxIndex].checked = true;
            checkBoxDummyData[selectedCheckboxIndex].id = each?.id;
          }
          // (each.checked = selectedFields?.includes(each.title))
        );
      },
    }
  );

  const {
    isLoading: isSummaryLoading,
    isError: isSummaryError,
    refetch: refetchSummary,
  } = useQuery(
    [GET_AGENT_SUMMARY_DETAILS(id)],
    () => makeGetRequest(GET_AGENT_SUMMARY_DETAILS(id)),
    {
      onSuccess: (res) => {
        setSummaryData(res?.data);
      },
    }
  );

  const { mutate } = useMutation(
    (body) => makePostRequest(POST_CHECKLIST_RESPONSE, body),
    {
      onSuccess: () => {
        refetch();
      },
      onError: (err) => {
        //@ts-expect-error ignore
        const errMsg = getFirstErrorMessage(err?.response?.data?.data);
       
        toast.error(errMsg);
      },
    }
  );

  const { mutate: deleteMutate } = useMutation(
    (body: any) => makeDeleteRequest(DELETE_CHECKLIST_RESPONSE(body?.id), body),
    {
      onSuccess: () => {
        refetch();
      },
      onError: (err) => {
        //@ts-expect-error ignore
        const errMsg = getFirstErrorMessage(err?.response?.data?.data);
       
        toast.error(errMsg);
      },
    }
  );
  const onClickHandler = (checked: any, data: any) => {
    if (checked) {
      //@ts-expect-error ignore
      mutate({
        agent: id,
        code: data?.props?.boxData?.title,
      });
    } else {
      deleteMutate({ id: data?.props?.boxData?.id });
    }
  };

  return (
    <div className="">
      {!isSummaryLoading && isOpenEdit ? (
        <AgentApproveEditModal
          isOpen={isOpenEdit}
          onClose={onCloseEdit}
          refetch={agentRefetch}
          data={summaryData}
          isLoading={isSummaryLoading}
          isError={isSummaryError}
          isForceApprove={true}
        />
      ) : null}
      <div className="my-10">
        <CustomContendHeader
          heading={"Onboarding Checklist"}
          buttonData={getForceButton()}
        />
      </div>
      <div>
        <CkCheckBox
          checkBoxData={checkBoxDummyData.map((each, index) => (
            <CustomBoxComponent key={index} boxData={each} />
          ))}
          wrapperClass="p-[20px] border border-[#CDCDCD] rounded-[10px] bg-white"
          checkBoxWrapperClass="gap-[10px] !flex !items-start"
          onClickHandler={(checked: any, data: any) =>
            onClickHandler(checked, data)
          }
        />
      </div>
    </div>
  );
}
