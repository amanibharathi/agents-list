import { useForm } from "react-hook-form";
//import makePutRequest from '@/app/utils/api/makePutRequest'
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
// import { useGetState } from '@/app/real-estate-agents/join/onboard/stage/components/state'
import { useParams } from "react-router-dom";
import AdminInputRenderer from "../../../../../login/adminlogin/AdminInputRenderer";
import AppButton from "../../../../../AppComponents/AppButton-agent";
import {
  addSpecialCharsForPhoneNumber,
  getFirstErrorMessage,
  getInputOptions,
  getResponseBasedOnInputType,
} from "../../../../../utils/functions/commonFunctions";
import makePutRequest from "../../../../../api/makePutRequest";
import {
  ADMIN_AGENT_DETAIL_GET,
  GET_AGENT_STAGE_LICENSE_LIST,
  POST_AGENT_STAGE_FORM,
} from "../../../../../api-utils";
import { useGetState } from "./state";
import makePostRequest from "../../../../../api/makePostRequest";
import makeGetRequest from "../../../../../api/makeGetRequest";
import LoaderLayout from "../../../../Auth/AgentComponents/table/LoaderLayout";

const getvalue = (value: string) => {
  return value;
};
const changeToValue = (obj: any) => {
  if (obj === null) {
    return [];
  }
  return {
    label: obj?.identity,
    value: obj?.id,
    identity: obj?.identity,
    id: obj?.id,
  };
};

