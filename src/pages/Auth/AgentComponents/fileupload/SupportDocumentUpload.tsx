
import {
  Box,
  Flex,
  Spinner,
  Text,
  Avatar,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react'
import { FileUploader } from 'react-drag-drop-files'
import { IoClose } from 'react-icons/io5'

import { useMutation } from 'react-query'

import useUploadFiles from '../../../../utils/hooks/useUploadFiles'
import makeDeleteRequest from '../../../../api/makeDeleteRequest'
import { capitalize } from '../../../../utils/functions/commonFunctions'
import { DELETE_AGENT_SUPPORT_DOCUMENT } from '../../../../api-utils'

interface IAdminFileUpload {
  fileTypes?: string | string[]
  disabled?: boolean
  imageState: any[]
  handleRemoveImage?: any
  maxW?: string
  placeholder?: string
  fileTypeKey?: string
  uploadKey: string
  setImageState?: any
  handleUpload?: any
  isError?: any
  formMessage?: string
  name?: string
  index?: any
  customUiBody?: any
  customUploadUiList?: any
  customEndPoint?: any
  customType?: any
  setValue?: any
  inputObj?: any
}

const SupportDocumentUpload = ({
  fileTypes,
  disabled = false,
  maxW,
  placeholder = 'upload files',
  uploadKey,
  fileTypeKey = 'file',
  formMessage = 'This field cannot be empty',
  setImageState,
  name,
  inputObj,
  isError,
  customEndPoint,
}: IAdminFileUpload) => {
  const { fileMutate, fileIsLoading } = useUploadFiles({
    customEndPoint: customEndPoint,
    key: uploadKey,
    fileTypeKey: fileTypeKey,
    onSuccess(res) {
      setImageState(res)
    },
  })

  const { mutate: deleteMutate } = useMutation(
    (body: any) =>
      makeDeleteRequest(DELETE_AGENT_SUPPORT_DOCUMENT(body?.id), body),
    
      {onSuccess: (res) => {
        setImageState(res)
      },
      onError: (err) => {
        //@ts-ignore
        const errMsg = getFirstErrorMessage(err?.response?.data?.data)
        //@ts-ignore
        toast.error(errMsg)
      },
    }
  )

  const handleChangeInComponent = (file: any) => {
    const state = name?.split('_').pop()
    const formData = new FormData()
    formData.append('file', file)
    //@ts-ignore
    formData.append('state', state)
    // @ts-ignore
    fileMutate(formData)
  }

  const handleRemoveInComponent = (file: any) => {
    deleteMutate({ id: file?.id })
  }

  return (
    <Flex
      className="app-file-upload"
      w="100%"
      maxW={`${maxW} !important`}
      flexFlow={'column'}
    >
      <Box position={'relative'}>
        {disabled ? (
          <Box
            zIndex={9}
            pos={'absolute'}
            top={'0px'}
            bg={'white'}
            opacity={'30%'}
            left={'0px'}
            bottom={'0px'}
            width={'100%'}
          ></Box>
        ) : null}
        {!disabled ? (
          <FormControl isInvalid={isError}>
            <Flex
              className={`h-[60px] w-[100%] border-[1px] rounded-[8px] ${isError && inputObj?.value?.length < 1 ? 'border-red-500' : 'border-[#F0F0F0]'}  py-[5px] px-[16px] flex  justify-between items-center`}
            >
              <div className="flex flex-col justify-between">
                <Text className="text-[14px] leading-[24px] font-[600] text-[#010101]">
                  {`${capitalize(name?.split('_')[0])} Documents`}
                </Text>
              </div>
              {fileIsLoading ? (
                <Flex
                  justifyContent={'center'}
                  alignItems={'center'}
                  w={'80px'}
                  className="justify-self-end"
                >
                  <Spinner />
                </Flex>
              ) : (
                <FileUploader
                  disabled={disabled}
                  handleChange={handleChangeInComponent}
                  name={name || 'file'}
                  types={fileTypes}
                  label={placeholder}
                >
                  <div className="cursor-pointer flex gap-[12px] hover:scale-[1.05]">
                    <Avatar
                      className="rounded-[165px] h-[24px] w-[24px]"
                      src={'/assets/support-doc-icon.png'}
                      height={'24px'}
                      width={'24px'}
                    />

                    <Text className="text-[14px] leading-[24px] font-[600] text-[#1329E6]">
                      Choose a File
                    </Text>
                  </div>
                </FileUploader>
              )}
            </Flex>
            {inputObj?.value?.length < 1 && (
              <FormErrorMessage mt={'1px'} fontSize={'11px'} pos={'absolute'}>
                {formMessage}
              </FormErrorMessage>
            )}
          </FormControl>
        ) : //   <FileUploader
        //     disabled={disabled}
        //     // handleChange={handleChangeInComponent}
        //     name={name || 'file'}
        //     types={fileTypes}
        //     label={placeholder}
        //   >
        //     {customUiBody ? (
        //       customUiBody(false)
        //     ) : (
        //       <Flex
        //         flexFlow={'column'}
        //         p="25px"
        //         w={'100%'}
        //         flexWrap={'wrap'}
        //         border={isError ? '2px dashed #FC8181' : '1px dashed #D9D9D9'}
        //       >
        //         {false ? (
        //           <Flex
        //             justifyContent={'center'}
        //             alignItems={'center'}
        //             margin={'auto'}
        //             w={'150px'}
        //           >
        //             <Spinner />
        //           </Flex>
        //         ) : (
        //           <Flex
        //             gap={'15px'}
        //             justifyContent={'center'}
        //             alignItems={'center'}
        //             color={isError ? '#FC8181' : '#787878'}
        //           >
        //             <BiCloudUpload fontSize={'40px'} />
        //             <Text
        //               textAlign={'center'}
        //               fontSize={'16px'}
        //               fontWeight={500}
        //               textTransform={'capitalize'}
        //             >
        //               {placeholder}
        //             </Text>
        //           </Flex>
        //         )}
        //       </Flex>
        //     )}
        //     {isError && (
        //       <Text
        //         color={'#e53e3e'}
        //         mt={'1px'}
        //         fontSize={'11px'}
        //         pos={'absolute'}
        //       >
        //         {isError?.message || formMessage}
        //       </Text>
        //     )}
        //   </FileUploader>
        null}
      </Box>
      {!!inputObj?.value?.length && (
        <Flex mt={'10px'} flexWrap={'wrap'} gap={'10px'}>
          {!!inputObj?.value?.length &&
            inputObj?.value?.map((each: any) => (
              <div
                key={each?.id}
                className="flex p-[5px] justify-between items-center w-[30%] h-[64px] border-[1px] border-[#F0F0F0] rounded-[8px]"
              >
                <a
                  className="text-[#10295A] text-ellipsis overflow-hidden whitespace-nowrap w-[75%]"
                  target="_blank"
                  href={each?.file}
                >
                  {each?.file?.split('/')?.pop()}
                </a>
                <IoClose
                  className="cursor-pointer"
                  onClick={() => handleRemoveInComponent(each)}
                />
              </div>
            ))}
          <div></div>
        </Flex>
      )}
    </Flex>
  )
}

export default SupportDocumentUpload
