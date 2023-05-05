import { FunctionComponent, PropsWithChildren, useContext } from 'react'
import Head from 'next/head'

import useUserLogged from '../../hooks/useUserLogged'
import { FullScreenLoader } from '../FullScreenLoader'
import Layout from './layout'
import { UserContext } from '../../context/userContext'

export const PageWrapper: FunctionComponent<
    PropsWithChildren<{
        title: string
        description: string
    }>
> = ({ children, title, description }) => {
    useUserLogged()
    const { userId, isLoading, error } = useContext(UserContext)

    if (isLoading || !userId) return <FullScreenLoader />

    // TODO: Make this a component
    if (error) return <div>{error.message}</div>

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
