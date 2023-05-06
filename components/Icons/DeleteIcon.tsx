import { RiDeleteBin6Fill } from 'react-icons/ri'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const DeleteIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    className
}) => <Icon as={RiDeleteBin6Fill} className={className} onClick={onClick} />

export default DeleteIcon
