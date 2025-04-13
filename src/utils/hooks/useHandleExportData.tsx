
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { GET_EXPORT_DATA } from '../../api-utils'
import makePostRequest from '../../api/makePostRequest'

const useHandleExportData = () => {
  const { isLoading, mutate } = useMutation(
    //@ts-ignore
    {mutationFn: (body) => makePostRequest(GET_EXPORT_DATA(), { ...body }),
    
      onSuccess: () => {
        toast.success(
          'Data export initialized, once done the report will be sent to your ROA email id'
        )
      },
    }
  )
  const generateData = (obj: any) => {
    //@ts-ignore
    mutate({ ...obj })
  }

  return { isLoading, generateData }
}

export default useHandleExportData
