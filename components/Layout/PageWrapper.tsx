import { FunctionComponent, PropsWithChildren, useContext } from 'react'
import Head from 'next/head'

import useUserLogged from '../../hooks/useUserLogged'
import { FullScreenLoader } from '../FullScreenLoader'
import Layout from './layout'
import { UserContext } from '../../context/userContext'
import { FullScreenError } from '../FullScreenError'

export const PageWrapper: FunctionComponent<
    PropsWithChildren<{
        title: string
        description: string
    }>
> = ({ children, title, description }) => {
    useUserLogged()
    const { userId, isLoading, error } = useContext(UserContext)

    if (isLoading || !userId) return <FullScreenLoader />

    if (error) return <FullScreenError />

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description} />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>{children}</Layout>
        </>
    )
}
