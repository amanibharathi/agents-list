import { Link, LinkProps } from "react-router-dom";

const AppLink: React.FC<LinkProps> = ({ children, ...rest }) => {
  return <Link {...rest}>{children}</Link>;
};

export default AppLink;
