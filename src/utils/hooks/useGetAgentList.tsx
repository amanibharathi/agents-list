import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { useDebounce } from "./useDebounce";
// import { SPONSOR_LIST_API } from '../api-utils'
import { useQuery } from "react-query";
// import makeGetRequest from '../utils/api/makeGetRequest'
import { SPONSOR_LIST_API } from "../../api-utils";
import makeGetRequest from "../../api/makeGetRequest";

export function useGetAgentList(
  endPoint = SPONSOR_LIST_API,
  notSponsor = false
) {
  const [searchVal, setSearchVal] = useState("");
  const debouncedValue = useDebounce(searchVal, 300) || "";
  const apiEndPoint = endPoint + "?search=" + debouncedValue;
  const {
    isLoading: metaIsLoading,
    data: metaData,
    // refetch,
    isFetching,
    isSuccess,
  } = useQuery([apiEndPoint], () => makeGetRequest(apiEndPoint), {
    enabled: !!debouncedValue,
    onError: (err) => {
      toast.error("Error occured while getting search meta");
      //@ts-expect-error ignore
      console.error(err);
    },
  });
  const modifyOptionsForSearch = useCallback(
    (opt: any) => {
      const options = opt?.map((m: any) => ({
        label: m?.full_name ?? m?.user?.first_name,
        value: m?.id,
        id: m?.id,
        phone_number: m?.phone_number,
        email: m?.email,
        city: m?.city,
        state: m?.primary_state,
        agent: m?.agent,
        license: m?.license ?? m?.user?.license,
        profile: m?.profile_picture,
        userId: m?.user?.id,
        team: m?.team?.identity,
      }));
      if (options && options?.length !== 0) {
        return [
          ...options,
          {
            label: notSponsor ? "Agent not Available" : "Sponsor not available",
            value: "0",
            phone_number: "",
            email: "",
            agent: {
              primary_state: { identity: "Add Agent" },
            },
          },
        ];
      }
      if (options && options?.length == 0)
        return [
          {
            label: notSponsor ? "Agent not Available" : "Sponsor not available",
            value: "0",
            phone_number: "",
            email: "",
            agent: {
              primary_state: { identity: "Add Agent" },
            },
          },
        ];
    },
    [metaData?.data?.results]
  );

  const groupedOptions = modifyOptionsForSearch(metaData?.data?.results);
  return {
    metaIsLoading,
    groupedOptions,
    isFetching,
    isSuccess,
    setSearchVal,
    searchVal,
  };
}
