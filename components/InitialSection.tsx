import { Box } from '@chakra-ui/react'
import { Container } from './Layout/Container'

const InitialSection: React.FunctionComponent<{
    children: React.ReactNode
}> = ({ children }) => (
    <Container>
        <Box
            bg='neutral.50'
            minH='50vh'
            position='relative'
            zIndex={1}
            borderRadius='2xl'
            boxShadow='inset'
            p={12}
            my={8}
        >
            {children}
        </Box>
    </Container>
)

export default InitialSection
