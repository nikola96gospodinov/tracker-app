import { CgDanger } from 'react-icons/cg'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const DangerIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    ...iconProps
}) => <Icon as={CgDanger} onClick={onClick} {...iconProps} />

export default DangerIcon
