
//import AppButton from '@/app/components/elements/AppButton'
//import AppImage from '@/app/components/elements/AppImage'
import { Flex } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { IoCloudUploadOutline } from 'react-icons/io5'
import { PiUserSquareLight } from 'react-icons/pi'
import AppImage from '../../../AppComponents/AppImage'
import AppButton from '../../../AppComponents/AppButton-agent'

const AgentProfilePicView = ({
  src,
  onClick,
  isLoading = false,
  isReadOnly = false,
}: {
  src: string
  onClick: any
  isLoading?: boolean
  isReadOnly?: boolean
}) => {
  const ref = useRef(null)
  return (
    <Flex alignItems={'center'} gap={'10px'}>
      {src ? (
        <AppImage
          height={125}
          width={125}
          className="rounded-[10px] h-[125px] w-[125px] !border border-solid !border-[#CBD5E0] object-cover"
          src={src}
          alt="agent-image"
        />
      ) : (
        <PiUserSquareLight fontSize={'170px'} />
      )}
      <label htmlFor="profile-picture">
        <input
          ref={ref}
          type="file"
          onChange={onClick}
          className="hidden"
          name="profile-picture"
          id="profile-picture"
        />
        <AppButton
          //@ts-ignore
          onClick={() => ref.current.click()}
          className="whitespace-nowrap"
          isLoading={isLoading}
          icon={<IoCloudUploadOutline />}
          disabled={isReadOnly}
        >
          Upload Image
        </AppButton>
      </label>
    </Flex>
  )
}

export default AgentProfilePicView
