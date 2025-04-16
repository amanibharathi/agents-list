"use client";
import { Box, Flex } from "@chakra-ui/react";
import React, { createContext, useEffect, useRef, useState } from "react";
import ButtonPair from "@/app/admin/_AdminComponent/ButtonPair/ButtonPair";
import { MAKE_ADMIN_TEAM_DETAIL_TAB } from "@/app/utils/navigation";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ADMIN_AGENT_TEAM_DETAIL, ADMIN_TEAM_CUD } from "@/app/api-utils";
import toast from "react-hot-toast";
import {
  ADMIN_AGENT_MLS_LIST,
  ADMIN_AGENT_STATE_LIST,
  // ADMIN_AGENT_TEAM_MEMBERS_LIST,
} from "@/app/api-utils";
import useGetMetaFromApi from "@/app/hooks/admin/useGetMetaFromApi";
import AdminInputRenderer from "@/app/admin/_AdminComponent/AdminInputRenderer";
import {
  addSpecialCharsForPhoneNumber,
  closedValueOptions,
  getFirstErrorMessage,
  removeSpecialChars,
  transformSelectData,
} from "@/app/utils/functions/otherFunctions";
import AdminFormWrapperTeam from "@/app/admin/_AdminComponent/AdminFormWrapperTeam";
import AppImage from "@/app/components/elements/AppImage";
import AppButton from "@/app/components/elements/AppButton";
import { GoPencil, GoTrash } from "react-icons/go";
import makeGetRequest from "@/app/utils/api/makeGetRequest";
import { getResponse } from "@/app/real-estate-agents/join/onboard/stage/utils/common";
import makePutRequest from "@/app/utils/api/makePutRequest";
import { useRouter } from "next-nprogress-bar";
import { numberToNumeralSystem } from "@/app/utils/helpers";

export const CreateTeamProvider = createContext({});

