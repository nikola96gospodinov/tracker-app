import { FunctionComponent } from 'react'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

export const Progress: FunctionComponent<{
    dailyHabitsLength: number
    completedHabitsLength: number
}> = ({ dailyHabitsLength, completedHabitsLength }) => {
    const percentageCompleted = Math.round(
        (completedHabitsLength / dailyHabitsLength) * 100
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
                {completedHabitsLength}/{dailyHabitsLength}
            </CircularProgressLabel>
        </CircularProgress>
    )
}
