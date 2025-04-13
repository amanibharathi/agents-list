import { ReactNode } from 'react'
import AppLoader from '../admincompenets/AppLoader'
//import AppLoader from '../AppLoader'

const LoaderLayout = ({
  children,
  isLoading = false,
  height = '45vh',
  wrapperClassname = '',
  size = 'md',
}: {
  children: ReactNode
  isLoading?: boolean
  height?: string
  wrapperClassname?: string
  size?: string
}) => {
  return (
    <>
      {isLoading ? (
        <div
          style={{ height: height }}
          className={`flex justify-center items-center  ${wrapperClassname}`}
        >
          <AppLoader size={size} />
        </div>
      ) : (
        children
      )}
    </>
  )
}

export default LoaderLayout
