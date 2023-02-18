import { useState } from 'react'
import { useAuthUser } from '@react-query-firebase/auth'
import { MdAddBox } from 'react-icons/md'
import { NextPage } from 'next'

import Spinner from '../../components/spinner'
import { auth } from '../../firebase/firebase'
import useUserLogged from '../../hooks/useUserLogged'
import InitialSection from '../../components/InitialSection'
import Layout from '../../components/Layout/layout'
import HabitForm from '../../features/Habits/HabitForm'
import HabitsList from '../../features/Habits/HabitsList/HabitsList'

const Habits: NextPage = () => {
    const { data: user } = useAuthUser(['user'], auth)
    const isLoading = useUserLogged()
    const [addHabitsFormOpen, setAddHabitsFormOpen] = useState(false)

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
                    <div className='header'>
                        <h1>My Habits</h1>
                        <MdAddBox onClick={() => setAddHabitsFormOpen(true)} />
                    </div>
                    {user && (
                        <HabitsList
                            userID={user.uid}
                            setAddHabitsFormOpen={setAddHabitsFormOpen}
                        />
                    )}
                    {addHabitsFormOpen && (
                        <HabitForm
                            setHabitsFormOpen={setAddHabitsFormOpen}
                            userID={user.uid}
                        />
                    )}
                </InitialSection>
            </Layout>
        </>
    )
}

export default Habits
