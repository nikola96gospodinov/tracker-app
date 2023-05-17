import { useContext } from 'react'
import { Box } from '@chakra-ui/react'
import { isEmpty } from 'lodash'

import useGetFilteredDocs from '../../../../../hooks/useGetFilteredDocs'
import { HABITS } from '../../../../habits/constants'
import { Habit } from '../../../../habits/habits.types'
import { Goal } from '../../../goals.types'
import { UserContext } from '../../../../../context/userContext'
import EmptyContent from '../EmptyContent'
import AttachedHabitsList from './AttachedHabitsList'

const AttachedHabitsContent: React.FunctionComponent<{
    goal: Goal | undefined
    shortName: string
    type: 'daily' | 'weekly'
}> = ({ goal, shortName, type }) => {
    const { userId } = useContext(UserContext)
    const { docs: habits } = useGetFilteredDocs<Habit>({
        userID: userId,
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
