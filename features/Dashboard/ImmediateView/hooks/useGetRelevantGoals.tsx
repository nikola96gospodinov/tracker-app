import moment from 'moment'
import { GOALS } from '../../../../constants/goalsConstants'
import {
    today,
    formatWeek,
    thisWeek
} from '../../../../helpers/date-manipulation-functions'
import useGetDocs from '../../../../hooks/useGetDocs'
import { Goal } from '../../../../types/goals.types'
import { HabitType } from '../../../../types/habits.types'

export const useGetRelevantGoals = (type: HabitType) => {
    const {
        docs: goals,
        loading,
        errorFetching
    } = useGetDocs<Goal>({
        path: GOALS
    })

    const filteredGoals = goals?.filter((goal) => {
        if (type === 'daily') {
            return (
                moment(goal.deadline).isBefore(today) || goal.deadline === today
            )
        }

        return goal.deadline !== today && formatWeek(goal.deadline) === thisWeek
    })

    const completedGoals = filteredGoals?.filter((goal) => {
        const isCompleted = goal.status === 'completed'

        if (type === 'daily') {
            return isCompleted && goal.completedOn === today
        }

        return isCompleted && formatWeek(goal.completedOn) === thisWeek
    })

    const incompletedGoals = filteredGoals?.filter(
        (goal) => goal.status === 'active'
    )

    return {
        completedGoals,
        incompletedGoals,
        loading,
        errorFetching
    }
}
