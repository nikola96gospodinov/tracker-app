import Head from 'next/head'

import { NextPage } from 'next/types'
import Layout from '../../components/Layout/layout'
import Spinner from '../../components/spinner'
import useUserLogged from '../../hooks/useUserLogged'
import IndividualGoalContent from '../../features/Goals/IndividualGoalPage/IndividualGoalContent'

const IndividualGoal: NextPage = () => {
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
                <title>Goal</title>
                <meta name='description' content='Dashboard' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>
                {user && <IndividualGoalContent userID={user.uid} />}
            </Layout>
        </>
    )
}

export default IndividualGoal
