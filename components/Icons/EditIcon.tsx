import { AiTwotoneEdit } from 'react-icons/ai'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const EditIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    className,
    ...iconProps
}) => (
    <Icon
        as={AiTwotoneEdit}
        className={className}
        onClick={onClick}
        {...iconProps}
    />
)

export default EditIcon
