import { MdAddCircle } from 'react-icons/md'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const AddIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    ...iconProps
}) => <Icon as={MdAddCircle} onClick={onClick} {...iconProps} />

export default AddIcon
