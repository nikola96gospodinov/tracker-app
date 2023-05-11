import { AiOutlineInfoCircle } from 'react-icons/ai'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const InfoIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    className,
    ...iconProps
}) => (
    <Icon
        as={AiOutlineInfoCircle}
        className={className}
        onClick={onClick}
        {...iconProps}
    />
)

export default InfoIcon
