import { AiTwotoneCalendar } from 'react-icons/ai'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const CalendarIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    ...iconProps
}) => <Icon as={AiTwotoneCalendar} onClick={onClick} {...iconProps} />

export default CalendarIcon
