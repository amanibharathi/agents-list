import { Text, useDisclosure } from "@chakra-ui/react";
import OnboardingLayout from "./onboardingLayout";
// import LoaderLayout from '@/app/components/layouts/loaderLayout/LoaderLayout'
import DummyProfileImage from "../../../../../assets/Images/dummy-profile-placeholder.png";
// import AppImage from '@/app/components/elements/AppImage'
import { useMutation, useQuery } from "react-query";
// import { ADMIN_AGENT_DETAIL_GET, SPONSOR_UPDATE } from '@/app/api-utils'
// import makeGetRequest from '@/app/utils/api/makeGetRequest'
import { useParams } from "react-router-dom";
// import { useGetAgentList } from '@/app/hooks/useGetAgentList'
// import AppText from '@/app/components/elements/AppText'
import Select, { components } from "react-select";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
// import AppButton from '@/app/components/elements/AppButton'
import { v4 as uuidv4 } from "uuid";
// import CkAppModal from '@/app/components/modal/AppModal'
import { useForm } from "react-hook-form";
// import CkInput from '@/app/components/chakraOverwrites/CkInput'
// import makePostRequest from '@/app/utils/api/makePostRequest'
import { useState } from "react";
// import { removeSpecialChars } from '@/app/utils/functions/otherFunctions'
// import { useAppStore } from '@/app/utils/store'
import LoaderLayout from "../../../../Auth/AgentComponents/table/LoaderLayout";
import AppImage from "../../../../../AppComponents/AppImage";
import {
  ADMIN_AGENT_DETAIL_GET,
  SPONSOR_UPDATE,
} from "../../../../../api-utils";
import makeGetRequest from "../../../../../api/makeGetRequest";
import { useGetAgentList } from "../../../../../utils/hooks/useGetAgentList";
import AppText from "../../../../../AppComponents/AppText-agent";
import AppButton from "../../../../../AppComponents/AppButton-agent";
import CkAppModal from "../../../../Auth/AgentComponents/admincompenets/AppModal";
import CkInput from "../../../../Auth/AgentComponents/admincompenets/CkInput";
import makePostRequest from "../../../../../api/makePostRequest";
import { removeSpecialChars } from "../../../../../utils/functions/commonFunctions";
import { useAppStore } from "../../../../../store-admin";

const formData = [
  {
    id: uuidv4(),
    label: "Sponsor Name",
    name: "sponsor_name",
    requried: true,
  },
  {
    id: uuidv4(),
    label: "Sponsor Phone Number",
    name: "sponsor_phone_no",
    requried: true,
    prefix: "+1",
    type: "tel",
    maxLength: 14,
    onChange: (event: any) => {
      const unformattedValue = event.target.value.replace(/[()-]/g, ""); // Remove special characters
      const formattedParts = [
        unformattedValue.slice(0, 3),
        unformattedValue.slice(3, 6),
        unformattedValue.slice(6),
      ];
      const formattedValue = formattedParts
        .filter((part) => part !== "")
        .map((part, index) => (index === 0 ? `(${part})` : part)) // Add parentheses to the first part
        .join("-");

      // Update the formatted value immediately, even if the user hasn't finished typing
      event.target.value = formattedValue;
    },
  },
];

