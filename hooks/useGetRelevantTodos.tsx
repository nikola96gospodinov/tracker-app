import { HabitType } from '../types/habits.types'
import { Todo } from '../types/todos.types'
import { TODOS } from '../constants/todoConstants'
import { today } from '../helpers/date-manipulation-functions'
import { formatWeek } from '../helpers/date-manipulation-functions'
import { thisWeek } from '../helpers/date-manipulation-functions'
import useGetDocs from './useGetDocs'

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

    return { todos: filteredTodos, loading, errorFetching }
}
