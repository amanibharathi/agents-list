'use client'
import { Box, Flex } from '@chakra-ui/react'
import React, { createContext, useEffect, useMemo, useState } from 'react'
import ButtonPair from '../../../Auth/AgentComponents/admincompenets/ButtonPair'
import {
  MAKE_ACTIVE_TEAMS_LIST_PAGE,
  MAKE_ADMIN_TEAM_DETAIL_TAB,
} from '../../../Auth/AgentComponents/navigation/urls'
import { useMutation } from 'react-query'
import {
  // ADMIN_AGENT_TEAM_CREATE,
  ADMIN_TEAM_CUD,
  ADMIN_TEAM_DOCUMENT_UPLOAD,
  GET_TEAM_AGENT_LIST,
} from '../../../../api-utils'
import makePostRequest from '../../../../api/makePostRequest'
import toast from 'react-hot-toast'
import {
  ADMIN_AGENT_MLS_LIST,
  ADMIN_AGENT_STATE_LIST,
  // ADMIN_AGENT_TEAM_MEMBERS_LIST,
} from '../../../../api-utils'
// import useGetMetaFromApi from '@/app/hooks/admin/useGetMetaFromApi'
// import AdminInputRenderer from '@/app/admin/_AdminComponent/AdminInputRenderer'
import {
  addSpecialCharsForPhoneNumber,
  closedValueOptions,
  getFirstErrorMessage,
  removeSpecialChars,
  transformSelectData,
} from '../../../../utils/functions/commonFunctions'
import Select, { components } from 'react-select'
import { GoSearch } from 'react-icons/go'
import useGetMetaFromApi from '../../../../utils/hooks/useGetMetaFromApi'
import AdminInputRenderer from '../../../../login/adminlogin/AdminInputRenderer'
import AdminFormWrapperTeam from '../../../../login/adminlogin/AdminFormWrapperTeam'
import { useGetAgentList } from '../../../../utils/hooks/useGetAgentList'
import AppText from '../../../../AppComponents/AppText-agent'
import AppLoader from '../../../Auth/AgentComponents/admincompenets/AppLoader'
import { ExportUp } from '../../[id]/[tab]/_TeamDocumentationTabModels/ExportUp'
import MultiFileUpload from '../../../Auth/AgentComponents/admincompenets/MultiFileUpload'
import { numberToNumeralSystem } from '../../../Auth/AgentComponents/admincompenets'
import { useNavigate } from 'react-router-dom'

export const CreateTeamProvider = createContext({});

