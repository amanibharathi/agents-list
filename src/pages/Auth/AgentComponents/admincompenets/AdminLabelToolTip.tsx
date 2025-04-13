import { Box, PlacementWithLogical, Tooltip } from '@chakra-ui/react'
import  { ReactNode } from 'react'
import { IoIosInformationCircleOutline } from 'react-icons/io'

const AdminLabelToolTip = ({
  icon = <IoIosInformationCircleOutline />,
  toolTipContent = '',
  placement = 'right-start',
}: {
  icon?: any
  toolTipContent: string | ReactNode
  placement?: PlacementWithLogical
}) => {
  return (
    <Tooltip
      bg={'#E3EEFF'}
      color={'#333333'}
      hasArrow
      label={toolTipContent}
      placement={placement}
    >
      <Box>{icon}</Box>
    </Tooltip>
  )
}

export default AdminLabelToolTip
