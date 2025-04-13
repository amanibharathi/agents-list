import { SlideFade } from '@chakra-ui/react'
import { ReactNode } from 'react'
import AdminPageLoader from './AdminPageLoader'

const AdminContainer = ({
  children,
  isLoading = false,
  className = '',
}: {
  children: ReactNode
  isLoading?: boolean
  className?: string
}) => {
  return (
    <div className={`${className} w-full max-w-[1360px] mx-auto px-[10px]`}>
      {/* <AdminNavbar /> */}
      {/* {children} */}
      {isLoading ? (
        <AdminPageLoader />
      ) : (
        <SlideFade in={true} offsetY="0px" offsetX="120px">
          {children}
        </SlideFade>
      )}
    </div>
  )
}

export default AdminContainer
