import { Flex } from '@chakra-ui/react'
import { Spinner } from './UIElements/Spinner'

export const FullScreenLoader = () => (
    <Flex alignItems='center' justifyContent='center' w='100vw' h='100vh'>
        <Spinner text='Loading...' />
    </Flex>
)
