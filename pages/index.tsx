import type { NextPage } from 'next'
import Head from 'next/head'

import Spinner from '../components/UIElements/spinner'
import Layout from '../components/Layout/layout'
import useUserLogged from '../hooks/useUserLogged'

import WeeklyReview from '../features/Home/WeeklyReview'

const Home: NextPage = () => {
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
                <title>Dashboard</title>
                <meta name='description' content='Dashboard' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>{user && <WeeklyReview userID={user.uid} />}</Layout>
        </>
    )
}

export default Home
