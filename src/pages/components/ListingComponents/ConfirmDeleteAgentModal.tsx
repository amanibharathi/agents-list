// import AppButton from '@/app/components/elements/AppButton'
// import AppText from '@/app/components/elements/AppText'
// import CkAppModal from '@/app/components/modal/AppModal'
import { Box, Flex } from '@chakra-ui/react'
import CkAppModal from '../../Auth/AgentComponents/admincompenets/AppModal'
import AppText from '../../../AppComponents/AppText-agent'
import AppButton from '../../../AppComponents/AppButton-agent'


const ConfirmDeleteAgentModal = ({
  isOpen,
  onClose,
  deleteMutate,
  isLoading,
}: {
  isOpen: boolean
  onClose: () => void
  deleteMutate: any
  isLoading: any
}) => {
  return (
    <CkAppModal closeButton isOpen={isOpen} onClose={onClose}>
      <Box px={'30px'} py={'20px'}>
        <AppText
          className="text-[20px] font-[500] text-center mb-[20px]"
          text="Are you sure want to remove agent?"
        />
        <Flex justifyContent={'center'} gap={'10px'}>
          <AppButton
            className="py-[10px] w-fit"
            onClick={onClose}
            variant="outline"
          >
            Cancel
          </AppButton>
          <AppButton
            onClick={() =>
              //@ts-ignore
              deleteMutate({})
            }
            isLoading={isLoading}
          >
            Remove
          </AppButton>
        </Flex>
      </Box>
    </CkAppModal>
  )
}

export default ConfirmDeleteAgentModal
