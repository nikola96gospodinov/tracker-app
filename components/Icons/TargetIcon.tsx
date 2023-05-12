import { SiTarget } from 'react-icons/si'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const TargetIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    className,
    ...iconProps
}) => (
    <Icon
        as={SiTarget}
        className={className}
        onClick={onClick}
        {...iconProps}
    />
)

export default TargetIcon
