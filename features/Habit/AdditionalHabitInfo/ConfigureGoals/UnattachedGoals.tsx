import { FunctionComponent, useContext } from 'react'
import { Flex, Text } from '@chakra-ui/react'

import { Goal } from '../../../../types/goals.types'
import { Tag } from '../../../../components/UIElements/Tag'
import { Habit } from '../../../../types/habits.types'
import { submitDoc } from '../../../../helpers/crud-operations/crud-operations-main-docs'
import { GOALS } from '../../../../constants/goalsConstants'
import { UserContext } from '../../../../context/userContext'

export const UnattachedGoals: FunctionComponent<{
    goals: Goal[] | undefined
    habit: Habit
}> = ({ goals, habit }) => {
    const { userId } = useContext(UserContext)

    const onClick = (goal: Goal) => {
        const newHabits = [...(goal[`${habit.type}Habits`] ?? []), habit.id]

        const orgDoc = {
            id: goal.id
        } as Goal
        orgDoc[`${habit.type}Habits`] = newHabits

        submitDoc<Goal>({
            path: GOALS,
            userID: userId,
            orgDoc
        })
    }

    if (goals?.length === 0) return <Text size='lg'>No goals left 🤔</Text>

    return (
        <Flex gap={2} flexWrap='wrap'>
            {goals?.map((goal) => (
                <Tag
                    key={goal.id}
                    text={goal.name}
                    isActive={false}
                    onClick={() => onClick(goal)}
                />
            ))}
        </Flex>
    )
}
