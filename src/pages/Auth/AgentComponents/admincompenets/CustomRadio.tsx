
import {
  FormControl,
  Radio,
  RadioGroup,
  Stack,
  FormErrorMessage,
} from '@chakra-ui/react'

export default function CustomRadio({
  errors,
  defaultValue,
  options = [],
  register,
  readOnly = false,
}: any) {
  const formMessage = 'select a Value'
  return (
    <FormControl isInvalid={errors} isReadOnly={readOnly}>
      {/* <FormLabel>Choose an option</FormLabel> */}
      <RadioGroup defaultValue={defaultValue}>
        <Stack direction="row" gap={'32px'}>
          {options?.map((each: any, index: any) => (
            <Radio {...register} key={index} value={each?.id}>
              {each?.label || each?.identity}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      <FormErrorMessage>{errors?.message || formMessage}</FormErrorMessage>
    </FormControl>
  )
}
