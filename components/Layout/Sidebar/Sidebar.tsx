import { Box } from '@chakra-ui/react'
import Logo from '../../UIElements/Logo'
import { NavBarItems } from './NavBarItems'

export const Sidebar: React.FunctionComponent = () => {
    return (
        <Box as='aside' h='100vh' w='250px' p={4}>
            <Logo />
            <NavBarItems />
        </Box>
    )
}
