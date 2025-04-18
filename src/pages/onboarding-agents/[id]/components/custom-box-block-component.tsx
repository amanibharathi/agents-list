// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { PortableText } from "@portabletext/react";
import AppText from "../../../../AppComponents/AppText-agent";

interface BoxDataInterface {
  boxData: {
    title: string;
    description: any;
    link?: string;
  };
}

const CustomBoxBlockComponent = ({ boxData }: BoxDataInterface) => {
  return (
    <div className="flex flex-col gap-[10px]">
      <AppText className="text-[16px] md:text-lg !text-black font-medium leading-4">
        {boxData.title}
      </AppText>
      <PortableText
        className="text-[14px] md:text-[16px] !text-[#858585]"
        //@ts-expect-error ignore
        value={boxData?.descrpition}
      />
    </div>
  );
};

export default CustomBoxBlockComponent;
