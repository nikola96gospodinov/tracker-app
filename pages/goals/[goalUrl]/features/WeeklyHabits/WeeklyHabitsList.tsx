import { SimpleGrid } from '@chakra-ui/react'
import { Habit } from '../../../../habits/habits.types'
import { Goal } from '../../../goals.types'
import HabitCell from '../HabitCell'

const WeeklyHabitsList: React.FunctionComponent<{
    goal: Goal
    weeklyTargets?: Habit[]
}> = ({ goal, weeklyTargets }) => {
    const attachedTargets = weeklyTargets?.filter(({ id }) =>
        goal.weeklyHabits?.includes(id)
    )

    return (
        <SimpleGrid columns={3} gap={4} mt={4}>
            {attachedTargets?.map((target) => (
                <HabitCell key={target.id} habit={target} />
            ))}
        </SimpleGrid>
    )
}

export default WeeklyHabitsList
