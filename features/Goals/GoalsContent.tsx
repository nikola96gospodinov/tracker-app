import { useContext, useState } from 'react'

import AddIcon from '../../components/Icons/AddIcon'
import InitialSection from '../../components/InitialSection'
import GoalForm from './GoalForm'
import GoalsList from './GoalsList/GoalsList'
import { UserContext } from '../../context/userContext'

export const GoalsContent = () => {
    const { userId } = useContext(UserContext)
    const [addGoalsFormOpen, setAddGoalsFormOpen] = useState(false)

    return (
        <>
            <InitialSection>
                <div className='header'>
                    <h1>My Goals</h1>
                    <AddIcon onClick={() => setAddGoalsFormOpen(true)} />
                </div>
                {userId && (
                    <GoalsList
                        userID={userId}
                        setAddGoalsFormOpen={setAddGoalsFormOpen}
                    />
                )}
                {addGoalsFormOpen && userId && (
                    <GoalForm
                        setGoalsFormOpen={setAddGoalsFormOpen}
                        userID={userId}
                    />
                )}
            </InitialSection>
        </>
    )
}
