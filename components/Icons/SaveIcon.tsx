import { RiSaveFill } from 'react-icons/ri'
import { IconProps } from './types.icons'

const SaveIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    className
}) => <RiSaveFill className={className} onClick={onClick} />

export default SaveIcon
