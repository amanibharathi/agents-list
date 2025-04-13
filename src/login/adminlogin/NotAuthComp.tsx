import AppText from '@/app/components/elements/AppText'
import React from 'react'
import { FcCancel } from 'react-icons/fc'

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
