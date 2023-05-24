import { HabitType } from '../../../../types/habits.types'
import { Todo } from '../../../../types/todos.types'
import { TODOS } from '../../../../constants/todoConstants'
import { today } from '../../../../helpers/date-manipulation-functions'
import { formatWeek } from '../../../../helpers/date-manipulation-functions'
import { thisWeek } from '../../../../helpers/date-manipulation-functions'
import useGetDocs from '../../../../hooks/useGetDocs'

export const useGetRelevantTodos = (type: HabitType) => {
    const {
        docs: todos,
        loading,
        errorFetching
    } = useGetDocs<Todo>({
        path: TODOS
    })

    const filteredTodos = (todos ?? []).filter((todo) => {
        if (type === 'daily') {
            return todo.dueBy === today
        }

        return todo.dueBy !== today && formatWeek(todo.dueBy) === thisWeek
    })

    const completedTodos = filteredTodos.filter(({ status, completedAt }) => {
        if (type === 'daily') {
            return status === 'completed' && completedAt === today
        } else {
            return (
                status === 'completed' && formatWeek(completedAt) === thisWeek
            )
        }
    })

    const incompletedTodos = filteredTodos.filter(
        ({ status }) => status === 'active'
    )

    return { completedTodos, incompletedTodos, loading, errorFetching }
}
