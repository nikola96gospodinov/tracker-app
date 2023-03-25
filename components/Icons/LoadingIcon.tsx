import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { IconProps } from './types.icons'

const LoadingIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    className
}) => <AiOutlineLoading3Quarters className={className} onClick={onClick} />

export default LoadingIcon
