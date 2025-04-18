// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import makePostRequest from "../../../../api/makePostRequest";
import { Box, Flex } from "@chakra-ui/react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { v4 as uuid } from "uuid";
import AdminInputRenderer from "../../../../login/adminlogin/AdminInputRenderer";
import ButtonPair from "../../../Auth/AgentComponents/admincompenets/ButtonPair";
import NewAdminInputRenderer from "../../../../login/adminlogin/NewAdminInputRenderer";
import NoData from "../../../Auth/AgentComponents/admincompenets/NoData";
import {
  ADMIN_AGENT_DETAIL_GET_META,
  ADMIN_AGENT_ON_BOARDING_UPDATE,
  GET_OKTA_USER_GROUP,
} from "../../../../api-utils";
import AppButton from "../../../../AppComponents/AppButton-agent";
import AppImage from "../../../../AppComponents/AppImage";
import AppText from "../../../../AppComponents/AppText-agent";
import LoaderLayout from "../../../Auth/AgentComponents/table/LoaderLayout";
import CkAppModal from "../../../Auth/AgentComponents/admincompenets/AppModal";
import makeGetRequest from "../../../../api/makeGetRequest";
import { capitalizeFirstLetter } from "../../../Auth/AgentComponents/table/resourceSectionData";
import {
  commissionPlanOptions,
  getFirstErrorMessage,
  getFirstErrorMessageCms,
} from "../../../../utils/functions/commonFunctions";

