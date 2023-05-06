import { BsCheck2Circle } from 'react-icons/bs'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const CheckIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    className
}) => <Icon as={BsCheck2Circle} className={className} onClick={onClick} />

export default CheckIcon
