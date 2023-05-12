import { RiDeleteBin6Fill } from 'react-icons/ri'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const DeleteIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    ...iconProps
}) => <Icon as={RiDeleteBin6Fill} onClick={onClick} {...iconProps} />

export default DeleteIcon
