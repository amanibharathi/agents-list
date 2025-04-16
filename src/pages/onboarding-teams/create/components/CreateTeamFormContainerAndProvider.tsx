import AdminFormWrapper from '../../../../login/adminlogin/AdminFormWrapper'
import { Box, Flex, useDisclosure } from '@chakra-ui/react'
import { createContext, useEffect, useMemo, useState } from 'react'
import ButtonPair from '../../../Auth/AgentComponents/admincompenets/ButtonPair'
import { useNavigate } from 'react-router-dom'
import {
  ADMIN_AGENTS_LISTING,
  MAKE_ADMIN_TEAM_DETAIL_TAB,
} from '../../../Auth/AgentComponents/navigation/urls'
import { useMutation } from 'react-query'
import {
  ADMIN_AGENT_BOARD_LIST,
  ADMIN_AGENT_TEAM_CREATE,
} from '../../../../api-utils'
import makePostRequest from '../../../../api/makePostRequest'
import toast from 'react-hot-toast'
import AddTeamMembersModal from './AddTeamMembersModal'
import AddTeamMembersTable from './AddTeamMembersTable'
import {
  ADMIN_AGENT_MLS_LIST,
  ADMIN_AGENT_STATE_LIST,
  ADMIN_AGENT_TEAM_MEMBERS_LIST,
} from '../../../../api-utils'
// import useGetMetaFromApi from '@/app/hooks/admin/useGetMetaFromApi'
// import AdminInputRenderer from '@/app/admin/_AdminComponent/AdminInputRenderer'
import {
  getFirstErrorMessage,
  removeSpecialChars,
} from '../../../../utils/functions/commonFunctions'
import useGetMetaFromApi from '../../../../utils/hooks/useGetMetaFromApi'
import AdminInputRenderer from '../../../../login/adminlogin/AdminInputRenderer'

export const CreateTeamProvider = createContext({});

