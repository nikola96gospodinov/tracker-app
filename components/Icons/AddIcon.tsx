import { MdAddBox } from 'react-icons/md'
import { IconProps } from './types.icons'

const AddIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    className
}) => <MdAddBox className={className} onClick={onClick} />

export default AddIcon
