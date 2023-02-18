import { NextPage } from 'next'
import Head from 'next/head'

import Spinner from '../../components/UIElements/spinner'
import useUserLogged from '../../hooks/useUserLogged'
import Layout from '../../components/Layout/layout'
import { HabitsContent } from '../../features/Habits/HabitsContent'

const Habits: NextPage = () => {
    const { user, isLoading } = useUserLogged()

    if (isLoading || !user) {
        return (
            <div className='full-screen-centered'>
                <Spinner />
            </div>
        )
    }

    return (
        <>
            <Head>
                <title>Habits</title>
                <meta name='description' content='Dashboard' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>
                <HabitsContent />
            </Layout>
        </>
    )
}

export default Habits
