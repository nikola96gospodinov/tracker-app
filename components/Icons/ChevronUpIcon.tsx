import { FaChevronUp } from 'react-icons/fa'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const ChevronUpIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    ...iconProps
}) => <Icon as={FaChevronUp} onClick={onClick} {...iconProps} />

export default ChevronUpIcon
