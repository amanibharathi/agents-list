import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import makeGetRequest from '../../api/makeGetRequest'

const useGetTableList = ({
  endPoint,
  metaEndPoint,
  handleMax,
  filterObject = {},
  page,
  deps = [],
  enabled = true,
  refetchDeps = [],
  setPage,
  onSuccess,
}: {
  endPoint: string;
  metaEndPoint: string;
  handleMax?: (count: number | string) => void;
  filterObject?: object;
  page?: number;
  deps?: string[] | number[];
  enabled?: boolean;
  refetchDeps?: any[];
  setPage?: (val: number) => void;
  onSuccess?: (val: any) => void;
}) => {
  const [select, setSelect] = useState([]);
  const [listIds, setListIds] = useState([]);
  const selectable = {
    select,
    setSelect,
  };

  useEffect(() => {
    setPage && setPage(1);
  }, [...deps, ...refetchDeps]);

  useEffect(() => {
    refetch();
  }, [...refetchDeps]);

  const {
    data: listData,
    isLoading: dataIsLoading,
    refetch,
    isFetching,
  } = useQuery(
    [endPoint, page, ...deps],
    () => makeGetRequest(endPoint, { ...filterObject, page }),
    {
      onSuccess: (res) => {
        onSuccess && onSuccess(res?.data?.results);
        handleMax && handleMax(res?.data?.count);
        setListIds(res?.data?.results?.map((i: any) => i?.id));
      },
      onError: (err) => {
        console.log(err);
      },
      enabled: enabled,
    }
  );

  const { data: listMeta, isLoading: listMetaIsLoading } = useQuery(
    [metaEndPoint],
    () => makeGetRequest(metaEndPoint),
    {
      onError: (err) => {
        console.log(err);
      },
      enabled: enabled,
    }
  );

  const isLoading = listMetaIsLoading || dataIsLoading;
  const totalListCount = listData?.data?.count;
  const currentListCount = listData?.data?.results?.length;

  return {
    listData,
    listMeta,
    isLoading,
    refetch,
    selectable,
    listIds,
    setListIds,
    totalListCount,
    currentListCount,
    isFetching,
  };
};

export default useGetTableList;
