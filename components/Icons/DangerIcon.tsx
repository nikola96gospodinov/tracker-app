import { CgDanger } from 'react-icons/cg'
import { IconProps } from './types.icons'

const DangerIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    className
}) => <CgDanger className={className} onClick={onClick} />

export default DangerIcon
