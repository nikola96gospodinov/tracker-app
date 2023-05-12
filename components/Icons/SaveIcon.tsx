import { RiSaveFill } from 'react-icons/ri'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const SaveIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    ...iconProps
}) => <Icon as={RiSaveFill} onClick={onClick} {...iconProps} />

export default SaveIcon
