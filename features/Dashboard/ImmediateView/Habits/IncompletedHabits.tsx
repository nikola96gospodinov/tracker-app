import { FunctionComponent } from 'react'
import { Habit } from '../../../../types/habits.types'
import HabitCell from '../../../Habit/HabitCell'

export const IncompletedHabits: FunctionComponent<{
    incompletedHabits: Habit[]
}> = ({ incompletedHabits }) => (
    <>
        {incompletedHabits.map((habit) => (
            <HabitCell key={habit.id} habit={habit} />
        ))}
    </>
)
