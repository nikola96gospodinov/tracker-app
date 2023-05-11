import { SimpleGrid } from '@chakra-ui/react'
import { Habit } from '../../../../habits/habits.types'
import { Goal } from '../../../goals.types'
import HabitCell from '../HabitCell'

const DailyHabitsList: React.FunctionComponent<{
    goal: Goal
    dailyHabits?: Habit[]
}> = ({ goal, dailyHabits }) => {
    const attachedHabits = dailyHabits?.filter(({ id }) =>
        goal.dailyHabits?.includes(id)
    )

    return (
        <SimpleGrid columns={3} gap={4} mt={4}>
            {attachedHabits?.map((habit) => (
                <HabitCell key={habit.id} habit={habit} />
            ))}
        </SimpleGrid>
    )
}

export default DailyHabitsList
