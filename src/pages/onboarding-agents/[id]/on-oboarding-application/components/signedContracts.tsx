
import { Text } from '@chakra-ui/react'
import { IoEyeOutline } from 'react-icons/io5'
import OnboardingLayout from './onboardingLayout'
// import RequestChangeIcon from '@/app/icons/requestChangeIcon'
// import { ADMIN_E_SIGNED_VIEW } from '@/app/api-utils'
import { useQuery } from 'react-query'
// import makeGetRequest from '@/app/utils/api/makeGetRequest'
// import CkAppModal from '@/app/components/modal/AppModal'
import { useDisclosure } from '@chakra-ui/react'
// import { useAppStore } from '@/app/utils/store'
import RequestChangeIcon from './requestChangeIcon'
import { ADMIN_E_SIGNED_VIEW } from '../../../../../api-utils'
import makeGetRequest from '../../../../../api/makeGetRequest'
import CkAppModal from '../../../../Auth/AgentComponents/admincompenets/AppModal'
import { useAppStore } from '../../../../../store-admin'

export default function SignedContracts({ stage, onOpen }: any) {
  const { adminRoles } = useAppStore()
  const isEditable =
    adminRoles['ESign Management Policy']?.permissions?.is_editable
  const isViewable =
    adminRoles['ESign Management Policy']?.permissions?.is_viewable

  const { data } = useQuery(
    [ADMIN_E_SIGNED_VIEW(stage?.signature_request?.id)],
    () => makeGetRequest(ADMIN_E_SIGNED_VIEW(stage?.signature_request?.id))
  )
  const { isOpen, onClose, onOpen: modalOnOpen } = useDisclosure()
  return (
    <div className="px-[40px] pb-[30px] flex flex-col gap-[10px]  bg-white">
      <CkAppModal
        className="!w-full !max-w-[1200px] !h-[80vh]"
        bodyClassName=" !px-[40px] !pb-[30px]"
        closeButton
        isOpen={isOpen}
        onClose={onClose}
        header={'ICA Document'}
      >
        <div className="w-full h-full">
          <iframe width={'100%'} height={'100%'} src={data?.data}></iframe>
        </div>
      </CkAppModal>
      <OnboardingLayout
        imageSrc={'/license-frame.png'}
        title={'E-signed Contracts'}
      >
        <div className="flex flex-wrap gap-[15px]">
          <div className="p-[20px] border-[#CDCDCD] border-[1px] rounded-[5px] h-[182px] w-[460px] shadow-[0_0_4px_0_#00000040] flex justify-between">
            <div className="flex flex-col gap-[10px]">
              <Text className="text-[18px] leading-[22px] font-[400] text-[#808080]">
                {`Independent Contractor's Agreement Document`}
              </Text>
              <Text className="text-[18px] leading-[22px] font-[600] text-[#000000]">
                Realty of America - ICA
              </Text>
              <Text className="text-[18px] leading-[22px] font-[400] text-[#808080]">
                200KB
              </Text>
              {isViewable && (
                <div
                  className="flex gap-[10px] items-center cursor-pointer "
                  onClick={() => modalOnOpen()}
                >
                  <IoEyeOutline size={25} color={'#2C4B7B'} />
                  <Text className="text-[16px] leading-[22px] font-[400] text-[#2C4B7B]">
                    View
                  </Text>
                </div>
              )}
            </div>
            <div className="flex flex-col-reverse">
              {isEditable && (
                <div
                  className="flex gap-[10px] items-center cursor-pointer "
                  onClick={() => onOpen()}
                >
                  <RequestChangeIcon color={'#2C4B7B'} />
                  <Text className="text-[15px] leading-[22px] font-[400] text-[#2C4B7B]">
                    Request Change
                  </Text>
                </div>
              )}
            </div>
          </div>
        </div>
      </OnboardingLayout>

      {/* <div>{data ? <MyApp data={data} /> : ''}</div> */}
    </div>
  )
}
