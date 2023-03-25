import { MdErrorOutline } from 'react-icons/md'
import { IconProps } from './types.icons'

const ErrorIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    className
}) => <MdErrorOutline className={className} onClick={onClick} />

export default ErrorIcon
