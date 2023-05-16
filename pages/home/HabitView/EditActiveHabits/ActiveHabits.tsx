import { FunctionComponent, useContext } from 'react'
import { Box, Flex, Text, Tooltip } from '@chakra-ui/react'

import { Habit } from '../../../habits/habits.types'
import { Tag } from '../../../../components/UIElements/Tag'
import { onKeystoneStatusChange } from '../../../habits/helpers'
import { UserContext } from '../../../../context/userContext'

export const ActiveHabits: FunctionComponent<{
    habits: Habit[]
}> = ({ habits }) => {
    const { userId } = useContext(UserContext)

    const attachedHabits = habits.filter(({ isKeystone }) => !isKeystone)
    const keystoneHabits = habits.filter(({ isKeystone }) => isKeystone)

    if (habits.length === 0) return <Text size='lg'>No active habits 🤔</Text>

    return (
        <Flex gap={2} flexWrap='wrap'>
            {attachedHabits.map((habit) => (
                <Tooltip
                    key={habit.id}
                    label='This habit is attached to a goal(s). To remove it from the dashboard unlink it from all goals'
                >
                    <Box>
                        <Tag text={habit.name} isDisabled />
                    </Box>
                </Tooltip>
            ))}
            {keystoneHabits.map((habit) => (
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
