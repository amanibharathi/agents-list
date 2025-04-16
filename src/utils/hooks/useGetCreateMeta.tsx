import { useQuery } from 'react-query'
//import makeGetRequest from '../utils/api/makeGetRequest'
import { useEffect, useState } from 'react'
import makeGetRequest from '../../api/makeGetRequest'

const useGetCreateMeta = ({
  endPoint,
  detailEndPoint,
  customOnSuccess,
  onBothSuccess,
  isDoneDefault = false,
  enabled = true,
}: {
  endPoint: string
  detailEndPoint?: string
  customOnSuccess?: any
  onBothSuccess?: any
  isDoneDefault?: boolean
  enabled?: boolean
}) => {
  const [isDone, setIsDone] = useState(isDoneDefault)
  const {
    data: detailData,
    isLoading: detailDataIsLoading,
    refetch: refetchDetail,
  } = useQuery(
    [detailEndPoint],
    //@ts-ignore
    () => makeGetRequest(detailEndPoint),
    {
      enabled: detailEndPoint ? true : false,
    }
  )
  const {
    data: metaData,
    isLoading: metaDataIsLoading,
    refetch: refetchMeta,
  } = useQuery([endPoint], () => makeGetRequest(endPoint), {
    onSuccess(data) {
      customOnSuccess && customOnSuccess(data)
    },
    enabled: enabled,
  })

  useEffect(() => {
    if (detailData && metaData) onBothSuccess && handleTwoApiSuccess()
  }, [detailData, metaData])

  const meta = metaData?.data?.meta
  const initial = metaData?.data?.initial
  const urls = metaData?.data?.urls
  const detail = detailData?.data

  const combinedIsLoading = detailDataIsLoading || metaDataIsLoading

  const handleTwoApiSuccess = () => {
    onBothSuccess(initial, meta, detail, urls)
  }

  const refetchBothApi = () => {
    refetchDetail()
    refetchMeta()
  }

  return {
    metaData,
    metaDataIsLoading,
    detailData,
    detailDataIsLoading,
    meta,
    initial,
    detail,
    combinedIsLoading,
    isDone,
    setIsDone,
    refetchDetail,
    refetchBothApi,
  }
}

export default useGetCreateMeta
