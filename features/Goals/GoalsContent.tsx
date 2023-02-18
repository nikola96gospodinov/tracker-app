import { useState } from 'react'
import { MdAddBox } from 'react-icons/md'

import InitialSection from '../../components/InitialSection'
import useUserLogged from '../../hooks/useUserLogged'
import GoalForm from './GoalForm'
import GoalsList from './GoalsList/GoalsList'

export const GoalsContent = () => {
    const { user } = useUserLogged()
    const [addGoalsFormOpen, setAddGoalsFormOpen] = useState(false)

    return (
        <>
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
        </>
    )
}
