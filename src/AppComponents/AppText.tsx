import { Text, TextProps } from "@chakra-ui/react";

const AppText: React.FC<TextProps> = ({ children, ...props }) => {
  return <Text {...props}>{children}</Text>;
};

export default AppText;
