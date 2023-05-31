import useGetFilteredDocs from '../../../../hooks/useGetFilteredDocs'
import { GOALS, MILESTONES } from '../../../../constants/goalsConstants'
import { Goal, Milestone } from '../../../../types/goals.types'
import { ActivePeriod } from '../../data'
import { filterBasedOnPeriod } from '../../helpers'

interface Props {
    activePeriod?: ActivePeriod
    includeWithNoDeadline?: boolean
}

export const useGetRelentlessMilestones = ({
    activePeriod,
    includeWithNoDeadline
}: Props) => {
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
    const relevantMilestones = milestones
        // Filter to include only milestons that are attached to active goals
        ?.filter(({ goalID }) => activeGoalsIds?.includes(goalID))
        // Filter to include only milestones that are in the active period
        .filter(({ deadline }) => {
            if (!deadline) return true // that will be taken care of in the next filter
            return filterBasedOnPeriod(deadline, activePeriod)
        })
        // Filter based on deadline existence
        .filter(({ deadline }) => {
            if (includeWithNoDeadline) return true
            return !!deadline
        })
        // Sort by deadline and put the ones with no deadline (if any) at the end
        .sort((a, b) => {
            if (!a.deadline) return 1
            if (!b.deadline) return -1
            return a.deadline.localeCompare(b.deadline)
        })

    const loading = loadingMilestones || loadingGoals
    const errorFetching = errorFetchingMilestones || errorFetchingGoals

    return { relevantMilestones, loading, errorFetching }
}
