import { GOAL, MILESTONE } from '../../../../constants/goalsConstants'
import { TODO } from '../../../../constants/todoConstants'
import { ActivePeriod } from '../../data'
import { useGetRelevantGoals } from './useGetRelevantGoals'
import { useGetRelevantMilestones } from './useGetRelevantMilestones'
import { useGetRelevantTodos } from './useGetRelevantTodos'

interface Doc {
    deadline?: string
    type: typeof MILESTONE | typeof GOAL | typeof TODO
    [key: string]: any
}

interface Props {
    activePeriod?: ActivePeriod
    includeWithNoDeadline?: boolean
}

export const useGetSortedDocs = ({
    activePeriod,
    includeWithNoDeadline
}: Props) => {
    const {
        relevantMilestones: milestones,
        loading: loadingMilestones,
        errorFetching: errorFetchingMilestones
    } = useGetRelevantMilestones({
        activePeriod,
        includeWithNoDeadline
    })

    const {
        relevantGoals: goals,
        loading: loadingGoals,
        errorFetching: errorFetchingGoals
    } = useGetRelevantGoals({
        activePeriod,
        includeWithNoDeadline
    })

    const {
        relevantTodos: todos,
        loading: loadingTodos,
        errorFetching: errorFetchingTodos
    } = useGetRelevantTodos({
        activePeriod,
        includeWithNoDeadline
    })

    // @ts-ignore
    const allDocs: Doc[] = (milestones ?? []).concat(goals ?? [], todos ?? [])
    const sortedDocs = allDocs.sort((a, b) => {
        if (!a.deadline) return 1
        if (!b.deadline) return -1
        return a.deadline.localeCompare(b.deadline)
    })

    const loading = loadingMilestones || loadingGoals || loadingTodos
    const errorFetching =
        errorFetchingMilestones || errorFetchingGoals || errorFetchingTodos

    return { sortedDocs, loading, errorFetching }
}
