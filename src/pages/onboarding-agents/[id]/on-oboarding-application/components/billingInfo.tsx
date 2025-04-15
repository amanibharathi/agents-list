
import { Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
// import { GET_ADMIN_AGENT_PAYMENT_DETAILS } from ''
// import makeGetRequest from '@/app/utils/api/makeGetRequest'
import { useQuery } from 'react-query'
// import LoaderLayout from '@/app/components/layouts/loaderLayout/LoaderLayout'
import OnboardingLayout from './onboardingLayout'
// import { getDateFormat } from '@/app/real-estate-agents/join/onboard/stage/utils/common'
//import { capitalizeFirstLetter } from '@/app/utils/constants/resourceSectionData'
// import AppNoData from '@/app/components/AppNoData'
import { GET_ADMIN_AGENT_PAYMENT_DETAILS } from '../../../../../api-utils'
import makeGetRequest from '../../../../../api/makeGetRequest'
import LoaderLayout from '../../../../Auth/AgentComponents/table/LoaderLayout'
import { getDateFormat } from '../../../../../utils/functions/commonFunctions'
import { capitalizeFirstLetter } from '../../../../Auth/AgentComponents/table/resourceSectionData'
import AppNoData from './AppNoData'

export default function BillingInfo() {
  const { id } = useParams()

  const { data, isLoading } = useQuery([GET_ADMIN_AGENT_PAYMENT_DETAILS], () =>
    makeGetRequest(GET_ADMIN_AGENT_PAYMENT_DETAILS + `?user=${id}`)
  )

  function billingDetailResponse(data: any, res: any) {
    switch (data) {
      case 'Receipt ID':
        return res?.payment_id
      case 'Payment Type':
        return capitalizeFirstLetter(res?.payment_type.replaceAll('_', ' '))
      case 'Payment Amount':
        return `$${res?.amount}`
      case 'Date of Payment':
        return getDateFormat(res?.action_time)
      case 'Receipt':
        return res?.receipt_url
      default:
        return ''
    }
  }
  const billingDetails = [
    'Receipt ID',
    'Payment Type',
    'Payment Amount',
    'Date of Payment',
    'Receipt',
  ]

  // const isPaymentDone = data?.data?.results?.some(
  //   (each: any) => each?.receipt_url !== null
  // )

  return (
    <div className="">
      {!!data?.data?.results?.length ? ( // && isPaymentDone
        <OnboardingLayout
          imageSrc={'/license-frame.png'}
          title={'Billing Info'}
        >
          <div className="flex flex-col gap-[20px]">
            {/* Transfer License */}
            {!!data?.data?.results?.length ? (
              <LoaderLayout isLoading={isLoading}>
                <div className="flex flex-col gap-[14px] ">
                  {data?.data?.results?.map((bill: any) => (
                    <div
                      key={bill?.id}
                      className="w-[500px] flex flex-col gap-[15px] border-[#CDCDCD] border-[1px] rounded-[20px] p-[20px]"
                    >
                      {billingDetails?.map((each: any) => (
                        <div
                          key={each}
                          className="flex justify-between items-center"
                        >
                          {billingDetailResponse(each, bill) && (
                            <Text className="text-[18px] leading-[23px] font-normal text-[#808080]">
                              {each}
                            </Text>
                          )}
                          {each === 'Receipt' && bill?.receipt_url ? (
                            <Text className="text-[18px] leading-[23px] font-normal text-[#000000]">
                              <a
                                href={bill?.receipt_url}
                                target="_blank"
                                className="text-[#2C4B7B] underline cursor-pointer"
                              >
                                Receipt.pdf
                              </a>
                            </Text>
                          ) : (
                            <Text className="text-[18px] leading-[23px] font-normal text-[#000000]">
                              {billingDetailResponse(each, bill)}
                            </Text>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </LoaderLayout>
            ) : null}
          </div>
        </OnboardingLayout>
      ) : (
        <div className="h-[50px]">
          <AppNoData />
        </div>
      )}
    </div>
  )
}
