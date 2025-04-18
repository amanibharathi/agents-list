// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { Box, Flex } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { useMutation } from "react-query";

import {
  ADMIN_AGENT_ASSIGN_OFFICE_BROKERAGE_POST,
  AGENT_DASHBOARD_OFFICE_OR_BROKERAGE_LIST,
} from "../../../../api-utils";
import AppButton from "../../../../AppComponents/AppButton-agent";
import AppText from "../../../../AppComponents/AppText-agent";
import ListingTable from "../table/ListingTable";
import useGetMetaFromApi from "../../../../utils/hooks/useGetMetaFromApi";
import makePostRequest from "../../../../api/makePostRequest";
import { getFirstErrorMessage } from "../../../../utils/functions/commonFunctions";
import AdminInputRenderer from "./AdminInputRenderer";

export interface Lead {
  id: number;
  uuid: string;
  user: {
    id: number;
    uuid: string;
    full_name: string;
    email: string;
  };
  lead_type: string;
  stage: string;
  created: string;
  agent?: null;
}

interface IAssignAgentToLeadModal {
  onClose: () => void;
  selected: Lead[];
  setSelected: Dispatch<SetStateAction<never[]>>;
  tableHeader: string;
  btnText: string;
  refetch?: any;
  isBrokerage?: boolean;
  isTeam?: boolean;
}

