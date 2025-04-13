import { useEffect, useState } from "react";
import makeGetRequest from "../../api/makeGetRequest";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "./useDebounce";
import { DEBOUNCER_TIME } from "../functions/constants";

const useGetMetaFromApi = ({
  endPoint,
  filterObj,
  customOnSuccess,
  options,
}: {
  endPoint: string;
  customOnSuccess?: (val: unknown) => void;
  filterObj?: object;
  options?: object;
}) => {
  const [search, setSearch] = useState(null);
  const debouncedValue = useDebounce(search, DEBOUNCER_TIME);
  const {
    data: metaData,
    isLoading: metaDataIsLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: [endPoint, debouncedValue, filterObj],
    queryFn: () =>
      makeGetRequest(endPoint, {
        search: debouncedValue,
        ...filterObj,
      }),
    ...options,
  });

  useEffect(() => {
    if (metaData && isFetching == true) {
      if (customOnSuccess) customOnSuccess(metaData);
    }
  }, [metaData, isFetching]);

  const handleOnInputChange = (val: string) => {
    //@ts-expect-error ignore
    setSearch(val);
  };

  return {
    metaData,
    metaDataIsLoading,
    setSearch,
    handleOnInputChange,
    search,
    refetch,
    isFetching,
  };
};

export default useGetMetaFromApi;
