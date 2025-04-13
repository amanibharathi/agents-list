import AppLoader from './AppLoader'
import { Flex } from '@chakra-ui/react'


const AdminPageLoader = () => {
  return (
    <Flex h={'60vh'} justifyContent={'center'} alignItems={'center'}>
      <AppLoader />
    </Flex>
  )
}

export default AdminPageLoader