const AssignAgentToBrokerageModal = ({
  selected,
  setSelected,
  onClose,
  tableHeader,
  refetch,
  btnText,
  isBrokerage,
  isTeam = false,
}: IAssignAgentToLeadModal) => {
  const isAssign = false; // Office Modal
  const listToShowInModal = useMemo(() => {
    let list = selected;
    if (isTeam) {
      if (!isAssign && Array.isArray(selected))
        list = selected?.filter((f) => f?.id);
    } else {
      if (!isAssign && Array.isArray(selected)) {
        //@ts-expect-error ignore
        list = selected?.filter((f) => f?.agent?.id);
      }
    }

    return list;
  }, [selected]);

  const rejectForm = useForm();
  const { watch } = rejectForm;
  const tableData = {
    data: {
      results: listToShowInModal,
    },
  };
  const [selectedData, setSelectedData] = useState(tableData);
  const tableMeta = {
    data: {
      columns: {
        full_name: "Name",
        email: "Email",
        license_number: "License Number",
        state: "State",
      },
    },
  };
  const tableMeta2 = {
    data: {
      columns: {
        // full_name: 'Team Name',
        identity: "Team Name",
        phone_number: "Phone Number",
        "state[0].identity": "State",
      },
    },
  };

  //   const queryClient = useQueryClient()

  //   const { isLoading, mutate } = useMutation(
  //     (body) =>
  //       makePostRequest(
  //         isAssign
  //           ? ADMIN_AGENT_ASSIGN_TEAM_POST
  //           : ADMIN_AGENT_ASSIGN_OFFICE_BROKERAGE_POST,
  //         body
  //       ),
  //     {
  //       onSuccess: () => {
  //         toast.success(
  //           isAssign ? 'Agent assigned Successfully' : 'Removed Successfully'
  //         )
  //         onClose()
  //         setSelected([])
  //         refetch()
  //         queryClient.invalidateQueries({
  //           queryKey: [GET_LEADS_LIST_IN_ADMIN],
  //         })
  //       },
  //       onError: (err) => {
  //         console.log(
  //           'err?.response?.data?.data',
  //           //@ts-expect-error ignore
  //           //@ts-expect-error ignore
  //           err?.response?.data?.data
  //         )
  //         //@ts-expect-error ignore
  //         const errMsg = getFirstErrorMessage(err?.response?.data?.data)
  //         //@ts-expect-error ignore
  //         toast.error(errMsg)
  //       },
  //     }
  //   )

  //   const { metaData, handleOnInputChange, metaDataIsLoading } =
  //     useGetMetaFromApi({
  //       endPoint: isAssign ? ADMIN_AGENT_TEAM_LIST : GET_ADMIN_BROKERAGE_LIST,
  //       // options: {
  //       //   enabled: isAssign,
  //       // },
  //     })

  //   const handleSubmit = () => {
  //     const dataToSubmit = isAssign
  //       ? {
  //           team: watch('agent')?.value,
  //           //@ts-expect-error ignore
  //           user_ids: selectedData?.data?.results?.map((m: any) => m?.id),
  //           role: 'member',
  //         }
  //       : {
  //           brokerage: watch('agent')?.value,
  //           //@ts-expect-error ignore
  //           members: selectedData?.data?.results?.map((m: any) => m?.id),
  //           // role: 'member',
  //           team: [],
  //         }
  //     //@ts-expect-error ignore
  //     mutate(dataToSubmit)
  //   }

  const removeFromList = (val: unknown) => {
    //@ts-expect-error ignore
    const newArr = selectedData?.data?.results?.filter(
      (f) => f?.id !== val?.id
    );
    setSelectedData({
      data: { results: newArr },
    });
  };

  const customActions = () => {
    return [
      {
        text: <IoIosRemoveCircleOutline color="red" fontSize={"24px"} />,
        handler: (val: unknown) => removeFromList(val),
      },
    ];
  };

  const isBtnDisabled =
    selectedData?.data?.results?.length == 0 ||
    (isAssign ? !watch("agent")?.value : false);

  // ------------------------
  const { metaData: office, handleOnInputChange: handleOnOfficeChange } =
    useGetMetaFromApi({
      endPoint: AGENT_DASHBOARD_OFFICE_OR_BROKERAGE_LIST,
    });

  const { mutate: officeMutate, isLoading } = useMutation(
    (body) => makePostRequest(ADMIN_AGENT_ASSIGN_OFFICE_BROKERAGE_POST, body),

    {
      onSuccess: () => {
        onClose();
        toast.success("Assigned Successfully");
        setSelected([]);
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

  const officeList = office?.data?.results ?? [];

  //   const getLabel = (val: any) => {
  //     const cvalue = val?.map((each: any) => {
  //       return {
  //         label: each?.identity,
  //         value: each?.id,
  //       }
  //     })
  //     return cvalue
  //   }

  const inputFields = useMemo(
    () => [
      {
        name: "office",
        label: "Select office",
        onInpuChange: (val: any) => handleOnOfficeChange(val),
        type: "multi-select",
        options: officeList,
      },
    ],
    [officeList]
  );

  const handleSumbit = (bdyObj: any) => {
    let teamList = [];
    let memberList = [];
    if (isTeam) {
      teamList = selectedData?.data?.results?.map((m: any) => m?.id);
    } else {
      memberList = selectedData?.data?.results?.map((m: any) => m?.id);
    }
    const bdy = {
      team: teamList,
      //@ts-expect-error ignore
      members: memberList,
      brokerage: bdyObj?.data?.office?.map((each: any) => each?.value),
    };
    //@ts-expect-error ignore
    officeMutate(bdy);
  };

  return (
    <Flex flexFlow={"column"}>
      <Box>
        <AppText
          text={tableHeader}
          className="text-[18px] font-[600] mb-[10px] text-[#444444]"
        />
        <ListingTable
          customActions={customActions()}
          tableMeta={!isBrokerage ? tableMeta : tableMeta2}
          tableData={selectedData}
          includeIndex
          //@ts-expect-error ignore
          relativeTime={["created"]}
        />
      </Box>
      <form
        onSubmit={rejectForm.handleSubmit((e: any) => {
          handleSumbit && handleSumbit(e);
        })}
      >
        <Box mt={"50px"}>
          {/* <AppText
            text={dropDownName}
            className="text-[18px] font-[600] mb-[10px] text-[#444444]"
          /> */}
          {/* @ts-ignore */}

          {inputFields?.map((i: any) => (
            <AdminInputRenderer
              className={`w-full max-w-[100%] ${i?.className ?? ""}`}
              wrapperClassName={`flex gap-[20px] text-[14px] ${
                i?.wrapperName ?? ""
              }`}
              labelClassName=""
              inputObj={i}
              key={i?.name}
              register={rejectForm.register}
              control={rejectForm.control}
              errors={rejectForm.formState.errors?.data}
              inputControlClassName={i?.wrapperName}
            />
          ))}
        </Box>
        <Flex mb={"30px"} mt={"40px"} gap={"16px"} justifyContent={"end"}>
          <AppButton
            onClick={onClose}
            className="py-[8px] w-fit"
            variant="outline"
          >
            Cancel
          </AppButton>
          <AppButton
            type="submit"
            isLoading={isLoading}
            disabled={isBtnDisabled}
          >
            {btnText}
          </AppButton>
        </Flex>
      </form>
    </Flex>
  );
};

export default AssignAgentToBrokerageModal;
