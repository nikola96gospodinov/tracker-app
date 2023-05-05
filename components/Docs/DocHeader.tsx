import { Flex, Heading } from '@chakra-ui/react'
import { FunctionComponent, ReactNode } from 'react'

import AddIcon from '../Icons/AddIcon'

export const DocHeader: FunctionComponent<{
    heading: ReactNode
    onClick?: () => void
}> = ({ heading, onClick }) => (
    <Flex alignItems='center' justifyContent='space-between' mb={8}>
        <Heading as='h1' fontWeight={600} fontSize='3xl'>
            {heading}
        </Heading>
        <AddIcon
            onClick={onClick}
            boxSize={8}
            fill='purple.600'
            cursor='pointer'
        />
    </Flex>
)