export default function SponsorCard() {
  const { id } = useParams();
  const [selectedAgent, setSelectAgent] = useState<any>();
  const { isOpen, onClose, onOpen } = useDisclosure();
  // getting sponsor list
  const { groupedOptions, setSearchVal } = useGetAgentList();
  const { adminRoles } = useAppStore();

  const roleData = adminRoles["Sponsor Management Policy"]?.permissions;

  const editable = roleData?.is_editable || roleData?.is_creatable;

  const removable = roleData?.is_deletable;

  const agentForm = useForm();

  const { isLoading, refetch } = useQuery(
    [ADMIN_AGENT_DETAIL_GET(id)],
    () => makeGetRequest(ADMIN_AGENT_DETAIL_GET(id)),
    {
      onSuccess: (data) => {
        const agentDetail = data?.data?.agent_detail;
        const labelValue = agentDetail?.sponsor_name
          ? agentDetail?.sponsor_name
          : agentDetail?.sponsor?.name
          ? agentDetail?.sponsor?.name
          : null;
        setSelectAgent({
          ...agentDetail,
          value: "0",
          label: labelValue,
          agent: { primary_state: { identity: agentDetail?.sponsor_phone_no } },
        });
      },
    }
  );

  // update sponsor
  const { mutate } = useMutation(
    (body) => makePostRequest(SPONSOR_UPDATE, body),
    {
      onSuccess: () => {
        toast.success("Sponsor Details Updated Sucessfully");
        refetch();
      },
      onError: (err) => {
        //@ts-expect-error ignore
        const errMsg = getFirstErrorMessage(err?.response?.data);
        //@ts-expect-error ignore
        toast.error(errMsg);
      },
    }
  );

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
                    {props?.data?.agent?.primary_license_no
                      ? " #" + props?.data?.agent?.primary_license_no
                      : ""}
                  </span>
                </span>
                <span className="text-[12px] capitalize">
                  {props?.data?.city ? props?.data?.city + ", " : ""}
                  {props?.data?.agent?.primary_state?.identity}
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

  const handleFormSubmit = (data: any) => {
    setSelectAgent({
      ...data,
      value: "0",
      label: data?.sponsor_name,
      agent: { primary_state: { identity: data?.sponsor_phone_no } },
    });
    const bdy = {
      //@ts-expect-error ignore
      sponsor: null,
      //@ts-expect-error ignore
      sponsor_name: data?.sponsor_name,
      //@ts-expect-error ignore
      sponsor_phone_no: `+1${removeSpecialChars(data?.sponsor_phone_no)}`,
      user: id,
    };
    //@ts-expect-error ignore
    mutate(bdy);
    onClose();
  };

  const handleClick = (e: any) => {
    //@ts-expect-error ignore
    if (e?.value !== "0") {
      //@ts-expect-error ignore
      const bdy = {
        //@ts-expect-error ignore
        sponsor: e?.value,
        //@ts-expect-error ignore
        sponsor_name: null,
        //@ts-expect-error ignore
        sponsor_phone_no: null,
        user: id,
      };
      //@ts-expect-error ignore
      mutate(bdy);
    } else onOpen();
  };

  const handleRemoveClick = () => {
    setSelectAgent(undefined);
    const bdy = {
      //@ts-expect-error ignore
      sponsor: null,
      //@ts-expect-error ignore
      sponsor_name: null,
      //@ts-expect-error ignore
      sponsor_phone_no: null,
      user: id,
    };
    //@ts-expect-error ignore
    mutate(bdy);
  };

  return (
    <div className="px-[40px] pb-[30px] flex flex-col gap-[10px]  bg-white">
      <CkAppModal
        className="!w-full md:!max-w-[600px] mx-[20px] md:mx-0"
        bodyClassName=" !px-[40px] !py-[30px]"
        isOpen={isOpen}
        onClose={onClose}
        closeButton={true}
        //@ts-expect-error ignore
        header={"Enter the Agent Details"}
        headerClassName={`rounded-md text-[#10295A] text-[20px] font-[500] border-b-[1px] border-[#D9D9D9] !py-[20px] !px-[40px] text-center `}
      >
        <div className="mb-10">
          <form onSubmit={agentForm.handleSubmit(handleFormSubmit)}>
            <div className="grid grid-cols-1 gap-8">
              {formData?.map((each: any) => (
                <div key={each.id}>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] md:text-[14px]">
                      {each.label}{" "}
                      <span className="text-[10px] md:text-[14px] text-red-500">
                        *
                      </span>
                    </span>
                  </div>
                  <CkInput
                    type={each?.type || "text"}
                    placeholder={each.label}
                    className="border-none max-w-[334px] w-full py-[13px] px-[20px]"
                    wrapperClassName={
                      "mt-[3px] md:mt-[7px] max-w-[334px] w-full"
                    }
                    maxLength={each?.maxLength}
                    onInput={each?.onInput}
                    {...agentForm.register(each.name, {
                      required: each.requried,
                      onChange: each?.onChange ? each?.onChange : null,
                    })}
                    //@ts-expect-error ignore
                    prefix={each?.prefix}
                    //@ts-expect-error ignore
                    isError={agentForm.formState.errors?.[each.name]}
                  />
                </div>
              ))}
              <div className="flex">
                <AppButton type="submit" label="Submit" />
              </div>
            </div>
          </form>
        </div>
      </CkAppModal>

      <OnboardingLayout imageSrc={"/license-frame.png"} title={"Sponsor"}>
        <div className="flex flex-col ">
          {/* Transfer License */}

          <div className="flex flex-col gap-[15px] ">
            <AppText className="text-[14px] font-semibold">
              Select Sponsor
            </AppText>
            <Select
              inputId="agent-search-input"
              loadingMessage={() => (
                <p className="text-[13px]">Searching......</p>
              )}
              placeholder={"Enter the Agent Name"}
              className={`w-[260px] !text-[10px] md:!text-[14px]  !top-0 custom_select_css`}
              options={groupedOptions}
              filterOption={() => true}
              value={""}
              components={{
                Option: customOptionComp,
                DropdownIndicator: null,
                Menu: Menu,
              }}
              onInputChange={handleInputChange}
              onChange={editable && handleClick}
              isDisabled={!editable}
            />
          </div>

          {selectedAgent?.label ? (
            <LoaderLayout isLoading={isLoading}>
              <div className="flex gap-[70px] mt-[57px] items-start">
                <Text className="text-[18px] basis-1/3 leading-[22px] font-[400] text-[#808080] ">
                  Selected Sponsor
                </Text>
                <div
                  key={"90"}
                  className="relative flex p-[20px] justify-start items-center w-[540px] h-[120px] border-[1px] border-[#F0F0F0] rounded-[8px] shadow-[8px_16px_56px_0px_#0000000A]"
                >
                  <AppImage
                    height={60}
                    width={60}
                    alt="agent-profile-image"
                    className="rounded-[100%] w-[78px] h-[78px] object-cover"
                    src={
                      selectedAgent?.sponsor?.profile_picture ??
                      DummyProfileImage
                    }
                  />
                  <div className="flex flex-col gap-[10px] ml-[32px]">
                    <Text className="text-[14px] leading-[17px] font-[500] text-[#010101]">
                      {selectedAgent?.label}
                    </Text>
                    <Text className="text-[14px] leading-[17px] font-[400] text-[#000000]">
                      {selectedAgent?.sponsor?.email}
                    </Text>
                    <Text className="text-[12px] leading-[24px] font-[400] text-[#000000]">
                      {selectedAgent?.sponsor_phone_no ||
                        selectedAgent?.sponsor?.phone_number}
                    </Text>
                  </div>

                  {removable && (
                    <div
                      className="absolute top-0 right-0 p-[10px] cursor-pointer"
                      onClick={removable && handleRemoveClick}
                    >
                      <IoMdClose />
                    </div>
                  )}
                </div>
              </div>
            </LoaderLayout>
          ) : (
            <div></div>
          )}
        </div>
      </OnboardingLayout>
    </div>
  );
}
