import { MdErrorOutline } from 'react-icons/md'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const ErrorIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    className,
    ...iconProps
}) => (
    <Icon
        as={MdErrorOutline}
        className={className}
        onClick={onClick}
        {...iconProps}
    />
)

export default ErrorIcon
