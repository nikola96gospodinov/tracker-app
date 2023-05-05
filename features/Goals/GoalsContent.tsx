import { useContext, useState } from 'react'

import InitialSection from '../../components/InitialSection'
import GoalForm from './GoalForm'
import GoalsList from './GoalsList/GoalsList'
import { UserContext } from '../../context/userContext'
import { DocHeader } from '../../components/Docs/DocHeader'

export const GoalsContent = () => {
    const { userId } = useContext(UserContext)
    const [addGoalsFormOpen, setAddGoalsFormOpen] = useState(false)

    return (
        <>
            <InitialSection>
                <DocHeader
                    heading='My Goals'
                    onClick={() => setAddGoalsFormOpen(true)}
                />
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
