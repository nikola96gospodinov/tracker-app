import { AiTwotoneEdit } from 'react-icons/ai'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const EditIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    ...iconProps
}) => <Icon as={AiTwotoneEdit} onClick={onClick} {...iconProps} />

export default EditIcon
