import { FunctionComponent, useContext } from 'react'
import { useToast } from '@chakra-ui/react'

import { UpdateMetrics } from '../UpdateMetrics/UpdateMetrics'
import { Goal } from '../../types/goals.types'
import { submitDoc } from '../../helpers/crud-operations/crud-operations-main-docs'
import { GOALS } from '../../constants/goalsConstants'
import { UserContext } from '../../context/userContext'
import { UnarchveGoal } from './UnarchiveGoal'
import { today } from '../../helpers/date-manipulation-functions'

export const UpdateGoalMetrics: FunctionComponent<{
    goal: Goal
}> = ({ goal }) => {
    const toast = useToast()
    const { userId } = useContext(UserContext)
    const isCompleted = goal.status === 'completed'
    const toggleText = isCompleted ? 'Completed! 🥳' : 'Set as complete'

    const onToggleChange = () => {
        submitDoc<Goal>({
            path: GOALS,
            orgDoc: {
                id: goal.id,
                status: isCompleted ? 'active' : 'completed',
                completedOn: !isCompleted ? today : ''
            } as Goal,
            userID: userId,
            toast,
            toastSuccessMessage: `Goal set to ${
                isCompleted ? 'active' : 'completed'
            } successfully`,
            toastErrorMessage: `There was an error setting the goal to ${
                isCompleted ? 'active' : 'completed'
            }. Please try again`
        })
    }

    const onProgressChange = (progress: number, target: number) => {
        const isCompleted = progress >= target
        const status = isCompleted ? 'completed' : goal.status

        submitDoc<Goal>({
            path: GOALS,
            orgDoc: {
                id: goal.id,
                progress: progress,
                target: target,
                status,
                completedOn: isCompleted ? today : ''
            } as Goal,
            userID: userId,
            toast,
            toastSuccessMessage: 'Goal progress updated successfully',
            toastErrorMessage:
                'There was an error updating the goal progress. Please try again'
        })
    }

    if (goal.status === 'archived') return <UnarchveGoal goalId={goal.id} />

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
