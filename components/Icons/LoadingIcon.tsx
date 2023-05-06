import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const LoadingIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    className
}) => (
    <Icon
        as={AiOutlineLoading3Quarters}
        className={className}
        onClick={onClick}
    />
)

export default LoadingIcon
