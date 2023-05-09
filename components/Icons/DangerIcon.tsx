import { CgDanger } from 'react-icons/cg'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const DangerIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    className,
    ...iconProps
}) => (
    <Icon
        as={CgDanger}
        className={className}
        onClick={onClick}
        {...iconProps}
    />
)

export default DangerIcon
