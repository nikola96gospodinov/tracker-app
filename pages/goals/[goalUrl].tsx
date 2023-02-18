import Head from 'next/head'

import { NextPage } from 'next/types'
import Layout from '../../components/Layout/layout'
import IndividualGoalContent from '../../features/Goals/IndividualGoalPage/IndividualGoalContent'

const IndividualGoal: NextPage = () => (
    <>
        <Head>
            <title>Goal</title>
            <meta name='description' content='Dashboard' />
            <link rel='icon' href='/favicon.ico' />
        </Head>
        <Layout>
            <IndividualGoalContent />
        </Layout>
    </>
)

export default IndividualGoal
