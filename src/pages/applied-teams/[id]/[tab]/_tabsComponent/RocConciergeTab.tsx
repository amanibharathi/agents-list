// import AdminFormWrapper from '@/app/admin/_AdminComponent/AdminFormWrapper'
// import ButtonPair from '@/app/admin/_AdminComponent/ButtonPair/ButtonPair'
// import NewAdminInputRenderer from '@/app/admin/_AdminComponent/NewAdminInputRenderer'
import {
  ADMIN_AGENT_TEAM_DETAIL,
  ADMIN_AGENT_TEAM_UPDATE,
} from '../../../../../api-utils'
// import useFormUtils from '@/app/hooks/admin/useFormUtils'
import makeGetRequest from '../../../../../api/makeGetRequest'
import makePatchRequest from '../../../../../api/makePatchRequest'
import { Box, Flex } from '@chakra-ui/react'
import toast from 'react-hot-toast'
import { v4 as uuid } from 'uuid'
import { useMutation, useQuery } from 'react-query'
import AdminFormWrapper from '../../../../../login/adminlogin/AdminFormWrapper'
import ButtonPair from '../../../../Auth/AgentComponents/admincompenets/ButtonPair'
import NewAdminInputRenderer from '../../../../../login/adminlogin/NewAdminInputRenderer'
import useFormUtils from '../../../../../utils/hooks/useFormUtils'

const RocConciergeTab = ({
  params,
}: {
  params: { tab: string; id: string };
}) => {
  const id = params?.id;
  const {
    register,
    control,
    formState: { errors },
    // handleSubmit,
    // setdefaultValue,
    // watch,
    // isLoading,
    // handleMutateSubmit,
    // isDirty,
    // reset,
    // getdefaultValues,
    // isSubmitting,
    //@ts-expect-error ignore
  } = useFormUtils({});
  const { data, isLoading } = useQuery([ADMIN_AGENT_TEAM_DETAIL(id)], () =>
    makeGetRequest(ADMIN_AGENT_TEAM_DETAIL(id))
  );
  const isApproved = data?.data?.status == "approved";

  const { mutate } = useMutation(
    (body) => makePatchRequest(ADMIN_AGENT_TEAM_UPDATE(id), body),
    {
      onSuccess: (res) => {
        console.log(res);
        // const id = res?.data?.id
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );
  const handleApprove = () => {
    //@ts-expect-error ignore
    mutate({ status: "approved" });
    toast.success("Team Approved Successfully");
  };

  const handleReject = () => {
    //@ts-expect-error ignore
    mutate({ status: "rejected" });
    toast.success("Team Removed Successfully");
  };

  const inputs = [
    {
      key: uuid(),
      thisWrapperClassName: "",
      render: [
        {
          label: "Name*",
          name: "name",
          readOnly: true,
          otherRegProps: {
            value: data?.data?.admin_details?.name ?? "",
          },
        },
      ],
    },
    {
      key: uuid(),
      thisWrapperClassName: "grid grid-cols-2 gap-x-[30px]",
      render: [
        {
          label: "Email*",
          name: "email",
          readOnly: true,
          otherRegProps: {
            value: data?.data?.admin_details?.email ?? "",
          },
        },
        {
          label: "Phone*",
          name: "phone_number",
          type: "tel",
          readOnly: true,
          otherRegProps: {
            value: data?.data?.admin_details?.phone_number?.substr(2, 12) ?? "",
          },
        },
      ],
    },
    {
      key: uuid(),
      thisWrapperClassName: "grid grid-cols-2 gap-x-[30px]",
      render: [
        {
          label: "Team Name*",
          name: "identity",
          readOnly: true,
          otherRegProps: {
            value: `${data?.data?.identity}'s Team`,
          },
        },
        {
          label: "Team Size*",
          name: "no_of_members",
          type: "number",
          readOnly: true,
          otherRegProps: {
            value: data?.data?.no_of_members ?? "",
          },
        },
      ],
    },
    {
      key: uuid(),
      thisWrapperClassName: "grid grid-cols-2 gap-x-[30px]",
      render: [
        {
          label: "Total Closed Volume (last 12 months)*",
          name: "no_of_closed_volume",
          type: "number",
          readOnly: true,
          otherRegProps: {
            value: data?.data?.no_of_closed_volume ?? "",
          },
        },
        {
          label: "Number of Transactions (last 12 months)*",
          name: "no_of_transactions",
          type: "number",
          readOnly: true,
          otherRegProps: {
            value: data?.data?.no_of_transactions ?? "",
          },
        },
      ],
    },
    {
      key: uuid(),
      thisWrapperClassName: "grid grid-cols-1",
      render: [
        {
          label: "Attachments*",
          name: "docs",
          type: "readOnlyDocs",
          readOnly: true,
          inputWrapperClassName: "w-[100%]",
          value: data?.data?.document?.[0]?.file ?? "",
        },
      ],
    },
  ];

  return (
    <Box pb={"40px"}>
      {!isLoading ? (
        <AdminFormWrapper
          titleClassName="mb-[39px] mt-[-4px]"
          title={"Team Information"}
        >
          <form onSubmit={() => handleApprove()}>
            <Box className="">
              <NewAdminInputRenderer
                register={register}
                control={control}
                errors={errors}
                boxWrapperClassName="grid grid-cols-1 gap-[28px] w-full max-w-[850px]"
                inputObj={inputs}
                inputWrapperClassName="w-full max-w-[410px]"
              />
              {!isApproved && (
                <Flex justifyContent={"end"} mt={"10px"}>
                  <ButtonPair
                    primaryBtnText={"Approve Team"}
                    secondaryBtnText={"Reject"}
                    onPrimaryClick={undefined}
                    primaryBtnType={"submit"}
                    onSecondaryClick={() => handleReject()}
                    primaryBtnIsLoading={false}
                  />
                </Flex>
              )}
            </Box>
          </form>
        </AdminFormWrapper>
      ) : (
        <div></div>
      )}
    </Box>
  );
};

export default RocConciergeTab;
