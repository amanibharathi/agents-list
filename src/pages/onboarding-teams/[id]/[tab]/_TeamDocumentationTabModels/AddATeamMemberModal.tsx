// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
// import CkAppModal from '@/app/components/modal/AppModal'
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ADMIN_AGENT_TEAM_DETAIL,
  ADMIN_TEAM_MEMBER_CREATE,
  ADMIN_TEAM_MEMBER_UPDATE_META,
  GET_ADMIN_TEAM_MEMBERS_LIST,
  GET_TEAM_AGENT_LIST,
} from "../../../../../api-utils";
import { Flex } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import makeGetRequest from "../../../../../api/makeGetRequest";
import makePostRequest from "../../../../../api/makePostRequest";
import {
  commissionPlanOptions,
  debouncerTimeAdmin,
  getFirstErrorMessage,
  transformSelectData,
} from "../../../../../utils/functions/commonFunctions";
import toast from "react-hot-toast";
import AddATeamMemberModalStep1 from "./AddATeamMemberModalStep2";
import AddATeamMemberModalStep2 from "./AddATeamMemberModalStep1";
import CkAppModal from "../../../../Auth/AgentComponents/admincompenets/AppModal";
import ButtonPair from "../../../../Auth/AgentComponents/admincompenets/ButtonPair";
import { useDebounce } from "../../../../../utils/hooks/useDebounce";
import useGetTableList from "../../../../../utils/hooks/useGetTableList";

