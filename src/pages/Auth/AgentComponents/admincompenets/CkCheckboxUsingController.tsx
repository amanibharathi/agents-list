import { Checkbox, CheckboxGroup, Text } from '@chakra-ui/react'
import { Controller } from 'react-hook-form'

export const CkCheckboxUsingController = ({
  inputObj,
  name,
  control,
  value,
  className = '',
  isDisabled = false,
  readOnly = false,
}: {
  inputObj: any
  name: string
  control: any
  value?: any
  className?: string
  isDisabled?: any
  readOnly?: any
}) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <CheckboxGroup
            defaultValue={value}
            onChange={onChange}
            isDisabled={isDisabled}
          >
            <div className={`flex flex-col gap-[10px] ${className}`}>
              {//@ts-ignore
              inputObj?.options?.map((each: any) => {
                return (
                  <Checkbox key={each?.id} value={each?.id} readOnly={readOnly}>
                    <Text fontSize={'14px !important'}>{each?.identity}</Text>
                  </Checkbox>
                )
              })}
            </div>
          </CheckboxGroup>
        )}
      />
    </div>
  )
}
