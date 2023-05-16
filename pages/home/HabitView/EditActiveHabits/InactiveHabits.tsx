import { FunctionComponent, useContext } from 'react'
import { Flex, Text } from '@chakra-ui/react'

import { Habit } from '../../../habits/habits.types'
import { Tag } from '../../../../components/UIElements/Tag'
import { onKeystoneStatusChange } from '../../../habits/helpers'
import { UserContext } from '../../../../context/userContext'

export const InactiveHabits: FunctionComponent<{
    habits: Habit[]
}> = ({ habits }) => {
    const { userId } = useContext(UserContext)

    if (habits.length === 0) return <Text>No inactive habits 🤔</Text>

    return (
        <Flex gap={2} flexWrap='wrap'>
            {habits.map((habit) => (
                <Tag
                    key={habit.id}
                    text={habit.name}
                    isActive={habit.isKeystone}
                    onClick={() =>
                        onKeystoneStatusChange({
                            userId,
                            habitId: habit.id,
                            isKeystone: habit.isKeystone
                        })
                    }
                />
            ))}
        </Flex>
    )
}
