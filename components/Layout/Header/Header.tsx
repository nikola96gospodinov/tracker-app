import { Box, Flex } from '@chakra-ui/react'

import { Container } from '../Container'
import { Breadcrumbs } from './Breadcrumbs'
import { ProfileActions } from './ProfileActions'

const Header = (): JSX.Element => {
    return (
        <Box as='header' h='75px' w='100%'>
            <Container>
                <Flex h='75px' align='flex-end' justify='space-between'>
                    <Breadcrumbs />
                    <ProfileActions />
                </Flex>
            </Container>
        </Box>
    )
}

export default Header