const AddATeamMemberModal = ({
  isOpen,
  onClose,
  params,
}: {
  isOpen: boolean;
  onClose: () => void;
  params: string;
}) => {
  const [step, setStep] = useState(1);
  const [imageState, setImageState] = useState();
  const formUtil = useForm();
  const [selectedAgentFrom1, setSelectedAgentFrom1] = useState({});
  const [selectedAgentUsingSearch, setSelectedAgentUsingSearch] = useState([]);
  const queryClient = useQueryClient();
  const searchValue = formUtil.watch("search");
  const debouncedValue = useDebounce(searchValue, debouncerTimeAdmin);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const {
    listData,
    isLoading: listLoading,
    isFetching,
  } = useGetTableList({
    endPoint: GET_TEAM_AGENT_LIST,
    metaEndPoint: GET_TEAM_AGENT_LIST,
    filterObject: {
      search: debouncedValue || "",
    },
    refetchDeps: [debouncedValue],
  });

  const handleClose = () => {
    setStep(1);
    setSelectedIndex(null);
    setSelectedAgentFrom1({});
    setSelectedAgentUsingSearch([]);
    setImageState(undefined);
    formUtil.reset({ search: "" });
    onClose(); // Ensure modal is properly closed
  };

  // Ensure `selectedAgents` updates when `listData` is available
  useEffect(() => {
    if (debouncedValue !== "") {
      setSelectedAgentUsingSearch(listData?.data?.results || []);
    }
  }, [debouncedValue, listData, setSelectedAgentUsingSearch]);

  const { mutate, isLoading } = useMutation(
    (body) => makePostRequest(ADMIN_TEAM_MEMBER_CREATE(params), body),
    {
      onSuccess: () => {
        toast.success("Team Member Added Successfully");
        // const id = res?.data?.id
        queryClient.invalidateQueries({
          queryKey: [GET_ADMIN_TEAM_MEMBERS_LIST(params)],
        });
        queryClient.invalidateQueries({
          queryKey: [ADMIN_AGENT_TEAM_DETAIL(params)],
        });
        setStep(1);
        setSelectedAgentFrom1({});
        setSelectedAgentUsingSearch([]);
        setSelectedIndex(null);
        onClose();
        formUtil.reset();
      },
      onError: (err) => {
        //@ts-expect-error ignore
        const errMsg = getFirstErrorMessage(err?.response?.data?.data);
        //@ts-expect-error ignore
        toast.error(errMsg);
      },
    }
  );

  const goToNextPage = () => {
    if (step < 2) setStep((prv) => prv + 1);
  };

  const { data: meta } = useQuery(
    //@ts-expect-error ignore
    [ADMIN_TEAM_MEMBER_UPDATE_META(params, selectedAgentFrom1?.id)],
    () =>
      makeGetRequest(
        //@ts-expect-error ignore
        ADMIN_TEAM_MEMBER_UPDATE_META(params, selectedAgentFrom1?.id)
      ),
    {
      enabled: !!params,
      onSuccess: (res) => {
        const commPlanValue =
          commissionPlanOptions?.filter(
            (f) =>
              f?.value == res?.data?.meta?.user?.commission_plan ||
              f?.label == res?.data?.meta?.user?.commission_plan
          )?.[0] || "";
        formUtil.setValue(
          "data.cap",
          transformSelectData(res?.data?.meta?.user?.cap_status)
        );
        formUtil.setValue("data.commission_plan", commPlanValue);
        formUtil.setValue(
          "data.commission_split",
          res?.data?.meta?.user?.team_commission_plan
        );
      },
    }
  );

  const inputFields = useMemo(
    () => [
      {
        label: "Role*",
        name: "role",
        type: "select",
        options: meta?.data?.meta?.role,
        className: "!z-[12]",
        otherRegProps: {
          required: true,
        },
      },
      {
        label: "Cap Structure*",
        name: "cap",
        type: "select",
        options: meta?.data?.meta?.cap_structure,
        className: "!z-[10]",
      },
      {
        label: "Brokerage Commission Plan*",
        name: "commission_plan",
        type: "select",
        options: commissionPlanOptions,
      },
      {
        label: "Minimum Team Commission Split*",
        name: "commission_split",
        type: "number",
        placeholder: "Enter a value between 15 to 100",
        otherRegProps: {
          required: true,
          min: { value: 15, message: "Minimum split is 15" },
          max: { value: 100, message: "Maximum split is 100" },
        },
      },
    ],
    [meta]
  );

  const handlePrimaryBtnClick = () => {
    if (step == 1) {
      goToNextPage();
    } else if (step == 2) {
      const watchData = formUtil.watch("data");
      const obj = {
        creation_type: "existing",
        role: watchData?.role?.value,
        //@ts-expect-error ignore
        user: selectedAgentFrom1?.id,
        agent_cap_detail: {
          team_commission_plan: watchData?.commission_split,
          commission_plan: watchData?.commission_plan?.value,
          cap_status: watchData?.cap?.value,
        },
        //@ts-expect-error ignore
        documents: imageState?.flat()?.map((m: any) => m?.id) ?? [],
      };
      //@ts-expect-error ignore
      mutate(obj);
    } else onClose();
  };

  const handleSecondaryBtnClick = () => {
    if (step == 2) {
      setStep(1);
    } else {
      onClose();
      formUtil.reset();
    }
  };

  const stepsComponent = [
    {
      comp: (
        <AddATeamMemberModalStep1
          setSelectedAgentFrom1={setSelectedAgentFrom1}
          selectedAgents={selectedAgentUsingSearch}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          formUtil={formUtil}
          isLoading={listLoading || isFetching}
        />
      ),
    },
    {
      comp: (
        <AddATeamMemberModalStep2
          inputFields={inputFields}
          formUtil={formUtil}
          selectedAgentFrom1={selectedAgentFrom1}
          imageState={imageState}
          setImageState={setImageState}
        />
      ),
    },
  ];

  return (
    <CkAppModal
      className="!w-full !max-w-[771px] !rounded-[10px] max-h-[90vh] overflow-y-scroll"
      bodyClassName=" !px-[40px]"
      isOpen={isOpen}
      onClose={handleClose}
      header={`Add a Team Member (${step}/2)`}
      headerClassName="text-[#10295A] text-[20px] font-[500] !py-[25px] !px-[40px]"
      closeButton
    >
      <form onSubmit={formUtil.handleSubmit(handlePrimaryBtnClick)}>
        {stepsComponent?.[step - 1]?.comp}
        <Flex mb={"28px"} justifyContent={"end"} mt={"40px"}>
          <ButtonPair
            primaryBtnText={step == 1 ? "Next (1/2)" : "Confirm"}
            secondaryBtnText={step == 2 ? "Back" : "Cancel"}
            onPrimaryClick={undefined}
            primaryBtnType={"submit"}
            onSecondaryClick={handleSecondaryBtnClick}
            primaryBtnIsLoading={isLoading}
            //@ts-expect-error ignore
            primaryBtnDisabled={selectedIndex == null}
          />
        </Flex>
      </form>
    </CkAppModal>
  );
};

export default AddATeamMemberModal;
