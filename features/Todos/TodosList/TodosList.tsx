import { Box, SimpleGrid } from '@chakra-ui/react'
import { FunctionComponent } from 'react'

import { ErrorFetchingDocs } from '../../../components/Docs/ErrorFetchingDocs'
import NoDocsYet from '../../../components/Docs/NoDocsYet'
import { NoFilteredDocs } from '../../../components/Docs/NoFilteredDocs'
import useGetDocs from '../../../hooks/useGetDocs'
import useGetFilteredDocs from '../../../hooks/useGetFilteredDocs'
import { Spinner } from '../../../components/UIElements/Spinner'
import { Todo } from '../../../types/todos.types'
import { TODOS } from '../../../constants/todoConstants'
import { TodoBox } from './TodoBox'

const TodosList: FunctionComponent<{
    onAddTodosFormOpen: () => void
    activeOptionValue: string
}> = ({ onAddTodosFormOpen, activeOptionValue }) => {
    const { docs: allTodos, errorFetching: errorFetchingAllTodos } =
        useGetDocs<Todo>({
            path: TODOS
        })
    const { docs: todos, errorFetching } = useGetFilteredDocs<Todo>({
        path: TODOS,
        fieldPath: 'status',
        opStr: '==',
        value: activeOptionValue
    })

    if (errorFetchingAllTodos || errorFetching)
        return <ErrorFetchingDocs docType={TODOS} />

    if (!allTodos || !todos) return <Spinner text='Loading...' />

    if (allTodos.length === 0)
        return (
            <NoDocsYet docType={TODOS} onClick={() => onAddTodosFormOpen()} />
        )

    if (todos.length === 0 && activeOptionValue !== 'all')
        return <NoFilteredDocs docType={TODOS} />

    const activeTodos = activeOptionValue === 'all' ? allTodos : todos
    const sortedTodos = activeTodos.sort((a, b) => {
        if (!a.deadline) return 1
        if (!b.deadline) return -1
        return a.deadline.localeCompare(b.deadline)
    })

    return (
        <SimpleGrid
            columns={3}
            spacing={6}
            minChildWidth='300px'
            templateColumns='1fr 1fr 1fr'
        >
            {sortedTodos.map((todo: Todo) => (
                <TodoBox key={todo.id} todo={todo} />
            ))}
        </SimpleGrid>
    )
}

export default TodosList
