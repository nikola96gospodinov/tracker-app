import { CgDanger } from 'react-icons/cg'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const DangerIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    className
}) => <Icon as={CgDanger} className={className} onClick={onClick} />

export default DangerIcon
