import { MdRepeatOn } from 'react-icons/md'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const RepeatIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    className,
    ...iconProps
}) => (
    <Icon
        as={MdRepeatOn}
        className={className}
        onClick={onClick}
        {...iconProps}
    />
)

export default RepeatIcon
