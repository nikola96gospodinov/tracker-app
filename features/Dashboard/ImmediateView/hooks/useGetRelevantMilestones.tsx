import { MILESTONES } from '../../../../constants/goalsConstants'
import { thisWeek } from '../../../../helpers/date-manipulation-functions'
import {
    formatWeek,
    today
} from '../../../../helpers/date-manipulation-functions'
import useGetDocs from '../../../../hooks/useGetDocs'
import { Milestone } from '../../../../types/goals.types'
import { HabitType } from '../../../../types/habits.types'

export const useGetRelevantMilestones = (type: HabitType) => {
    const {
        docs: milestones,
        loading,
        errorFetching
    } = useGetDocs<Milestone>({
        path: MILESTONES
    })

    const filteredMilestones = milestones?.filter((milestone) => {
        if (type === 'daily') {
            return milestone.deadline === today
        }

        return (
            milestone.deadline !== today &&
            formatWeek(milestone.deadline) === thisWeek
        )
    })

    const completedMilestones = filteredMilestones?.filter((milestone) => {
        if (type === 'daily') {
            return milestone.completed && milestone.completedOn === today
        }

        return (
            milestone.completed &&
            formatWeek(milestone.completedOn) === thisWeek
        )
    })

    const incompletedMilestones = filteredMilestones?.filter(
        (milestone) => !milestone.completed
    )

    return {
        completedMilestones,
        incompletedMilestones,
        loading,
        errorFetching
    }
}
