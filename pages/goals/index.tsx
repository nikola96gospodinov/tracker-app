import { NextPage } from 'next'
import Head from 'next/head'

import Layout from '../../components/Layout/layout'
import { GoalsContent } from '../../features/Goals/GoalsContent'

const Goals: NextPage = () => (
    <>
        <Head>
            <title>Goals</title>
            <meta name='description' content='Dashboard' />
            <link rel='icon' href='/favicon.ico' />
        </Head>
        <Layout>
            <GoalsContent />
        </Layout>
    </>
)

export default Goals
