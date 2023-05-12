import { FaUserCircle } from 'react-icons/fa'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const UserIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    className,
    ...iconProps
}) => (
    <Icon
        as={FaUserCircle}
        className={className}
        onClick={onClick}
        {...iconProps}
    />
)

export default UserIcon
