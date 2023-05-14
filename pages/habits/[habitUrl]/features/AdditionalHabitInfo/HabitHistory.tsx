import { Flex, Tooltip, Text, VStack } from '@chakra-ui/react'
import { FunctionComponent } from 'react'

import InfoIcon from '../../../../../components/Icons/InfoIcon'
import { Habit } from '../../../habits.types'
import { getLastCompleted, getLongestStreakRange } from '../../../helpers'

export const HabitHistory: FunctionComponent<{ habit: Habit }> = ({
    habit
}) => {
    const lastCompleted = habit.currentStreak?.end ?? habit.longestStreak.end
    const lastCompletedFormatted = getLastCompleted(lastCompleted, habit.type)

    const longestStreakRange = getLongestStreakRange(
        habit.longestStreak,
        habit.type
    )

    return (
        <VStack mt={8} ml={4} align='flex-start'>
            <Flex fontSize='lg' align='center'>
                <Text as='strong'>Longest Streak:</Text>
                <Text>🔥{habit.longestStreak.streak}</Text>
                {longestStreakRange && (
                    <Tooltip
                        label={longestStreakRange}
                        aria-label='Longest streak range'
                    >
                        <Text as='span'>
                            <InfoIcon
                                ml={1}
                                color='purple.700'
                                mb={2}
                                boxSize={4}
                            />
                        </Text>
                    </Tooltip>
                )}
            </Flex>
            <Flex gap={2} fontSize='lg'>
                <Text as='strong'>Last Completed:</Text>
                <Text>{lastCompletedFormatted}</Text>
            </Flex>
        </VStack>
    )
}
