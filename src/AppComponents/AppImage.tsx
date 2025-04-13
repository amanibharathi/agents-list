import { Image, ImageProps } from "@chakra-ui/react";

const AppImage: React.FC<ImageProps> = ({ children, ...props }) => {
  return <Image {...props}>{children}</Image>;
};

export default AppImage;
