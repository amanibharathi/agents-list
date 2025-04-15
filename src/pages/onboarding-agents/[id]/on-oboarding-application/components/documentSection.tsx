
import { Text } from '@chakra-ui/react'
import { IoEyeOutline } from 'react-icons/io5'
import OnboardingLayout from './onboardingLayout'
// import RequestChangeIcon from '@/app/icons/requestChangeIcon'
// import CkAppModal from '@/app/components/modal/AppModal'
import { useDisclosure } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
//import { useGetAgentDocumentList } from '@/app/hooks/queryhooks/useGetAgentDocumentList'
import RequestChangeIcon from './requestChangeIcon'
import CkAppModal from '../../../../Auth/AgentComponents/admincompenets/AppModal'
import { useGetAgentDocumentList } from '../../../../../utils/hooks/useGetAgentDocumentList'

export default function DocumentSection({ onOpen }: any) {
  const { id } = useParams()
  // const { data } = useQuery([GET_AGENT_SUPPORT_DOCUMENT_LIST], () =>
  //   makeGetRequest(GET_AGENT_SUPPORT_DOCUMENT_LIST + `?user=${id}`)
  // )

  const { agentDocumentList: data } = useGetAgentDocumentList(id)

  const { isOpen, onClose, onOpen: modalOnOpen } = useDisclosure()
  return (
    <div className="px-[40px] pb-[30px] flex flex-col gap-[10px]  bg-white">
      {data?.data?.map((document: any) => {
        if (document?.documents?.length && document?.documents?.length > 0) {
          return (
            <OnboardingLayout
              key={document.id}
              imageSrc={'/license-frame.png'}
              title={`Documents for ${document?.identity}`}
            >
              <div className="flex flex-wrap gap-[15px]">
                {document?.documents?.map((doc: any) => (
                  <div
                    key={doc?.id}
                    className="p-[20px] border-[#CDCDCD] border-[1px] rounded-[5px] h-[163px] w-[416px] shadow-[0_0_4px_0_#00000040] flex justify-between"
                  >
                    <div className="flex flex-col justify-between">
                      <Text className="text-[18px] leading-[22px] font-[400] text-[#808080]">
                        {doc?.identity}
                      </Text>
                      <Text className="text-[18px] leading-[22px] font-[600] text-[#000000]">
                        {doc?.file?.split('/').pop()}
                      </Text>
                      {/* <Text className="text-[18px] leading-[22px] font-[400] text-[#808080]">
                    200KB
                  </Text> */}
                      <div
                        className="flex gap-[10px] items-center cursor-pointer "
                        onClick={() => modalOnOpen()}
                      >
                        <IoEyeOutline size={25} color={'#2C4B7B'} />
                        <Text className="text-[16px] leading-[22px] font-[400] text-[#2C4B7B]">
                          View
                        </Text>
                      </div>
                    </div>
                    <div className="flex flex-col-reverse">
                      <div
                        className="flex gap-[10px] items-center cursor-pointer "
                        onClick={() => onOpen()}
                      >
                        <RequestChangeIcon color={'#2C4B7B'} />
                        <Text className="text-[15px] leading-[22px] font-[400] text-[#2C4B7B]">
                          Request Change
                        </Text>
                      </div>
                    </div>
                    <CkAppModal
                      className="!w-full !max-w-[1200px] !h-[80vh]"
                      bodyClassName=" !px-[40px] !pb-[30px]"
                      closeButton
                      isOpen={isOpen}
                      onClose={onClose}
                      header={'Document'}
                    >
                      <div className="w-full h-full">
                        <iframe
                          width={'100%'}
                          height={'100%'}
                          src={doc?.file}
                        />
                      </div>
                    </CkAppModal>
                  </div>
                ))}
              </div>
            </OnboardingLayout>
          )
        }
      })}
    </div>
  )
}
