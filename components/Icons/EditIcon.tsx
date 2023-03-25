import { AiTwotoneEdit } from 'react-icons/ai'
import { IconProps } from './types.icons'

const EditIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    className
}) => <AiTwotoneEdit className={className} onClick={onClick} />

export default EditIcon
