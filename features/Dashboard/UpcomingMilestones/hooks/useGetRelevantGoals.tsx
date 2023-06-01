import { GOAL, GOALS } from '../../../../constants/goalsConstants'
import useGetFilteredDocs from '../../../../hooks/useGetFilteredDocs'
import { Goal } from '../../../../types/goals.types'
import { ActivePeriod } from '../../data'
import { filterBasedOnPeriod } from '../../helpers'

interface Props {
    activePeriod?: ActivePeriod
    includeWithNoDeadline?: boolean
}

export const useGetRelevantGoals = ({
    activePeriod,
    includeWithNoDeadline
}: Props) => {
    const {
        docs: goals,
        loading,
        errorFetching
    } = useGetFilteredDocs<Goal>({
        path: GOALS,
        fieldPath: 'status',
        opStr: '==',
        value: 'active'
    })

    const relevantGoals = goals
        // Filter to include only milestones that are in the active period
        ?.filter(({ deadline }) => {
            if (!deadline) return true // that will be taken care of in the next filter
            return filterBasedOnPeriod(deadline, activePeriod)
        })
        // Filter based on deadline existence
        .filter(({ deadline }) => {
            if (includeWithNoDeadline) return true
            return !!deadline
        })
        .map((goal) => ({
            ...goal,
            type: GOAL
        }))

    return { relevantGoals, loading, errorFetching }
}