const CreateTeamFormContainerAndProvider = ({
  newTeamForm,
}: {
  newTeamForm: any;
}) => {
  const router = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [tableData, setTableData] = useState([])
  const [selectedData, setSelectedData] = useState([])
  const watchData = newTeamForm.watch('data')
  const adminData = watchData?.team_admin
  const leaderData = watchData?.team_leader
  const membersData = watchData?.team_members

  useEffect(() => {
    // Combine adminData, leaderData, and tableData into a new array
    const combinedData = [
      adminData,
      leaderData,
      ...tableData,
      ...(membersData ?? []),
    ].filter(Boolean);

    // Update selectedData with the combined, filtered array
    //@ts-expect-error ignore
    setSelectedData(combinedData);
  }, [adminData, leaderData, membersData, tableData]);

  const { mutate } = useMutation(
    (body) => makePostRequest(ADMIN_AGENT_TEAM_CREATE, body),
    {
      onSuccess: (res) => {
        const id = res?.data?.id
        router(MAKE_ADMIN_TEAM_DETAIL_TAB(id))
        toast.success('Team Created Successfully')
      },
      onError: (err) => {
        //@ts-expect-error ignore
        const errMsg = getFirstErrorMessage(err?.response?.data?.data);
        //@ts-expect-error ignore
        toast.error(errMsg);
      },
    }
  );

  const handleSubmit = (data: any) => {
    const bdyObj = {
      identity: data?.data?.identity,
      state: data?.data?.state
        ? data?.data?.state?.map((each: any) => each?.value)
        : [],
      mls: data?.data?.mls
        ? data?.data?.mls?.map((each: any) => each?.value)
        : [],
      phone_number: data?.data?.phone_number
        ? `+1${removeSpecialChars(data?.data?.phone_number)}`
        : null,
      board: data?.data?.board
        ? data?.data?.board?.map((each: any) => each?.value)
        : [],
      website: data?.data?.website,
      //@ts-expect-error ignore
      team_admin: data?.data?.team_admin?.value || null,
      //@ts-expect-error ignore
      team_leader: data?.data?.team_leader?.value || null,
      team_members:
        data?.data?.team_members?.map((each: any) => each?.value) ||
        //@ts-expect-error ignore
        tableData?.slice(2, 20)?.map((each: any) => each?.id),
      team_type: "team",
      no_of_members: 0,
      no_of_closed_volume: 0,
      no_of_transactions: 0,
      document: [],
    };
    //@ts-expect-error ignore
    mutate(bdyObj);
  };

  const { metaData, handleOnInputChange } = useGetMetaFromApi({
    endPoint: ADMIN_AGENT_TEAM_MEMBERS_LIST,
  });
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

  const agentsMemberOptions = metaData?.data?.results;
  const agentMlsOptions = agentsMlsData?.data?.results;
  const agentStateOptions = agentsStateData?.data?.results;
  const agentBoardOptions = agentsBoardData?.data?.results;

  const teamInfoInputObj = useMemo(
    () => [
      {
        label: "Team Name*",
        name: "identity",
        className: " w-full max-w-[410px]",
        otherRegProps: {
          required: true,
        },
      },

      {
        label: "State",
        name: "state",
        type: "multi-select",
        options: agentStateOptions,
        onInpuChange: (val: any) => handleStateDataChange(val),
        className: " w-full max-w-[410px] !z-[11]",
        otherRegProps: {
          required: false,
        },
      },
      {
        label: "MLS",
        name: "mls",
        type: "multi-select",
        options: agentMlsOptions,
        onInpuChange: (val: any) => handleMlsDataChange(val),
        className: " w-full max-w-[410px]",
        otherRegProps: {
          required: false,
        },
        filterOption: () => true,
      },
      {
        label: "Board",
        type: "multi-select",
        name: "board",
        options: agentBoardOptions,
        onInpuChange: (val: any) => handleBoardDataChange(val),
        className: " w-full max-w-[410px]",
        otherRegProps: {
          required: false,
        },
      },
      {
        label: "Phone",
        name: "phone_number",
        type: "tel",
        className: " w-full max-w-[410px]",
        otherRegProps: {
          required: false,
        },
      },
      {
        label: "Website",
        name: "website",
        className: " w-full max-w-[410px]",
        otherRegProps: {
          pattern:
            /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/,
          required: false,
        },
      },
    ],
    [agentMlsOptions, agentStateOptions, agentBoardOptions]
  );

  const teamLeaderInputObj = useMemo(() => {
    return {
      label: "Team Leader",
      name: "team_leader",
      type: "select",
      options: agentsMemberOptions,
      onInpuChange: (val: any) => handleOnInputChange(val),
      className: "!z-[20] w-full max-w-[410px]",
      isDisabled: tableData?.length > 0,
      otherRegProps: {
        required: false,
      },
    };
  }, [metaData, tableData, agentsMemberOptions]);

  const teamAdminInputObj = useMemo(() => {
    return {
      label: "Team Admin",
      name: "team_admin",
      type: "select",
      options: agentsMemberOptions,
      onInpuChange: (val: any) => handleOnInputChange(val),
      className: "!z-[10] w-full max-w-[410px]",
      otherRegProps: {
        required: false,
      },
    };
  }, [metaData, agentsMemberOptions]);

  const teamMembersInputObj = useMemo(() => {
    return {
      label: "Team Members",
      name: "team_members",
      type: "multi-select",
      options: agentsMemberOptions,
      onInpuChange: (val: any) => handleOnInputChange(val),
      className: "!z-[0] w-full max-w-[410px]",
      otherRegProps: {
        required: false,
      },
    };
  }, [metaData, agentsMemberOptions]);

  const goToPrvPage = () => {
    router(ADMIN_AGENTS_LISTING)
  }

  return (
    <div>
      <form onSubmit={newTeamForm.handleSubmit(handleSubmit)}>
        <Flex pb={"57px"} gap={"40px"} flexFlow={"column"}>
          <AdminFormWrapper
            titleClassName="mb-[39px] mt-[-4px]"
            title="Team Information"
          >
            <Box className="grid grid-cols-2 gap-[28px] max-w-[850px]">
              {teamInfoInputObj?.map((i: any, ind: any) => (
                <Box key={ind} className="">
                  <AdminInputRenderer
                    register={newTeamForm?.register}
                    control={newTeamForm?.control}
                    errors={newTeamForm?.formState?.errors?.data}
                    inputObj={i}
                  />
                </Box>
              ))}
            </Box>
          </AdminFormWrapper>
          <AdminFormWrapper
            titleClassName="mb-[39px] mt-[-4px]"
            title="Team Leader Information"
            buttonLabel="Add a Team Leader"
            onOpen={onOpen}
            disabled={leaderData != undefined}
          >
            <AdminInputRenderer
              register={newTeamForm?.register}
              control={newTeamForm?.control}
              errors={newTeamForm?.formState?.errors?.data}
              //@ts-expect-error ignore
              inputObj={teamLeaderInputObj}
            />
          </AdminFormWrapper>
          <AdminFormWrapper
            titleClassName="mb-[39px] mt-[-4px]"
            title="Team Admin Information"
            buttonLabel="Add a Team Admin"
            onOpen={onOpen}
            disabled={adminData != undefined}
          >
            <AdminInputRenderer
              register={newTeamForm?.register}
              control={newTeamForm?.control}
              errors={newTeamForm?.formState?.errors?.data}
              //@ts-expect-error ignore
              inputObj={teamAdminInputObj}
            />
          </AdminFormWrapper>
          <AdminFormWrapper
            titleClassName="mb-[39px] mt-[-4px]"
            title="Team Members Information"
            buttonLabel="Add a Team Members"
            onOpen={onOpen}
          >
            <AdminInputRenderer
              register={newTeamForm?.register}
              control={newTeamForm?.control}
              errors={newTeamForm?.formState?.errors?.data}
              //@ts-expect-error ignore
              inputObj={teamMembersInputObj}
            />
          </AdminFormWrapper>
          <AddTeamMembersTable tableData={selectedData} />
          <Flex justifyContent={"end"} mt={"10px"}>
            <ButtonPair
              primaryBtnText={"Create Team"}
              secondaryBtnText={"Cancel"}
              onPrimaryClick={undefined}
              primaryBtnType={"submit"}
              onSecondaryClick={goToPrvPage}
              primaryBtnIsLoading={false}
            />
          </Flex>
        </Flex>
      </form>
      <AddTeamMembersModal
        onClose={onClose}
        isOpen={isOpen}
        tableData={tableData}
        setTableData={setTableData}
      />
    </div>
  );
};

export default CreateTeamFormContainerAndProvider;
