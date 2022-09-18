import type { NextPage } from 'next'
import Head from 'next/head'
import { useAuthUser } from '@react-query-firebase/auth'

import Spinner from '../components/spinner'
import Layout from '../components/layout'
import { auth, db } from '../firebase/firebase'
import useUserLogged from '../hooks/useUserLogged'

import WeeklyReview from '../components/HomePageComponents/WeeklyReview'
import { doc } from 'firebase/firestore'
import { useFirestoreDocument } from '@react-query-firebase/firestore'

const Home: NextPage = () => {
  const { data: user } = useAuthUser(["user"], auth)
  const isLoading = useUserLogged()

  const goalsRef = doc(db, 'goals', 'gj713NtZKjZEvCvrD7')
  const { data: goals } = useFirestoreDocument(['goals'], goalsRef)

  console.log(goals?.data())

  if (isLoading || !user) {
    return (
        <div className='full-screen-centered'>
            <Spinner />
        </div>
    )
  }

  return (
    <div>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <WeeklyReview />
      </Layout>
    </div>
  )
}

export default Home
