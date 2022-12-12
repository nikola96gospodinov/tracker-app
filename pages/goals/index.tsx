import { useState } from 'react'
import { useAuthUser } from '@react-query-firebase/auth'
import { NextPage } from 'next'
import { MdAddBox } from 'react-icons/md'

import Layout from '../../components/layout'
import Spinner from '../../components/spinner'
import { auth } from '../../firebase/firebase'
import useUserLogged from '../../hooks/useUserLogged'
import GoalsList from './components/GoalsList/GoalsList'
import GoalForm from './components/GoalForm'

import styles from './components/goals.module.scss'
import InitialSection from '../../components/InitialSection'

const Goals: NextPage = () => {
    const { data: user } = useAuthUser(["user"], auth)
    const isLoading = useUserLogged()
    const [addGoalsFormOpen, setAddGoalsFormOpen] = useState(false)

    if (isLoading || !user) {
        return (
            <div className='full-screen-centered'>
                <Spinner />
            </div>
        )
    }

    return (
        <>
            <Layout>
                <InitialSection>
                    <div className={styles.header}>
                        <h1>My Goals</h1>
                        <MdAddBox onClick={() => setAddGoalsFormOpen(true)} />
                    </div>
                    {user && <GoalsList userID={user.uid} setAddGoalsFormOpen={setAddGoalsFormOpen} />}
                    {addGoalsFormOpen && user && <GoalForm setGoalsFormOpen={setAddGoalsFormOpen} userID={user.uid} />}
                </InitialSection>
            </Layout>
        </>
    )
}

export default Goals