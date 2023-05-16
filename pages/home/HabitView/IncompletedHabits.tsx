import { FunctionComponent } from 'react'
import { SimpleGrid, Text } from '@chakra-ui/react'
import { Habit } from '../../habits/habits.types'
import HabitCell from '../../../features/HabitCell'

export const IncompletedHabits: FunctionComponent<{
    incompletedHabits: Habit[]
    type: 'daily' | 'weekly'
}> = ({ incompletedHabits, type }) => {
    if (incompletedHabits.length === 0)
        return (
            <Text fontSize='xl' fontWeight={600} mt={4}>
                You&apos;ve completed all your targets for the{' '}
                {type === 'daily' ? 'day' : 'week'} 🥳
            </Text>
        )

    return (
        <>
            <SimpleGrid columns={2} gap={4} w='100%'>
                {incompletedHabits.map((habit) => (
                    <HabitCell key={habit.id} habit={habit} />
                ))}
            </SimpleGrid>
        </>
    )
}
