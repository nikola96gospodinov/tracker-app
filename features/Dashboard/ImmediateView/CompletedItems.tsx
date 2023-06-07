import { FunctionComponent } from 'react'
import { SimpleGrid } from '@chakra-ui/react'

import { Habit, HabitType } from '../../../types/habits.types'
import { Todo } from '../../../types/todos.types'
import { CompletedHabits } from './Habits/CompletedHabits'
import { CompletedTodos } from './Todos/CompletedTodos'
import { Goal, Milestone } from '../../../types/goals.types'
import { CompletedMilestones } from './Milestones/CompletedMilestones'
import { CompletedGoals } from './Goals/CompletedGoals'
import { PartlyCompletedHabits } from './Habits/PartlyCompletedHabits'

export const CompletedItems: FunctionComponent<{
    habits: Habit[]
    todos: Todo[]
    milestones: Milestone[]
    goals: Goal[]
    type: HabitType
}> = ({ habits, todos, milestones, goals, type }) => (
    <SimpleGrid columns={3} gap={4} w='100%' pt={4}>
        <CompletedGoals goals={goals} />
        <CompletedMilestones milestones={milestones} />
        <CompletedHabits completedHabits={habits} />
        <PartlyCompletedHabits type={type} />
        <CompletedTodos todos={todos} />
    </SimpleGrid>
)
