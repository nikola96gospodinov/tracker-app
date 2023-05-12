import { Flex, Heading, SimpleGrid, Text, Tooltip } from '@chakra-ui/react'

import { Habit } from '../../habits.types'
import {
    getCurrentStreak,
    getLastCompleted,
    getLongestStreakRange
} from '../../helpers'
import { useGetRelevantGoals } from '../../../../hooks/useGetRelevantGoals'
import { Spinner } from '../../../../components/UIElements/Spinner'
import { GoalBox } from '../../../goals/features/GoalsList/GoalBox'
import { UpdateHabitMetrics } from '../../features/UpdateHabitMetrics/UpdateHabitMetrics'
import { DocActions } from '../../../../components/Docs/DocActions'
import InfoIcon from '../../../../components/Icons/InfoIcon'
import { Goal } from '../../../goals/goals.types'

const HabitInfo: React.FunctionComponent<{
    habit: Habit
    onEditFormOpen: () => void
    onDeleteWarningOpen: () => void
}> = ({ habit, onEditFormOpen, onDeleteWarningOpen }) => {
    const lastCompleted = habit.currentStreak?.end ?? habit.longestStreak.end
    const lastCompletedFormatted = getLastCompleted(lastCompleted, habit.type)
    const { isGoals, relevantGoals, loading } = useGetRelevantGoals({
        habitID: habit.id,
        habitType: habit.type
    })

    const currentStreak = getCurrentStreak({
        lastCompleted,
        currentStreak: habit.currentStreak.streak,
        type: habit.type
    })
    const longestStreakRange = getLongestStreakRange(
        habit.longestStreak,
        habit.type
    )
    const currentStreakTooltipLabel =
        currentStreak === 0
            ? `You're not on an active streak at the momemnt`
            : `You're on a ${currentStreak} ${
                  habit.type === 'daily' ? 'day' : 'week'
              } streak!`

    return (
        <>
            <Flex align='center' justify='space-between'>
                <Flex
                    color='neutral.700'
                    gap={12}
                    bgGradient='linear(to-l, transparent, purple.50)'
                    py={2}
                    px={4}
                    borderRadius={20}
                    align='center'
                >
                    <Text>
                        🎯 {habit.target} {habit.metric} {habit.type}
                    </Text>
                    <UpdateHabitMetrics habit={habit} />
                </Flex>
                <DocActions
                    editAction={onEditFormOpen}
                    deleteAction={onDeleteWarningOpen}
                />
            </Flex>
            <Heading as='h1' fontSize='3xl' mt={8} mb={4} display='flex'>
                {habit.name}
                <Tooltip label={currentStreakTooltipLabel} placement='top'>
                    <Text fontSize='md'>🔥{currentStreak}</Text>
                </Tooltip>
            </Heading>
            <Text mb={4} fontSize='xl'>
                {habit.description}
            </Text>
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

            <Heading as='h2' fontSize='xl' mt={8} mb={4}>
                Linked Goals
            </Heading>
            {loading && <Spinner />}
            {!isGoals && (
                <Text>
                    You haven&apos;t attached this habit to any of your goals
                </Text>
            )}
            <SimpleGrid
                columns={3}
                spacing={6}
                minChildWidth='300px'
                templateColumns='1fr 1fr 1fr'
            >
                {relevantGoals?.map((goal: Goal) => (
                    <GoalBox key={goal.id} goal={goal} />
                ))}
            </SimpleGrid>
        </>
    )
}

export default HabitInfo
