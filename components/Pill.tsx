import { Flex } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export const Pill: React.FunctionComponent<PropsWithChildren> = ({
    children
}) => {
    return (
        <Flex
            bgGradient='linear(to-l, transparent, purple.50)'
            py={1}
            px={4}
            borderRadius='2rem'
            gap={12}
            display='inline-flex'
            align='center'
        >
            {children}
        </Flex>
    )
}
