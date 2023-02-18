import { useState } from 'react'
import { NextPage } from 'next'
import { MdAddBox } from 'react-icons/md'

import Layout from '../../components/Layout/layout'
import Spinner from '../../components/UIElements/spinner'
import useUserLogged from '../../hooks/useUserLogged'
import GoalsList from '../../features/Goals/GoalsList/GoalsList'
import GoalForm from '../../features/Goals/GoalForm'
import InitialSection from '../../components/InitialSection'

const Goals: NextPage = () => {
    const { user, isLoading } = useUserLogged()
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
                    <div className='header'>
                        <h1>My Goals</h1>
                        <MdAddBox onClick={() => setAddGoalsFormOpen(true)} />
                    </div>
                    {user && (
                        <GoalsList
                            userID={user.uid}
                            setAddGoalsFormOpen={setAddGoalsFormOpen}
                        />
                    )}
                    {addGoalsFormOpen && user && (
                        <GoalForm
                            setGoalsFormOpen={setAddGoalsFormOpen}
                            userID={user.uid}
                        />
                    )}
                </InitialSection>
            </Layout>
        </>
    )
}

export default Goals
