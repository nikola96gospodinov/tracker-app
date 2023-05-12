import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const LoadingIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    ...iconProps
}) => <Icon as={AiOutlineLoading3Quarters} onClick={onClick} {...iconProps} />

export default LoadingIcon
