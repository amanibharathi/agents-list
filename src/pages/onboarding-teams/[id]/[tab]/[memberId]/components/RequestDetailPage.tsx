import  { useEffect, useState } from 'react'
import { RequestDetailCard } from './RequestDetailCard'
import { GoArrowLeft } from 'react-icons/go'
import AppText from '../../../../../../AppComponents/AppText-agent'
import { RequestDetailBox } from './RequestDetailBox'
import { Flex, useDisclosure } from '@chakra-ui/react'
import ButtonPair from '../../../../../Auth/AgentComponents/admincompenets/ButtonPair'
import { useNavigate } from 'react-router-dom'
// import ConfirmDeleteTeamModal from '@/app/admin/agents/components/ListingComponents/ConfirmDeleteTeam'
import { useMutation, useQueryClient } from 'react-query'
import makePutRequest from '../../../../../../api/makePutRequest'
import toast from 'react-hot-toast'
import {
  ADMIN_AGENT_TEAM_DETAIL,
  ADMIN_TEAM_REQUEST_LIST,
  ADMIN_TEAM_REQUEST_UPDATE,
} from '../../../../../../api-utils'
import { MAKE_ADMIN_TEAM_DETAIL_TAB } from '../../../../../Auth/AgentComponents/navigation/urls'
import ConfirmDeleteTeamModal from './ConfirmDeleteTeam'

export const RequestDetailPage = ({
  data,
  params,
}: {
  data: any;
  params: { tab: string; id: string; memberId: string };
}) => {
  const [documents, setDocuments] = useState([]);
  const [approve, setApprove] = useState("approve");
  const queryClient = useQueryClient();
  const {
    onOpen: onRejectOpen,
    isOpen: isRejectOpen,
    onClose: onRejectClose,
  } = useDisclosure()
  const router = useNavigate()
  const { mutate: requestMutate, isLoading: requestIsLoading } = useMutation(
    (body) =>
      makePutRequest(

        ADMIN_TEAM_REQUEST_UPDATE(params.id, params.memberId),
        body
      ),
    {
      onSuccess: (res) => {
        onRejectClose()
        queryClient.invalidateQueries([ADMIN_TEAM_REQUEST_LIST(params?.id)])
        queryClient.invalidateQueries([ADMIN_AGENT_TEAM_DETAIL(params?.id)])
        toast.success(`Team request ${res?.data?.status} successfully`)
        router(MAKE_ADMIN_TEAM_DETAIL_TAB(params?.id, params?.tab))
      },
    }
  );
  useEffect(() => {
    if (data?.documents) {
      setDocuments(data?.documents);
    } else if (
      data?.request_data?.new_documents ||
      data?.request_data?.removed_documents
    ) {
      //@ts-expect-error ignore
      setDocuments([
        ...(data?.request_data?.new_documents?.map((doc: any) => ({
          ...doc,
          status: "new_document",
        })) || []),
        ...(data?.request_data?.removed_documents?.map((doc: any) => ({
          ...doc,
          status: "removed_document",
        })) || []),
      ]);
    } else {
      //@ts-expect-error ignore
      setDocuments([
        ...(data?.request_data?.documents?.map((doc: any) => ({
          ...doc,
          status: "new_document",
        })) || []),
      ]);
    }
  }, [data]);
  const buttonHide = data?.status != "pending";
  return (
    <div className="flex flex-col gap-[46px] py-[40px]">
      <div className="flex items-center gap-[25px]">
        <GoArrowLeft
          onClick={() => router(-1)}
          fontSize={'24px'}
          className="cursor-pointer"
        />
        <AppText
          className="!text-[#10295A] text-[24px] font-bold"
          text={`ID: ${data?.request_id ?? "-"}`}
        />
      </div>
      <div className="flex gap-[20px]">
        <RequestDetailCard data={data} />
        <div className="flex-1">
          <RequestDetailBox data={data} documents={documents} params={params} />
          {!buttonHide ? (
            <Flex gap={"16px"} justify={"end"} mt={"30px"} mb={"30px"}>
              <ButtonPair
                primaryBtnText={"Approve"}
                secondaryBtnText={"Reject"}
                onPrimaryClick={() => {
                  setApprove("approve");
                  onRejectOpen();
                }}
                primaryBtnType={undefined}
                onSecondaryClick={() => {
                  setApprove("reject");
                  onRejectOpen();
                }}
              />
            </Flex>
          ) : null}
        </div>
      </div>

      <ConfirmDeleteTeamModal
        headerText={`Are you sure want to ${approve} request?`}
        deleteMutate={requestMutate}
        isLoading={requestIsLoading}
        onClose={onRejectClose}
        isOpen={isRejectOpen}
        btnLabel={approve}
      />
    </div>
  );
};
