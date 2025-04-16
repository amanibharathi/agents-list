import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { useDebounce } from './useDebounce'
import { useInfiniteQuery } from 'react-query'
import makeGetRequest from '../../api/makeGetRequest'


export function useGetMemberMlsList() {
  const [searchVal, setSearchVal] = useState("");
  const [selectedBoarded, setSelectedBoarded] = useState("");
  const debouncedValue = useDebounce(searchVal, 300) || "";
  const apiEndPoint =
    "/meta/mls/list/" +
    "?search=" +
    debouncedValue +
    (selectedBoarded !== "" ? "&state=" + selectedBoarded : "");
  // const {
  //   isLoading: metaIsLoading,
  //   data: metaData,
  //   // refetch,
  //   isFetching,
  //   isSuccess,
  // } = useQuery(apiEndPoint, () => makeGetRequest(apiEndPoint), {
  //   enabled: !!debouncedValue,
  //   onError: (err) => {
  //     toast.error('Error occured while getting search meta')
  //     //@ts-ignore
  //     console.error(err)
  //   },
  // })

  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
    //@ts-ignore
  } = useInfiniteQuery({
    queryKey: [`apiEndPoint ${debouncedValue}`],
    queryFn: ({ pageParam = 1 }) =>
      makeGetRequest(apiEndPoint, {
        page: pageParam,
      }),
    initialPageParam: 0,
    onError: (err) => {
      toast.error("Error occured while getting search meta");
      //@ts-ignore
      console.error(err);
    },
    //@ts-ignore
    getPreviousPageParam: (firstPage) => firstPage?.data?.previous ?? undefined,
    //@ts-ignore
    getNextPageParam: (lastPage) => {
      if (lastPage?.data?.next) {
        const urlObj = new URL(lastPage?.data?.next);
        const page = urlObj.searchParams.get("page");
        return page ?? undefined;
      } else {
        return undefined;
      }
    },
    enabled: !!debouncedValue,
  });
  const loadMoreOptions = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // const modifyOptionsForSearch = useCallback(
  //   (opt: any) => {
  //     return opt?.map((m: any) => ({
  //       label: m?.identity + (m?.code ? ` (${m?.code})` : ''),
  //       value: m?.id,
  //       identity: m?.identity + (m?.code ? ` (${m?.code})` : ''),
  //       id: m?.id,
  //     }))
  //   },
  //   [metaData?.data?.results]
  // )

  const modifyOptionsForSearch2 = useCallback(
    (opt: any) => {
      const spread = opt?.map((each: any) => each?.data?.results);
      const options = spread?.flat();
      return options?.map((m: any) => ({
        label: m?.identity + (m?.code ? ` (${m?.code})` : ""),
        value: m?.id,
        identity: m?.identity + (m?.code ? ` (${m?.code})` : ""),
        id: m?.id,
      }));
    },
    [data?.pages]
  );

  const groupedOptions = modifyOptionsForSearch2(data?.pages);

  // const groupedOptions = modifyOptionsForSearch(metaData?.data?.results)
  return {
    // metaIsLoading,
    groupedOptions,
    // isFetching,
    // isSuccess,
    setSearchVal,
    searchVal,
    setSelectedBoarded,
    loadMoreOptions,
    isFetchingNextPage,
    isLoading,
  };
}