export default function ContentRender({
  data,
  isEdit,
  setEdit,
  form_id,
  response,
  refetch,
}: any) {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm();
  const agentId = useParams();
  const { mutate } = useMutation(
    (body) =>
      response !== null
        ? makePutRequest(POST_AGENT_STAGE_FORM + `${response?.id}/`, body)
        : makePostRequest(POST_AGENT_STAGE_FORM, body),
    {
      onSuccess: () => {
        refetch();
        toast.success("Agent Details Updated Successfully");
        setEdit(null);
      },
      onError: (err: any) => {
        
        const errMsg = getFirstErrorMessage(err?.response?.data?.data);

        //@ts-expect-error ignore
        toast.error(errMsg);
      },
    }
  );
  const agentsStateData = useGetState();
  const handleSaveChanges = (body: any) => {
    const getMlsEmptyValidation = (value: any, each: any) => {
      if (value[each]?.[0]?.board === undefined) {
        return false;
      } else {
        const count = value[each]?.filter(
          (i: any) => i?.board == "" && i?.membership == "" && i?.mls_id == ""
        )?.length;
        return count > 0;
      }
    };

    // const getMlslengthValidation = (value: any, each: any) => {
    //   if (value[each]?.[0]?.board === undefined) {
    //     return false
    //   } else {
    //     const count = value[each]?.filter(
    //       (i: any) => i?.board && i?.membership && i?.mls_id
    //     )?.length
    //     return value[each]?.length == count
    //   }
    // }
    const value = body.data;
    const getQueRes = Object.keys(value).map((each: string) => {
      const id_spilt = each.split("_");
      const id = id_spilt[id_spilt.length - 1];
      const lengthOfArr =
        value[each]?.[0]?.board &&
        value[each]?.[0]?.membership &&
        value[each]?.[0]?.mls_id
          ? // getMlslengthValidation(value, each)
            value[each]?.filter(
              (i: any) =>
                i?.board !== "" && i?.membership !== "" && i?.mls_id !== ""
            )?.length
          : 0;
      // if (value[each]?.value ?? value[each])
      return {
        question: id,
        response: {
          response:
            value[each] && lengthOfArr >= 1
              ? value[each]?.filter(
                  (i: any) =>
                    i?.board !== "" && i?.membership !== "" && i?.mls_id !== ""
                )
              : lengthOfArr == 0 && getMlsEmptyValidation(value, each)
              ? null
              : value[each] !== ""
              ? value[each]
              : null,
        },
      };
    });
    const bdyObj =
      response !== null
        ? {
            form_group: form_id,
            related_responses: getQueRes,
            user: null,
          }
        : {
            form_group: form_id,
            related_responses: getQueRes,
            //@ts-expect-error ignore
            user: parseInt(agentId?.id),
          };
    //@ts-expect-error ignore
    mutate(bdyObj);
  };
  const handleCancel = () => {
    reset();
    setEdit(null);
  };
  const { data: licenseData, isLoading: isLicenseLoading } = useQuery(
    [`license-list-data-${agentId?.id}`],
    () => makeGetRequest(GET_AGENT_STAGE_LICENSE_LIST(agentId?.id))
  );
  const { data: agentData } = useQuery(
    [ADMIN_AGENT_DETAIL_GET(agentId?.id)],
    () => makeGetRequest(ADMIN_AGENT_DETAIL_GET(agentId?.id))
  );

  const agentDetail = agentData?.data;

  const validateAge = (value: any) => {
    const birthDate = new Date(value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age >= 18 || "You must be at least 18 years old";
  };

  // Validate First Name and Last Name
  function validateName(value: any) {
    const namePattern = /^[a-zA-Z][a-zA-Z\s-_]*[a-zA-Z]$/;

    if (
      !namePattern.test(value) ||
      value.startsWith("-") ||
      value.startsWith("_") ||
      value.endsWith("-") ||
      value.endsWith("_")
    ) {
      return "Name must include only letters, spaces, - or _.";
    }
  }

  return (
    <div className="">
      <LoaderLayout isLoading={isLicenseLoading} height="20vh">
        <form className="" onSubmit={handleSubmit(handleSaveChanges)}>
          <div className="flex gap-[30px] px-[40px] pb-[30px] rounded-[20px] bg-white">
            <div className="basis-[70%] grid grid-cols-1 gap-[40px]">
              {data && data.length !== 0
                ? data.map((each: any) => {
                    const form_question = each?.form_question ?? [];
                    const inputField = form_question.map((each: any) => {
                      const options = each?.choices
                        ?.split(";")
                        ?.map((each: any) => {
                          return {
                            id: each,
                            label: each,
                            value: each,
                          };
                        });
                      const initialValue = getResponseBasedOnInputType(
                        each?.type,
                        each?.response
                      );

                      // console.log(each?.type)
                      const casecadeDepend = each?.extra_logic
                        ? JSON.parse(each?.extra_logic)
                        : null;
                      return {
                        label: `${each?.identity} ${
                          each?.is_required ? "*" : ""
                        }`,
                        name: `question_${each?.id}`,
                        type:
                          each?.helper_text === "First Name"
                            ? "first_name"
                            : each?.helper_text == "Last Name"
                            ? "last_name"
                            : each?.type,
                        maxLength:
                          each?.helper_text === "First Name"
                            ? 50
                            : each?.helper_text == "Last Name"
                            ? 50
                            : 100,
                        otherRegProps: {
                          required: each?.is_required,
                          validate:
                            each?.type == "dob"
                              ? validateAge
                              : each?.helper_text === "First Name"
                              ? validateName
                              : each?.helper_text === "Last Name"
                              ? validateName
                              : each?.helper_text === "Preferred Name"
                              ? validateName
                              : null,
                          value: getvalue(each?.response?.response?.response)
                            ? initialValue?.response
                            : each?.helper_text === "First Name"
                            ? agentDetail?.first_name
                            : each?.helper_text == "Last Name"
                            ? agentDetail?.last_name
                            : each?.identity ===
                              "What is your preferred method of contact? (email)"
                            ? agentDetail?.email
                            : each?.identity === "Phone Number"
                            ? addSpecialCharsForPhoneNumber(
                                agentDetail?.phone_number
                              )
                            : each?.type === "state"
                            ? changeToValue(
                                agentDetail?.agent_detail?.primary_state
                              )
                            : each?.type === "license"
                            ? licenseData?.data?.results
                            : getvalue(each?.response?.response?.response),
                        },
                        options:
                          each?.type === "checkbox"
                            ? getInputOptions(each?.choices)
                            : each?.type === "state"
                            ? agentsStateData
                            : options,
                        addressState:
                          each?.type === "address" || each?.type === "license"
                            ? agentsStateData
                            : null,
                        casecadeDepend: casecadeDepend,
                        className:
                          (each?.type === "select" ||
                            each?.type === "multi-select") &&
                          (each?.identity === "I am a(n)..." ||
                            (each?.identity ===
                              "Select the type of transactions you have closed" &&
                              each?.is_required === true))
                            ? "!z-[11]"
                            : each?.identity ===
                              "Select the type of transactions you have closed"
                            ? "!z-[10]"
                            : "",
                      };
                    });
                    return (
                      <>
                        {inputField.map((i: any) => (
                          <AdminInputRenderer
                            className="w-full max-w-[100%]"
                            wrapperClassName={`flex gap-[20px] text-[14px] ${i?.inputWrapperClassName}`}
                            labelClassName=""
                            inputObj={i}
                            key={i?.name}
                            register={register}
                            control={control}
                            errors={errors?.data}
                            setValue={setValue}
                            watch={watch}
                          />
                        ))}
                      </>
                    );
                  })
                : null}
            </div>
            <div className="w-fit flex justify-end items-end basis-[30%]">
              {isEdit ? (
                <div className="flex gap-[10px]">
                  <AppButton
                    className="w-fit  !rounded-[80px] !text-[#585858] border border-[#CDCDCD]"
                    onClick={() => handleCancel()}
                    variant="transparent"
                  >
                    Cancel
                  </AppButton>
                  <AppButton
                    type="submit"
                    label={"Save Changes"}
                    className="!rounded-[80px]"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </form>
      </LoaderLayout>
    </div>
  );
}
