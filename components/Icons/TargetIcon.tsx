import { SiTarget } from 'react-icons/si'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const TargetIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    ...iconProps
}) => <Icon as={SiTarget} onClick={onClick} {...iconProps} />

export default TargetIcon
