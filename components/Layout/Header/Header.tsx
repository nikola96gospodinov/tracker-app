import { Box, Flex } from '@chakra-ui/react'

import { Container } from '../Container'
import { Breadcrumbs } from './Breadcrumbs'

const Header = (): JSX.Element => {
    return (
        <Box as='header' h='80px' w='100%'>
            <Container>
                <Flex h='80px' align='flex-end' justify='space-between'>
                    <Breadcrumbs />
                </Flex>
            </Container>
        </Box>
    )
}

export default Header
