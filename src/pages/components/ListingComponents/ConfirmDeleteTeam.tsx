// import AppButton from '@/app/components/elements/AppButton'
// import AppText from '@/app/components/elements/AppText'
// import CkAppModal from '@/app/components/modal/AppModal'
import { Box, Flex } from '@chakra-ui/react'
import CkAppModal from '../../Auth/AgentComponents/admincompenets/AppModal'
import AppText from '../../../AppComponents/AppText-agent'
import AppButton from '../../../AppComponents/AppButton-agent'


const ConfirmDeleteTeamModal = ({
  isOpen,
  onClose,
  deleteMutate,
  isLoading,
  btnLabel,
  headerText,
}: {
  isOpen: boolean
  onClose: () => void
  deleteMutate?: any
  isLoading?: any
  btnLabel: string
  headerText: string
}) => {
  return (
    <CkAppModal closeButton isOpen={isOpen} onClose={onClose}>
      <Box px={'30px'} py={'20px'}>
        <AppText
          className="text-[20px] font-[500] text-center mb-[20px]"
          text={headerText}
        />
        <Flex justifyContent={'center'} gap={'10px'}>
          <AppButton
            className="py-[10px] w-fit"
            onClick={onClose}
            variant="outline"
          >
            Close
          </AppButton>
          <AppButton
            onClick={() =>
              //@ts-ignore
              deleteMutate(
                btnLabel == 'reject'
                  ? { status: 'rejected' }
                  : btnLabel == 'approve'
                    ? { status: 'approved' }
                    : btnLabel == 'cancel'
                      ? { status: 'cancelled' }
                      : {}
              )
            }
            isLoading={isLoading}
            className="capitalize"
          >
            {btnLabel == 'cancel' ? 'Cancel Request' : btnLabel}
          </AppButton>
        </Flex>
      </Box>
    </CkAppModal>
  )
}

export default ConfirmDeleteTeamModal
