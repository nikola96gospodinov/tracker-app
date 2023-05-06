import { AiTwotoneCalendar } from 'react-icons/ai'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const CalendarIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    className
}) => <Icon as={AiTwotoneCalendar} className={className} onClick={onClick} />

export default CalendarIcon
