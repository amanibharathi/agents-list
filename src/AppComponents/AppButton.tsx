import { Button, ButtonProps } from "@chakra-ui/react";

const AppButton: React.FC<ButtonProps> = ({ children, isLoading = false, ...props }) => {
  return (
    <Button isLoading={isLoading} {...props}>
      {children}
    </Button>
  );
};

export default AppButton;
