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

    return (
        <SimpleGrid
            columns={3}
            spacing={6}
            minChildWidth='300px'
            templateColumns='1fr 1fr 1fr'
        >
            {(activeOptionValue === 'all' ? allTodos : todos).map(
                (todo: Todo) => (
                    <Box key={todo.id}>{todo.title}</Box>
                )
            )}
        </SimpleGrid>
    )
}

export default TodosList