const AgentApproveEditModal = ({
  isOpen,
  onClose,
  refetch,
  refetchAgentData,
  data,
  isLoading,
  isError,
  isForceApprove,
}: {
  isOpen: boolean;
  onClose: () => void;
  refetch: any;
  data: any;
  isLoading: any;
  isError: any;
  isForceApprove?: boolean;
  refetchAgentData?: any;
}) => {
  const { id } = useParams();

  const formUtil = useForm({
    defaultValues: {
      data: data,
    },
  });

  const { register, control, watch, setValue, handleSubmit, formState } =
    formUtil;

  const metaEndpoint = ADMIN_AGENT_DETAIL_GET_META(data?.id);

  const { isLoading: metaIsLoading, data: metaData } = useQuery(
    [metaEndpoint],
    () => makeGetRequest(metaEndpoint),
    {
      enabled: !!data?.id,
    }
  );

  useEffect(() => {
    if (metaData && data) {
      let capStatusValue = metaData?.data?.meta?.cap_status?.filter(
        (m: any) => m?.id === metaData?.data?.initial?.cap_status
      )?.[0];
      if (capStatusValue?.id) {
        capStatusValue = {
          label: capStatusValue?.identity,
          value: capStatusValue?.id,
        };
      }

      const commPlanValue =
        commissionPlanOptions?.filter(
          (f) =>
            f?.value == metaData?.data?.initial?.commission_plan ||
            f?.label == metaData?.data?.initial?.commission_plan
        )?.[0] || "";

      formUtil.reset({
        data: {
          ...data,
          roa_email: data?.roa_email?.split("@")[0],
          team: capitalizeFirstLetter(data?.team?.identity),
          office: capitalizeFirstLetter(data?.brokerage?.identity),
          preferred_name: capitalizeFirstLetter(
            data?.user_data?.preferred_name
          ),
          joining_date: moment().format("YYYY-MM-DD"),
          cap_status: capStatusValue,
          commission_plan: commPlanValue,
        },
      });
    }
  }, [data, metaData, metaIsLoading]);

  const { data: userGroupData } = useQuery([GET_OKTA_USER_GROUP], () =>
    makeGetRequest(GET_OKTA_USER_GROUP)
  );

  const getOktaUserGroupList = (list: any) => {
    const listValue = list?.map((each: any) => {
      return {
        id: each?.id,
        identity: each?.profile?.name,
        label: each?.profile?.name,
        value: each?.id,
      };
    });

    return listValue;
  };

  const oktaUserGroup = userGroupData?.data ?? [];

  const isForwardingEmail = watch("data.forwarding_email");
  const [editMail, setEditMail] = useState(() => {
    if (isForwardingEmail) return true;
    else return false;
  });

  const { mutate, isLoading: isStatusLoading } = useMutation(
    (body) => makePostRequest(ADMIN_AGENT_ON_BOARDING_UPDATE, body),
    {
      onSuccess: (res) => {
        if (res?.status === "success")
          toast.success("Agent Onboarded Successfully");
        // queryClient.invalidateQueries(['getAgentStatus', id])
        refetch();
        refetchAgentData && refetchAgentData();
        onClose();
      },
      onError: (err: any) => {
        //@ts-expect-error ignore
        const errMsg = getFirstErrorMessage(err?.response?.data?.data);
        //@ts-expect-error ignore
        toast.error(errMsg);
      },
    }
  );

  const agentInfoObj = useMemo(
    () => [
      {
        key: uuid(),
        thisWrapperClassName: "grid grid-cols-2 gap-x-[30px]",
        render: [
          {
            label: "ROA Agent ID",
            name: "agent_id",
            value: watch("data.agent_id") || "",
            otherRegProps: {
              required: false,
            },
            placeholder: "",
            readOnly: true,
          },
        ],
      },
      {
        key: uuid(),
        thisWrapperClassName: "grid grid-cols-2 gap-x-[30px]",
        render: [
          {
            label: "First Name",
            name: "user_data.first_name",
            readOnly: true,
            otherRegProps: {
              required: false,
            },
          },
          {
            label: "Last Name",
            name: "user_data.last_name",
            readOnly: true,
            otherRegProps: {
              required: false,
            },
          },
        ],
      },
      {
        key: uuid(),
        thisWrapperClassName: "grid grid-cols-2 gap-x-[30px]",
        render: [
          {
            label: "Preferred Name *",
            name: "preferred_name",
            placeholder: "",
            otherRegProps: {
              required: true,
            },
          },
          {
            label: "Date of Birth",
            name: "dob",
            readOnly: true,
            type: "dob",
            otherRegProps: {
              required: false,
            },
          },
        ],
      },
      {
        key: uuid(),
        thisWrapperClassName: "grid grid-cols-2 gap-x-[30px]",
        render: [
          {
            label: "City",
            name: "user_data.city",
            otherRegProps: {
              required: false,
            },
            readOnly: true,
          },
          {
            label: "Commission Plan *",
            name: "commission_plan",
            type: "select",
            options: commissionPlanOptions,
            otherRegProps: {
              required: {
                value: true,
                message: "Please Select a commission plan",
              },
            },
            className: "!z-[19]",
          },
        ],
      },
      {
        key: uuid(),
        thisWrapperClassName: "grid grid-cols-2 gap-x-[30px]",
        render: [
          {
            label: "Anniversary Date *",
            name: "joining_date",
            type: "dob",
            otherRegProps: {
              required: true,
            },
          },
          {
            label: "Cap Status *",
            name: "cap_status",
            type: "select",
            otherRegProps: {
              required: true,
            },
            options: metaData?.data?.meta?.cap_status || [],
          },
        ],
      },
    ],
    []
  );

  const formsList = [
    {
      inputObj: agentInfoObj,
    },
  ];
  const agentTeamObj = useMemo(
    () => [
      {
        key: uuid(),
        thisWrapperClassName: "grid grid-cols-2 gap-x-[30px]",
        render: [
          {
            label: "Team",
            name: "team",
            readOnly: true,
            otherRegProps: {
              required: false,
            },
            placeholder: "",
          },
          {
            label: "Office",
            name: "office",
            readOnly: true,
            otherRegProps: {
              required: false,
            },
          },
        ],
      },
      // {
      //   key: uuid(),
      //   thisWrapperClassName: 'grid grid-cols-2 gap-x-[30px]',
      //   render: [
      //     {
      //       label: 'Title',
      //       name: 'title',
      //       type: 'multi-select',
      //       onInpuChange: (val: any) => handleStateDataChange(val),
      //       options: agentStateOptions,
      //       otherRegProps: {
      //         required: false,
      //       },
      //     },
      //   ],
      // },
    ],
    [data]
  );

  const teamFormsList = [
    {
      inputObj: agentTeamObj,
    },
  ];

  const agentEmailObj = useMemo(
    () => [
      {
        key: uuid(),
        thisWrapperClassName: "grid grid-cols-2 gap-x-[30px]",
        render: [
          {
            label: "ROA Email Address *",
            className: "w-[45%]",
            name: "roa_email",
            type: "roa_email",
            suffix: "@realtyofamerica.com",
            suffixClassName: "pl-[2px] text-[18px] m-auto",
            otherRegProps: {
              required: false,
            },
            onChange: (e: any) => {
              const inputValue = e.target.value.replace(/@/g, "");
              setValue("data.roa_email", inputValue);
            },
          },
        ],
      },

      editMail
        ? {
            key: uuid(),
            thisWrapperClassName: "grid grid-cols-2 gap-x-[3px]",
            render: [
              {
                name: "setup_email_forward",
                value: watch("data.setup_email_forward"),
                onChange: () => {
                  setValue(
                    "data.setup_email_forward",
                    !watch("data.setup_email_forward")
                  );
                },
                type: "checkbox",
                placeholder: "onboard-agent",
                imageState: `Setup Email Forwarding to ${
                  watch("data.forwarding_email") || "-"
                }`,
                options: null,
                required: false,
              },
              {
                type: "custom-input",
                comp: (
                  <AppButton
                    className="w-[30%]"
                    onClick={() => setEditMail(false)}
                  >
                    {" "}
                    Edit
                  </AppButton>
                ),
              },
            ],
          }
        : null,
    ],
    [data, watch("data.forwarding_email"), editMail]
  );

  const agentEmailList = [
    {
      inputObj: agentEmailObj,
    },
  ];

  const oktaInput = useMemo(
    () => [
      {
        key: uuid(),
        thisWrapperClassName: "grid grid-cols-2 gap-x-[30px]",
        render: [
          {
            name: "setup_okta",
            type: "checkbox",
            value: watch("data.setup_okta"),
            onChange: () => {
              setValue("data.setup_okta", !watch("data.setup_okta"));
            },
            placeholder: "onboard-agent",
            options: null,
            imageState: "Setup User in Okta",
            required: false,
          },
        ],
      },
    ],
    []
  );

  const oktaUserGroupInputObj = {
    name: "group_id",
    type: "multi-select",
    options: getOktaUserGroupList(oktaUserGroup),
    placeholder: "Select User Group",
    required: true,
    label: "User Group *",
  };
  const oktaList = [
    {
      inputObj: oktaInput,
    },
  ];

  const handlePrimaryBtnClick = () => {
    const finalData = {
      user: id,
      status: "approved",
      joining_date: watch("data.joining_date"),
      roa_email: watch("data.roa_email") + "@realtyofamerica.com",
      forwarding_email: watch("data.forwarding_email"),
      setup_email_forward: watch("data.setup_email_forward") || false,
      setup_okta: watch("data.setup_okta") || false,
      preferred_name: watch("data.preferred_name") || null,
      group_id: watch("data.group_id")?.map((each: any) => {
        return each?.value;
      }),
      is_force_approve: isForceApprove,
      commission_plan: watch("data.commission_plan")?.value,
      cap_status: watch("data.cap_status")?.value,
    };
    //@ts-expect-error ignore
    mutate(finalData);
  };

  const handleSecondaryBtnClick = () => {
    onClose();
  };
  const toolsData = watch("data.tools");
  const licenseDetails = watch("data.license_details");

  const onSuccess = () => handlePrimaryBtnClick();
  const onError = (err: unknown) => {
    //@ts-expect-error ignore
    const errMsg = getFirstErrorMessageCms(err?.data);
    //@ts-expect-error ignore
    toast.error(errMsg);
  };

  return (
    <CkAppModal
      className="!w-full !max-w-[930px] !rounded-[10px]"
      bodyClassName=" !px-[40px]"
      isOpen={isOpen}
      onClose={onClose}
      header={`Agent Summary`}
      headerClassName="text-[#10295A] text-[20px] font-[500] !py-[25px] !px-[40px] bg-[#ECEEFD]"
      closeButton
    >
      <LoaderLayout isLoading={isLoading} height="700px">
        {isError ? (
          <NoData />
        ) : (
          <form onSubmit={handleSubmit(onSuccess, onError)}>
            {/* SUMMARY -1  */}
            <Box className="grid grid-cols-1 gap-[28px] basis-[70%] border-b-[1px] border-[#CDCDCD] py-[30px]">
              {formsList?.map((m: any, index: any) => (
                <Box className="" key={index}>
                  <NewAdminInputRenderer
                    register={register}
                    control={control}
                    errors={formState.errors?.data}
                    boxWrapperClassName="grid grid-cols-1 gap-[28px] w-full max-w-[850px]"
                    inputObj={m?.inputObj}
                    inputWrapperClassName="w-full max-w-[410px]"
                    labelClassName="!text-[18px] !leading-[23px] !font-[600] !text-[#444444]"
                  />
                </Box>
              ))}
              {/* LICENSE DETAILS */}
              {licenseDetails?.map((license: any, index: any) => (
                <div
                  key={index}
                  className="w-[100%] grid grid-cols-2 gap-x-[30px]"
                >
                  <AdminInputRenderer
                    className="w-full max-w-[100%]"
                    wrapperClassName={`flex gap-[20px] text-[14px] `}
                    labelClassName=""
                    //@ts-expect-error ignore
                    inputObj={{
                      label: "State",
                      name: `primary-state-${index}`,
                      value: license?.state?.identity,
                      //@ts-expect-error ignore
                      readOnly: true,
                      otherRegProps: {
                        required: false,
                      },
                    }}
                    key={`primary-state-${index}`}
                    register={register}
                    control={control}
                    errors={formState.errors}
                  />
                  <AdminInputRenderer
                    className="w-full max-w-[100%]"
                    wrapperClassName={`flex gap-[20px] text-[14px]`}
                    labelClassName=""
                    //@ts-expect-error ignore
                    inputObj={{
                      label: "License Expiry Date",
                      name: `license_expiry_date-${index}`,
                      type: "dob",
                      value: license?.expiry_date,
                      otherRegProps: {
                        required: false,
                      },
                      //@ts-expect-error ignore
                      readOnly: true,
                    }}
                    key={`license_expiry_date-${index}`}
                    register={register}
                    control={control}
                    errors={formState.errors}
                  />
                </div>
              ))}
            </Box>
            {/* SUMMARY -2  */}
            <Box className="grid grid-cols-1 gap-[28px] basis-[70%] border-b-[1px] border-[#CDCDCD] py-[30px]">
              {teamFormsList?.map((m: any, index: any) => (
                <Box className="" key={index}>
                  <NewAdminInputRenderer
                    register={register}
                    control={control}
                    errors={formState.errors}
                    boxWrapperClassName="grid grid-cols-1 gap-[28px] w-full max-w-[850px]"
                    inputObj={m?.inputObj}
                    inputWrapperClassName="w-full max-w-[410px]"
                    labelClassName="!text-[18px] !leading-[23px] !font-[600] !text-[#444444]"
                  />
                </Box>
              ))}
            </Box>
            {/* SUMMARY -3  */}
            {!!toolsData?.length ? (
              <Box className="grid grid-cols-1 gap-[28px] basis-[70%] border-b-[1px] border-[#CDCDCD] py-[30px]">
                <div className="flex flex-col gap-[8px]">
                  <AppText
                    text="Tools"
                    className="!text-[18px] !leading-[23px] font-[600] "
                  />
                  <div className="grid grid-cols-4 gap-[8px] ">
                    {toolsData?.map((tool: any, index: any) => (
                      <div
                        key={index}
                        className="h-[45px] rounded-[5px] border-[1px] border-[#E6E7E9] p-[10px] flex items-center  gap-[10px]"
                      >
                        <AppImage
                          alt=""
                          src={tool?.logo?.image}
                          height="20"
                          width="20"
                        />
                        <AppText
                          text={tool?.identity}
                          className="!text-[16px] !leading-[20px] font-normal"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                {/* <AdminInputRenderer
                className="w-full max-w-[100%]"
                wrapperClassName={`flex gap-[20px] text-[14px] `}
                labelClassName="!text-[18px] !leading-[23px] !font-[600] !text-[#444444]"
                //@ts-expect-error ignore
                inputObj={{
                  label: 'Agent Website Slug',
                  name: 'agent_website_slug',
                }}
                key={uuid()}
                register={register}
                control={control}
                errors={formState.errors}
              /> */}
              </Box>
            ) : null}

            {/* SUMMARY -4  */}
            <Box className="grid grid-cols-1 gap-[28px] basis-[70%] border-b-[1px] border-[#CDCDCD] py-[30px]">
              {agentEmailList?.map((m: any, index: any) => (
                <Box className="" key={index}>
                  <NewAdminInputRenderer
                    register={register}
                    control={control}
                    errors={formState.errors}
                    boxWrapperClassName="grid grid-cols-1 gap-[28px] w-full max-w-[850px]"
                    inputObj={m?.inputObj}
                    inputWrapperClassName="w-full max-w-[410px] "
                    labelClassName="!text-[18px] !leading-[23px] !font-[600] !text-[#444444]"
                  />
                </Box>
              ))}
              {!editMail && (
                <div className="flex  gap-[10px]">
                  <AdminInputRenderer
                    className="w-full max-w-[90%]"
                    wrapperClassName={`flex gap-[20px] text-[14px]`}
                    labelClassName=""
                    //@ts-expect-error ignore
                    inputObj={{
                      label: "Forwarding Email *",
                      name: `forwarding_email_copy`,
                      type: "email",
                      //@ts-expect-error ignore
                      otherRegProps: {
                        pattern:
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,20})+$/,
                        required: true,
                      },
                      value:
                        watch("data.forwarding_email_copy") ??
                        watch("data.forwarding_email"),
                    }}
                    key={`forwarding_email_copy`}
                    register={register}
                    control={control}
                    errors={formState.errors}
                  />
                  <AppButton
                    className=" self-end w-[10%] h-[40px]"
                    onClick={() => {
                      const forWardEmail = watch("data.forwarding_email_copy");
                      if (!forWardEmail || !forWardEmail.includes("@")) {
                        toast.error("Please enter valid Forward Email");
                      } else {
                        setValue(
                          "data.forwarding_email",
                          watch("data.forwarding_email_copy")
                        );
                        setEditMail(true);
                      }
                    }}
                  >
                    Save
                  </AppButton>
                </div>
              )}
              {oktaList?.map((m: any, index: any) => (
                <Box className="" key={index}>
                  <NewAdminInputRenderer
                    register={register}
                    control={control}
                    errors={formState.errors}
                    boxWrapperClassName="grid grid-cols-1 gap-[28px] w-full max-w-[850px]"
                    inputObj={m?.inputObj}
                    inputWrapperClassName="w-full max-w-[410px] "
                    labelClassName="!text-[18px] !leading-[23px] !font-[600] !text-[#444444]"
                  />
                </Box>
              ))}
              {watch("data.setup_okta") ? (
                <AdminInputRenderer
                  className="w-full max-w-[100%] bg-[#fff]"
                  wrapperClassName="flex gap-[20px] text-[14px]"
                  labelClassName=""
                  //@ts-expect-error ignore
                  inputObj={oktaUserGroupInputObj}
                  register={register}
                  control={control}
                  errors={formState.errors?.data}
                />
              ) : null}
            </Box>
            <Flex mb={"28px"} justifyContent={"end"} mt={"40px"}>
              <ButtonPair
                primaryBtnText={"Onboard Agent"}
                secondaryBtnText={"Cancel"}
                onPrimaryClick={undefined}
                primaryBtnType={"submit"}
                onSecondaryClick={handleSecondaryBtnClick}
                primaryBtnIsLoading={isStatusLoading && !isError}
              />
            </Flex>
          </form>
        )}
      </LoaderLayout>
    </CkAppModal>
  );
};

export default AgentApproveEditModal;