const EditTeamForm = ({
  newTeamForm,
  id,
}: {
  newTeamForm: any;
  id: string;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [transactions, setTransactions] = useState("");
  const ref = useRef(null);
  const { data } = useQuery(
    [ADMIN_AGENT_TEAM_DETAIL(id)],
    () => makeGetRequest(ADMIN_AGENT_TEAM_DETAIL(id)),
    {
      onSuccess: (res) => {
        const obj = {
          data: {
            identity: res?.data?.identity,
            email: res?.data?.email,
            phone_number: addSpecialCharsForPhoneNumber(
              res?.data?.phone_number
            ),
            state: transformSelectData(res?.data?.state),
            website: res?.data?.website,
            mls: getResponse(res?.data?.mls),
            board: getResponse(res?.data?.board),
            closed_volumes:
              res?.data?.closed_volumes != null ||
              res?.data?.closed_volumes != ""
                ? {
                    label: res?.data?.closed_volumes,
                    value: res?.data?.closed_volumes,
                  }
                : null,
            no_of_transactions:
              res?.data?.no_of_transactions?.toLocaleString("en-US"),
          },
        };
        setTransactions(res?.data?.no_of_transactions?.toLocaleString("en-US"));
        newTeamForm.reset(obj);
      },
    }
  );
  const [file, setFile] = useState(data?.data?.image);
  useEffect(() => {
    setFile(data?.data?.image);
  }, [data]);
  const [image, setImage] = useState("");
  // Handles file change
  const handleChangeInComponent = (e: any) => {
    const photo = e.target.files?.[0];
    setImage(photo);
    if (photo) {
      const reader = new FileReader();
      reader.readAsDataURL(photo); // Convert to Base64
      reader.onload = () => {
        if (reader.result) {
          setFile(reader.result.toString()); // Store Base64 string
        }
      };
    }
  };

  const { mutate, isLoading } = useMutation(
    (body) => makePutRequest(ADMIN_TEAM_CUD(id), body),
    {
      onSuccess: (res) => {
        const id = res?.data?.id;
        router.push(MAKE_ADMIN_TEAM_DETAIL_TAB(id));
        queryClient.invalidateQueries([ADMIN_AGENT_TEAM_DETAIL(id)]);
        toast.success("Team Details Updated Successfully");
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
    const formData = new FormData();
    const bdyObj = image
      ? {
          identity: data?.data?.identity,
          email: data?.data?.email,
          state: data?.data?.state ? data?.data?.state?.id : [],
          mls: data?.data?.mls
            ? data?.data?.mls?.map((each: any) => each?.value)
            : [],
          phone_number: data?.data?.phone_number
            ? `+1${removeSpecialChars(data?.data?.phone_number)}`
            : null,
          board: data?.data?.board
            ? data?.data?.board?.map((each: any) => each?.id)
            : [],
          website: data?.data?.website != null ? data?.data?.website : "",
          image: image ?? "",
          closed_volumes: data?.data?.closed_volumes?.value ?? "",
          no_of_transactions:
            typeof data?.data?.no_of_transactions != "number"
              ? data?.data?.no_of_transactions?.replaceAll(",", "")
              : "",
        }
      : file
      ? {
          identity: data?.data?.identity,
          email: data?.data?.email,
          state: data?.data?.state ? data?.data?.state?.id : [],
          mls: data?.data?.mls
            ? data?.data?.mls?.map((each: any) => each?.value)
            : [],
          phone_number: data?.data?.phone_number
            ? `+1${removeSpecialChars(data?.data?.phone_number)}`
            : null,
          board: data?.data?.board
            ? data?.data?.board?.map((each: any) => each?.id)
            : [],
          website: data?.data?.website != null ? data?.data?.website : "",
          closed_volumes: data?.data?.closed_volumes?.value ?? "",
          no_of_transactions:
            typeof data?.data?.no_of_transactions != "number"
              ? data?.data?.no_of_transactions?.replaceAll(",", "")
              : "",
        }
      : {
          identity: data?.data?.identity,
          email: data?.data?.email,
          state: data?.data?.state ? data?.data?.state?.id : [],
          mls: data?.data?.mls
            ? data?.data?.mls?.map((each: any) => each?.value)
            : [],
          phone_number: data?.data?.phone_number
            ? `+1${removeSpecialChars(data?.data?.phone_number)}`
            : null,
          board: data?.data?.board
            ? data?.data?.board?.map((each: any) => each?.id)
            : [],
          website: data?.data?.website != null ? data?.data?.website : "",
          image: "",
          closed_volumes: data?.data?.closed_volumes?.value ?? "",
          no_of_transactions:
            typeof data?.data?.no_of_transactions != "number"
              ? data?.data?.no_of_transactions?.replaceAll(",", "")
              : "",
        };
    // Append form data
    Object.entries(bdyObj).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // If the value is an array, append each item separately
        value.forEach((item) => formData.append(`${key}`, item));
      } else {
        // Only append non-null and non-undefined values
        formData.append(key, value);
      }
    });

    //@ts-expect-error ignore
    mutate(formData);
  };

  // const { metaData, handleOnInputChange } = useGetMetaFromApi({
  //   endPoint: ADMIN_AGENT_TEAM_MEMBERS_LIST,
  // })
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
      name: "email",
      className: " w-full max-w-[495px]",
      otherRegProps: {
        pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,20})+$/,
        required: true,
      },
    },
    {
      label: "Contact Phone Number *",
      name: "phone_number",
      type: "tel",
      className: " w-full max-w-[495px]",
      otherRegProps: {
        required: true,
      },
    },
    {
      label: "Primary State *",
      name: "state",
      type: "select",
      options: agentStateOptions,
      onInpuChange: (val: any) => handleStateDataChange(val),
      className: " w-full max-w-[495px] !z-[11]",
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
      className: " w-full max-w-[495px]",
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
      className: "w-full max-w-[495px] !z-[11]",
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

  const goToPrvPage = () => {
    router.push(MAKE_ADMIN_TEAM_DETAIL_TAB(id));
  };

  return (
    <div>
      <form onSubmit={newTeamForm.handleSubmit(handleSubmit)}>
        <Flex pb={"57px"} gap={"40px"} flexFlow={"column"}>
          <AdminFormWrapperTeam title="Team Details">
            <Box className="flex flex-col gap-[28px] max-w-[1020px]">
              <div className={`flex flex-col gap-[20px]`}>
                <Flex gap={"60px"} className="items-center">
                  <AppImage
                    className=" h-[120px] w-[160px] object-cover"
                    src={file ?? "/assets/team-image.png"}
                    height={120}
                    width={160}
                    alt="team-image"
                  />
                  <label htmlFor="profile-picture">
                    <input
                      ref={ref}
                      type="file"
                      accept=".png, .jpg, .jpeg, .xlsx, .pdf"
                      onChange={(e) => handleChangeInComponent(e)}
                      className="hidden"
                      name="profile-picture"
                      id="profile-picture"
                    />
                    <AppButton
                      //@ts-expect-error ignore
                      onClick={() => ref.current.click()}
                      className="whitespace-nowrap"
                      icon={<GoPencil />}
                    >
                      Edit
                    </AppButton>
                    <AppButton
                      label="Remove"
                      icon={<GoTrash />}
                      variant="outline"
                      className="!py-[6px] mt-[20px]"
                      onClick={() => {
                        setFile(null);
                        setImage("");
                      }}
                    />
                  </label>
                </Flex>
              </div>
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
                    maxLength: {
                      value: 60,
                      message: "Max character length should be less than 60",
                    },
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
          <Flex justifyContent={"end"} mt={"10px"}>
            <ButtonPair
              primaryBtnText={"Confirm"}
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

export default EditTeamForm;
