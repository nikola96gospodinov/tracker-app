import { AiFillCloseCircle } from 'react-icons/ai'
import { IconProps } from './types.icons'

const CloseIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    className
}) => <AiFillCloseCircle className={className} onClick={onClick} />

export default CloseIcon
