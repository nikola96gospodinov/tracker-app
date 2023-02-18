import Head from 'next/head'

import { NextPage } from 'next'
import Layout from '../../components/Layout/layout'
import IndividualHabitContent from '../../features/Habits/IndividualHabitPage/IndividualHabitContent'

const IndividuaHait: NextPage = () => (
    <>
        <Head>
            <title>Habit</title>
            <meta name='description' content='Dashboard' />
            <link rel='icon' href='/favicon.ico' />
        </Head>
        <Layout>
            <IndividualHabitContent />
        </Layout>
    </>
)

export default IndividuaHait
