import { Box, Flex } from '@chakra-ui/react'

import Header from './Header/Header'
import { Sidebar } from './Sidebar/Sidebar'

const Layout: React.FunctionComponent<{
    children: React.ReactNode
}> = ({ children }) => (
    <>
        <Flex>
            <Sidebar />
            <Box flexGrow={1}>
                <Header />
                <main>{children}</main>
            </Box>
        </Flex>
    </>
)

export default Layout
