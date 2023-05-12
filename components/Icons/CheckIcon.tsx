import { BsCheck2Circle } from 'react-icons/bs'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const CheckIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    ...iconProps
}) => <Icon as={BsCheck2Circle} onClick={onClick} {...iconProps} />

export default CheckIcon
