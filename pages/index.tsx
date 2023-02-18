import type { NextPage } from 'next'
import Head from 'next/head'

import Layout from '../components/Layout/layout'

import WeeklyReview from '../features/Home/WeeklyReview'

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Dashboard</title>
                <meta name='description' content='Dashboard' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>
                <WeeklyReview />
            </Layout>
        </>
    )
}

export default Home
