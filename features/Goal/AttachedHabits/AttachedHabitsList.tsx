import { SimpleGrid } from '@chakra-ui/react'
import { Habit, HabitType } from '../../../types/habits.types'
import { Goal } from '../../../types/goals.types'
import HabitCell from '../../Habit/HabitCell'

const AttachedHabitsList: React.FunctionComponent<{
    goal: Goal
    type: HabitType
    habits?: Habit[]
}> = ({ goal, habits, type }) => {
    const attachedHabits = habits?.filter(({ id }) =>
        goal[`${type}Habits`]?.includes(id)
    )

    return (
        <SimpleGrid columns={3} gap={4} mt={4}>
            {attachedHabits?.map((habit) => (
                <HabitCell key={habit.id} habit={habit} />
            ))}
        </SimpleGrid>
    )
}

export default AttachedHabitsList
