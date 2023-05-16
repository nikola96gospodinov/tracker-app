import { SimpleGrid } from '@chakra-ui/react'
import { Habit } from '../../../../habits/habits.types'
import { Goal } from '../../../goals.types'
import HabitCell from '../../../../../features/HabitCell'

const AttachedHabitsList: React.FunctionComponent<{
    goal: Goal
    type: 'daily' | 'weekly'
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
