import { Flex } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export const CategoryPill: React.FunctionComponent<PropsWithChildren> = ({
    children
}) => {
    return (
        <Flex
            bgGradient='linear(to-l, transparent, purple.50)'
            py={2}
            px={4}
            borderRadius='2rem'
            gap={12}
            display='inline-flex'
        >
            <Flex gap={2}>{children}</Flex>
        </Flex>
    )
}
