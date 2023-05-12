import { MdRepeatOn } from 'react-icons/md'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const RepeatIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    ...iconProps
}) => <Icon as={MdRepeatOn} onClick={onClick} {...iconProps} />

export default RepeatIcon
