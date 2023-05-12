import { Flex } from '@chakra-ui/react'
import { FunctionComponent } from 'react'
import { useRouter } from 'next/router'

import { menu } from './data'
import { Link } from '../../UIElements/Link'

export const NavBarItems: FunctionComponent = () => {
    const { pathname } = useRouter()

    return (
        <Flex mt={7} alignItems='flex-start' flexDir='column'>
            {menu.map((item) => {
                const isActivePath =
                    item.subpath === 'home' && pathname === '/'
                        ? true
                        : pathname.includes(item.subpath)
                const Icon = item.icon

                return (
                    <Link
                        position='relative'
                        display='flex'
                        alignItems='center'
                        gap={2}
                        href={item.path}
                        key={item.path}
                        variant='link'
                        py={2}
                        ml={-4}
                        pl={4}
                        color={isActivePath ? 'purple.700' : 'neutral.900'}
                        bg={isActivePath ? 'purple.100' : 'transparent'}
                        boxShadow={isActivePath ? 'inset' : 'none'}
                        w='250px'
                        borderRadius='0 20px 20px 0'
                        _hover={{
                            bg: isActivePath ? 'purple.100' : 'neutral.200'
                        }}
                    >
                        <Icon /> {item.title}
                    </Link>
                )
            })}
        </Flex>
    )
}