const CreateTeamNewForm = ({ newTeamForm }: { newTeamForm: any }) => {
  const router = useNavigate
  const [selectedAgent, setSelectAgent] = useState()
  const [transactions, setTransactions] = useState('')

  const { mutate, isLoading } = useMutation(
    (body) => makePostRequest(ADMIN_TEAM_CUD(), body),
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
      email: data?.data?.team_email,
      phone_number: data?.data?.team_phone
        ? `+1${removeSpecialChars(data?.data?.team_phone)}`
        : null,
      state: data?.data?.team_state ? data?.data?.team_state?.id : null,
      mls: data?.data?.mls
        ? data?.data?.mls?.map((each: any) => each?.value)
        : [],
      board: data?.data?.board
        ? data?.data?.board?.map((each: any) => each?.value)
        : [],
      website: data?.data?.website,
      //@ts-expect-error ignore
      // team_admin: data?.data?.team_admin?.value || null,
      //@ts-expect-error ignore
      team_leader: selectedAgent?.value || null,
      //@ts-expect-error ignore
      documents: imageState?.flat()?.map((i: any) => i?.id),
      closed_volumes: data?.data?.closed_volumes?.value ?? null,
      no_of_transactions:
        data?.data?.no_of_transactions != ""
          ? data?.data?.no_of_transactions?.replace(",", "")
          : null,
    };
    //@ts-expect-error ignore
    mutate(bdyObj);
  };

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

  // const agentsMemberOptions = metaData?.data?.results
  const agentMlsOptions = agentsMlsData?.data?.results;
  const agentStateOptions = agentsStateData?.data?.results;

  const teamInfoInputObj = [
    {
      label: "Contact Email *",
      name: "team_email",
      className: " w-full max-w-[495px]",
      otherRegProps: {
        required: true,
        pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,20})+$/,
      },
    },
    {
      label: "Contact Phone Number *",
      name: "team_phone",
      type: "tel",
      className: " w-full max-w-[495px]",
      otherRegProps: {
        pattern: /^\(\d{3}\)-\d{3}-\d{4}$/,
        required: true,
      },
    },
    {
      label: "Primary State *",
      name: "team_state",
      type: "select",
      options: agentStateOptions,
      onInpuChange: (val: any) => handleStateDataChange(val),
      className: "w-full max-w-[495px] !z-[22]",
      otherRegProps: {
        required: true,
      },
    },
    {
      label: "Board",
      type: "multi-select",
      name: "board",
      options: agentMlsOptions,
      onInpuChange: (val: any) => handleMlsDataChange(val),
      className: "w-full max-w-[495px]",
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
      className: " w-full max-w-[495px] !z-[21]",
      otherRegProps: {
        required: false,
      },
      filterOption: () => true,
    },
    {
      label: "Team Website",
      name: "website",
      className: " w-full max-w-[495px]",
      otherRegProps: {
        pattern:
          /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/,
        required: false,
      },
    },
    {
      label: "Closed Volume",
      name: "closed_volumes",
      otherRegProps: {
        required: false,
      },
      type: "select",
      options: closedValueOptions,
    },
    {
      label: "No of Transactions",
      name: "no_of_transactions",
      otherRegProps: {
        required: false,
      },
      value: transactions,
      onChange: (event: any) => {
        const input = event.target;
        const value = input.value.replace(/\D/g, ""); // Remove non-numeric characters
        const formattedValue =
          value !== "" ? numberToNumeralSystem(parseInt(value)) : "";
        setTransactions(formattedValue);
      },
    },
  ];

  const agentsInfoInputObj = useMemo(
    () => [
      {
        label: "First Name *",
        name: "first_name",
        className: " w-full max-w-[495px]",
        readOnly: true,
        otherRegProps: {
          required: false,
        },
      },
      {
        label: "Last Name *",
        name: "last_name",
        className: " w-full max-w-[495px]",
        readOnly: true,
        otherRegProps: {
          required: false,
        },
      },
      {
        label: "License# *",
        name: "license",
        className: " w-full max-w-[495px]",
        readOnly: true,
        otherRegProps: {
          required: false,
        },
      },
      {
        label: "Primary State *",
        type: "select",
        name: "state",
        options: agentStateOptions,
        className: " w-full max-w-[495px] !z-[11]",
        readOnly: true,
        otherRegProps: {
          required: false,
        },
      },
      {
        label: "Contact Phone Number *",
        name: "phone_number",
        type: "tel",
        className: " w-full max-w-[495px]",
        readOnly: true,
        otherRegProps: {
          required: false,
        },
      },
      {
        label: "Contact Email *",
        name: "email",
        className: " w-full max-w-[495px]",
        readOnly: true,
        otherRegProps: {
          required: false,
        },
      },
    ],
    [agentMlsOptions, agentStateOptions]
  );

  const goToPrvPage = () => {
    router(MAKE_ACTIVE_TEAMS_LIST_PAGE())
  }
  const {
    // metaIsLoading,
    groupedOptions,
    // isFetching,
    // isSuccess,
    setSearchVal,
  } = useGetAgentList(GET_TEAM_AGENT_LIST, true);

  const customOptionComp = ({ ...props }) => {
    return (
      //@ts-expect-error ignore
      <components.Option {...props} className="!cursor-pointer">
        <div className="flex gap-[10px] md:gap-[15px] items-center h-full">
          {
            <div>
              <div className="flex flex-col">
                <span className="text-[14px] capitalize font-[500]">
                  {props?.data?.label}{" "}
                  <span className="text-[#9a9191]">
                    {props?.data?.license ? " #" + props?.data?.license : ""}
                  </span>
                </span>
                <span className="text-[12px] capitalize">
                  {props?.data?.phone_number
                    ? props?.data?.phone_number + ",  "
                    : ""}
                  {props?.data?.email}
                </span>
              </div>
            </div>
          }
        </div>
      </components.Option>
    );
  };

  //@ts-expect-error ignore
  const Menu = ({ children, ...props }) => {
    // if (groupedOptions?.length == 0) return null
    return (
      //@ts-expect-error ignore
      <components.Menu {...props} className="!cursor-pointer">
        {children}
      </components.Menu>
    );
  };

  const handleInputChange = (e: string) => {
    setSearchVal(e);
  };

  const handleClick = (e: any) => {
    if (e?.value !== "0") setSelectAgent(e);
  };

  useEffect(() => {
    newTeamForm.setValue(
      "data.first_name",
      //@ts-expect-error ignore
      selectedAgent?.label?.split(" ")?.[0]
    );
    newTeamForm.setValue(
      "data.last_name",
      //@ts-expect-error ignore
      selectedAgent?.label?.split(" ")?.[1]
    );
    newTeamForm.setValue(
      "data.license",
      //@ts-expect-error ignore
      selectedAgent?.license
    );
    //@ts-expect-error ignore
    newTeamForm.setValue("data.email", selectedAgent?.email);
    newTeamForm.setValue(
      "data.state",
      //@ts-expect-error ignore
      transformSelectData(selectedAgent?.state)
    );
    newTeamForm.setValue(
      "data.phone_number",
      //@ts-expect-error ignore
      addSpecialCharsForPhoneNumber(selectedAgent?.phone_number)
    );
  }, [selectedAgent]);

  const [imageState, setImageState] = useState();

  const uploadObj = {
    label: "",
    name: "",
    type: "",
    imageState: imageState,
    setImageState: setImageState,
    uploadKey: "",
    fileTypes: ["jpg", "jpeg", "png", "pdf", "xlsx"],
    placeholder: "",
    fileTypeKey: "",
  };

  const customUiBodyComp = (isLoading: boolean) => {
    return (
      <>
        <AppText className="text-left mb-1 !text-[#444444] text-[18px] font-semibold">
          Upload File
        </AppText>
        <Flex
          className="border border-dashed border-[#C0C0C0] w-[700px] h-[150px] items-center justify-center"
          maxWidth={"700px"}
          alignItems={"center"}
          flexFlow={"column"}
        >
          {isLoading ? (
            <AppLoader />
          ) : (
            <div className=" flex flex-col gap-[10px] items-center">
              <ExportUp />
              <AppText>
                Drag your files here or{" "}
                <span className="underline text-[#10295A]">Browse</span>
              </AppText>
            </div>
          )}
        </Flex>
      </>
    );
  };

  return (
    <div>
      <form onSubmit={newTeamForm.handleSubmit(handleSubmit)}>
        <Flex pb={"57px"} gap={"40px"} flexFlow={"column"}>
          <AdminFormWrapperTeam title="Team Details">
            <Box className="flex flex-col gap-[28px] max-w-[1020px]">
              <AdminInputRenderer
                register={newTeamForm?.register}
                control={newTeamForm?.control}
                errors={newTeamForm?.formState?.errors?.data}
                labelClassName="!text-[#444444] !text-[16px]"
                //@ts-expect-error ignore
                inputObj={{
                  label: "Team Name*",
                  name: "identity",
                  className: " w-full max-w-[495px]",
                  otherRegProps: {
                    required: true,
                  },
                }}
              />
              <Box className="grid grid-cols-2 gap-[28px]">
                {teamInfoInputObj?.map((i: any, ind: any) => (
                  <Box key={ind} className="">
                    <AdminInputRenderer
                      register={newTeamForm?.register}
                      labelClassName="!text-[#444444] !text-[16px]"
                      control={newTeamForm?.control}
                      errors={newTeamForm?.formState?.errors?.data}
                      inputObj={i}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </AdminFormWrapperTeam>
          <AdminFormWrapperTeam title="Team Leader Details">
            <Box className="flex flex-col gap-[28px] max-w-[1020px]">
              <div className="flex flex-col gap-[10px]">
                <AppText className={`!text-[#444444] text-[16px] font-[600]`}>
                  Search
                </AppText>

                {/* Select Component */}
                <Select
                  inputId="agent-search-input"
                  noOptionsMessage={() => (
                    <div>
                      Search and select agent by name, LIC #, phone, or email...
                    </div>
                  )}
                  loadingMessage={() => (
                    <p className="text-[13px]">Searching......</p>
                  )}
                  placeholder="Search and select agent by name, LIC #, phone, or email..."
                  className="w-full !border-none !shadow-none !outline-none !ring-0 !text-[10px] md:!text-[14px] !top-0 rounded-[5px] !z-[12]"
                  options={groupedOptions}
                  filterOption={() => true}
                  //@ts-expect-error ignore
                  isOptionDisabled={(option) => option?.team}
                  value={""}
                  components={{
                    Option: customOptionComp,
                    DropdownIndicator: (props) => (
                      <components.DropdownIndicator {...props}>
                        <GoSearch color="#000000" fontSize={"22px"} />
                      </components.DropdownIndicator>
                    ),
                    Menu: Menu,
                  }}
                  onInputChange={handleInputChange}
                  onChange={handleClick}
                />
              </div>
              <Box className="grid grid-cols-2 gap-[28px]">
                {agentsInfoInputObj?.map((i: any, ind: any) => (
                  <Box key={ind} className="">
                    <AdminInputRenderer
                      register={newTeamForm?.register}
                      labelClassName="!text-[#444444] !text-[16px]"
                      control={newTeamForm?.control}
                      errors={newTeamForm?.formState?.errors?.data}
                      inputObj={i}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </AdminFormWrapperTeam>
          <AdminFormWrapperTeam title="Documents">
            <MultiFileUpload
              customUiBody={customUiBodyComp}
              customEndPoint={ADMIN_TEAM_DOCUMENT_UPLOAD}
              imageState={uploadObj?.imageState}
              setImageState={uploadObj?.setImageState}
              uploadKey={uploadObj?.uploadKey}
              fileTypeKey={uploadObj?.fileTypeKey}
              fileTypes={uploadObj?.fileTypes}
              name={uploadObj?.name}
              isCreate
            />
          </AdminFormWrapperTeam>
          <Flex justifyContent={"end"} mt={"10px"}>
            <ButtonPair
              primaryBtnText={"Create"}
              secondaryBtnText={"Cancel"}
              onPrimaryClick={undefined}
              primaryBtnType={"submit"}
              onSecondaryClick={goToPrvPage}
              primaryBtnIsLoading={isLoading}
            />
          </Flex>
        </Flex>
      </form>
    </div>
  );
};

export default CreateTeamNewForm;
