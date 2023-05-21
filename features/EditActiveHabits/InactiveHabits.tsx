import { FunctionComponent, useContext } from 'react'
import { Flex, Text } from '@chakra-ui/react'

import { Habit } from '../../pages/habits/habits.types'
import { Tag } from '../../components/UIElements/Tag'
import { onKeystoneStatusChange } from '../../pages/habits/helpers'
import { UserContext } from '../../context/userContext'
import { Goal } from '../../pages/goals/goals.types'
import { submitDoc } from '../../helpers/crud-operations/crud-operations-main-docs'
import { GOALS } from '../../pages/goals/constants'

export const InactiveHabits: FunctionComponent<{
    habits: Habit[]
    isOnGoal?: boolean
    goal?: Goal
}> = ({ habits, isOnGoal, goal }) => {
    const { userId } = useContext(UserContext)

    const onClick = async (habit: Habit) => {
        if (isOnGoal) {
            const newHabits = [
                ...(goal?.[`${habit.type}Habits`] ?? []),
                habit.id
            ]

            const orgDoc = {
                ...goal,
                [`${habit.type}Habits`]: newHabits
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

    if (habits.length === 0) return <Text>No inactive habits 🤔</Text>

    return (
        <Flex gap={2} flexWrap='wrap'>
            {habits.map((habit) => (
                <Tag
                    key={habit.id}
                    text={habit.name}
                    isActive={isOnGoal ? false : habit.isKeystone}
                    onClick={() => onClick(habit)}
                />
            ))}
        </Flex>
    )
}
