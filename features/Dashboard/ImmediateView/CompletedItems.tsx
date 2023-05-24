import { FunctionComponent } from 'react'
import { SimpleGrid } from '@chakra-ui/react'

import { Habit } from '../../../types/habits.types'
import { Todo } from '../../../types/todos.types'
import { CompletedHabits } from './Habits/CompletedHabits'
import { CompletedTodos } from './Todos/CompletedTodos'

export const CompletedItems: FunctionComponent<{
    habits: Habit[]
    todos: Todo[]
}> = ({ habits, todos }) => (
    <SimpleGrid columns={3} gap={4} w='100%' pt={4}>
        <CompletedHabits completedHabits={habits} />
        <CompletedTodos todos={todos} />
    </SimpleGrid>
)
