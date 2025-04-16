
// import AdminInputRenderer from '@/app/admin/_AdminComponent/AdminInputRenderer'
import { Avatar, Box, Flex } from '@chakra-ui/react'
import AdminInputRenderer from '../../../login/adminlogin/AdminInputRenderer'
import AppLoader from '../../Auth/AgentComponents/admincompenets/AppLoader'
import AppButton from '../../../AppComponents/AppButton-agent'
import AdminFileUpload from '../../Auth/AgentComponents/fileupload/AdminFileUpload'
import ButtonPair from '../../Auth/AgentComponents/admincompenets/ButtonPair'
import { ADMIN_TOOLS_IMAGE_UPLOAD } from '../../../api-utils'

export default function CreateCommonModal({
  onClose,
  inputFields,
  formUtil,
  handleSubmit,
  isTools,
  image,
  setImage,
}: {
  onClose: any
  inputFields: any
  formUtil: any
  handleSubmit: any
  isTools?: any
  image?: any
  setImage?: any
}) {
  const inputObj = {
    label: '',
    name: '',
    type: '',
    imageState: undefined,
    setImageState: function (res: any): void {
      setImage(res?.[0])
    },
    uploadKey: '',
    fileTypes: ['jpg', 'jpeg', 'png'],
    placeholder: '',
    fileTypeKey: '',
  }
  const customUiBodyComp = (isLoading: boolean) => (
    <Flex
      maxWidth={'300px'}
      className="md:mt-[15px]"
      alignItems={'center'}
      flexFlow={'column'}
    >
      {isLoading ? (
        <AppLoader />
      ) : (
        <>
          <AppButton label="Upload Tool Image" variant="outline" />
        </>
      )}
    </Flex>
  )
  return (
    <div className="">
      <form onSubmit={formUtil.handleSubmit(handleSubmit)}>
        <Box className="grid grid-cols-1 gap-[28px] basis-[70%]">
          {isTools && (
            <div className={`flex flex-col gap-[20px]`}>
              <label
                className={`flex items-center gap-[10px] text-[18px] font-[600]`}
              >
                Tool Image
              </label>
              <Flex gap={'53px'} className="max-h-[80px]">
                <Avatar
                  className="rounded-full h-[140px] w-[140px]"
                  src={
                    //@ts-ignore
                    image?.image ?? '/assets/profile-picture.png'
                  }
                  height={'80px'}
                  width={'80px'}
                />
                <AdminFileUpload
                  imageState={inputObj?.imageState}
                  setImageState={inputObj?.setImageState}
                  uploadKey={inputObj?.uploadKey}
                  fileTypeKey={inputObj?.fileTypeKey}
                  fileTypes={inputObj?.fileTypes}
                  name={inputObj?.name}
                  //@ts-ignore
                  customUiBody={customUiBodyComp}
                  customEndPoint={ADMIN_TOOLS_IMAGE_UPLOAD}
                  isToolsImage
                  // customUploadUiList={customUploadUiList}
                  // isError={false}
                  // onSuccess={onSuccess}
                />
              </Flex>
            </div>
          )}
          {inputFields?.map((i: any) => (
            <AdminInputRenderer
              className="w-full max-w-[100%] agent-modal-select"
              wrapperClassName="flex gap-[20px] text-[14px]"
              labelClassName="!text-[14px]"
              inputObj={i}
              key={i?.name}
              register={formUtil?.register}
              control={formUtil?.control}
              errors={formUtil?.formState?.errors?.data}
              watch={formUtil.watch}
            />
          ))}
        </Box>
        <Flex mb={'28px'} justifyContent={'end'} mt={'40px'}>
          <ButtonPair
            primaryBtnText={'Submit'}
            secondaryBtnText={'Cancel'}
            onPrimaryClick={undefined}
            primaryBtnType={'submit'}
            onSecondaryClick={onClose}
            primaryBtnIsLoading={false}
          />
        </Flex>
      </form>
    </div>
  )
}
