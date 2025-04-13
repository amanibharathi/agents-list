import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SystemStyleObject,
  Text,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface AppModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  header?: string;
  size?: string;
  className?: string;
  desc?: string;
  modelContentSX?: SystemStyleObject | undefined;
  headerSX?: SystemStyleObject | undefined;
  bodySX?: SystemStyleObject | undefined;
}

const AppModal: React.FC<AppModalProps> = ({
  isOpen,
  onClose,
  children,
  header,
  size,
  className,
  desc,
  modelContentSX,
  headerSX,
  bodySX,
}) => {
  return (
    <Modal
      size={size}
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={true}
      isCentered
    >
      <ModalOverlay />
      <ModalContent
        className={className}
        borderRadius="12px"
        padding="40px"
        sx={{ ...modelContentSX }}
      >
        <ModalHeader
          fontSize="25px"
          fontWeight="600"
          padding="0"
          sx={{ ...headerSX }}
          className="figtree-font"
        >
          {header}
          {desc && (
            <Text fontSize={"10px"} mt={"5px"}>
              {desc}
            </Text>
          )}
        </ModalHeader>
        {/* <ModalCloseButton /> */}
        <ModalBody padding="0" overflowY="auto" sx={{ ...bodySX }}>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AppModal;
