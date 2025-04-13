import { CircularProgress } from "@chakra-ui/react";

const AppProgressCircle = ({ value }: { value: number }) => {
  return (
    <CircularProgress
      value={value}
      size="30px"
      color="green"
    />
  );
};

export default AppProgressCircle;
