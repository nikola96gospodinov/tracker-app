import { TODO, TODOS } from '../../../../constants/todoConstants'
import useGetFilteredDocs from '../../../../hooks/useGetFilteredDocs'
import { Todo } from '../../../../types/todos.types'
import { ActivePeriod } from '../../data'
import { filterBasedOnPeriod } from '../../helpers'

interface Props {
    activePeriod?: ActivePeriod
    includeWithNoDeadline?: boolean
}

export const useGetRelevantTodos = ({
    activePeriod,
    includeWithNoDeadline
}: Props) => {
    const {
        docs: todos,
        loading,
        errorFetching
    } = useGetFilteredDocs<Todo>({
        path: TODOS,
        fieldPath: 'status',
        opStr: '==',
        value: 'active'
    })

    const relevantTodos = todos
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
        .map((todo) => ({
            ...todo,
            type: TODO
        }))

    return { relevantTodos, loading, errorFetching }
}
