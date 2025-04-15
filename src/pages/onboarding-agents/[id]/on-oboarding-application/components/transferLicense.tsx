
import { Image, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
// import makeGetRequest from '@/app/utils/api/makeGetRequest'
import { useMutation, useQuery } from 'react-query'
// import LoaderLayout from '@/app/components/layouts/loaderLayout/LoaderLayout'
import { useState } from 'react'
// import AppButton from '@/app/components/elements/AppButton'
// import makePostRequest from '@/app/utils/api/makePostRequest'
import toast from 'react-hot-toast'
import OnboardingLayout from './onboardingLayout'
// import AppText from '@/app/components/elements/AppText'
// import { getFirstErrorMessage } from '@/app/utils/functions/otherFunctions'
// import useGetAgentStatus from '@/app/hooks/admin/useGetAgentStatus'
import { GET_AGENT_STAGE_LICENSE_LIST, GET_AGENT_STAGE_MLS_LIST,
  POST_AGENT_MLS_LICENSE_STATUS_UPDATE, } from '../../../../../api-utils'
import makeGetRequest from '../../../../../api/makeGetRequest'
import LoaderLayout from '../../../../Auth/AgentComponents/table/LoaderLayout'
import AppButton from '../../../../../AppComponents/AppButton-agent'
import makePostRequest from '../../../../../api/makePostRequest'
import AppText from '../../../../../AppComponents/AppText-agent'
import { getFirstErrorMessage } from '../../../../../utils/functions/commonFunctions'
import useGetAgentStatus from '../../../../../utils/hooks/useGetAgentStatus'

export default function TransferLicense() {
  const [licenseData, setLicenseData] = useState<any[]>([])
  const [mlsData, setMlsData] = useState<any[]>([])
  const { id } = useParams()
  const [selectedId, setSelectedId] = useState('')
  const { refetch } = useGetAgentStatus(id)

  function isLicenseId(id: any) {
    return (
      selectedId?.split('_')[0] === 'license' &&
      parseInt(selectedId.split('_')[1]) === id
    )
  }
  function isMlsId(id: any) {
    return (
      selectedId?.split('_')[0] === 'mls' &&
      parseInt(selectedId.split('_')[1]) === id
    )
  }

  const { isLoading: licenseLoading, refetch: refetchLicense } = useQuery(
    [GET_AGENT_STAGE_LICENSE_LIST(id)],
    async () => makeGetRequest(GET_AGENT_STAGE_LICENSE_LIST(id)),
    {
      onSuccess: (res) => {
        setLicenseData(res?.data?.results)
      },
    }
  )

  const { isLoading: mlsLoading, refetch: refetchMls } = useQuery(
    [GET_AGENT_STAGE_MLS_LIST(id)],
    async () => makeGetRequest(GET_AGENT_STAGE_MLS_LIST(id)),
    {
      onSuccess: (res) => {
        setMlsData(res?.data?.results)
      },
    }
  )

  const { isLoading, mutate: submitMutate } = useMutation(
    (body) => makePostRequest(POST_AGENT_MLS_LICENSE_STATUS_UPDATE, body),
    {
      onSuccess: () => {
        toast.success('Transfer License & Board Updated Successfully')
        refetchLicense()
        refetchMls()
        refetch()
      },
      onError: (err) => {
        //@ts-ignore
        const errMsg = getFirstErrorMessage(err?.data)
        //@ts-ignore
        toast.error(errMsg)
      },
    }
  )

  const onClickHandler = (type: any, id: any) => {
    setSelectedId(type + '_' + id)

    const licenseId = type === 'license' ? [id] : []
    const mlsId = type === 'mls' ? [id] : []
    // @ts-ignore
    submitMutate({
      agent_license: licenseId,
      mls: mlsId,
      status: 'approved',
    })
  }

  return (
    <div className="">
      {licenseData?.length || mlsData?.length ? (
        <OnboardingLayout
          imageSrc={'/license-frame.png'}
          title={'Transfer License & Board'}
        >
          <div className="flex flex-col gap-[20px]">
            {/* Transfer License */}
            {licenseData?.length ? (
              <LoaderLayout isLoading={licenseLoading}>
                <div className="flex gap-[170px] mt-[57px] items-start">
                  <Text className="text-[18px] basis-1/3 leading-[22px] font-[400] text-[#808080] ">
                    Transfer License
                  </Text>

                  <div className="flex flex-col gap-[14px]">
                    {licenseData?.map((license: any) => (
                      <div
                        key={license?.id}
                        className="flex p-[20px] justify-between items-center w-[586px] h-[64px] border-[1px] border-[#F0F0F0] rounded-[8px]"
                      >
                        <div className="flex gap-[40px]">
                          <div className="flex">
                            <Image
                              className="w-[20px] h-[20px]"
                              alt=""
                              src="/location.png"
                            />
                            <Text className="ml-[5px] text-[14px] leading-[20px] font-[400] text-[#10295A]">
                              {license?.state?.identity}
                            </Text>
                          </div>
                          <Text className="text-[12px] leading-[24px] font-[400] text-[#000000]">
                            License ID: {license?.license_no}
                          </Text>
                        </div>
                        {/* {license?.status !== 'pending' && ( */}

                        {license?.status === 'approved' ? (
                          <AppText
                            type="span"
                            className={`font-semibold rounded-[80px] px-[10px] !text-[#2FB344] bg-[#2FB3441A]`}
                          >
                            Approved
                          </AppText>
                        ) : (
                          <AppButton
                            className="!rounded-[20px] text-[13px] font-[500] w-fit py-[8px] hover:text-white hover:bg-[#10295A]"
                            variant="outline"
                            onClick={() =>
                              onClickHandler('license', license?.id)
                            }
                            isLoading={
                              isLoading ? isLicenseId(license?.id) : false
                            }
                            // disabled={license?.status === 'pending'}
                          >
                            Approve
                          </AppButton>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </LoaderLayout>
            ) : null}

            {/* Transfer Board */}
            {mlsData?.length ? (
              <LoaderLayout isLoading={mlsLoading}>
                <div className="flex gap-[170px] mt-[20px] items-start">
                  {mlsData?.length && (
                    <Text className="text-[18px] basis-1/3 leading-[22px] font-[400] text-[#808080]">
                      Transfer Board
                    </Text>
                  )}

                  <div className="flex flex-col gap-[14px]">
                    {mlsData?.map((mls: any) => (
                      <div
                        key={mls?.id}
                        className="flex p-[20px] justify-between items-center w-[586px] h-[64px] border-[1px] border-[#F0F0F0] rounded-[8px]"
                      >
                        <div className="flex gap-[40px]">
                          <div className="flex">
                            <Image
                              className="w-[20px] h-[20px]"
                              alt=""
                              src="/board-admin.png"
                            />
                            <Text className="ml-[5px] text-[14px] leading-[20px] font-[400] text-[#10295A]">
                              {mls?.board?.identity} Board
                            </Text>
                          </div>
                          <Text className="text-[12px] leading-[24px] font-[400] text-[#000000]">
                            MLS ID: {mls?.mls_id}
                          </Text>
                        </div>
                        {/* mls?.status !== 'pending' && ( */}

                        {mls?.status === 'approved' ? (
                          <AppText
                            type="span"
                            className={`font-semibold rounded-[80px] px-[10px] !text-[#2FB344] bg-[#2FB3441A]`}
                          >
                            Approved
                          </AppText>
                        ) : (
                          <AppButton
                            className="!rounded-[20px] text-[13px] font-[500] w-fit py-[8px] hover:text-white hover:bg-[#10295A]"
                            variant="outline"
                            onClick={() => onClickHandler('mls', mls?.id)}
                            isLoading={isLoading && isMlsId(mls?.id)}
                            // disabled={mls?.status === 'pending'}
                          >
                            Approve
                          </AppButton>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </LoaderLayout>
            ) : null}
          </div>
        </OnboardingLayout>
      ) : (
        <div></div>
      )}
    </div>
  )
}
