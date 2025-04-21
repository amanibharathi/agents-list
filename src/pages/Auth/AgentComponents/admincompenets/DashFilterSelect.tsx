// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { Select, components } from 'chakra-react-select'
import { Controller } from 'react-hook-form'
import { Flex, FormControl, FormErrorMessage } from '@chakra-ui/react'
import AppText from '../../../../AppComponents/AppText-agent'
//import AppText from '../elements/AppText'
// import { splitByDotgetOne } from '../../utils/Constants'

const DashFilterSelect = ({
  options = [],
  value,
  size,
  placeholder,
  control,
  name,
  isError = false,
  onChange,
  onInputChange,
  onFocus,
  defaultValue,
  isMulti = false,
  className,
  isRequired = false,
  formMessage = 'Select a value',
  isLoading = false,
  dontAlterOptions = false,
  foreignKey,
  watch,
  readOnly = false,
  isReadOnly = false,
  filterLabel,
  isAdminFilter = false,
  selectIcon,
  ...restProps
}) => {
  const getOptions = () => {
    if (dontAlterOptions) return options
    if (foreignKey) {
      const customOptions = options
        ?.filter((f) => {
          return splitByDotgetOne(foreignKey, f) == watch(foreignKey)?.value
        })
        ?.map((m) => ({
          label: m?.identity || m?.pincode,
          value: m?.id,
          ...m,
        }))
      return customOptions
    }
    return options?.map((m) => ({ label: m?.identity, value: m?.id, ...m }))
  }

  const getFilter = () => {
    if (control) {
      return (
        <Controller
          name={name}
          control={control}
          {...restProps}
          render={({ field }) => (
            <FormControl className="w-fit" isInvalid={isError}>
              <Select
                components={{ ValueContainer: ValueContainer }}
                classNamePrefix={isAdminFilter ? 'admin-select' : 'dash-select'}
                defaultValue={defaultValue}
                isRequired={isRequired}
                {...field}
                name={name}
                {...restProps}
                // otherProps={otherProps}
                options={getOptions()}
                isMulti={isMulti}
                placeholder={''}
                className={`max-w-431 ${className}`}
                // required={isRequired}
                // chakraStyles={reactSelectStyles}
                //{ onChange={onChange}}
                onInputChange={onInputChange}
                onFocus={onFocus}
                errorBorderColor="red"
                isLoading={isLoading}
                isReadOnly={readOnly || isReadOnly}
              />
              {formMessage && (
                <FormErrorMessage mt={'1px'} fontSize={'11px'} pos={'absolute'}>
                  {formMessage}
                </FormErrorMessage>
              )}
            </FormControl>
          )}
        />
      )
    } else {
      return(
        <Select
          classNamePrefix={isAdminFilter ? 'admin-select' : 'dash-select'}
          isReadOnly={readOnly}
          onChange={onChange}
          options={getOptions()}
          isMulti={isMulti}
          placeholder={placeholder ?? 'select'}
          // chakraStyles={reactSelectStyles}
          value={value}
          onInputChange={onInputChange}
          size={size}
          isLoading={isLoading}
        />
      )
    }
  }

  const ValueContainer = ({
    children,
    ...props
  }: ValueContainerProps<ColourOption>) => {
    const selVal = props?.selectProps?.value

    return (
      <components.ValueContainer {...props}>
        <div className="flex gap-[3px] cursor-pointer items-center overflow-visible !text-[#000000]">
          {selectIcon ? <Flex px="0px">{selectIcon}</Flex> : null}
          <AppText
            className="capitalize whitespace-nowrap text-[13px] !text-[#000000]"
            text={filterLabel?.replaceAll('_', '') + (selVal ? ':' : '')}
          />
          {/* {selVal ? (
            <AppText className="capitalize" text={selVal?.label} />
          ) : null} */}
          {children}
          {/* {selVal ? <>{children}</> : <></>} */}
        </div>
      </components.ValueContainer>
    )
  }

  return <>{getFilter()}</>
}

export default DashFilterSelect
