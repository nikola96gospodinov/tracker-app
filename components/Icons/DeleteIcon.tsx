import { RiDeleteBin6Fill } from 'react-icons/ri'
import { IconProps } from './types.icons'

const DeleteIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    className
}) => <RiDeleteBin6Fill className={className} onClick={onClick} />

export default DeleteIcon
