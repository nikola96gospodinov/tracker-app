import { Flex } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export const FormHolder: React.FunctionComponent<PropsWithChildren> = ({
    children
}) => (
    <Flex
        minH='100vh'
        minW='100vw'
        bg='neutral.900'
        alignItems='center'
        justifyContent='center'
    >
        <Flex
            bg='neutral.50'
            minW='md'
            borderRadius='lg'
            boxShadow='inset'
            p={12}
            pt={10}
            flexDir='column'
            borderTop='solid .5rem'
            borderColor='purple.600'
            position='relative'
            gap={4}
        >
            {children}
        </Flex>
    </Flex>
)
