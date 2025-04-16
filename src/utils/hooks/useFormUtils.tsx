
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import makeDeleteRequest from '../../api/makeDeleteRequest'
import makePatchRequest from '../../api/makePatchRequest'
import makePostRequest from '../../api/makePostRequest'
import makePutRequest from '../../api/makePutRequest'
import { getErrorMsg, getFirstErrorMessage, } from '../functions/commonFunctions'

const useFormUtils = ({
  endPoint = '',
  method = 'post',
  successToastMsg = 'Saved Successfully',
  customOnSuccess,
  onSuccessRouteTo,
  useFormDefaultValue = null,
  showSuccessToastMsg = true,
  customOnError,
  updateEndPoint = '',
  mode = undefined,
  onlyErrorHandler,
}: {
  endPoint: string
  successToastMsg?: string
  customOnSuccess?: any
  onSuccessRouteTo?: any
  method?: string
  useFormDefaultValue?: any
  customOnError?: any
  isCreateAgentPhoneNumberError?: any
  showSuccessToastMsg?: any
  updateEndPoint?: string
  onlyErrorHandler?: any
  mode?: 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all' | undefined
}) => {
  const router = useNavigate()
  const formUtils = useForm({
    defaultValues: useFormDefaultValue,
    mode: mode,
  })

  const {
    register,
    control,
    formState: { errors, isDirty, dirtyFields, isValidating, isSubmitting },
    handleSubmit,
    setValue,
    watch,
    getValues,
    trigger,
    setError,
    setFocus,
    reset,
  } = formUtils

  const apiMethod = (md: string, endPoint: string, body: any) => {
    if (md == 'patch') return makePatchRequest(endPoint, body)
    if (md == 'delete') return makeDeleteRequest(endPoint)
    if (md == 'post') return makePostRequest(endPoint, body)
    if (md == 'put') return makePutRequest(endPoint, body)
    return makePostRequest(endPoint, body)
  }

  const { isLoading, mutate, error } = useMutation(
    (body) => apiMethod(method, endPoint, body),
    {
      onSuccess: (data) => {
        if (!showSuccessToastMsg) {
          customOnSuccess
            ? customOnSuccess(data)
            : toast.success(successToastMsg)
        } else {
          toast.success(successToastMsg)
          customOnSuccess && customOnSuccess()
        }
        onSuccessRouteTo && router(onSuccessRouteTo)
      },
      onError: (err: any) => {
        if (onlyErrorHandler) onlyErrorHandler(err)
        else {
          customOnError && customOnError(err?.response?.data?.data)
          const errMsg = getFirstErrorMessage(err?.response?.data?.data)
          toast.error(getErrorMsg(errMsg) || '')

          console.error(err)
        }
      },
    }
  )

  const {
    isLoading: updateIsLoading,
    mutate: updateMutate,
    error: updateError,
  } = useMutation((body) => apiMethod('put', updateEndPoint, body), {
    onSuccess: () => {
      toast.success(successToastMsg)
      customOnSuccess && customOnSuccess()
      onSuccessRouteTo && router.push(onSuccessRouteTo)
    },
    onError: (err: any) => {
      customOnError && customOnError(err?.response?.data?.data)
      const errMsg = getFirstErrorMessage(err?.response?.data?.data)

      toast.error(errMsg || '')
    },
  })

  const handleMutateSubmit = (val: any) => {
    mutate(val)
  }

  const handleMutateUpdateSubmit = (val: any) => {
    updateMutate(val)
  }

  return {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    isLoading,
    handleMutateSubmit,
    getValues,
    trigger,
    error,
    setError,
    setFocus,
    isDirty,
    dirtyFields,
    reset,
    isValidating,
    isSubmitting,
    handleMutateUpdateSubmit,
    updateIsLoading,
    updateError,
    formUtils,
  }
}

export default useFormUtils
