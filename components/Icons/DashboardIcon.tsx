import { MdSpaceDashboard } from 'react-icons/md'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const DashboardIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    ...iconProps
}) => <Icon as={MdSpaceDashboard} onClick={onClick} {...iconProps} />

export default DashboardIcon
