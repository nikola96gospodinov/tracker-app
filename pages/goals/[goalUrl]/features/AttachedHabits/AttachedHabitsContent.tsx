import { useContext } from 'react'
import { Box } from '@chakra-ui/react'
import { isEmpty } from 'lodash'

import useGetFilteredDocs from '../../../../../hooks/useGetFilteredDocs'
import { HABITS } from '../../../../habits/constants'
import { Habit } from '../../../../habits/habits.types'
import { Goal } from '../../../goals.types'
import UpdateHabitList from '../UpdateHabitList'
import { UserContext } from '../../../../../context/userContext'
import { Dispatch } from '../../../../../typings'
import EmptyContent from '../EmptyContent'
import AttachedHabitsList from './AttachedHabitsList'

const AttachedHabitsContent: React.FunctionComponent<{
    goal: Goal | undefined
    newElementAdded: boolean
    shortName: string
    setNewElementAdded: Dispatch<boolean>
    type: 'daily' | 'weekly'
}> = ({ goal, newElementAdded, shortName, setNewElementAdded, type }) => {
    const { userId } = useContext(UserContext)
    const { docs: habits } = useGetFilteredDocs<Habit>({
        userID: userId,
        path: HABITS,
        fieldPath: 'type',
        opStr: '==',
        value: type
    })

    const showEmptyContent =
        !newElementAdded && isEmpty(goal?.[`${type}Habits`])

    if (showEmptyContent) return <EmptyContent shortName={shortName} />

    return (
        <Box mt={8}>
            {newElementAdded && (
                <UpdateHabitList
                    allHabits={habits}
                    attachedHabits={goal?.dailyHabits}
                    goal={goal}
                    userID={userId}
                    shortName={shortName}
                    setNewElementAdded={setNewElementAdded}
                />
            )}
            {goal && (
                <AttachedHabitsList goal={goal} habits={habits} type={type} />
            )}
        </Box>
    )
}

export default AttachedHabitsContent
