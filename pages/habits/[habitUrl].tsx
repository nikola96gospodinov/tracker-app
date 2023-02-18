import { useAuthUser } from '@react-query-firebase/auth'
import Head from 'next/head'

import { NextPage } from 'next'
import Layout from '../../components/Layout/layout'
import Spinner from '../../components/spinner'
import { auth } from '../../firebase/firebase'
import useUserLogged from '../../hooks/useUserLogged'
import IndividualHabitContent from '../../features/Habits/IndividualHabitPage/IndividualHabitContent'

const IndividuaHait: NextPage = () => {
    const { data: user } = useAuthUser(['user'], auth)
    const isLoading = useUserLogged()

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
                <title>Habit</title>
                <meta name='description' content='Dashboard' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>
                {user && <IndividualHabitContent userID={user.uid} />}
            </Layout>
        </>
    )
}

export default IndividuaHait
