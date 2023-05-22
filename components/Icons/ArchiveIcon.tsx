import { BsArchiveFill } from 'react-icons/bs'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const ArchiveIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    ...iconProps
}) => <Icon as={BsArchiveFill} onClick={onClick} {...iconProps} />

export default ArchiveIcon
