import { AiTwotoneCalendar } from 'react-icons/ai'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const CalendarIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    className,
    ...iconProps
}) => (
    <Icon
        as={AiTwotoneCalendar}
        className={className}
        onClick={onClick}
        {...iconProps}
    />
)

export default CalendarIcon
