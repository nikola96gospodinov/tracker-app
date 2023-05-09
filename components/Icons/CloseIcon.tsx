import { AiFillCloseCircle } from 'react-icons/ai'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const CloseIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    className,
    ...iconProps
}) => (
    <Icon
        as={AiFillCloseCircle}
        className={className}
        onClick={onClick}
        {...iconProps}
    />
)

export default CloseIcon
