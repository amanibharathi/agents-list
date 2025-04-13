
import { Spinner } from '@chakra-ui/react'


const AppLoader = ({
  size = 'md',
  color = '#1F335A',
  className = '',
}: {
  size?: string
  color?: string
  className?: string
}) => {
  return (
    <div
      className={`${className} flex justify-center items-center app-loader w-full`}
    >
      <Spinner size={size} color={color} />
    </div>
  )
}

export default AppLoader
