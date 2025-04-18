// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { Avatar, Checkbox, Flex, Spinner, Tag, Text } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import CustomBoxButton from "./custom-box-button";
import { useDisclosure } from "@chakra-ui/react";
import ModalRejectComponent from "./modal-reject-component";
import {
  ADMIN_AGENT_ASSIGN_OFFICE_BROKERAGE_POST,
  ADMIN_AGENT_TEAM_LIST,
  AGENT_DASHBOARD_OFFICE_OR_BROKERAGE_LIST,
  PUT_ADMINS_AGENT_UPDATE,
  REMOVE_OFFICE_AGENT,
  ADMIN_TEAM_MEMBER_CREATE,
  ADMIN_TEAM_MEMBER_DELETE,
  ADMIN_TEAM_MEMBER_UPDATE_META,
} from "../../../../api-utils";
import toast from "react-hot-toast";
import {
  commissionPlanOptions,
  extractIdentities,
  formatToUSPhone,
  getFirstErrorMessage,
  truncateString,
} from "../../../../utils/functions/commonFunctions";
import { useMutation, useQuery } from "react-query";
import AgentDetailsEditModal from "./agentDetailsEditModal";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import makePatchRequest from "../../../../api/makePatchRequest";
import ShowText from "./ShowText";
import WaieRegristrationEditModal from "./waieRegristrationEditModal";
import makeGetRequest from "../../../../api/makeGetRequest";
import AppText from "../../../../AppComponents/AppText-agent";
import PhoneIcon from "../../../Auth/AgentComponents/admincompenets/phoneIcon";
import EmailatIcon from "../../../Auth/AgentComponents/admincompenets/emailatIcon";
import LocationMapIcon from "./locationMapIcon";
import LoaderLayout from "../../../Auth/AgentComponents/table/LoaderLayout";
import CkAppModal from "../../../Auth/AgentComponents/admincompenets/AppModal";
import makePostRequest from "../../../../api/makePostRequest";
import { MAKE_ADMIN_TEAM_DETAIL_TAB } from "../../../Auth/AgentComponents/navigation/urls";
import AppButton from "../../../../AppComponents/AppButton-agent";
import { capitalizeFirstLetter } from "../../../Auth/AgentComponents/table/resourceSectionData";
import useGetAgentStatus from "../../../../utils/hooks/useGetAgentStatus";
import useGetMetaFromApi from "../../../../utils/hooks/useGetMetaFromApi";
import { ConfirmRemoveAgentModal } from "../../../Auth/AgentComponents/admincompenets/ConfirmRemoveAgentModal";

interface IDetailCard {
  data: any;
  isLoading: boolean;
  refetch: any;
  metaData: any;
  metaIsLoading?: boolean;
}

