import { GoGear } from 'react-icons/go'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const GearIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    ...iconProps
}) => <Icon as={GoGear} onClick={onClick} {...iconProps} />

export default GearIcon
