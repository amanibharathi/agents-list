
import { FcCancel } from 'react-icons/fc'
import AppText from '../../../../AppComponents/AppText-agent'

const NotAuthComp = () => {
  return (
    <div className="h-[50vh] flex justify-center items-center flex-col">
      <FcCancel size={70} />
      <AppText
        text="You are not authorized to visit this page"
        className="!text-[#10295A] text-[20px]"
      />
    </div>
  )
}

export default NotAuthComp
