import { MdOutlineLogout } from 'react-icons/md'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const LogoutIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    ...iconProps
}) => <Icon as={MdOutlineLogout} onClick={onClick} {...iconProps} />

export default LogoutIcon
