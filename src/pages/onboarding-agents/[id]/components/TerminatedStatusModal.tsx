// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
//import AdminInputRenderer from '@/app/admin/_AdminComponent/AdminInputRenderer'
//import ButtonPair from '@/app/admin/_AdminComponent/ButtonPair/ButtonPair'
import { PUT_ADMINS_AGENT_UPDATE } from "../../../../api-utils";
// import CkAppModal from '@/app/components/modal/AppModal'
import makePatchRequest from "../../../../api/makePatchRequest";
import { Box, Flex, Switch, useDisclosure } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import AdminInputRenderer from "../../../../login/adminlogin/AdminInputRenderer";
import ButtonPair from "../../../Auth/AgentComponents/admincompenets/ButtonPair";
import CkAppModal from "../../../Auth/AgentComponents/admincompenets/AppModal";

const TerminatedStatusModal = ({
  isTerminated = false,
  refetchAgentData,
  id,
  disabled = false,
}: {
  isTerminated: boolean;
  refetchAgentData: () => void;
  id: number;
  disabled?: boolean;
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const formUtil = useForm();
  const handleSwitchClick = () => {
    if (isTerminated) {
      //@ts-expect-error ignore
      mutate({
        is_terminated: false,
      });
    } else {
      onOpen();
    }
  };
  const inputFields = [
    {
      label: "Terminated on",
      name: "last_terminated_at",
      type: "date",
      max: new Date().toISOString().split("T")[0],
    },
    {
      label: "Reason to terminate",
      name: "terminated_reason",
      type: "textarea",
    },
  ];

  const { mutate, isLoading } = useMutation(
    (body) => makePatchRequest(PUT_ADMINS_AGENT_UPDATE(id), body),
    {
      onSuccess: () => {
        formUtil.reset();
        toast.success("Agent Details Updated Sucessfully");
        refetchAgentData();
        onClose();
      },
      onError: (err) => {
        //@ts-expect-error ignore
        const errMsg = getFirstErrorMessage(err?.response?.data);
        //@ts-expect-error ignore
        toast.error(errMsg);
      },
    }
  );

  const onSuccess = (data: any) => {
    //@ts-expect-error ignore
    mutate({
      terminated_reason: data?.data?.terminated_reason,
      is_terminated: true,
      last_terminated_at: data?.data?.last_terminated_at,
    });
  };

  return (
    <div className="flex items-center gap-2 mr-3">
      <label className="whitespace-nowrap !text-[#10295A] !text-[15px] !leading-[21px] !font-[600]">
        Inactive
      </label>
      <Switch
        colorScheme={"red"}
        onChange={() => handleSwitchClick()}
        size="sm"
        isChecked={isTerminated}
        disabled={disabled}
      />
      <CkAppModal
        className="!w-full !max-w-[550px]"
        closeButton
        isOpen={isOpen}
        onClose={onClose}
        header="Terminate Agent"
      >
        <form onSubmit={formUtil.handleSubmit(onSuccess)}>
          <Box className="grid grid-cols-1 gap-[22px] basis-[70%]">
            {inputFields?.map((i: any) => (
              <AdminInputRenderer
                className="w-full max-w-[100%] agent-modal-select"
                wrapperClassName="flex gap-[20px] text-[14px]"
                labelClassName=""
                inputObj={i}
                key={i?.name}
                register={formUtil?.register}
                control={formUtil?.control}
                errors={formUtil?.formState?.errors?.data}
              />
            ))}
          </Box>
          <Flex mb={"28px"} justifyContent={"end"} mt={"40px"}>
            <ButtonPair
              primaryBtnText={"Update"}
              secondaryBtnText={"Cancel"}
              onPrimaryClick={undefined}
              primaryBtnType={"submit"}
              onSecondaryClick={() => onClose()}
              primaryBtnIsLoading={isLoading}
            />
          </Flex>
        </form>
      </CkAppModal>
    </div>
  );
};

export default TerminatedStatusModal;
