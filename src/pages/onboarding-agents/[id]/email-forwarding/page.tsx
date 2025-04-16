import { Tag, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import AdminInputRenderer from "../../../../login/adminlogin/AdminInputRenderer";
import ButtonPair from "../../../Auth/AgentComponents/admincompenets/ButtonPair";
import NoData from "../../../Auth/AgentComponents/admincompenets/NoData";
import {
  GET_AGENT_FORWARD_EMAIL_STATUS,
  POST_AGENT_FORWARD_EMAIL,
} from "../../../../api-utils";
import AppText from "../../../../AppComponents/AppText-agent";
import LoaderLayout from "../../../Auth/AgentComponents/table/LoaderLayout";
import makeGetRequest from "../../../../api/makeGetRequest";
import makePostRequest from "../../../../api/makePostRequest";
import {
  capitalize,
  getFirstErrorMessage,
} from "../../../../utils/functions/commonFunctions";

const inputFields = {
  name: "email",
  type: "email",
  placeholder: "Add Email here...",
  otherRegProps: {
    required: true,
  },
};

export default function Page() {
  const { id } = useParams();
  const notesForm = useForm();
  const { watch, reset } = notesForm;

  //@ts-expect-error ignore
  const agentStatus = useRef(false);
  const roaEmail = useRef("");

  const { refetch, isLoading: agentDataLoader } = useQuery(
    [GET_AGENT_FORWARD_EMAIL_STATUS(id)],
    () => makeGetRequest(GET_AGENT_FORWARD_EMAIL_STATUS(id)),
    {
      onSuccess: (res) => {
        agentStatus.current = res?.data?.is_active;
        roaEmail.current = res?.data?.roa_email;
        reset({
          data: {
            email: res?.data?.forwarding_email,
          },
        });
      },
      onError: (err) => {
        //@ts-expect-error ignore
        const errMsg = getFirstErrorMessage(err?.response?.data?.data);
        //@ts-expect-error ignore
        toast.error(errMsg);
      },
    }
  );

  const { mutate, isLoading } = useMutation(
    (body) => makePostRequest(POST_AGENT_FORWARD_EMAIL, body),
    {
      onSuccess: () => {
        notesForm.reset();
        toast.success("Forward Email Updated Successfully");
        refetch();
      },
      onError: (err: any) => {
        //@ts-expect-error ignore
        const errMsg = getFirstErrorMessage(err?.response?.data?.data);
        //@ts-expect-error ignore
        toast.error(errMsg);
      },
    }
  );

  const handleNoteSubmit = (data: any) => {
    if (data?.data?.email) {
      //@ts-expect-error ignore
      mutate({
        forwarding_email: watch("data.email"),
        user: id,
      });
    }
  };

  const handleCancel = () => {
    refetch();
  };

  const returnAsTag = (color: any, txt: any) => {
    return (
      <Tag className={`${color}-tag truncate`}>
        <AppText
          text={capitalize(txt).replaceAll("_", " ")}
          className="!text-[inherit] text-left capitalize truncate"
        />
      </Tag>
    );
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
    in_active: "red",
  };

  return (
    <div className="rounded-[20px]  mt-[30px] w-[100%] h-[274px] border-[1px] border-[#fffff] bg-white p-[40px]">
      {roaEmail.current ? (
        <LoaderLayout isLoading={agentDataLoader} height="150px">
          <form
            onSubmit={notesForm.handleSubmit(handleNoteSubmit)}
            className="flex flex-col  gap-[30px]"
          >
            <AppText
              type="h3"
              text="Email Forwarding"
              className="text-[24px] leading-[29px] font-[600] !text-[#2C4B7B] "
            />
            <div className="rounded-[8px] px-[20px] py-[14px] border-[1px] border-[#F0F0F0] flex justify-between items-center ">
              {/* Tag */}
              {agentStatus.current
                ? //@ts-expect-error ignore
                  returnAsTag(showTextAsTag["active"], "active")
                : returnAsTag(showTextAsTag["in_active"], "in_active")}
              {/* From Email */}
              <div className="flex gap-[30px]">
                <AppText
                  text={roaEmail.current || "N/A"}
                  className="text-[16px] leading-[24px] font-normal !text-[#000000] "
                />
                {/* <AppText
                text="@realtyofamerica.com"
                className="text-[16px] leading-[21px] font-normal !text-[#6D6D6D] "
              /> */}
              </div>
              {/* forwards text */}
              <AppText
                type="h3"
                text="Forwards To"
                className="text-[14px] leading-[18px] font-normal !text-[#6D6D6D] "
              />
              {/* Forward email */}

              <div className="flex  gap-[10px] items-center">
                <Text className="text-[18x] leading-[22px] font-[600] text-[#444444]">
                  Email<span className="text-red-600"> *</span>
                </Text>
                <AdminInputRenderer
                  className="w-full max-w-[100%]"
                  wrapperClassName={`flex gap-[20px] text-[14px] `}
                  labelClassName=""
                  //@ts-expect-error ignore
                  inputObj={inputFields}
                  key={inputFields?.name}
                  register={notesForm.register}
                  control={notesForm.control}
                  errors={notesForm.formState.errors?.email}
                />
              </div>
            </div>
            <div className="self-end">
              <ButtonPair
                onSecondaryClick={handleCancel}
                secondaryBtnText="Cancel"
                primaryBtnText={agentStatus.current ? "Update" : "Create"}
                onPrimaryClick={undefined}
                primaryBtnIsLoading={isLoading}
              />
            </div>
          </form>
        </LoaderLayout>
      ) : (
        <NoData />
      )}
    </div>
  );
}
