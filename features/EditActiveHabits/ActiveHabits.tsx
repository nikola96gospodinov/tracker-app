import { FunctionComponent, useContext } from 'react'
import { Box, Flex, Text, Tooltip } from '@chakra-ui/react'

import { Habit } from '../../types/habits.types'
import { Tag } from '../../components/UIElements/Tag'
import { onKeystoneStatusChange } from '../Habits/helpers/crud-operations'
import { UserContext } from '../../context/userContext'
import { Goal } from '../../types/goals.types'
import { submitDoc } from '../../helpers/crud-operations/crud-operations-main-docs'
import { GOALS } from '../../constants/goalsConstants'

export const ActiveHabits: FunctionComponent<{
    habits: Habit[]
    isOnGoal?: boolean
    goal?: Goal
    activeAttachedHabits?: Habit[]
    activeKeystoneHabits?: Habit[]
}> = ({
    habits,
    isOnGoal,
    goal,
    activeAttachedHabits,
    activeKeystoneHabits
}) => {
    const { userId } = useContext(UserContext)

    const attachedHabits =
        activeAttachedHabits ?? habits.filter(({ isKeystone }) => !isKeystone)
    const keystoneHabits =
        activeKeystoneHabits ?? habits.filter(({ isKeystone }) => isKeystone)

    const changableHabits = isOnGoal ? habits : keystoneHabits

    const onClick = async (habit: Habit) => {
        if (isOnGoal) {
            const newHbaitList = (goal?.[`${habit.type}Habits`] ?? [])?.filter(
                (id) => id !== habit.id
            )

            const orgDoc = {
                ...goal,
                [`${habit.type}Habits`]: newHbaitList
            } as Goal // not ideal but not the end of the world either

            await submitDoc<Goal>({
                path: GOALS,
                orgDoc,
                userID: userId ?? ''
            })
        } else {
            onKeystoneStatusChange({
                userId,
                habitId: habit.id,
                isKeystone: habit.isKeystone
            })
        }
    }

    if (habits.length === 0) return <Text size='lg'>No active habits 🤔</Text>

    return (
        <Flex gap={2} flexWrap='wrap'>
            {!isOnGoal &&
                attachedHabits.map((habit) => (
                    <Tooltip
                        key={habit.id}
                        label='This habit is attached to a goal(s). To remove it from the dashboard unlink it from all goals'
                    >
                        <Box>
                            <Tag text={habit.name} isDisabled />
                        </Box>
                    </Tooltip>
                ))}
            {changableHabits.map((habit) => (
                <Tag
                    key={habit.id}
                    text={habit.name}
                    isActive={isOnGoal ? true : habit.isKeystone}
                    onClick={() => onClick(habit)}
                />
            ))}
        </Flex>
    )
}
