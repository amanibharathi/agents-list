
import AdminInputRenderer from './AdminInputRenderer'

const NewAdminInputRenderer = ({
  register,
  control,
  errors,
  boxWrapperClassName = 'grid grid-cols-1 gap-[28px]',
  inputObj,
  inputWrapperClassName = '',
  labelClassName = '',
  className = '',
  selectPrefixClassName = '',
}: {
  register: any
  control: any
  errors: any
  boxWrapperClassName?: string
  labelClassName?: string
  className?: string
  inputObj: any[]
  inputWrapperClassName?: string
  selectPrefixClassName?: string
}) => {
  const rendererComp = ({ i }: { i: any }) => (
    <AdminInputRenderer
      className={`w-full max-w-[100%] ${className}`}
      wrapperClassName={`flex gap-[20px] text-[14px] ${i?.inputWrapperClassName || inputWrapperClassName}`}
      labelClassName={labelClassName}
      inputObj={i}
      key={i?.name}
      register={register}
      control={control}
      errors={errors}
      selectPrefixClassName={selectPrefixClassName}
    />
  )

  return (
    <div className={`${boxWrapperClassName}`}>
      {inputObj?.map((m) => (
        <div key={m?.key} className={`${m?.thisWrapperClassName}`}>
          {m?.render?.map((i: any) => rendererComp({ i }))}
        </div>
      ))}
    </div>
  )
}

export default NewAdminInputRenderer
