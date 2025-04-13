//@ts-nocheck
import { Select } from 'chakra-react-select'
import { Controller } from 'react-hook-form'
import { FormControl, FormErrorMessage } from '@chakra-ui/react'
import { splitByDotgetOne } from '../../../../utils/functions/commonFunctions'
import React from 'react'

const CkSelect = ({
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
  // defaultValue,
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
  zIndex = true,
  menuMaxHeight = false,
  isClearable = true,
  selectPrefixClassName = '',
  ...restProps
}) => {
  const getValue = (val: any) => {
    if (value?.id || value?.label || value?.identity) return value
    else if (val) return val
    else return null
  }
  const getOptions = () => {
    if (dontAlterOptions) return options
    if (foreignKey) {
      const customOptions = options
        ?.filter((f) => {
          return splitByDotgetOne(foreignKey, f) == watch(foreignKey)?.value
        })
        ?.map((m) => ({
          label: m?.identity || m?.name,
          value: m?.id,
          ...m,
        }))
      return customOptions
    }
    return options?.map((m) => ({
      label: m?.identity || m?.name || m?.full_name,
      value: m?.id,
      ...m,
    }))

    // return options
  }
  if (control) {
    return (
      <Controller
        name={name}
        control={control}
        {...restProps}
        render={({ field: { value: _val, onChange } }) => (
          <FormControl className="" isInvalid={isError}>
            <Select
              chakraStyles={{
                dropdownIndicator: (base) => ({
                  ...base,
                  background: 'white',
                }),
                clearIndicator: (provided) => ({
                  ...provided,
                  fontSize: '9px',
                }),
                menuList: (provided) => ({
                  ...provided,
                  maxHeight: menuMaxHeight
                    ? menuMaxHeight
                    : provided?.maxHeight, // Same here to control the height
                  overflowY: 'auto',
                }),
              }}
              defaultValue={getValue(_val)}
              isRequired={isRequired}
              // {...field}
              name={name}
              {...restProps}
              // otherProps={otherProps}
              options={getOptions()}
              isMulti={isMulti}
              placeholder={placeholder ?? 'Select'}
              className={`${zIndex ? 'z-[9]' : ''} outline-none ${className}`}
              // required={isRequired}
              // chakraStyles={reactSelectStyles}
              onChange={onChange}
              isDisabled={readOnly || isReadOnly}
              onInputChange={onInputChange}
              onFocus={onFocus}
              errorBorderColor="red"
              isLoading={isLoading}
              isReadOnly={readOnly || isReadOnly}
              isClearable={isClearable}
              value={getValue(_val)}
              classNamePrefix={selectPrefixClassName}
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
  }

  return (
    <Select
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
      classNamePrefix={selectPrefixClassName}
    />
  )
}

export default CkSelect
