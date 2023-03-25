import { BsCheck2Circle } from 'react-icons/bs'
import { IconProps } from './types.icons'

const CheckIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    className
}) => <BsCheck2Circle className={className} onClick={onClick} />

export default CheckIcon
