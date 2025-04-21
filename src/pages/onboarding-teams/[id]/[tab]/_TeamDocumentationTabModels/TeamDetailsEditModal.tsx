// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
// import CkAppModal from '@/app/components/modal/AppModal'
import { useEffect, useMemo } from 'react'
import AddATeamMemberModalStep1 from './AddATeamMemberModalStep1'
import { useForm } from 'react-hook-form'
import {
  ADMIN_AGENT_BOARD_LIST,
  ADMIN_AGENT_MLS_LIST,
  ADMIN_AGENT_STATE_LIST,
  ADMIN_AGENT_TEAM_DETAIL,
  ADMIN_AGENT_TEAM_UPDATE,
} from '../../../../../api-utils'
import { Flex } from '@chakra-ui/react'
import ButtonPair from '../../../../Auth/AgentComponents/admincompenets/ButtonPair'
import { useMutation, useQueryClient } from 'react-query'
// import makeGetRequest from '@/app/utils/api/makeGetRequest'
import { MAKE_ADMIN_TEAM_DETAIL_TAB } from '../../../../Auth/AgentComponents/navigation/urls'
import makePatchRequest from '../../../../../api/makePatchRequest'
import toast from 'react-hot-toast'
import {
  getFirstErrorMessage,
  getResponse,
  removeSpecialChars,
} from '../../../../../utils/functions/commonFunctions'
// import { getResponse } from '@/app/real-estate-agents/join/onboard/stage/utils/common'
// import useGetMetaFromApi from '@/app/hooks/admin/useGetMetaFromApi'
import CkAppModal from '../../../../Auth/AgentComponents/admincompenets/AppModal'
import useGetMetaFromApi from '../../../../../utils/hooks/useGetMetaFromApi'
import { useNavigate } from 'react-router-dom'

const TeamDetailsEditModal = ({
  isOpen,
  onClose,
  params,
  data,
}: {
  isOpen: boolean;
  onClose: () => void;
  params: string;
  data: any;
}) => {
  const formUtil = useForm({
    defaultValues: {
      data: {
        ...data?.data,
      },
    },
  });

  useEffect(() => {
    if (data) {
      const a = {
        data: {
          ...data?.data,
          state: getResponse(data?.data?.state),
          mls: getResponse(data?.data?.mls),
          board: getResponse(data?.data?.board),
          phone_number: data?.data?.phone_number?.substr(2, 13),
        },
      };
      formUtil.reset(a);
    }
  }, [data]);

  const router = useNavigate()
  const queryClient = useQueryClient()

  const { mutate } = useMutation(
    (body) => makePatchRequest(ADMIN_AGENT_TEAM_UPDATE(params), body),
    {
      onSuccess: (res) => {
        console.log(res);
        // const id = res?.data?.id
        queryClient.invalidateQueries({
          queryKey: [ADMIN_AGENT_TEAM_DETAIL(params)],
        })
        router(MAKE_ADMIN_TEAM_DETAIL_TAB(params))
        toast.success('Team Information Updated Sucessfully')
        onClose()
        formUtil.reset()
      },
      onError: (err) => {
        console.log(err);
        //@ts-expect-error ignore
        const errMsg = getFirstErrorMessage(err?.response?.data?.data);
        //@ts-expect-error ignore
        toast.error(errMsg);
      },
    }
  );

  const { metaData: agentsMlsData, handleOnInputChange: handleMlsDataChange } =
    useGetMetaFromApi({
      endPoint: ADMIN_AGENT_MLS_LIST,
    });
  const {
    metaData: agentsStateData,
    handleOnInputChange: handleStateDataChange,
  } = useGetMetaFromApi({
    endPoint: ADMIN_AGENT_STATE_LIST,
  });
  const {
    metaData: agentsBoardData,
    handleOnInputChange: handleBoardDataChange,
  } = useGetMetaFromApi({
    endPoint: ADMIN_AGENT_BOARD_LIST,
  });

  const agentMlsOptions = agentsMlsData?.data?.results;
  const agentStateOptions = agentsStateData?.data?.results;
  const agentBoardOptions = agentsBoardData?.data?.results;

  const inputFields = useMemo(
    () => [
      {
        label: "Team Name *",
        name: "identity",
        placeholder: "Enter Team Name",
        className: "!rounded-l-[0] !rounded-l-[0] !z-[2]",
        formControlClassName: "!z-[2]",
        otherRegProps: {
          // required: true,
        },
      },
      {
        label: "State *",
        name: "state",
        type: "multi-select",
        options: agentStateOptions,
        className: "!z-[12]",
        onInpuChange: (val: any) => handleStateDataChange(val),
        otherRegProps: {
          //@ts-expect-error ignore
          // value: stateObject?.label,
          // required: true,
        },
      },
      {
        label: "Phone Number *",
        name: "phone_number",
        type: "tel",
      },
      {
        label: "Board",
        name: "board",
        type: "multi-select",
        className: "!z-[11]",
        onInpuChange: (val: any) => handleBoardDataChange(val),
        options: agentBoardOptions,
        otherRegProps: {
          required: false,
        },
      },
      {
        label: "Website",
        name: "website",
        otherRegProps: {
          required: false,
        },
      },
      {
        label: "MLS *",
        name: "mls",
        type: "multi-select",
        options: agentMlsOptions,
        onInpuChange: (val: any) => handleMlsDataChange(val),
        otherRegProps: {
          // required: true,
          value: "",
        },
      },
    ],
    [agentMlsOptions, agentStateOptions, data]
  );

  const handlePrimaryBtnClick = () => {
    const watchData = formUtil.watch("data");
    const obj = {
      identity: watchData?.identity,
      state: watchData?.state?.map((each: any) => each?.value),
      mls: watchData?.mls?.map((each: any) => each?.value),
      website: watchData?.website,
      phone_number: watchData?.phone_number
        ? `+1${removeSpecialChars(watchData?.phone_number)}`
        : null,
      board: watchData?.board?.map((each: any) => each?.value),
    };
    //@ts-expect-error ignore
    mutate(obj);
  };

  const stepsComponent = [
    {
      comp: (
        <AddATeamMemberModalStep1
          inputFields={inputFields}
          formUtil={formUtil}
        />
      ),
    },
  ];

  const handleSecondaryBtnClick = () => {
    onClose();
    formUtil.reset();
  };

  return (
    <CkAppModal
      className="!w-full !max-w-[771px] !rounded-[10px]"
      bodyClassName=" !px-[40px]"
      isOpen={isOpen}
      onClose={onClose}
      header={`Edit Team Information`}
      headerClassName="text-[#10295A] text-[20px] font-[500] !py-[25px] !px-[40px]"
      closeButton
    >
      <form onSubmit={formUtil.handleSubmit(handlePrimaryBtnClick)}>
        {stepsComponent?.[0]?.comp}
        <Flex mb={"28px"} justifyContent={"end"} mt={"40px"}>
          <ButtonPair
            primaryBtnText={"Update"}
            secondaryBtnText={"Cancel"}
            onPrimaryClick={undefined}
            primaryBtnType={"submit"}
            onSecondaryClick={handleSecondaryBtnClick}
            primaryBtnIsLoading={false}
          />
        </Flex>
      </form>
    </CkAppModal>
  );
};

export default TeamDetailsEditModal;
