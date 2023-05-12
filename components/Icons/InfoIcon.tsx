import { AiOutlineInfoCircle } from 'react-icons/ai'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const InfoIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    ...iconProps
}) => <Icon as={AiOutlineInfoCircle} onClick={onClick} {...iconProps} />

export default InfoIcon
