import { RiSaveFill } from 'react-icons/ri'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const SaveIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    className
}) => <Icon as={RiSaveFill} className={className} onClick={onClick} />

export default SaveIcon
