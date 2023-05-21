import { Box } from '@chakra-ui/react'
import { isEmpty } from 'lodash'

import useGetFilteredDocs from '../../../hooks/useGetFilteredDocs'
import { HABITS } from '../../../constants/habitsConstants'
import { Habit, HabitType } from '../../../types/habits.types'
import { Goal } from '../../../types/goals.types'
import EmptyContent from '../EmptyContent'
import AttachedHabitsList from './AttachedHabitsList'

const AttachedHabitsContent: React.FunctionComponent<{
    goal: Goal | undefined
    shortName: string
    type: HabitType
}> = ({ goal, shortName, type }) => {
    const { docs: habits } = useGetFilteredDocs<Habit>({
        path: HABITS,
        fieldPath: 'type',
        opStr: '==',
        value: type
    })

    const showEmptyContent = isEmpty(goal?.[`${type}Habits`])

    if (showEmptyContent) return <EmptyContent shortName={shortName} />

    return (
        <Box mt={8}>
            {goal && (
                <AttachedHabitsList goal={goal} habits={habits} type={type} />
            )}
        </Box>
    )
}

export default AttachedHabitsContent
