import { IconProps as IProps } from '@chakra-ui/react'

export interface IconProps extends IProps {
    onClick?: () => void
    className?: string
}
