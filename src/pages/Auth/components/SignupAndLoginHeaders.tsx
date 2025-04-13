import { Flex } from "@chakra-ui/react";
import AppText from "../../../AppComponents/AppText";

const SignupAndLoginHeaders = ({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) => {
  return (
    <Flex flexDirection="column" gap="12px">
      <AppText
        sx={{ fontWeight: 700, fontSize: "31px" }}
        className="figtree-font"
      >
        {title}
      </AppText>
      <AppText color="#535862">{desc}</AppText>
    </Flex>
  );
};

export default SignupAndLoginHeaders;
