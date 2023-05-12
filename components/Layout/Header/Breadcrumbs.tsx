import { Breadcrumb, BreadcrumbItem, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import { UserContext } from '../../../context/userContext'
import useGetDoc from '../../../hooks/useGetDoc'
import { Goal } from '../../../pages/goals/goals.types'
import { Habit } from '../../../pages/habits/habits.types'
import { menu } from '../Sidebar/data'
import DashboardIcon from '../../Icons/DashboardIcon'
import { Link } from '../../UIElements/Link'

export const Breadcrumbs: React.FunctionComponent = () => {
    const { userId } = useContext(UserContext)
    const { pathname, asPath } = useRouter()
    const currentItem = menu.find((item) =>
        item.subpath === 'home' && pathname === '/'
            ? false
            : pathname.includes(item.subpath)
    )

    const linkPath = asPath.split('/')
    linkPath.shift()
    const isSubPath = linkPath.length > 1
    const { doc } = useGetDoc<Habit | Goal>({
        userID: userId,
        path: currentItem?.subpath ?? ' ',
        url: isSubPath ? linkPath[1] : ''
    })

    return (
        <Breadcrumb color='neutral.600'>
            <BreadcrumbItem>
                <Link
                    href='/'
                    variant='link'
                    color={currentItem ? 'neutral.600' : 'purple.600'}
                    display='inline-flex'
                    alignItems='center'
                    p={0}
                    gap={2}
                    _hover={{
                        color: 'purple.600',
                        textDecoration: 'none'
                    }}
                >
                    <DashboardIcon />
                    {!currentItem && <Text>Dashboard</Text>}
                </Link>
            </BreadcrumbItem>

            {currentItem && (
                <BreadcrumbItem>
                    <Link
                        href={currentItem!.path}
                        variant='link'
                        color={isSubPath ? 'neutral.600' : 'purple.600'}
                        p={0}
                        _hover={{
                            color: 'purple.600',
                            textDecoration: 'none'
                        }}
                    >
                        {currentItem!.title}
                    </Link>
                </BreadcrumbItem>
            )}

            {isSubPath && (
                <BreadcrumbItem>
                    <Link
                        href={asPath}
                        variant='link'
                        p={0}
                        _hover={{
                            textDecoration: 'none'
                        }}
                    >
                        {doc?.name}
                    </Link>
                </BreadcrumbItem>
            )}
        </Breadcrumb>
    )
}
