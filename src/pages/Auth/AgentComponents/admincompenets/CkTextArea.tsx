//@ts-nocheck

import { FormControl, FormErrorMessage, Textarea } from '@chakra-ui/react'
import React, { forwardRef } from 'react'

// eslint-disable-next-line react/display-name
const CkTextArea = forwardRef(
  (
    {
      fitContent,
      readonly = false,
      name,
      value,
      defaultValue,
      onChange,
      onWheel,
      type = 'text',
      customStyles,
      id,
      isRequired,
      isDisabled,
      variant,
      size,
      isInvalid,
      onKeyPress,
      accept,
      min,
      isError,
      formMessage = 'Enter a valid Value',
      placeholder = '',
      formControlClassName = '',
      onKeyDownCapture,
      ...restProps
    },
    ref
  ) => (
    <FormControl
      width={fitContent ? 'fit-content !important' : ''}
      className={`app-input ${formControlClassName}`}
      isInvalid={isError}
    >
      <Textarea
        bg={'white'}
        min={min}
        step={'any'}
        readOnly={readonly}
        id={id}
        ref={ref}
        placeholder={placeholder}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onWheel={onWheel}
        type={type}
        required={isRequired}
        variant={variant}
        isDisabled={isDisabled}
        size={size}
        isInvalid={isInvalid}
        errorBorderColor="red.300"
        {...customStyles}
        {...restProps}
        onKeyPress={onKeyPress}
        accept={accept}
        onKeyDownCapture={onKeyDownCapture}
      />
      {formMessage && (
        <FormErrorMessage mt={'1px'} fontSize={'11px'} pos={'absolute'}>
          {isError?.message || formMessage}
        </FormErrorMessage>
      )}
    </FormControl>
  )
)

export default CkTextArea
