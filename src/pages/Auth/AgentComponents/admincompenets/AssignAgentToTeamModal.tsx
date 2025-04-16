
import { Box, Flex } from '@chakra-ui/react'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { IoIosRemoveCircleOutline } from 'react-icons/io'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import CkInput from './CkInput'
import {   ADMIN_AGENT_ASSIGN_OFFICE_BROKERAGE_POST,
  ADMIN_AGENT_TEAM_LIST,
  ADMIN_TEAM_MEMBER_CREATE,
  ADMIN_TEAM_MEMBER_UPDATE_META,
  GET_ADMIN_BROKERAGE_LIST,
  GET_ADMINS_AGENT_CREATION_META,
  GET_LEADS_LIST_IN_ADMIN,
} from "../../../../api-utils";
import CkSelect from "./CkSelect";
import AppButton from "../../../../AppComponents/AppButton-agent";
import AppText from "../../../../AppComponents/AppText-agent";
import ListingTable from "../table/ListingTable";
import useGetMetaFromApi from "../../../../utils/hooks/useGetMetaFromApi";
import makePostRequest from "../../../../api/makePostRequest";
import makeGetRequest from "../../../../api/makeGetRequest";
import {
  commissionPlanOptions,
  getFirstErrorMessage,
} from "../../../../utils/functions/commonFunctions";

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
  modalType?: string;
  tableHeader: string;
  dropDownName: string;
  btnText: string;
  refetch?: any;
  isBrokerage?: boolean;
}

const AssignAgentToTeamModal = ({
  selected,
  onClose,
  setSelected,
  modalType,
  tableHeader,
  dropDownName,
  refetch,
  btnText,
  isBrokerage,
}: IAssignAgentToLeadModal) => {
  const isAssign = modalType == "team";
  const listToShowInModal = useMemo(() => {
    let list = selected;
    //@ts-ignore
    if (!isAssign) list = selected?.filter((f) => f?.agent?.id);
    return list;
  }, [selected]);

  const { register, watch, control } = useForm();
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
        full_name: "Team Name",
        phone_number: "Phone Number",
        state: "State",
      },
    },
  };

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    (body) =>
      makePostRequest(
        isAssign
          ? ADMIN_TEAM_MEMBER_CREATE(watch("agent")?.value)
          : ADMIN_AGENT_ASSIGN_OFFICE_BROKERAGE_POST,
        body
      ),
    
      {onSuccess: () => {
        toast.success(
          isAssign ? 'Agent assigned Successfully' : 'Removed Successfully'
        )
        onClose()
        setSelected([])
        refetch()
        queryClient.invalidateQueries({
          queryKey: [GET_LEADS_LIST_IN_ADMIN],
        })
      },
      onError: (err) => {
        //@ts-ignore
        const errMsg = getFirstErrorMessage(err?.response?.data?.data)
        //@ts-ignore
        toast.error(errMsg)
      },
    }
  )

  const { metaData, handleOnInputChange, metaDataIsLoading } =
    useGetMetaFromApi({
      endPoint: isAssign
        ? ADMIN_AGENT_TEAM_LIST + `?status=approved`
        : GET_ADMIN_BROKERAGE_LIST,
      // options: {
      //   enabled: isAssign,
      // },
    });

  const { metaData: agentMetaData } = useGetMetaFromApi({
    endPoint: GET_ADMINS_AGENT_CREATION_META,
    options: {
      enabled: isAssign,
    },
  });

  const handleSubmit = () => {
    const dataToSubmit = isAssign
      ? {
          team: watch("agent")?.value,
          //@ts-ignore
          user: selectedData?.data?.results?.[0]?.id,
          role: watch("role")?.value,
          agent_cap_detail: {
            team_commission_plan: watch("team_commission_plan"),
            commission_plan: watch("commission_plan")?.value,
            cap_status: watch("cap_status")?.value,
          },
          creation_type: "existing",
        }
      : {
          brokerage: watch("agent")?.value,
          //@ts-ignore
          members: selectedData?.data?.results?.map((m: any) => m?.id),
          // role: 'member',
          team: [],
        };
    //@ts-ignore
    mutate(dataToSubmit);
  };

  const removeFromList = (val: unknown) => {
    //@ts-ignore
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

  const { data: meta } = useQuery(
    //@ts-ignore
    [ADMIN_TEAM_MEMBER_UPDATE_META(watch("agent")?.value)],
    //@ts-ignore
    () => makeGetRequest(ADMIN_TEAM_MEMBER_UPDATE_META(watch("agent")?.value)),
    {
      //@ts-ignore
      enabled: !!watch("agent")?.value,
    }
  );

  const isBtnDisabled =
    selectedData?.data?.results?.length == 0 ||
    (isAssign
      ? !watch("agent")?.value ||
        !watch("team_commission_plan") ||
        !watch("commission_plan")?.value ||
        !watch("cap_status")?.value
      : false);

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
          //@ts-ignore
          relativeTime={["created"]}
        />
      </Box>
      <Box mt={"50px"}>
        <AppText
          text={dropDownName}
          className="text-[18px] font-[600] mb-[10px] text-[#444444]"
        />
        {/* @ts-ignore */}
        <CkSelect
          isLoading={metaDataIsLoading}
          control={control}
          {...register("agent")}
          //@ts-ignore
          options={metaData?.data?.results?.map((m) => ({
            id: m?.id,
            identity: m?.identity,
          }))}
          className={`!z-[10]`}
          placeholder={dropDownName}
          onInputChange={(val: any) => handleOnInputChange(val)}
          //   isError={errors?.[name]}
        />
      </Box>
      <Box mt={"50px"}>
        <AppText
          text={"Role*"}
          className="text-[18px] font-[600] mb-[10px] text-[#444444]"
        />
        {/* @ts-ignore */}
        <CkSelect
          control={control}
          {...register("role")}
          //@ts-ignore
          options={meta?.data?.meta?.role}
          className={``}
          //   isError={errors?.[name]}
        />
      </Box>{" "}
      <Box mt={"50px"}>
        <AppText
          text={"Team Commission Plan*"}
          className="text-[18px] font-[600] mb-[10px] text-[#444444]"
        />
        <CkInput
          {...register("team_commission_plan")}
          //@ts-ignore
          placeholder="Enter a value between 15 to 100"
          type="number"
        />
      </Box>
      <Box mt={"50px"}>
        <AppText
          text={"Commission Plan*"}
          className="text-[18px] font-[600] mb-[10px] text-[#444444]"
        />
        {/* @ts-ignore */}
        <CkSelect
          control={control}
          {...register("commission_plan")}
          //@ts-ignore
          options={commissionPlanOptions}
          className={``}
          //   isError={errors?.[name]}
        />
      </Box>{" "}
      <Box mt={"50px"}>
        <AppText
          text={"Cap Status*"}
          className="text-[18px] font-[600] mb-[10px] text-[#444444]"
        />
        {/* @ts-ignore */}
        <CkSelect
          isLoading={metaDataIsLoading}
          control={control}
          {...register("cap_status")}
          //@ts-ignore
          options={agentMetaData?.data?.meta?.cap_status}
          className={``}
        />
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
          onClick={handleSubmit}
          isLoading={isLoading}
          disabled={isBtnDisabled}
        >
          {btnText}
        </AppButton>
      </Flex>
    </Flex>
  );
};

export default AssignAgentToTeamModal;
