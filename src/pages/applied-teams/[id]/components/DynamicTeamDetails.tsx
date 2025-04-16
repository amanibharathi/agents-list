'use client'
import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { UseFormRegister, Control } from 'react-hook-form'
import AppText from '../../../../AppComponents/AppText-agent'
import AdminInputRenderer from '../../../Auth/AgentComponents/admincompenets/AdminInputRenderer'
import { DocumentFile } from '../../../Auth/AgentComponents/admincompenets/DocumentFile'
import { downloadFile } from '../../../../utils/functions/commonFunctions'
import { DownloadGreen } from '../../../Auth/AgentComponents/admincompenets/DownloadGreen'
import { convertDateFormat } from './dateAndTime'
// import AdminInputRenderer from '@/app/admin/_AdminComponent/AdminInputRenderer'
// import AppText from '@/app/components/elements/AppText'
// import { DownloadGreen } from '@/app/icons/DownloadGreen'
// import { convertDateFormat } from '@/app/utils/constants/dateAndTime'
// import { DocumentFile } from '@/app/icons/DocumentFile'
// import { downloadFile } from '@/app/utils/functions/otherFunctions'

interface DynamicTeamDetailsProps {
  teamInfoInputObj?: any;
  register?: UseFormRegister<any>;
  control?: Control<any>;
  errors?: any;
  title: string;
  isDocument?: boolean;
  documents?: any;
}

const DynamicTeamDetails: React.FC<DynamicTeamDetailsProps> = ({
  teamInfoInputObj,
  register,
  control,
  errors,
  title,
  isDocument = false,
  documents,
}) => {
  return (
    <Box className="flex flex-col gap-[40px]">
      <AppText className="text-[24px] font-bold !text-[#10295A]">
        {title}
      </AppText>
      <Box className=" border border-[#61687640] p-[40px]">
        <Box className="grid grid-cols-2 gap-[28px] max-w-[850px]">
          {teamInfoInputObj?.map((input: any, index: any) => (
            <Box key={index}>
              <AdminInputRenderer
                labelClassName="!text-[#444444] !text-[16px]"
                register={register}
                control={control}
                errors={errors}
                //@ts-expect-error ignore
                inputObj={input}
              />
            </Box>
          ))}
        </Box>
        {isDocument && documents ? (
          <Flex gap={"10px"} flexDirection={"column"} w={"70%"}>
            {documents?.map((each: any) => (
              <div
                key={each?.id}
                className="flex p-[15px] justify-between items-center h-[64px] border-[1px] border-[#F0F0F0] rounded-[8px]"
              >
                <Flex gap={"10px"}>
                  <DocumentFile />
                  <a
                    className="text-[#10295A]"
                    target="_blank"
                    href={each?.document?.file}
                  >
                    {`${each?.document?.file_name} - ${convertDateFormat(
                      each?.created
                    )}`}
                  </a>
                </Flex>
                <Flex gap={"10px"}>
                  <Box
                    className="cursor-pointer"
                    onClick={() =>
                      downloadFile(
                        each?.document?.file,
                        each?.document?.file_name
                      )
                    }
                  >
                    <DownloadGreen />
                  </Box>
                </Flex>
              </div>
            ))}
          </Flex>
        ) : null}
      </Box>
    </Box>
  );
};

export default DynamicTeamDetails;