export default function DetailCard({
  data,
  isLoading,
  refetch,
  metaData,
  metaIsLoading,
}: IDetailCard) {
  const location = useLocation();
  const pathname = location.pathname;
  const { id } = useParams();
  const [teamData, setTeamData] = useState({});
  const isAgentPath = pathname?.split("/")?.[2];

  const getAddress = (
    address?: string,
    city?: string,
    state?: string,
    zipcode?: string
  ) => {
    const parts = [address, city, state, zipcode].filter(Boolean); // Remove empty values
    return parts.length > 0 ? parts.join(", ") : "N/A";
  };

  const { mutate } = useMutation({
    mutationFn: (body) =>
      makePostRequest(
        data?.team?.identity
          ? ADMIN_TEAM_MEMBER_DELETE(data?.team?.id, data?.team?.team_member)
          : //@ts-expect-error ignore
            ADMIN_TEAM_MEMBER_CREATE(teamData?.id),
        body
      ),
    onSuccess: () => {
      refetch();
      onClose();
      toast.success(
        data?.team?.identity ? "Removed Successfully" : "Assigned Successfully"
      );
    },
    onError: (err: any) => {

      const errMsg = getFirstErrorMessage(err?.response?.data?.data);
      //@ts-expect-error ignore
      toast.error(errMsg);
    },
  });
  const { search: agentStageList } = useGetAgentStatus(id);
  let isStageThreeApproved = false;
  if (!!agentStageList) {
    isStageThreeApproved = agentStageList[2]?.status === "completed";
  }

  const { mutate: freeAgentMutate, isLoading: isFreeAgentLoading } =
    useMutation(
      (body) =>
        makePatchRequest(PUT_ADMINS_AGENT_UPDATE(data?.agent_detail?.id), body),

      {
        onSuccess: () => {
          refetch();
          toast.success("Waived Fee Successfully");
          onCloseWaive();
        },
        onError: (err: any) => {
         
          const errMsg = getFirstErrorMessage(err?.response?.data?.data);
          //@ts-expect-error ignore
          toast.error(errMsg);
        },
      }
    );
  const { mutate: officeMutate } = useMutation(
    (body) => makePostRequest(ADMIN_AGENT_ASSIGN_OFFICE_BROKERAGE_POST, body),

    {
      onSuccess: () => {
        ofcClose();
        toast.success("Assigned Successfully");
        refetch();
      },
      onError: (err: any) => {
        
        const errMsg = getFirstErrorMessage(err?.response?.data?.data);
        //@ts-expect-error ignore
        toast.error(errMsg);
      },
    }
  );

  const { mutate: removeOfficeMutate } = useMutation(
    (body) => makePostRequest(REMOVE_OFFICE_AGENT, body),

    {
      onSuccess() {
        refetch();
      },
      onError: (err: any) => {
      
        const errMsg = getFirstErrorMessage(err?.response?.data?.data);
        //@ts-expect-error ignore
        toast.error(errMsg);
      },
    }
  );

  const { metaData: team, handleOnInputChange } = useGetMetaFromApi({
    endPoint: ADMIN_AGENT_TEAM_LIST + `?status=approved`,
  });

  const teamList = team?.data?.results ?? [];

  const { metaData: office, handleOnInputChange: handleOnOfficeChange } =
    useGetMetaFromApi({
      endPoint: AGENT_DASHBOARD_OFFICE_OR_BROKERAGE_LIST,
    });

  const officeList = office?.data?.results ?? [];
  const handleSumbitTeam = (bdyObj: any) => {
    const bdy = {
      creation_type: "existing",
      team: bdyObj?.data?.team?.id || bdyObj?.data?.team?.value,
      user: data?.id,
      role: bdyObj?.data?.role?.value,
      agent_cap_detail: {
        commission_plan: bdyObj?.data?.commission_plan?.value,
        team_commission_plan: bdyObj?.data?.team_commission_plan,
        cap_status: bdyObj?.data?.cap_status?.value,
      },
    };
    //@ts-expect-error ignore
    mutate(bdy);
  };
  const handleSumbitOffice = (bdyObj: any) => {
    const bdy = {
      team: [],
      members: [parseInt(data?.id)],
      brokerage: bdyObj?.data?.office?.map((each: any) => each?.value),
    };
    //@ts-expect-error ignore
    officeMutate(bdy);
  };

  const getLabel = (val: any) => {
    const cvalue = val?.map((each: any) => {
      return {
        label: each?.identity,
        value: each?.id,
      };
    });
    return cvalue;
  };

  const handleOfficeDelete = (val: any) => {
    if (data?.brokerage && data?.brokerage?.length !== 0) {
      const value = data?.brokerage?.filter((each: any) => {
        return !val?.some((eachSome: any) => each?.id == eachSome?.value);
      });
      if (value?.length !== 0) {
        const bdy = {
          team: [],
          members: [parseInt(data?.id)],
          brokerage: value?.map((each: any) => {
            return each?.value || each?.id;
          }),
        };
        //@ts-expect-error ignore
        removeOfficeMutate(bdy);
      }
    }
  };

  const { data: meta } = useQuery(
    //@ts-expect-error ignore
    [ADMIN_TEAM_MEMBER_UPDATE_META(teamData?.id)],
    //@ts-expect-error ignore
    () => makeGetRequest(ADMIN_TEAM_MEMBER_UPDATE_META(teamData?.id)),
    {
      //@ts-expect-error ignore
      enabled: !!teamData?.id,
    }
  );

  const inputFields = [
    {
      name: "team",
      label: "Select team *",
      onInpuChange: (val: any) => handleOnInputChange(val),
      otherRegProps: {
        required: true,
        value: data?.team?.identity
          ? { label: data?.team?.identity, value: data?.team?.id }
          : null,
      },
      type: "select",
      options: teamList,
      isReadOnly: data?.team?.identity ? true : false,
      className: "!z-[19]",
    },
    {
      label: "Role *",
      name: "role",
      type: "select",
      options: meta?.data?.meta?.role,
      className: "!z-[10]",
    },
    {
      label: "Commission Plan *",
      name: "commission_plan",
      type: "select",
      options: commissionPlanOptions,
    },
    {
      label: "Team Commission Plan *",
      name: "team_commission_plan",
      type: "number",
      placeholder: "Enter a value between 15 to 100",
      otherRegProps: {
        min: { value: 15, message: "Minimum split is 15" },
        max: { value: 100, message: "Maximum split is 100" },
      },
    },
    {
      label: "Capping *",
      name: "cap_status",
      type: "select",
      options: metaData?.data?.meta?.cap_status,
    },
  ];
  const inputFields2 = useMemo(
    () => [
      {
        name: "office",
        label: "Select office",
        onInpuChange: (val: any) => handleOnOfficeChange(val),
        otherRegProps: {
          value:
            data?.brokerage?.length !== 0 ? getLabel(data?.brokerage) : null,
          required: true,
          onChange: (e: any) => handleOfficeDelete(e.target?.value),
        },
        type: "multi-select",
        options: officeList,
      },
    ],
    [officeList, data]
  );
  const agentData = data?.agent_detail;
  const { onClose, onOpen, isOpen } = useDisclosure();
  const {
    onClose: ofcClose,
    onOpen: ofOnOpen,
    isOpen: ofcIsOpen,
  } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenWaive,
    onOpen: onOpenWaive,
    onClose: onCloseWaive,
  } = useDisclosure();
  const {
    isOpen: isOpenRemove,
    onOpen: onOpenRemove,
    onClose: onCloseRemove,
  } = useDisclosure();
  const router = useNavigate();
  const handleContentOnClick = () => {
    if (data?.team?.id)
      router(MAKE_ADMIN_TEAM_DETAIL_TAB(data?.team?.id, "team-members"));
  };

  const modalData = {
    id: data?.id,
    team: data?.team,
    full_name: data?.full_name,
    profile_picture: data?.profile_picture,
    license: data?.agent_detail?.primary_license_no,
    email: data?.email,
    phone_number: data?.phone_number,
    memberId: data?.team?.team_member,
  };

  const showTextAsTag = {
    approved: "green",
    waiting_for_approval: "yellow",
    application_in_progress: "yellow",
    invite_sent: "yellow",
    uploaded: "yellow",
    rejected: "red",
    new: "blue",
    active: "green",
    inactive: "red",
  };

  const returnAsTag = (color: any, txt: any) => {
    
    const tagColor =
      showTextAsTag?.[color?.replaceAll(" ", "_")?.toLowerCase()];
    return (
      <Tag className={`${tagColor}-tag truncate`}>
        <AppText
          text={capitalizeFirstLetter(txt)}
          className="!text-[inherit] text-left capitalize truncate"
        />
      </Tag>
    );
  };

  const getAgentDetail = (
    label: any,
    value: any,
    isStateDetail = false,
    agentStatus = false,
    valueClassName = "",
    truncateText = false
  ) => {
    return (
      <div className="grid grid-cols-2 items-center gap-[20px] ">
        <AppText
          text={label}
          className="!text-[#4E6085] !text-[16px] !leading-[21px] !font-[600]"
        />
        {agentStatus ? (
         
          returnAsTag(value, value)
        ) : (
          <>
            {truncateText ? (
              <ShowText
                maxLength={20}
                textClassName={`!text-[16px] !leading-[21px] !text-[#000000] !font-[400] ${valueClassName}`}
                text={value || "N/A"}
              />
            ) : (
              <AppText
                text={value || "N/A"}
                className={`${
                  isStateDetail
                    ? "!text-sm !text-[#333333]"
                    : "!text-[#000000] !text-[16px] !leading-[21px] !font-[400] whitespace-nowrap"
                } ${valueClassName}`}
              />
            )}
          </>
        )}
      </div>
    );
  };

  const getAgentDetailCard = (
    label: any,
    value: any,
    isStateDetail = false
  ) => {
    return (
      <div className="flex items-center gap-[8px] ">
        <AppText
          text={label}
          className="!text-[#10295A] !text-[15px] !leading-[21px] !font-[600]"
        />
        <AppText
          text={value || "N/A"}
          className={`${
            isStateDetail
              ? "!text-sm !text-[#333333]"
              : "!text-[#010101] !text-[15px] !leading-[21px] !font-[600]"
          }`}
        />
      </div>
    );
  };

  const isActiveAgent = data?.agent_detail?.agent_status === "active";
  return (
    <div className="">
      <CkAppModal
        className="!w-full !max-w-[723px]"
        bodyClassName="!px-[40px] !py-[6px]"
        isOpen={isOpen}
        onClose={onClose}
   
        header={`Assign team - ${data?.first_name + " " + data?.last_name}`}
        headerClassName="rounded-md text-[#10295A] text-[20px] font-[500] !py-[26px] !px-[40px] "
        closeButton={true}
      >
        <ModalRejectComponent
          onClose={onClose}
          inputFields={inputFields}
          buttonLabel1="Cancel"
          buttonLabel2={data?.team?.identity ? "Remove" : "Save"}
          handleSumbit={handleSumbitTeam}
          data={data}
          metaData={metaData}
          setData={setTeamData}
        />
      </CkAppModal>
      <CkAppModal
        className="!w-full !max-w-[723px]"
        bodyClassName="!px-[40px] !py-[6px]"
        isOpen={ofcIsOpen}
        onClose={ofcClose}
       
        header={`Assign office - ${data?.first_name + " " + data?.last_name}`}
        headerClassName="rounded-md text-[#10295A] text-[20px] font-[500] !py-[26px] !px-[40px] "
        closeButton={true}
      >
        <ModalRejectComponent
          onClose={ofcClose}
          inputFields={inputFields2}
          buttonLabel1="Cancel"
          buttonLabel2="Save"
          handleSumbit={handleSumbitOffice}
        />
      </CkAppModal>
      <LoaderLayout
        height="35vh"
        isLoading={isLoading}
        wrapperClassname="my-[40px] p-6 shadow-[8px_16px_56px_0px_#0000000A] bg-white rounded-lg"
      >
        <div className=" flex my-[40px] flex-col gap-[20px] p-[24px] divide-y-2 shadow-[8px_16px_56px_0px_#0000000A] bg-white rounded-lg">
          <div className="flex justify-between item-center">
            <div className="flex items-center w-[68%]">
              <div className="flex items-center gap-[24px] w-[100%]">
                <Avatar
                  className="rounded-full h-[160px] w-[160px]"
                  src={
                    data?.profile_picture?.file ??
                    "/assets/profile-placeholder-male.png"
                  }
                  height={"160px"}
                  width={"160px"}
                />
                <div className="flex flex-col gap-[15px]  w-[72%] justify-between">
                  <div className="flex flex-col gap-[15px]">
                    <div className="flex flex-col gap-[16px]">
                      <Flex gap={"20px"}>
                        <AppText className="text-2xl font-semibold capitalize">
                          {data?.first_name + " " + data?.last_name}
                        </AppText>
                        <div className="flex self-end flex-col gap-[10px]">
                          <AppButton
                            onClick={() => onOpenEdit()}
                            className="bg-white !outline text-[15px] border-[1px] border-[#CDCDCD]  leading-[20px] font-normal !text-[#2C4B7B]"
                          >
                            Edit
                          </AppButton>
                        </div>
                      </Flex>
                      <AppText className="text-[16px] text-[#6D6D6D]">
                        {`Agent ID: ${agentData?.agent_id ?? "N/A"}`}
                      </AppText>
                    </div>
                    <div className="flex gap-[22px]">
                      <AppText className="text-base text-[#6D6D6D]">
                        {`License:  ${
                          data?.agent_detail?.primary_license_no
                            ? data?.agent_detail?.primary_license_no
                            : "N/A"
                        }`}
                      </AppText>
                      <AppText className="text-base text-[#6D6D6D]" type="li">
                        {`Expires: ${
                          data?.agent_detail?.primary_license_expiry_date
                            ? data?.agent_detail?.primary_license_expiry_date
                            : "N/A"
                        }`}
                      </AppText>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-end flex flex-col w-[50%]">
              <div className="flex justify-between p-6 bg-[#EDF3FF] rounded-lg ">
                {isActiveAgent && (
                  <div className="flex flex-col gap-[23px] w-[60%] ">
                    {getAgentDetailCard(
                      "State:",
                      capitalizeFirstLetter(
                        data?.agent_detail?.primary_state?.identity
                      ),
                      true
                    )}
                    {getAgentDetailCard(
                      "City:",
                      capitalizeFirstLetter(data?.city),
                      true
                    )}
                    {getAgentDetailCard(
                      "Anniversary Date:",
                      capitalizeFirstLetter(data?.agent_detail?.joining_date),
                      true
                    )}
                  </div>
                )}

                <div className="flex flex-col gap-[20px] ">
                  <div className="flex gap-[10px] items-center">
                    <PhoneIcon fill="#010101" />
                    <AppText className="text-sm" type="span">
                      {data?.phone_number
                        ? formatToUSPhone(data?.phone_number?.slice(2))
                        : "N/A"}
                    </AppText>
                  </div>
                  <div className="flex gap-[10px] items-center">
                    <EmailatIcon />
                    <AppText className="text-sm" type="span">
                      {data?.email ?? "N/A"}
                    </AppText>
                  </div>
                  <div className="flex gap-[10px] items-center">
                    <LocationMapIcon />
                    <AppText className="text-sm" type="span">
                      {getAddress(
                        data?.address,
                        data?.city,
                        data?.state,
                        data?.zipcode
                      ) ?? "N/A"}
                    </AppText>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-[20px] pt-[20px] grid grid-cols-2 gap-x-[180px] gap-y-[12px]">
            {getAgentDetail(
              "ROA Email:",
              data?.agent_detail?.roa_email,
              false,
              false,
              "lowercase"
            )}
            {getAgentDetail(
              "Agent Status:",
              returnAsTag(
                data?.agent_detail?.agent_status,
                capitalizeFirstLetter(data?.agent_detail?.agent_status)
              ),
              false,
              false
            )}{" "}
            {getAgentDetail(
              "Capping:",
              returnAsTag(
                "new",
                capitalizeFirstLetter(data?.agent_detail?.cap_status)
              ),
              false,
              false,
              "text-[15px]"
            )}
            {getAgentDetail(
              "Commission Plan:",
              capitalizeFirstLetter(
                data?.agent_detail?.commission_plan || "N/A"
              ),
              false,
              false,
              "",
              true
            )}{" "}
            {getAgentDetail(
              "Licensed States:",
              capitalizeFirstLetter(
                extractIdentities(data?.agent_detail?.licensed_states) || "N/A"
              ),
              false,
              false,
              "",
              true
            )}{" "}
            {getAgentDetail(
              "License Fee Waived States:",
              capitalizeFirstLetter(
                extractIdentities(
                  data?.agent_detail?.license_fee_waived_states
                ) || "N/A"
              ),
              false,
              false,
              "",
              true
            )}{" "}
            {data?.agent_detail?.onboard_type == "team"
              ? getAgentDetail(
                  "Team Commission Plan:",
                  capitalizeFirstLetter(
                    data?.agent_detail?.team_commission_plan || "N/A"
                  ),
                  false,
                  false,
                  "text-[15px] !font-[400]",
                  true
                )
              : null}
            <div className="flex justify-between">
              {isAgentPath &&
                (isFreeAgentLoading ? (
                  <Spinner size="xs" />
                ) : isStageThreeApproved || isActiveAgent ? (
                  <Checkbox
                    isChecked={data?.agent_detail?.is_registration_fee_waived}
                  >
                    <Text>Registration Fee Waived</Text>
                  </Checkbox>
                ) : (
                  <>
                    <AppText
                      text="Waive Registration Fee"
                      onClick={() => onOpenWaive()}
                      className="cursor-pointer underline !text-[#3397E8]"
                    />
                  </>
                ))}
            </div>
          </div>
          {/* <div
            onClick={() => onOpenEdit()}
            className="cursor-pointer w-[40px] h-[40px] bg-[#E6E7E9] rounded-full flex items-center justify-center"
          >
            <AppImage
              src={'/admin-edit.png'}
              alt=""
              sizes="100%"
              height={20}
              width={20}
            />
          </div> */}
          <AgentDetailsEditModal
            data={data}
            isOpen={isOpenEdit}
            onClose={onCloseEdit}
            refetch={refetch}
            metaIsLoading={metaIsLoading}
            metaData={metaData}
          />
          <WaieRegristrationEditModal
            data={data}
            isOpen={isOpenWaive}
            onClose={onCloseWaive}
            mutate={freeAgentMutate}
            isLoading={isFreeAgentLoading}
          />
        </div>
      </LoaderLayout>
      <div className="flex gap-10 mb-[30px]">
        <div className="basis-1/2 bg-[#EDF3FF]">
          <CustomBoxButton
            headerText={"Team:"}
            buttonLabel={data?.team?.identity ? "Remove Team" : "Assign Team"}
            onClick={() => {
              data?.team?.identity ? onOpenRemove() : onOpen();
            }}
            content={
              data?.team?.identity
                ? truncateString(data?.team?.identity, 30)
                : "N/A"
            }
            contentOnClick={handleContentOnClick}
          />
        </div>
        <div className="basis-1/2 bg-[#EDF3FF]">
          <CustomBoxButton
            headerText={"Office:"}
            buttonLabel={"Assign Office"}
            onClick={() => ofOnOpen()}
            content={
              data?.brokerage?.length !== 0
                ? data?.brokerage?.map((each: any) => each?.identity).join(", ")
                : "N/A"
            }
          />
        </div>
      </div>
      <ConfirmRemoveAgentModal
        isOpen={isOpenRemove}
        onClose={onCloseRemove}
        data={modalData}
        isDetail
        isAgentDetail
      />
    </div>
  );
}
