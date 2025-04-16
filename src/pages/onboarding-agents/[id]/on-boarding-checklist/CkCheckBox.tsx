import { ReactNode } from "react";
import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
interface CkCheckBoxInterface {
  checkBoxData: ReactNode[] | string[];
  wrapperClass?: string;
  checkBoxWrapperClass?: string;
  onClickHandler?: any;
  selectedList?: any;
}

export default function CkCheckBox({
  checkBoxData = [],
  wrapperClass = "",
  checkBoxWrapperClass = "",
  onClickHandler,
}: CkCheckBoxInterface) {
  return (
    <CheckboxGroup>
      <Stack spacing={5}>
        {checkBoxData.map((each, index) => (
          <div className={`${wrapperClass}`} key={index}>
            <Checkbox
              //@ts-expect-error ignore
              isChecked={each?.props?.boxData?.checked}
              onChange={(e) => {
                onClickHandler(e?.target?.checked, each);
              }}
              size={"lg"}
              className={`${checkBoxWrapperClass}`}
            >
              {each}
            </Checkbox>
          </div>
        ))}
      </Stack>
    </CheckboxGroup>
  );
}
