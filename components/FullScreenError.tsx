import { Box, Flex, Heading, Text } from '@chakra-ui/react'

export const FullScreenError = () => {
    return (
        <Flex w='100vw' h='100vh' alignItems='center' justifyContent='center'>
            <Box
                bg='neutral.50'
                p={8}
                borderRadius='lg'
                boxShadow='inset'
                textAlign='center'
                borderBottom='solid'
                borderBottomColor='red.500'
                borderBottomWidth={4}
            >
                <Heading fontSize='3xl' mb={2}>
                    Oh no... 😨 Something went wrong
                </Heading>
                <Text fontSize='2xl'>
                    Please refresh the page or try again later
                </Text>
            </Box>
        </Flex>
    )
}
