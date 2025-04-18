
import { Box, Flex } from '@chakra-ui/react'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import { POST_LOGOUT_API } from '../api-utils'
import AppButton from '../AppComponents/AppButton-agent'
import AppText from '../AppComponents/AppText-agent'
import CkAppModal from '../pages/Auth/AgentComponents/admincompenets/AppModal'
import useManageCookies from '../utils/hooks/useSetCookiesOnSuccess'
import makePostRequest from '../api/makePostRequest'
import { ADMIN_LOGIN } from '../pages/Auth/AgentComponents/navigation/urls'
import { useNavigate } from 'react-router-dom'

const ConformLogoutModalAdmin = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const { handleClearCookiesOnSignOut } = useManageCookies()
  const router = useNavigate()
  const { mutate: signoutMutate, isLoading } = useMutation(
    () => makePostRequest(POST_LOGOUT_API, {}),
    {
      onSuccess: () => {
        handleClearCookiesOnSignOut()
        router(ADMIN_LOGIN)
        onClose()
      },
      onError: (err) => {
        console.log(err)
        toast.error('Unable to logout')
      },
    }
  )
  return (
    <CkAppModal closeButton isOpen={isOpen} onClose={onClose}>
      <Box px={'30px'} py={'20px'}>
        <AppText
          className="text-[20px] font-[500] text-center mb-[20px]"
          text="Are you sure want to logout?"
        />
        <Flex justifyContent={'center'} gap={'10px'}>
          <AppButton
            className="py-[10px] w-fit"
            onClick={onClose}
            variant="outline"
          >
            Cancel
          </AppButton>
          <AppButton onClick={signoutMutate} isLoading={isLoading}>
            Logout
          </AppButton>
        </Flex>
      </Box>
    </CkAppModal>
  )
}

export default ConformLogoutModalAdmin
