import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react'
import React from 'react'
import AppText from '../../../../AppComponents/AppText-agent'


interface AppModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  maxWidth?: string
  bodyClassName?: string
  className?: string
  dismissible?: boolean
  closeButton?: boolean
  header?: string
  headerClassName?: string
  size?: ModalProps['size']
  description?: string
  closeOnOverlayClick?: boolean
  isCentered?: boolean
  descriptionClassName?: string
}

const CkAppModal: React.FC<AppModalProps> = ({
  isOpen,
  onClose,
  children,
  header,
  className = '',
  bodyClassName = '',
  headerClassName = '',
  //   maxWidth = '1320px',
  //   bodyClassName = '',
  //   dismissible = true,
  closeButton = false,
  size,
  description,
  isCentered = undefined,
  descriptionClassName = '',
}) => {
  const modalSizeProp = size
    ? {
        size: size,
      }
    : {}
  return (
    //TODO
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      {...modalSizeProp}
      closeOnOverlayClick={closeButton}
      isCentered={isCentered}
    >
      <ModalOverlay />
      <ModalContent className={className}>
        {header ? (
          <ModalHeader className={headerClassName}>
            {header}
            {description && (
              <AppText
                className={`${descriptionClassName} text-[18px] font-normal text-[#808080]`}
                text={description}
              />
            )}
          </ModalHeader>
        ) : null}
        {closeButton ? <ModalCloseButton /> : null}
        <ModalBody className={bodyClassName}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CkAppModal
