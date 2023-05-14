import { AiFillCloseCircle } from 'react-icons/ai'
import { IoCloseSharp } from 'react-icons/io5'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const CloseIcon: React.FunctionComponent<IconProps & { isFull?: boolean }> = ({
    onClick,
    isFull = true,
    ...iconProps
}) => (
    <Icon
        as={isFull ? AiFillCloseCircle : IoCloseSharp}
        onClick={onClick}
        {...iconProps}
    />
)

export default CloseIcon
