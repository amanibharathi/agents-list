//@ts-nocheck

import {
  Box,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react'
import React, { forwardRef, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

// eslint-disable-next-line react/display-name
const CkInput = forwardRef(
  (
    {
      fitContent,
      readonly = false,
      name,
      value,
      defaultValue,
      onChange,
      onKeyDown,
      // onWheel,
      type,
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
      isPassword = false,
      prefix,
      suffix,
      prefixClassName,
      suffixClassName,
      wrapperClassName,
      customPrefix,
      customprefixClassName,
      inputControlClassName = '',
      // avoidCopyAndPaste = false,
      errorClassName = '',
      ...restProps
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(true)
    const handlePasswordToggle = () => setShowPassword(!showPassword)

    // const avoidPaste = (event) => {
    //   event.preventDefault() // Prevent pasting
    // }

    // const avoidCut = (event) => {
    //   event.preventDefault() // Prevent cutting
    // }

    // const avoidCopyAndPasteRelatedProps = {
    //   ...(isPassword && { onPaste: avoidPaste, onCut: avoidCut }), // Spread paste and cut events if it's a password field
    // }

    return (
      <FormControl
        width={fitContent ? 'fit-content !important' : ''}
        className={`app-input relative ${formControlClassName}`}
        isInvalid={isError}
      >
        <InputGroup
          className={`!z-[1] ${wrapperClassName} ${inputControlClassName}`}
        >
          {prefix ? (
            <InputLeftAddon className={`${prefixClassName}`} height={'auto'}>
              {prefix}
            </InputLeftAddon>
          ) : null}
          {customPrefix ? (
            <Box className={`${customprefixClassName}`} height={'auto'}>
              {customPrefix}
            </Box>
          ) : null}
          <Input
            onWheel={(e) => e.target.blur()}
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
            onKeyDown={onKeyDown}
            // onWheel={onWheel}
            type={isPassword ? (showPassword ? 'password' : 'show') : type}
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
            // {...(avoidCopyAndPaste || isPassword
            //   ? avoidCopyAndPasteRelatedProps
            //   : {})}
          />
          {suffix ? (
            <Box className={`${suffixClassName}`} height={'auto'}>
              {suffix}
            </Box>
          ) : null}
        </InputGroup>

        {isPassword && (
          <div
            onClick={handlePasswordToggle}
            className="absolute right-[13px] top-[50%] translate-y-[-50%] z-[5] cursor-pointer"
          >
            {showPassword ? (
              <FaRegEye color="#86888A" />
            ) : (
              <FaRegEyeSlash color="#86888A" />
            )}
          </div>
        )}
        {formMessage && (
          <FormErrorMessage
            mt={'1px'}
            fontSize={'11px'}
            pos={'absolute'}
            className={errorClassName}
          >
            {isError?.message || formMessage}
          </FormErrorMessage>
        )}
      </FormControl>
    )
  }
)

export default CkInput
