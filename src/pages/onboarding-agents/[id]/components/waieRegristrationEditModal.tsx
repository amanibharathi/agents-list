//import AdminInputRenderer from '@/app/admin/_AdminComponent/AdminInputRenderer'
//import ButtonPair from '@/app/admin/_AdminComponent/ButtonPair/ButtonPair'
//import CkAppModal from '@/app/components/modal/AppModal'
// import { getResponse } from '@/app/real-estate-agents/join/onboard/stage/utils/common'
import { Box, Checkbox, Flex, Text } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import AdminInputRenderer from "../../../../login/adminlogin/AdminInputRenderer";
import ButtonPair from "../../../Auth/AgentComponents/admincompenets/ButtonPair";
import CkAppModal from "../../../Auth/AgentComponents/admincompenets/AppModal";
import { getResponse } from "../../../../utils/functions/commonFunctions";

const WaieRegristrationEditModal = ({
  isOpen,
  onClose,
  data,
  mutate,
  isLoading = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  mutate: any;
  isLoading: boolean;
}) => {
  const formUtil = useForm();
  const { watch, setValue, reset } = formUtil;

  const inputFields = useMemo(
    () => [
      {
        name: "license_fee_waived_states",
        label: "Select States for Waive License Fee",
        type: "multi-select",
        options: data?.agent_detail?.licensed_states,
        required: false,
      },
    ],
    [data]
  );

  const handlePrimaryBtnClick = () => {
    const finalData = {
      is_registration_fee_waived:
        watch("data.is_registration_fee_waived") == true ? true : false,
      license_fee_waived_states: watch("data.license_fee_waived_states")?.map(
        (i: any) => i?.id
      ),
    };
  
    mutate(finalData);
  };

  const handleSecondaryBtnClick = () => {
    onClose();
    reset({
      data: {
        ...data,
        is_registration_fee_waived:
          data?.agent_detail?.is_registration_fee_waived,
        license_fee_waived_states: getResponse(
          data?.agent_detail?.license_fee_waived_states
        ),
      },
    });
  };

  useEffect(() => {
    reset({
      data: {
        is_registration_fee_waived:
          data?.agent_detail?.is_registration_fee_waived,
        license_fee_waived_states: getResponse(
          data?.agent_detail?.license_fee_waived_states
        ),
      },
    });
  }, [data]);

  return (
    <CkAppModal
      className="!w-full !max-w-[771px] !rounded-[10px]"
      bodyClassName=" !px-[40px]"
      isOpen={isOpen}
      onClose={onClose}
      header={`Waive Registration Fee`}
      headerClassName="text-[#10295A] text-[20px] font-[500] !py-[25px] !px-[40px]"
      closeButton
    >
      <form onSubmit={formUtil.handleSubmit(handlePrimaryBtnClick)}>
        <Box className="grid grid-cols-1 gap-[28px] basis-[70%]">
          <Checkbox
            isChecked={watch("data.is_registration_fee_waived") || false}
            onChange={(e) =>
              setValue("data.is_registration_fee_waived", e.target.checked)
            }
          >
            <Text>Waive Registration Fee</Text>
          </Checkbox>
          {inputFields?.map((i: any) => (
            <AdminInputRenderer
              className="w-full max-w-[50%] agent-modal-select"
              wrapperClassName="flex gap-[20px] text-[14px]"
              labelClassName="!text-[14px]"
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
            primaryBtnText={"Waive Fee"}
            secondaryBtnText={"Cancel"}
            onPrimaryClick={undefined}
            primaryBtnType={"submit"}
            onSecondaryClick={handleSecondaryBtnClick}
            primaryBtnIsLoading={isLoading}
          />
        </Flex>
      </form>
    </CkAppModal>
  );
};

export default WaieRegristrationEditModal;
