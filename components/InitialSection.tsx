import { Box, Container } from '@chakra-ui/react'

const InitialSection: React.FunctionComponent<{
    children: React.ReactNode
}> = ({ children }) => (
    <Box minH='50vh'>
        <Container maxW='container.lg'>
            <Box
                bg='neutral.50'
                minH='50vh'
                mt='-10vh'
                position='relative'
                zIndex={1}
                borderRadius='2xl'
                borderTop='solid'
                borderTopColor='purple.600'
                borderTopWidth={4}
                boxShadow='secondary'
                p={12}
                mb={16}
            >
                {children}
            </Box>
        </Container>
    </Box>
)

export default InitialSection
