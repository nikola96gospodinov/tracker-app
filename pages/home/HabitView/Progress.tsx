import { FunctionComponent } from 'react'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import { Habit } from '../../habits/habits.types'

export const Progress: FunctionComponent<{
    dailyHabitsLength: number
    completedHabitsLength: number
    incompletedHabits: Habit[]
}> = ({ dailyHabitsLength, completedHabitsLength, incompletedHabits }) => {
    const partialProgress = incompletedHabits.reduce((accumulator, habit) => {
        if (habit.target > 1 && habit.progress) {
            return accumulator + habit.progress.progress / habit.target
        }

        return accumulator
    }, 0)
    const totalProgress = completedHabitsLength + partialProgress

    const percentageCompleted = Math.round(
        (totalProgress / dailyHabitsLength) * 100
    )

    const color = (() => {
        if (percentageCompleted < 50) return 'red.400'
        if (percentageCompleted < 80) return 'yellow.500'
        return 'green.400'
    })()

    return (
        <CircularProgress
            value={percentageCompleted}
            color={color}
            size={36}
            trackColor='neutral.100'
            thickness={6}
            capIsRound
            h={36}
        >
            <CircularProgressLabel fontSize='3xl' fontWeight={600}>
                {percentageCompleted}%
            </CircularProgressLabel>
        </CircularProgress>
    )
}
