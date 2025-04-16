import { Checkbox, Text } from "@chakra-ui/react";
// import { AGENT_STAGE_STATUS_UPDATE } from '@/app/api-utils'
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
// import makePutRequest from '@/app/utils/api/makePutRequest'
import { useMutation } from "react-query";
// import { getFirstErrorMessage } from '@/app/utils/functions/otherFunctions'
import { AGENT_STAGE_STATUS_UPDATE } from "../../../../../api-utils";
import makePutRequest from "../../../../../api/makePutRequest";
import { getFirstErrorMessage } from "../../../../../utils/functions/commonFunctions";
// import { useQueryClient } from 'react-query'
// import { useParams } from 'next/navigation'

export default function StageStatus({ stage }: any) {
  const [agentStatus, setStatus] = useState(false);
  // const queryClient = useQueryClient()
  // const { id } = useParams()

  useEffect(() => {
    if (stage && stage?.status === "approved") setStatus(true);
  }, []);

  const { mutate } = useMutation(
    (body) => makePutRequest(AGENT_STAGE_STATUS_UPDATE(stage?.id), body),
    {
      onSuccess: () => {
        if (stage?.status === "submitted" || stage?.status === "rejected")
          toast.success("Approved Successfully");
        if (stage?.status === "approved")
          toast.success("Rejected Successfully");
        location.reload();
        // queryClient.invalidateQueries({
        //   queryKey: [ADMIN_AGENT_STAGE_GET(id)],
        // })
      },
      onError: (err) => {
        //@ts-expect-error ignore
        const errMsg = getFirstErrorMessage(err?.response?.data?.data);
        //@ts-expect-error ignore
        toast.error(errMsg);
        // handleToastApiError(err)
      },
    }
  );

  const handleChange = () => {
    setStatus(!agentStatus);
    //@ts-expect-error ignore
    mutate({
      status: agentStatus
        ? stage?.status === "approved"
          ? "rejected"
          : "submitted"
        : "approved",
    });
  };
  return (
    <div className="px-[40px] pb-[30px]  bg-white">
      <Checkbox isChecked={agentStatus} onChange={handleChange}>
        <Text fontSize={"14px !important"}>Approve</Text>
      </Checkbox>
    </div>
  );
}
