import { FaListAlt } from 'react-icons/fa'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const ListIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    ...iconProps
}) => <Icon as={FaListAlt} onClick={onClick} {...iconProps} />

export default ListIcon
