import { FunctionComponent, useContext } from 'react'
import { UpdateMetrics } from '../../../../features/UpdateMetrics/UpdateMetrics'
import { Goal } from '../../goals.types'
import { submitDoc } from '../../../../helpers/crud-operations/crud-operations-main-docs'
import { GOALS } from '../../constants'
import { UserContext } from '../../../../context/userContext'

export const UpdateGoalMetrics: FunctionComponent<{
    goal: Goal
}> = ({ goal }) => {
    const { userId } = useContext(UserContext)
    const toggleText =
        goal.status === 'completed' ? 'Completed! 🥳' : 'Set as complete'

    const onToggleChange = () => {
        submitDoc<Goal>({
            path: GOALS,
            orgDoc: {
                id: goal.id,
                status: goal.status === 'completed' ? 'active' : 'completed'
            } as Goal,
            userID: userId
        })
    }

    const onProgressChange = (progress: number, target: number) => {
        const status = progress >= target ? 'completed' : goal.status
        console.log(progress)

        submitDoc<Goal>({
            path: GOALS,
            orgDoc: {
                id: goal.id,
                progress: progress,
                target: target,
                status
            } as Goal,
            userID: userId
        })
    }

    return (
        <UpdateMetrics
            toggleText={toggleText}
            onToggleChange={onToggleChange}
            isCompleted={goal.status === 'completed'}
            target={goal.target}
            progress={goal.progress}
            onProgressChange={onProgressChange}
        />
    )
}
