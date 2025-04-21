// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { Flex } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import AppLink from "../AppComponents/AppLink";
import AppText from "../AppComponents/AppText-agent";
import { GoDotFill, GoTriangleUp } from "react-icons/go";
// import UserAuthMenuContainer from "./UserAuthMenuContainer";
export interface INavbarData {
  text: string;
  link: string;
  isPing?: boolean;
  count?: number | string;
  onClick?: () => void;
  base?: string;
}

const DarkBlueSubNav = ({ navBarData }: { navBarData: INavbarData[] }) => {
  const location = useLocation();
  const pathName = location?.pathname;

  return (
    <div className="bg-[#10295A]">
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={"26px"}
        className="2xl:max-w-[1280px] xl:max-w-[1180px] container mx-auto"
      >
        <div className="flex overflow-x-scroll blue-nav-scroll-container overflow-y-hidden">
          {navBarData?.map((m) => {
            const isCurrentPage =
              pathName?.includes(m?.link) ||
              (m?.base && pathName?.includes(m?.base));
            return (
              <div
                key={m?.link}
                className="md:py-[15px] py-[10px] md:px-[20px] px-[15px] relative"
              >
                <AppLink
                  className={`flex items-center gap-[10px] ${
                    isCurrentPage ? "text-white" : "text-[#AEAEAE]"
                  }`}
                  href={m?.link}
                >
                  <AppText
                    className={`whitespace-nowrap capitalize text-[14px] hover:text-white text-[600] ${
                      isCurrentPage ? "text-white" : "text-[#AEAEAE]"
                    }`}
                    text={m?.text}
                  />
                  {m?.isPing ? (
                    <GoDotFill style={{ color: "#F90505" }} />
                  ) : null}
                </AppLink>
                {isCurrentPage ? (
                  <GoTriangleUp className="absolute bottom-[-18%] left-[50%] translate-x-[-50%] text-[#FAF9F8] text-[25px]" />
                ) : null}
              </div>
            );
          })}
        </div>
        {/* {getMenuBasedOnRole ? (
          <UserAuthMenuContainer
            isWhiteBg={false}
            getMenuBasedOnRole={getMenuBasedOnRole}
            isDarkNav={true}
          />
        ) : null} */}
      </Flex>
    </div>
  );
};

export default DarkBlueSubNav;
