import { AiFillQuestionCircle } from 'react-icons/ai'
import { Icon } from '@chakra-ui/react'

import { IconProps } from './types.icons'

const QuestionMarkIcon: React.FunctionComponent<IconProps> = ({
    onClick,
    ...iconProps
}) => <Icon as={AiFillQuestionCircle} onClick={onClick} {...iconProps} />

export default QuestionMarkIcon
