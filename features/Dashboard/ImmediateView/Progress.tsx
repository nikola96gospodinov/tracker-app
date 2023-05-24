import { FunctionComponent } from 'react'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

import { Habit } from '../../../types/habits.types'
import { calculatePartialProgress } from '../helpers'

export const Progress: FunctionComponent<{
    totalLength: number
    completedHabitsLength: number
    incompletedHabits: Habit[]
    completedTodosLength: number
}> = ({
    totalLength,
    completedHabitsLength,
    incompletedHabits,
    completedTodosLength
}) => {
    const partialProgress = calculatePartialProgress(incompletedHabits)
    const totalProgress =
        completedHabitsLength + partialProgress + completedTodosLength
    const percentageCompleted = Math.round((totalProgress / totalLength) * 100)

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
