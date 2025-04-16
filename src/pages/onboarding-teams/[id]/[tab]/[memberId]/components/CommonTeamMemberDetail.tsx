//@ts-nocheck
import AppButton from "@/app/components/elements/AppButton";
import AppText from "@/app/components/elements/AppText";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useMemo } from "react";
import { FaRegEdit } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { CommonDetailContainer } from "./CommonDetailContainer";
import ButtonPair from "@/app/admin/_AdminComponent/ButtonPair/ButtonPair";
import { useRouter } from "next-nprogress-bar";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { ADMIN_TEAM_MEMBER_UPDATE } from "@/app/api-utils";
import {
  commissionPlanOptions,
  getFirstErrorMessage,
} from "@/app/utils/functions/otherFunctions";
import { MAKE_ADMIN_TEAM_DETAIL_TAB } from "@/app/utils/navigation";
import toast from "react-hot-toast";
import makePutRequest from "@/app/utils/api/makePutRequest";
import { ConfirmRemoveAgentModal } from "../../_TeamDocumentationTabModels/ConfirmRemoveAgentModal";

interface ITeamMemberDetail {
  isDetail?: boolean;
  data: {
    agent_fullName: string;
    license: string;
    email: string;
    phone: string;
    profile: string;
    role?: {
      id: string;
      identity: string;
      label: string;
      value: string;
    } | null;
    cap?: { id: string; identity: string; label: string; value: string } | null;
    commision_plan: {
      id: string;
      identity: string;
      label: string;
      value: string;
    } | null;
    commision_split: {
      id: string;
      identity: string;
      label: string;
      value: string;
    } | null;
    team?: any;
    memberId?: any;
  };
  isEdit?: boolean;
  setIsEdit?: any;
  meta?: any;
  params?: { tab: string; id: string; memberId: string };
  documents?: any;
  refetch: any;
}

export const CommonTeamMemberDetail = ({
  isDetail = false,
  data,
  isEdit = false,
  setIsEdit,
  meta,
  params,
  documents,
  refetch,
}: ITeamMemberDetail) => {
  const router = useRouter();
  const editForm = useForm();
  const {
    isOpen: teamMemberRemoveIsOpen,
    onOpen: teamMemberRemoveOnOpen,
    onClose: teamMemberRemoveOnClose,
  } = useDisclosure();

  const teamMemberObj = useMemo(
    () => [
      {
        label: "Role*",
        name: "role",
        type: "select",
        options: meta?.role,
        // onInpuChange: (val: any) => handleStateDataChange(val),
        className: "w-full max-w-[495px] !z-[14]",
        readOnly: !isEdit,
        otherRegProps: {
          required: isEdit,
        },
      },
      {
        label: "Cap Structure*",
        type: "select",
        name: "cap",
        options: meta?.cap_structure,
        // onInpuChange: (val: any) => handleBoardDataChange(val),
        className: "w-full max-w-[495px] !z-[13]",
        readOnly: !isEdit,
        otherRegProps: {
          required: isEdit,
        },
      },
      {
        label: "Brokerage Commision Plan*",
        name: "commission_plan",
        options: commissionPlanOptions,
        type: "select",
        className: "w-full max-w-[495px] !z-[12]",
        readOnly: !isEdit,
        otherRegProps: {
          required: isEdit,
        },
      },
      {
        label: "Minimum Team Commision Split",
        name: "commission_split",
        className: "w-full max-w-[495px] !z-[11]",
        type: "number",
        readOnly: !isEdit,
        placeholder: "Enter a value between 15 to 100",
        otherRegProps: {
          required: false,
          min: {
            value: 15,
            message: "Value should be more than 15",
          },
          max: {
            value: 100,
            message: "Value should be less than 100",
          },
        },
      },
    ],
    [meta, commissionPlanOptions, isEdit]
  );

  const { mutate, isLoading } = useMutation(
    (body) =>
      makePutRequest(
        ADMIN_TEAM_MEMBER_UPDATE(params?.id, params?.memberId),
        body
      ),
    {
      onSuccess: () => {
        router.push(MAKE_ADMIN_TEAM_DETAIL_TAB(params?.id));
        toast.success("Team Member Details Updated Successfully");
      },
      onError: (err) => {
        //@ts-expect-error ignore
        const errMsg = getFirstErrorMessage(err?.response?.data?.data);
        //@ts-expect-error ignore
        toast.error(errMsg);
      },
    }
  );

  const handleSubmitForm = (data: any) => {
    const obj = {
      agent_cap_detail: {
        cap_status: data?.data?.cap?.value ?? null,
        commission_plan: data?.data?.commission_plan?.value ?? null,
        team_commission_plan:
          data?.data?.commission_split != ""
            ? data?.data?.commission_split
            : null,
      },
      role: data?.data?.role?.value ?? null,
    };
    //@ts-expect-error ignore
    mutate(obj);
  };

  useEffect(() => {
    editForm.setValue("data.commission_plan", data.commision_plan);
    editForm.setValue("data.commission_split", data.commision_split);
    editForm.setValue("data.role", data.role);
    editForm.setValue("data.cap", data.cap);
  }, [data]);
  return (
    <Box className="pb-[40px]">
      {isDetail ? (
        <div className="py-[40px] flex justify-between items-center">
          <div className="flex items-center gap-[25px]">
            <GoArrowLeft
              onClick={() => router.back()}
              fontSize={"24px"}
              className="cursor-pointer"
            />
            <AppText
              className="!text-[#10295A] text-[24px] font-bold whitespace-nowrap"
              text={`${data?.agent_fullName ? data?.agent_fullName : "-"} - ${
                isEdit ? "Edit" : ""
              } Details`}
            />
          </div>
          <div className="flex gap-[20px] w-[100%] justify-end">
            <AppButton
              variant="outline"
              className="max-h-[40px] max-w-[200px] px-[4px] py-[4px]"
              onClick={() => teamMemberRemoveOnOpen()}
            >
              Remove Team Member
            </AppButton>
            {!isEdit && (
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <AppButton onClick={() => setIsEdit(true)} icon={<FaRegEdit />}>
                  Edit Details
                </AppButton>
              </Flex>
            )}
          </div>
        </div>
      ) : null}
      <form onSubmit={editForm.handleSubmit(handleSubmitForm)}>
        <CommonDetailContainer
          data={data}
          fields={teamMemberObj}
          editForm={editForm}
          documents={documents}
          params={params}
          refetch={refetch}
        />
        {isEdit ? (
          <Flex justify={"end"} mt={"40px"}>
            <ButtonPair
              primaryBtnText={"Update"}
              secondaryBtnText={"Cancel"}
              onPrimaryClick={undefined}
              primaryBtnType={"submit"}
              onSecondaryClick={() => {
                setIsEdit(false);
                editForm.reset();
              }}
              primaryBtnIsLoading={isLoading}
            />
          </Flex>
        ) : null}
      </form>
      <ConfirmRemoveAgentModal
        isOpen={teamMemberRemoveIsOpen}
        onClose={teamMemberRemoveOnClose}
        data={data}
        isDetail
      />
    </Box>
  );
};
