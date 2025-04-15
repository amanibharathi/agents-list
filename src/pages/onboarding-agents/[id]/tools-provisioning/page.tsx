
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import CustomContendHeader from '../components/custom-content-header'
import { Text, Tooltip } from '@chakra-ui/react'
import { GET_TOOL_LIST } from '../../../../api-utils'
import LoaderLayout from '../../../Auth/AgentComponents/table/LoaderLayout'
import makeGetRequest from '../../../../api/makeGetRequest'
import AdminFormWrapper from '../../../../login/adminlogin/AdminFormWrapper'
import AppText from '../../../../AppComponents/AppText-agent'

const ContentCard = ({ each }: any) => {
  return (
    <div
      className={`max-w-[350px] shadow-[8px_16px_56px_0px_#0000000A] flex flex-col p-6 gap-[10px] rounded-[8px] border  border-[#F0F0F0] cursor-pointer hover:bg-[#E9F1FF]`}
    >
      {/* <div className="flex justify-between items-center">
        <div className="w-[80px] h-[40px] relative">
          <AppImage
            alt=""
            src={each?.logo?.image}
            sizes="100%"
            fill
            className="object-contain object-left"
          />
        </div>
      </div> */}
      <AppText type="span" className="text-[14px] font-semibold">
        {each?.identity}{' '}
        {each?.is_default && each?.is_mandatory ? (
          <AppText type="span" className="text-[12px] !text-[#6D6D6D]">
            {` (Included)`}
          </AppText>
        ) : each?.is_default ? (
          <AppText type="span" className="text-[12px] !text-[#6D6D6D]">
            {` (Optional)`}
          </AppText>
        ) : (
          ''
        )}
      </AppText>
      <Tooltip
        label={each?.description}
        placement="top"
        bg={'white'}
        textColor={'#6D6D6D'}
        hasArrow
        padding={'10px'}
        fontSize={'14px'}
      >
        <Text className="text-[12px] !text-[#6D6D6D] three-lines">
          {each?.description}
        </Text>
      </Tooltip>
      <div className="flex justify-end">
        <AppText type="span" className="text-[14px] font-semibold">
          ${each?.price !== 0 ? `${each?.price}/year` : each?.price}
        </AppText>
      </div>
    </div>
  )
}

export default function ToolsProvision() {
  const { id } = useParams()
  const { data, isLoading } = useQuery([GET_TOOL_LIST(id)], () =>
    makeGetRequest(GET_TOOL_LIST(id))
  )
  const toolList = data?.data?.results ?? []
  return (
    <div>
      <div className="my-10">
        <CustomContendHeader heading={'Tools & Provision'} />
      </div>
      <AdminFormWrapper titleClassName="mb-[39px] mt-[-4px]" title={'Tools'}>
        <LoaderLayout isLoading={isLoading} height="30vh">
          {toolList.length !== 0 ? (
            <div className="grid grid-cols-3 gap-[24px]">
              {toolList?.map((each: any, index: any) => {
                return <ContentCard each={each} key={index} />
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <AppText className="text-[24px] font-bold">No Data</AppText>
            </div>
          )}
        </LoaderLayout>
      </AdminFormWrapper>
    </div>
  )
}
