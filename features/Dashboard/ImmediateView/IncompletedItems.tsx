import { SimpleGrid, Text } from '@chakra-ui/react'
import { FunctionComponent } from 'react'

import { Habit, HabitType } from '../../../types/habits.types'
import { Todo } from '../../../types/todos.types'
import { IncompletedHabits } from './Habits/IncompletedHabits'
import { IncompletedTodos } from './Todos/IncompletedTodos'
import { Milestone } from '../../../types/goals.types'
import { IncompletedMilestones } from './Milestones/IncompletedMilestones'

export const IncompletedItems: FunctionComponent<{
    habits: Habit[]
    todos: Todo[]
    milestones: Milestone[]
    type: HabitType
}> = ({ habits, todos, milestones, type }) => {
    const totalItems = habits.length + todos.length + milestones.length

    if (totalItems === 0)
        return (
            <Text fontSize='xl' fontWeight={600} mt={4}>
                You&apos;ve completed all your targets for the{' '}
                {type === 'daily' ? 'day' : 'week'} 🥳
            </Text>
        )

    return (
        <SimpleGrid columns={2} gap={4} w='100%'>
            <IncompletedMilestones milestones={milestones} />
            <IncompletedHabits incompletedHabits={habits} />
            <IncompletedTodos todos={todos} />
        </SimpleGrid>
    )
}
