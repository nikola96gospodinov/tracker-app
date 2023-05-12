import { MdSpaceDashboard } from 'react-icons/md'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const DashboardIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    className,
    ...iconProps
}) => (
    <Icon
        as={MdSpaceDashboard}
        className={className}
        onClick={onClick}
        {...iconProps}
    />
)

export default DashboardIcon
