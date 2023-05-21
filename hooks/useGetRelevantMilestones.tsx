import useGetFilteredDocs from './useGetFilteredDocs'
import { GOALS, MILESTONES } from '../constants/goalsConstants'
import { Goal, Milestone } from '../types/goals.types'

export const useGetRelentlessMilestones = () => {
    const {
        docs: milestones,
        loading: loadingMilestones,
        errorFetching: errorFetchingMilestones
    } = useGetFilteredDocs<Milestone>({
        path: MILESTONES,
        fieldPath: 'completed',
        opStr: '==',
        value: false
    })

    const {
        docs: activeGoals,
        loading: loadingGoals,
        errorFetching: errorFetchingGoals
    } = useGetFilteredDocs<Goal>({
        path: GOALS,
        fieldPath: 'status',
        opStr: '==',
        value: 'active'
    })

    const activeGoalsIds = activeGoals?.map(({ id }) => id)
    const relativeMilestones = milestones
        ?.filter(({ goalID }) => activeGoalsIds?.includes(goalID))
        .sort((a, b) => {
            if (!a.deadline) return 1
            if (!b.deadline) return -1
            return a.deadline.localeCompare(b.deadline)
        })

    const loading = loadingMilestones || loadingGoals
    const errorFetching = errorFetchingMilestones || errorFetchingGoals

    return { relativeMilestones, loading, errorFetching }
}
