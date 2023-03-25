import { AiTwotoneCalendar } from 'react-icons/ai'
import { IconProps } from './types.icons'

const CalendarIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    className
}) => <AiTwotoneCalendar className={className} onClick={onClick} />

export default CalendarIcon
