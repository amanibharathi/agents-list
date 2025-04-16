import { Box, Flex } from "@chakra-ui/react";
import AppLink from "../AppComponents/AppLink";
import AppText from "../AppComponents/AppText-agent";
import AppImage from "../AppComponents/AppImage";

const DashboardCard = ({
  title = "",
  desc = "",
  icon,
  value = "-",
  link = "#",
  wrapperClassName = "",
  titleClassName = "",
  descClassName = "",
  boxClassName = "",
  innerClassName = "",
}: {
  title: string;
  desc?: string;
  icon: any;
  value: string;
  link?: string;
  wrapperClassName?: string;
  titleClassName?: string;
  descClassName?: string;
  boxClassName?: string;
  innerClassName?: string;
}) => {
  return (
    <AppLink
      to={link}
      className={`px-[20px] pt-[20px] pb-[33px] rounded-[6px] w-[100%] max-w-[325px] bg-white shadow-[0px_0px_4px_0px_#00000040] ${wrapperClassName}`}
    >
      <Flex justifyContent={"space-between"}>
        <Flex gap={"5px"} className={innerClassName}>
          <AppText
            className={`text-[20px] font-[500] whitespace-nowrap ${titleClassName}`}
            text={title}
          />
          <AppText
            className={`text-[10px] font-400] mt-[10px] whitespace-nowrap ${descClassName}`}
            text={desc}
          />
        </Flex>
        <Box w={"40px"} h={"40px"} className={boxClassName}>
          <AppImage alt="dashoard-card-icons" src={icon} />
        </Box>
      </Flex>
      <Box mt={"12px"}>
        <AppText text={value} className="font-[500] text-[34px]" />
      </Box>
    </AppLink>
  );
};

export default DashboardCard;
