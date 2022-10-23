import type { NextPage } from 'next'
import Head from 'next/head'
import { useAuthUser } from '@react-query-firebase/auth'

import Spinner from '../components/spinner'
import Layout from '../components/layout'
import { auth } from '../firebase/firebase'
import useUserLogged from '../hooks/useUserLogged'

import WeeklyReview from '../components/HomePageComponents/WeeklyReview'

const Home: NextPage = () => {
  const { data: user } = useAuthUser(["user"], auth)
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
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {user && <WeeklyReview userID={user.uid}/>}
      </Layout>
    </>
  )
}

export default Home
