import { Flex, Heading, Button } from '@chakra-ui/react'
import { FunctionComponent, ReactNode } from 'react'

export const DocHeader: FunctionComponent<{
    heading: ReactNode
    onClick?: () => void
}> = ({ heading, onClick }) => (
    <Flex alignItems='center' justifyContent='space-between' mb={8}>
        <Heading as='h1' fontWeight={600} fontSize='3xl'>
            {heading}
        </Heading>
        <Button
            onClick={onClick}
            fontSize='4xl'
            color='green.900'
            bg='green.100'
            borderRadius='50%'
            boxShadow='inset'
            p={0}
            fontWeight={900}
            _hover={{ bg: 'green.50' }}
        >
            +
        </Button>
    </Flex>
)
