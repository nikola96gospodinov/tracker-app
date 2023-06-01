import { FunctionComponent, useContext } from 'react'
import { Flex, Text } from '@chakra-ui/react'

import { Goal } from '../../../../types/goals.types'
import { Tag } from '../../../../components/UIElements/Tag'
import { Habit } from '../../../../types/habits.types'
import { submitDoc } from '../../../../helpers/crud-operations/crud-operations-main-docs'
import { GOALS } from '../../../../constants/goalsConstants'
import { UserContext } from '../../../../context/userContext'

export const AttachedGoals: FunctionComponent<{
    goals: Goal[] | undefined
    habit: Habit
}> = ({ goals, habit }) => {
    const { userId } = useContext(UserContext)

    const onClick = (goal: Goal) => {
        const filteredHabits = goal[`${habit.type}Habits`]?.filter(
            (id) => id !== habit.id
        )

        const orgDoc = {
            id: goal.id
        } as Goal
        orgDoc[`${habit.type}Habits`] = filteredHabits

        submitDoc<Goal>({
            path: GOALS,
            userID: userId,
            orgDoc
        })
    }

    if (goals?.length === 0) return <Text size='lg'>No attached goals 🤔</Text>

    return (
        <Flex gap={2} flexWrap='wrap'>
            {goals?.map((goal) => (
                <Tag
                    key={goal.id}
                    text={goal.name}
                    isActive
                    onClick={() => onClick(goal)}
                />
            ))}
        </Flex>
    )
}
