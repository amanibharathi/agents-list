import { ReactNode, useRef } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  //   Box,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useGetAgentLicenseAndMlsList } from "./useGetAgentLicenseAndMlsList";

interface IAccordionData {
  icon?: any;
  iconOnClick?: () => void;
  accordionItem: ReactNode | string;
  accordionPanel: ReactNode | string;
}

interface CustomFormAccordionInterface {
  accordionWrapperClass?: string;
  accordionItemClass?: string;
  accordionPanelClass?: string;
  accordionData?: IAccordionData[];
}

export default function CustomFormAccordion({
  accordionWrapperClass = "",
  accordionItemClass = "",
  accordionPanelClass = "",
  accordionData = [],
}: CustomFormAccordionInterface) {
  const { id } = useParams();
  const currentPanel = useRef("");
  const { refetchLicense, refetchMls } = useGetAgentLicenseAndMlsList(id);
  return (
    <Accordion
      allowToggle
      className={`flex flex-col gap-[20px] ${accordionWrapperClass}`}
      onChange={(index) => {
        if (index == 0 && currentPanel?.current == "Transfer License & Board") {
          refetchLicense();
          refetchMls();
        }
      }}
    >
      {accordionData.map((each, index) => {
        //@ts-expect-error ignore
        currentPanel.current = each?.accordionItem?.props?.title;
        return (
          <AccordionItem
            key={index}
            className={`overflow_unset !border !border-[#CDCDCD] rounded-[20px] bg-white ${accordionItemClass}`}
          >
            <div className="relative">
              <AccordionButton px={"40px"} py={"16px"} rounded={"20px"}>
                {each.accordionItem}
                {each?.icon ? (
                  <div
                    className="absolute  w-[50px] h-[50px] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#E6E7E9] mr-[100px] mt-[12px] top-0 right-0"
                    onClick={() => {
                      each?.iconOnClick && each?.iconOnClick();
                    }}
                  >
                    {each?.icon}
                  </div>
                ) : null}
                <AccordionIcon width={"40px"} height={"40px"} />
              </AccordionButton>
            </div>
            <AccordionPanel
              pb={4}
              className={`overflow-[unset] ${accordionPanelClass}`}
            >
              {each.accordionPanel}
            </AccordionPanel>
          </AccordionItem>
        );
      })}
      {/* <AccordionItem
        className={`!border !border-[#CDCDCD] rounded-[20px] p-[10px] ${accordionItemClass}`}
      >
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Section 1
            </Box>
            <AccordionIcon width={'40px'} height={'40px'} />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} className={`${accordionPanelClass}`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem> */}
    </Accordion>
  );
}
