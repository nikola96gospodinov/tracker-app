import { MdErrorOutline } from 'react-icons/md'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const ErrorIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    ...iconProps
}) => <Icon as={MdErrorOutline} onClick={onClick} {...iconProps} />

export default ErrorIcon
