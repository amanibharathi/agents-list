import CkAppModal from "@/app/components/modal/AppModal";
import React, { useMemo } from "react";
import AddATeamMemberModalStep1 from "../../[id]/[tab]/_TeamDocumentationTabModels/AddATeamMemberModalStep1";
import { useForm } from "react-hook-form";
import {
  ADMIN_CREATE_TEAM_MEMBER_AGENT,
  GET_ADMINS_AGENT_CREATION_META,
  GET_ADMINS_ONBOARD_TYPE_META,
} from "@/app/api-utils";
import useGetCreateMeta from "@/app/hooks/useGetCreateMeta";
import { Flex } from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import makeGetRequest from "@/app/utils/api/makeGetRequest";
import makePostRequest from "@/app/utils/api/makePostRequest";
import {
  getFirstErrorMessage,
  removeSpecialChars,
  validateName,
} from "@/app/utils/functions/otherFunctions";
import toast from "react-hot-toast";
import ButtonPair from "@/app/admin/_AdminComponent/ButtonPair/ButtonPair";
const AddTeamMembersModal = ({
  isOpen,
  onClose,
  setTableData,
  tableData,
}: {
  isOpen: boolean;
  onClose: () => void;
  setTableData: any;
  tableData: any;
}) => {
  const formUtil = useForm({ mode: "onSubmit" });

  const { mutate } = useMutation(
    (body) => makePostRequest(ADMIN_CREATE_TEAM_MEMBER_AGENT(), body),
    {
      onSuccess: (res) => {
        console.log(res);
        setTableData([...tableData, res?.data]);
        formUtil.reset();
        toast.success("Team Member Added Successfully");
        onClose();
      },
      onError: (err) => {
        //@ts-expect-error ignore
        const errMsg = getFirstErrorMessage(err?.response?.data?.data);
        //@ts-expect-error ignore
        toast.error(errMsg);
      },
    }
  );

  const { meta } = useGetCreateMeta({
    endPoint: GET_ADMINS_AGENT_CREATION_META,
  });

  const { data: typeMeta } = useQuery([GET_ADMINS_ONBOARD_TYPE_META], () =>
    makeGetRequest(GET_ADMINS_ONBOARD_TYPE_META)
  );

  const inputFields = useMemo(
    () => [
      {
        label: "First Name*",
        name: "first_name",
        placeholder: "Enter First Name",
        className: "!rounded-l-[0] !rounded-l-[0] !z-[2]",
        formControlClassName: "!z-[2]",
        otherRegProps: {
          required: true,
          validate: validateName,
        },
      },
      {
        label: "Last Name*",
        name: "last_name",
        otherRegProps: {
          required: true,
          validate: validateName,
        },
      },
      {
        label: "Phone Number*",
        name: "phone_number",
        type: "tel",
      },
      {
        label: "Email*",
        name: "email",
        otherRegProps: {
          pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,20})+$/,
          required: true,
        },
      },
      {
        label: "Country*",
        name: "country",
        otherRegProps: {
          required: true,
        },
      },
    ],
    [meta, typeMeta]
  );

  const handleBtnClick = () => {
    const watchData = formUtil.watch("data");
    const obj = {
      first_name: watchData?.first_name,
      last_name: watchData?.last_name,
      email: watchData.email,
      phone_number: `+1${removeSpecialChars(watchData?.phone_number)}`,
      country: watchData?.country,
      onboard_type: "team",
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

  const handleReject = () => {
    formUtil.reset();
    onClose();
  };

  const handleClose = () => {
    onClose();
    const { reset } = formUtil;
    reset();
  };

  return (
    <CkAppModal
      className="!w-full !max-w-[771px] !rounded-[10px]"
      bodyClassName=" !px-[40px]"
      isOpen={isOpen}
      onClose={handleClose}
      header={`Add a Team Members`}
      headerClassName="text-[#10295A] text-[20px] font-[500] !py-[25px] !px-[40px]"
      closeButton
    >
      <form onSubmit={formUtil.handleSubmit(handleBtnClick)}>
        {stepsComponent?.[0]?.comp}
        <Flex mb={"28px"} justifyContent={"end"} mt={"40px"}>
          <ButtonPair
            primaryBtnText={"Submit"}
            secondaryBtnText={"Cancel"}
            onPrimaryClick={undefined}
            primaryBtnType={"submit"}
            onSecondaryClick={() => handleReject()}
            primaryBtnIsLoading={false}
          />
        </Flex>
      </form>
    </CkAppModal>
  );
};

export default AddTeamMembersModal;
